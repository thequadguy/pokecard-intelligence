// ── The Rare Pick · Main JS ──

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Reveal on scroll (Intersection Observer)
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Animated stat counters
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fade-up 0.6s var(--ease-smooth) both';
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(el => statObserver.observe(el));

// Holo tilt effect on card hover
function bindHoloEffect(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `
      perspective(600px)
      rotateY(${x * 12}deg)
      rotateX(${-y * 8}deg)
      translateY(-4px)
      scale(1.02)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

document.querySelectorAll('.holo-card').forEach(bindHoloEffect);

// Fetch dynamic collection
async function loadDynamicCollection() {
  const grid = document.getElementById('dynamic-collection-grid');
  if (!grid) return;
  
  try {
    const res = await fetch('data/collection.json');
    if (!res.ok) throw new Error('Failed to load collection');
    const cards = await res.json();
    
    cards.forEach((card, index) => {
      const article = document.createElement('article');
      article.className = `glass-card card-item holo-card reveal reveal-delay-${index % 4}`;
      article.setAttribute('role', 'listitem');
      
      // We use a basic emoji based on name just for visual flair as fallback
      const emojiMap = { 'Charizard': '🔥', 'Blastoise': '💧', 'Pikachu': '⚡', 'Lugia': '🌊', 'Mewtwo': '🔮' };
      const icon = emojiMap[card.name] || '✨';
      
      const imageHtml = card.imageUrl 
        ? `<img src="${card.imageUrl}" alt="${card.name}" class="card-api-img" loading="lazy" />`
        : icon;
      
      article.innerHTML = `
        <div class="card-img-wrap" aria-label="${card.name} card">
          ${imageHtml}
          <div class="card-grade">${card.condition === 'Ungraded' ? 'RAW' : card.condition}</div>
        </div>
        <div>
          <div class="card-name">${card.name}</div>
          <div class="card-meta">${card.set}</div>
          <div class="card-value">${card.notes}</div>
          ${card.marketPrice ? `<div style="font-size: 0.75rem; color: var(--gold-light); margin-top: 0.25rem;">Market: $${card.marketPrice}</div>` : ''}
        </div>
      `;
      
      grid.appendChild(article);
      bindHoloEffect(article);
      revealObserver.observe(article);
    });
  } catch (err) {
    console.error('Error loading collection:', err);
    grid.innerHTML = '<p style="color: var(--silver); padding: 2rem;">Could not load collection.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadDynamicCollection);

// Slab image parallax on scroll
const slabImg = document.querySelector('.slab-img');
if (slabImg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      slabImg.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  }, { passive: true });
}

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
