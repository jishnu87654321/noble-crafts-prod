const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const TOTAL_FRAMES = 150;
const W = 1920;
const H = 1080;

const outDir = path.join(__dirname, 'public', 'pics');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Delete old SVG placeholders
const oldFiles = fs.readdirSync(outDir).filter(f => f.endsWith('.svg'));
oldFiles.forEach(f => fs.unlinkSync(path.join(outDir, f)));
console.log(`Cleared ${oldFiles.length} old SVG placeholders.`);

function lerp(a, b, t) { return a + (b - a) * t; }
function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

// Brand colours
const ORANGE  = { r: 235, g: 155, b: 98  };
const BLACK   = { r:   5, g:   5, b:   8  };
const DARK    = { r:  18, g:  12, b:   6  };
const WHITE   = { r: 245, g: 240, b: 235  };

function hexRgb(c) { return `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`; }
function mixColor(a, b, t) {
  return { r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) };
}

function drawStars(ctx, count, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  for (let i = 0; i < count; i++) {
    const x = (Math.sin(i * 127.1) * 0.5 + 0.5) * W;
    const y = (Math.cos(i * 311.7) * 0.5 + 0.5) * H;
    const r = 0.5 + (Math.sin(i * 53.3) * 0.5 + 0.5) * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,220,180,${0.3 + Math.sin(i) * 0.2})`;
    ctx.fill();
  }
  ctx.restore();
}

function drawGrid(ctx, progress, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.15;
  ctx.strokeStyle = `rgba(235,155,98,1)`;
  ctx.lineWidth = 0.5;
  const spacing = 60;
  const offsetX = (progress * spacing * 2) % spacing;
  const offsetY = (progress * spacing * 1.5) % spacing;
  for (let x = -spacing + offsetX; x < W + spacing; x += spacing) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -spacing + offsetY; y < H + spacing; y += spacing) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.restore();
}

function drawGlowOrb(ctx, cx, cy, radius, color, alpha) {
  ctx.save();
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${alpha})`);
  grad.addColorStop(0.4, `rgba(${color.r},${color.g},${color.b},${alpha * 0.4})`);
  grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

function drawText(ctx, text, x, y, size, color, alpha, weight = 'bold') {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `${weight} ${size}px 'Arial', sans-serif`;
  ctx.fillStyle = hexRgb(color);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.restore();
}

// ─── Phases ──────────────────────────────────────────────────────────────────
// 0→30  : Star field zoom-in → NobleCrafts logo reveal
// 30→70 : Floating cards showing services (Web Design, SEO, E-Commerce, Branding)
// 70→100: Orange light-burst → transition to Services section
// 100→150: Dark fade-out with glowing tagline

