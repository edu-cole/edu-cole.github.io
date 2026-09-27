/* =======================================================================
   ADIÇÕES de JS — pode colar isso num <script> no final do body, ou no
   seu arquivo .js já existente. Só precisa rodar depois que os elementos
   #tri1, #tri2, #tri3, #link_3d_p e #link_curr já existirem no DOM.
   ======================================================================= */

/* ---------- CONFIGURÁVEIS ---------- */
const FOLLOW_MAX_OFFSET = 12; // deslocamento máx. (px) que os elementos seguem o cursor
const FOLLOW_EASE = 0.08;     // suavização do movimento (menor = mais "lento"/fluido)
const FOLLOW_RANGE = 300;     // distância (px) a partir da qual o deslocamento já é o máximo
const TYPE_DELAY = 90;        // ms entre cada sílaba/letra do efeito de digitação

/* =======================================================================
   1) "OLHAR PARA O CURSOR" — translate (posição) + rotação 3D (tilt)
      independente para cada um dos 4 elementos
   ======================================================================= */
(function () {
  const followers = [
    document.getElementById('tri1'),
    document.getElementById('tri2'),
    document.getElementById('tri3'),
    document.getElementById('link_3d_p'),
  ].filter(Boolean);

  if (followers.length === 0) return;

  const MAX_TILT_DEG = 10;   // inclinação máxima em graus — ajuste aqui
  const TILT_RANGE = 400;    // distância (px) de referência pro tilt máximo
  const TILT_EASE = 0.08;    // suavização da rotação (mesmo espírito do translate)

  // estado suavizado: posição (x,y) e rotação (rx,ry) de cada elemento
  const state = followers.map(() => ({ x: 0, y: 0, rx: 0, ry: 0 }));

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function tick() {
    followers.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.hypot(dx, dy) || 1;
      const factor = Math.min(distance, FOLLOW_RANGE) / FOLLOW_RANGE;

      // --- posição (já existia) ---
      const targetX = (dx / distance) * FOLLOW_MAX_OFFSET * factor;
      const targetY = (dy / distance) * FOLLOW_MAX_OFFSET * factor;

      // --- rotação 3D (novo) ---
      // vertical do mouse -> inclina em X ; horizontal do mouse -> inclina em Y
      const targetRX = clamp(-dy / TILT_RANGE, -1, 1) * MAX_TILT_DEG;
      const targetRY = clamp(dx / TILT_RANGE, -1, 1) * MAX_TILT_DEG;

      const s = state[i];
      s.x = lerp(s.x, targetX, FOLLOW_EASE);
      s.y = lerp(s.y, targetY, FOLLOW_EASE);
      s.rx = lerp(s.rx, targetRX, TILT_EASE);
      s.ry = lerp(s.ry, targetRY, TILT_EASE);

      el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
      el.style.transform = `rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

/* =======================================================================
   2) CURRICULUM — efeito de "digitação" letra por letra, espalhadas
      pelo pentágono, com distância mínima entre elas
   ======================================================================= */
(function () {
  const CURRICULUM_PARTS = ['C', 'U', 'R', 'R', 'Í', 'C', 'U', 'L', 'U', 'M'];

  const Y_MIN = 14;
  const Y_MAX = 90;
  const X_MARGIN = 10;

  const MIN_DISTANCE_PX = 25; // distância mínima entre letras — ajuste aqui
  const MAX_ATTEMPTS = 30;    // tentativas por letra antes de aceitar o "melhor possível"

  const linkCurr = document.getElementById('link_curr');
  if (!linkCurr) return;

  const box = linkCurr.querySelector('.curriculum-text');
  if (!box) return;

  function pentagonSafeX(y) {
    let left, right;
    if (y <= 38) {
      left = 50 * (1 - y / 38);
      right = 50 + 50 * (y / 38);
    } else {
      left = (18 * (y - 38)) / 62;
      right = 100 - (18 * (y - 38)) / 62;
    }
    left += X_MARGIN;
    right -= X_MARGIN;
    if (right < left) {
      const mid = (left + right) / 2;
      return { left: mid, right: mid };
    }
    return { left, right };
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function pctToPx(topPct, leftPct, width, height) {
    return { x: (leftPct / 100) * width, y: (topPct / 100) * height };
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  // Sorteia posições respeitando o pentágono E uma distância mínima
  // entre cada letra já posicionada (evita sobreposição).
  function getScatteredPositions(count, width, height) {
    const bandHeight = (Y_MAX - Y_MIN) / count;
    const placedPx = [];
    const positions = [];

    for (let i = 0; i < count; i++) {
      const bandStart = Y_MIN + i * bandHeight;
      let best = null;
      let bestScore = -1;

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const y = randomBetween(bandStart, bandStart + bandHeight);
        const { left, right } = pentagonSafeX(y);
        const x = randomBetween(left, right);
        const px = pctToPx(y, x, width, height);

        const nearestDist = placedPx.length === 0
          ? Infinity
          : Math.min(...placedPx.map((p) => distance(p, px)));

        if (nearestDist >= MIN_DISTANCE_PX) {
          best = { top: y, left: x, px };
          break; // distância boa o suficiente, pode parar de tentar
        }
        if (nearestDist > bestScore) {
          bestScore = nearestDist;
          best = { top: y, left: x, px };
        }
      }

      placedPx.push(best.px);
      positions.push({ top: `${best.top.toFixed(1)}%`, left: `${best.left.toFixed(1)}%` });
    }

    return positions;
  }

  CURRICULUM_PARTS.forEach((part) => {
    const span = document.createElement('span');
    span.textContent = part;
    box.appendChild(span);
  });

  const spans = box.querySelectorAll('span');
  let timeouts = [];

  function clearTimeouts() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
  }

  function playTyping() {
    clearTimeouts();
    const rect = box.getBoundingClientRect();
    const positions = getScatteredPositions(spans.length, rect.width, rect.height);

    spans.forEach((span, i) => {
      span.classList.remove('show');
      span.style.top = positions[i].top;
      span.style.left = positions[i].left;
      timeouts.push(setTimeout(() => span.classList.add('show'), i * TYPE_DELAY));
    });
  }

  function resetTyping() {
    clearTimeouts();
    spans.forEach((span) => span.classList.remove('show'));
  }

  linkCurr.addEventListener('mouseenter', playTyping);
  linkCurr.addEventListener('mouseleave', resetTyping);
})();
