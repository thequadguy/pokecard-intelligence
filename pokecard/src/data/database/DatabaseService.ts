import * as SQLite from 'expo-sqlite';

export interface CollectionEntry {
  id?: number;
  cardId: string;
  grade: number;
  acquiredPrice: number;
  notes: string;
  addedAt?: string;
}

export class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  private async getDb(): Promise<SQLite.SQLiteDatabase> {
    if (!this.db) {
      this.db = await SQLite.openDatabaseAsync('pokecard.db');
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS collection (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cardId TEXT NOT NULL,
          grade REAL NOT NULL,
          acquiredPrice REAL DEFAULT 0,
          notes TEXT DEFAULT '',
          addedAt TEXT DEFAULT (datetime('now'))
        );
      `);
    }
    return this.db;
  }

  async addToCollection(entry: CollectionEntry): Promise<number> {
    const db = await this.getDb();
    const result = await db.runAsync(
      'INSERT INTO collection (cardId, grade, acquiredPrice, notes) VALUES (?, ?, ?, ?)',
      [entry.cardId, entry.grade, entry.acquiredPrice, entry.notes]
    );
    return result.lastInsertRowId;
  }

  async getCollection(): Promise<CollectionEntry[]> {
    const db = await this.getDb();
    return await db.getAllAsync('SELECT * FROM collection ORDER BY addedAt DESC');
  }

  async removeFromCollection(id: number): Promise<void> {
    const db = await this.getDb();
    await db.runAsync('DELETE FROM collection WHERE id = ?', [id]);
  }

  async updateGrade(id: number, grade: number): Promise<void> {
    const db = await this.getDb();
    await db.runAsync('UPDATE collection SET grade = ? WHERE id = ?', [grade, id]);
  }

  async getStats(): Promise<{ total: number; totalValue?: number }> {
    const db = await this.getDb();
    const rows = await db.getAllAsync('SELECT COUNT(*) as total FROM collection');
    return { total: (rows[0] as any)?.total ?? 0 };
  }
}