function renderFrame(i) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const p = i / (TOTAL_FRAMES - 1);   // 0.0 → 1.0
  const ep = easeInOut(p);

  // ── Background gradient ──
  const bg = mixColor(BLACK, DARK, Math.sin(p * Math.PI));
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, hexRgb(mixColor(bg, { r:0,g:0,b:0 }, 0.5)));
  bgGrad.addColorStop(1, hexRgb(bg));
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ── Stars ──
  const starAlpha = i < 30 ? lerp(0, 0.8, i / 30)
                  : i < 80 ? lerp(0.8, 0.3, (i - 30) / 50)
                  : lerp(0.3, 0.05, (i - 80) / 70);
  drawStars(ctx, 200, starAlpha);

  // ── Grid ──
  const gridAlpha = i < 20 ? 0
                  : i < 50 ? lerp(0, 1, (i - 20) / 30)
                  : i < 110 ? 1
                  : lerp(1, 0, (i - 110) / 40);
  drawGrid(ctx, p, gridAlpha);

  // ── Phase 0–30: Logo reveal ──
  if (i <= 50) {
    const t = Math.min(1, i / 30);
    const logoAlpha = easeInOut(t);
    const scale = lerp(0.6, 1, easeInOut(t));
    const cx = W / 2, cy = H / 2;

    // Glow behind logo
    drawGlowOrb(ctx, cx, cy, 350 * scale, ORANGE, logoAlpha * 0.35);
    drawGlowOrb(ctx, cx, cy, 180 * scale, ORANGE, logoAlpha * 0.5);

    // "NobleCrafts" wordmark
    ctx.save();
    ctx.globalAlpha = logoAlpha;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);
    drawText(ctx, 'NobleCrafts', cx, cy - 40, 130, WHITE, 1, 'bold');
    drawText(ctx, 'CRAFTING DIGITAL EXCELLENCE', cx, cy + 55, 32, ORANGE, 0.85, 'normal');
    ctx.restore();
  }

  // ── Phase 30–110: Service cards floating in ──
  const services = [
    { label: 'Web Design',    sub: 'Beautiful, responsive websites',  icon: '◈', dx: -420, dy: -160 },
    { label: 'SEO',           sub: 'Rank higher, grow faster',         icon: '◎', dx:  420, dy: -160 },
    { label: 'E-Commerce',    sub: 'Stores that convert',              icon: '◉', dx: -420, dy:  160 },
    { label: 'Branding',      sub: 'Identity that resonates',          icon: '◍', dx:  420, dy:  160 },
  ];

  if (i >= 25 && i <= 120) {
    const localP = Math.min(1, (i - 25) / 95);
    services.forEach((svc, idx) => {
      const delay   = idx * 0.12;
      const t       = easeInOut(Math.max(0, Math.min(1, (localP - delay) / 0.4)));
      const fadeOut = i > 95 ? easeInOut(Math.min(1, (i - 95) / 25)) : 0;
      const alpha   = t * (1 - fadeOut);
      if (alpha < 0.01) return;

      const cx = W / 2 + svc.dx;
      const cy = H / 2 + svc.dy;
      const cardW = 340, cardH = 130;

      // Card background
      ctx.save();
      ctx.globalAlpha = alpha * 0.85;
      ctx.beginPath();
      ctx.roundRect(cx - cardW/2, cy - cardH/2, cardW, cardH, 16);
      ctx.fillStyle = `rgba(20,12,6,0.9)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(235,155,98,0.6)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Icon
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `bold 38px Arial`;
      ctx.fillStyle = hexRgb(ORANGE);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(svc.icon, cx, cy - 18);
      ctx.restore();

      drawText(ctx, svc.label, cx, cy + 15, 28, WHITE, alpha, 'bold');
      drawText(ctx, svc.sub,   cx, cy + 48, 18, { r:180, g:170, b:160 }, alpha * 0.8, 'normal');
    });
  }

  // ── Phase 100–150: Light burst + tagline ──
  if (i >= 95) {
    const t = Math.min(1, (i - 95) / 55);
    const burstRadius = lerp(0, W * 0.9, easeInOut(t));
    const burstAlpha  = t < 0.5 ? lerp(0, 0.7, t * 2) : lerp(0.7, 0, (t - 0.5) * 2);

    drawGlowOrb(ctx, W / 2, H / 2, burstRadius, ORANGE, burstAlpha * 0.6);

    // Tagline fades in during last 30 frames
    if (i >= 118) {
      const ta = Math.min(1, (i - 118) / 32);
      drawGlowOrb(ctx, W/2, H/2, 500, ORANGE, ta * 0.25);
      drawText(ctx, 'Your Vision.', W/2, H/2 - 55, 90, WHITE, ta * easeInOut(ta), 'bold');
      drawText(ctx, 'Our Craft.',   W/2, H/2 + 45, 90, ORANGE, ta * easeInOut(ta), 'bold');
    }
  }

  // ── Vignette ──
  const vig = ctx.createRadialGradient(W/2, H/2, H*0.35, W/2, H/2, H*0.85);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.7)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  const filename = path.join(outDir, `${String(i + 1).padStart(4, '0')}.jpg`);
  const buf = canvas.toBuffer('image/jpeg', { quality: 0.88 });
  fs.writeFileSync(filename, buf);

  if ((i + 1) % 15 === 0 || i === 0) {
    process.stdout.write(`\r  Frame ${i + 1}/${TOTAL_FRAMES} — ${Math.round(((i+1)/TOTAL_FRAMES)*100)}%`);
  }
}

console.log(`\nGenerating ${TOTAL_FRAMES} HD JPEG frames (${W}×${H}) — brand cinematic sequence...`);
const start = Date.now();
for (let i = 0; i < TOTAL_FRAMES; i++) renderFrame(i);
const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log(`\n✓ Done! ${TOTAL_FRAMES} frames generated in ${elapsed}s → public/pics/`);
