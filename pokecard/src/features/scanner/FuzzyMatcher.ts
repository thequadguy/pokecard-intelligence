import cardsData from "../../../assets/data/cards.json";

export interface CardRecord{id:string;name:string;set:string;number:string;rarity:string;hp:number;types:string[];localNames?:{ja?:string;zh?:string;ko?:string};prices?:any;language?:string;year?:number;setNames?:any}

const ONLINE_DB = 'https://raw.githubusercontent.com/thequadguy/pokecard-intelligence/main/full_cards.json';

export class FuzzyMatcher{
  private cards:CardRecord[]=[];
  private onlineCards:CardRecord[]=[];
  private loading=false;
  
  constructor(){this.cards=cardsData as CardRecord[];this.loadOnlineDB()}
  
  private async loadOnlineDB(){
    if(this.loading||this.onlineCards.length>0)return;
    this.loading=true;
    try{
      const res=await fetch(ONLINE_DB);
      if(res.ok){this.onlineCards=await res.json();console.log(`Loaded ${this.onlineCards.length} cards from online DB`)}
    }catch(e){console.warn('Online DB unavailable, using offline cards',e)}
    finally{this.loading=false}
  }
  
  private getAllCards():CardRecord[]{return [...this.cards,...this.onlineCards]}
  
  private normalize(s:string):string{return s.toLowerCase().replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff\uac00-\ud7af ]/g,"").trim()}
  
  private detectLang(q:string):string{
    if(/[\u3040-\u309f\u30a0-\u30ff]/.test(q))return"ja";
    if(/[\u4e00-\u9fff]/.test(q))return"zh";
    if(/[\uac00-\ud7af]/.test(q))return"ko";
    return"en"
  }
  
  private score(q:string,c:CardRecord):number{
    const qn=this.normalize(q);
    const targets=[c.name];
    if(c.localNames){if(c.localNames.ja)targets.push(c.localNames.ja);if(c.localNames.zh)targets.push(c.localNames.zh);if(c.localNames.ko)targets.push(c.localNames.ko)}
    if(c.setNames){const lang=this.detectLang(q);if(lang==='ja'&&c.setNames.ja)targets.push(c.setNames.ja);if(lang==='zh'&&c.setNames.zh)targets.push(c.setNames.zh);if(lang==='ko'&&c.setNames.ko)targets.push(c.setNames.ko)}
    let best=0;
    for(const t of targets){const tn=this.normalize(t);if(tn===qn)return 1.0;if(tn.includes(qn)||qn.includes(tn))best=Math.max(best,0.9);
      const qw=qn.split(" "),tw=tn.split(" "),m=qw.filter(w=>tw.includes(w)).length;
      best=Math.max(best,m/Math.max(qw.length,tw.length))}
    return best
  }
  
  async findBestMatch(q:string):Promise<CardRecord|null>{
    await this.loadOnlineDB();
    const allCards=this.getAllCards();
    if(!q||allCards.length===0)return null;
    let best:CardRecord|null=null,bestScore=0;
    for(const c of allCards){const s=this.score(q,c);if(s>bestScore){bestScore=s;best=c}}
    return bestScore>0.3?best:null
  }
  
  getCardById(id:string):CardRecord|null{return this.getAllCards().find(c=>c.id===id)??null}
  
  async searchCards(q:string,limit=20):Promise<CardRecord[]>{
    await this.loadOnlineDB();
    return this.getAllCards().map(c=>({card:c,score:this.score(q,c)})).filter(r=>r.score>0.2).sort((a,b)=>b.score-a.score).slice(0,limit).map(r=>r.card)
  }
  
  getStats():{offline:number;online:number;total:number}{return{offline:this.cards.length,online:this.onlineCards.length,total:this.getAllCards().length}}
}