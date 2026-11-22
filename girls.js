// A step = { t: title, tip, svg: lines the pencil draws, back/front: color fills for the finished picture }.
// In fills: @H hair, @A accessory, @S skin, @C clothes.

// ---------- Three drawing styles. Each one has its own head shape, eyes place and body.
const ANIME_HEAD = 'M70 150 Q70 64 150 62 Q230 64 230 150 Q229 200 196 234 Q172 258 150 260 Q128 258 104 234 Q71 200 70 150Z';
const TPL = {
  classic: { L:70, R:230, y:165, top:60, cy:160, ry:92, ey:168, edx:32, er:13, nose:'hook', noseY:186, my:214, mw:22,
    cheekY:200, cheekDX:46, nx0:132, nx1:168, ny:282,
    head:{ t:'A big oval', tip:'Draw a big egg shape for the head. Wobbly is okay!', svg:'<ellipse cx="150" cy="160" rx="80" ry="92"/>' },
    headFill:'<ellipse fill="@S" cx="150" cy="160" rx="80" ry="92"/>',
    guide:'M150 54 V270 M54 168 H246 M116 190 H184 M124 214 H176', ticks:'M144 54 H156 M144 270 H156 M54 162 V174 M246 162 V174', ears:['M72 158 q-20 16 2 38', 'M228 158 q20 16 -2 38'],
    neck:{ t:'Neck and shoulders', tip:'Two short lines down, then curve out like a slide.', svg:'<path d="M132 248 V282 Q92 286 70 330"/><path d="M168 248 V282 Q208 286 230 330"/>' },
    skinNeck:'M132 230 H168 V284 H132Z', body:'M70 330 Q92 286 132 282 H168 Q208 286 230 330Z' },
  chibi: { L:52, R:248, y:150, top:54, cy:150, ry:86, ey:170, edx:42, er:17, nose:null, my:206, mw:13,
    cheekY:196, cheekDX:64, nx0:138, nx1:162, ny:246,
    head:{ t:'A big round head', tip:'A big, wide circle. Chibi girls have BIG heads!', svg:'<ellipse cx="150" cy="150" rx="98" ry="86"/>' },
    headFill:'<ellipse fill="@S" cx="150" cy="150" rx="98" ry="86"/>',
    guide:'M150 48 V252 M36 170 H264 M130 206 H170', ticks:'M144 48 H156 M144 252 H156 M36 164 V176 M264 164 V176', ears:['M53 146 q-18 14 2 32', 'M247 146 q18 14 -2 32'],
    neck:{ t:'A little dress', tip:'A tiny neck, then a dress shaped like a bell! 🔔', svg:'<path d="M138 232 V246 Q110 250 104 280 L92 340 H208 L196 280 Q190 250 162 246 V232"/>' },
    skinNeck:'M138 220 H162 V248 H138Z', body:'M138 246 Q110 250 104 280 L92 340 H208 L196 280 Q190 250 162 246Z' },
  anime: { L:70, R:230, y:150, top:54, cy:160, ry:98, ey:174, edx:36, er:14, nose:'tiny', noseY:204, my:228, mw:10,
    cheekY:210, cheekDX:50, nx0:138, nx1:162, ny:284,
    head:{ t:'Head shape', tip:'A round top, then come down to a soft point for the chin.', svg:`<path d="${ANIME_HEAD}"/>` },
    headFill:`<path fill="@S" d="${ANIME_HEAD}"/>`,
    guide:'M150 48 V276 M54 174 H246 M124 206 H176 M128 228 H172', ticks:'M144 48 H156 M144 276 H156 M54 168 V180 M246 168 V180', ears:['M71 152 q-18 14 4 34', 'M229 152 q18 14 -4 34'],
    neck:{ t:'Neck and shoulders', tip:'A thin neck, then curve out for the shoulders.', svg:'<path d="M138 252 V284 Q96 288 70 330"/><path d="M162 252 V284 Q204 288 230 330"/>' },
    skinNeck:'M138 236 H162 V286 H138Z', body:'M70 330 Q96 288 138 284 H162 Q204 288 230 330Z' },
};

// ---------- Eyes (with colored middles and eyebrows), nose, mouth
const INK = '#2a1a33';
const LINE = '#3b3b44'; // graphite pencil
const pencilG = s => `<g filter="url(#pencil)">${s}</g>`, markerG = s => `<g filter="url(#marker)" opacity=".93">${s}</g>`;
function EYES(T, kind, iris) {
  const y = T.ey, r = T.er, both = f => f(150 - T.edx, -1) + f(150 + T.edx, 1);
  const brow = (x, s, lift) => `<path d="M${x - 12} ${y - lift} Q${x + s * 2} ${y - lift - 7} ${x + 12} ${y - lift}"/>`;
  if (kind === 'round') return { t:'Big eyes', tip:'Two circles, a colored middle with a dark dot, eyebrows on top. ✨',
    svg: both((x, s) => `<g class="fade" stroke="none"><circle fill="#fff" cx="${x}" cy="${y}" r="${r}"/><circle fill="${iris}" cx="${x}" cy="${y + 1}" r="${r * .7}"/>
      <circle fill="${INK}" cx="${x}" cy="${y + 1}" r="${r * .38}"/><circle fill="#fff" cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .22}"/></g>
      <circle cx="${x}" cy="${y}" r="${r}"/><path d="M${x + s * (r - 2)} ${y - 8} l${s * 8} -5"/><path d="M${x + s * (r - 6)} ${y - r + 1} l${s * 5} -7"/>${brow(x, s, r + 13)}`) };
  if (kind === 'anime') return { t:'Sparkly anime eyes', tip:'Tall ovals with a thick top line, a colored middle and two white shines. ✨',
    svg: both((x, s) => `<g class="fade" stroke="none"><ellipse fill="#fff" cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.3}"/>
      <ellipse fill="${iris}" cx="${x}" cy="${y + r * .2}" rx="${r * .8}" ry="${r * 1.05}"/><ellipse fill="${INK}" cx="${x}" cy="${y + r * .25}" rx="${r * .42}" ry="${r * .6}"/>
      <circle fill="#fff" cx="${x - r * .32}" cy="${y - r * .3}" r="${r * .32}"/><circle fill="#fff" cx="${x + r * .35}" cy="${y + r * .6}" r="${r * .15}"/></g>
      <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.3}"/><path stroke-width="4.5" d="M${x - r - 4} ${y - r * .8} Q${x} ${y - r * 1.75} ${x + r + 4} ${y - r * .8}"/>
      <path d="M${x + s * (r + 4)} ${y - r * .8} l${s * 8} -4"/>${brow(x, s, r * 1.3 + 16)}`) };
  if (kind === 'kawaii') return { t:'Big shiny eyes', tip:'Big dark ovals with two white shines. So cute!',
    svg: both((x, s) => `<g class="fade" stroke="none"><ellipse fill="${INK}" cx="${x}" cy="${y}" rx="${r * .75}" ry="${r}"/>
      <ellipse fill="${iris}" cx="${x}" cy="${y + r * .45}" rx="${r * .5}" ry="${r * .35}"/>
      <circle fill="#fff" cx="${x - r * .22}" cy="${y - r * .35}" r="${r * .32}"/><circle fill="#fff" cx="${x + r * .25}" cy="${y + r * .1}" r="${r * .14}"/></g>
      <ellipse cx="${x}" cy="${y}" rx="${r * .75}" ry="${r}"/><path d="M${x + s * r * .7} ${y - r * .7} l${s * 7} -5"/>`) };
  if (kind === 'almond') return { t:'Princess eyes', tip:'Lemon-shaped eyes, a colored circle inside, long lashes and pretty eyebrows.',
    svg: both((x, s) => `<g class="fade" stroke="none"><path fill="#fff" d="M${x - 18} ${y} Q${x} ${y - 17} ${x + 18} ${y} Q${x} ${y + 13} ${x - 18} ${y}Z"/>
      <circle fill="${iris}" cx="${x}" cy="${y - 1}" r="9"/><circle fill="${INK}" cx="${x}" cy="${y - 1}" r="4.5"/><circle fill="#fff" cx="${x - 3}" cy="${y - 4}" r="2.5"/></g>
      <path d="M${x - 18} ${y} Q${x} ${y - 17} ${x + 18} ${y} Q${x} ${y + 13} ${x - 18} ${y}"/>
      <path d="M${x + s * 18} ${y} l${s * 7} -6"/><path d="M${x + s * 14} ${y - 6} l${s * 5} -8"/>
      <path d="M${x - 14} ${y - 24} Q${x - s * 2} ${y - 34} ${x + 16} ${y - 26}"/>`) };
  return { t:'Happy eyes', tip:'Two little upside-down smiles. She is smiling with her eyes!',
    svg: both((x, s) => `<path d="M${x - 12} ${y + 4} Q${x} ${y - 12} ${x + 12} ${y + 4}"/><path d="M${x + s * 14} ${y - 2} l${s * 6} -4"/>${brow(x, s, 22)}`) };
}
function NOSE(T) {
  return T.nose === 'tiny' ? { t:'A tiny nose', tip:'Just a tiny little line.', svg:`<path d="M152 ${T.noseY} l-4 7 l5 1"/>` }
                           : { t:'A little nose', tip:'A tiny hook under the eyes.', svg:`<path d="M151 ${T.noseY} q-7 12 1 14"/>` };
}
function MOUTH(T, kind) {
  const y = T.my, w = T.mw;
  if (kind === 'laugh') return { t:'A big laugh', tip:'A straight line, then a big smile under it. Like a slice of watermelon! 🍉',
    svg:`<g class="fade" stroke="none"><path fill="#c2456b" d="M${150 - w} ${y - 2} H${150 + w} Q150 ${y + w * 1.4} ${150 - w} ${y - 2}Z"/>
      <path fill="#ff8fa3" d="M${150 - w * .5} ${y + w * .7} Q150 ${y + w * 1.15} ${150 + w * .5} ${y + w * .7} Q150 ${y + w * .4} ${150 - w * .5} ${y + w * .7}Z"/></g>
      <path d="M${150 - w} ${y - 2} H${150 + w} Q150 ${y + w * 1.4} ${150 - w} ${y - 2}"/>` };
  if (kind === 'tiny') return { t:'A tiny mouth', tip:'Just a little "o". So cute!',
    svg:`<g class="fade" stroke="none"><ellipse fill="#c2456b" cx="150" cy="${y + 2}" rx="6" ry="5.5"/></g><ellipse cx="150" cy="${y + 2}" rx="6" ry="5.5"/>` };
  if (kind === 'cat') return { t:'Kitty mouth', tip:'A little "w" under the nose. Meow!', svg:`<path d="M136 ${y - 2} q7 9 14 0 q7 9 14 0"/>` };
  if (kind === 'lips') return { t:'Pretty lips', tip:'A little "m" shape on top, then a curve under it.',
    svg:`<g class="fade" stroke="none"><path fill="#e8607f" d="M134 ${y} Q142 ${y - 7} 150 ${y - 3} Q158 ${y - 7} 166 ${y} Q150 ${y + 13} 134 ${y}Z"/></g>
      <path d="M134 ${y} Q142 ${y - 7} 150 ${y - 3} Q158 ${y - 7} 166 ${y}"/><path d="M134 ${y} Q150 ${y + 13} 166 ${y}"/>` };
  return { t:'A happy smile', tip:'A smile curve, like a banana! 🍌', svg:`<path d="M${150 - w} ${y} Q150 ${y + w * .9} ${150 + w} ${y}"/>` };
}

// ---------- Hair. Every style fits every head shape.
const top_ = T => `M${T.L} ${T.y} Q${T.L - 4} ${T.top + 2} 150 ${T.top} Q${T.R + 4} ${T.top + 2} ${T.R} ${T.y}`;
const cap = T => `<path fill="@H" d="${top_(T)}Z"/>`;
// Fill between the hair's top line and the bangs line (bangs drawn left to right).
const bangsFill = (T, inner) => `<path fill="@H" d="M${T.L} ${T.y} L${inner.slice(1)} L${T.R} ${T.y} Q${T.R + 4} ${T.top + 2} 150 ${T.top} Q${T.L - 4} ${T.top + 2} ${T.L} ${T.y}Z"/>`;
const bangs = (t, tip, inner, extra = '') => T => ({ t, tip, svg:`<path d="${top_(T)}"/><path d="${inner(T)}"/>${extra && extra(T)}`, back:cap(T), front:bangsFill(T, inner(T)) });
const fy = T => T.y - 35;

const scallop = (cx, cy, rx, ry, a0, a1, n, b) => {
  const P = (a, r1, r2) => [(cx + r1 * Math.cos(a * Math.PI / 180)).toFixed(1), (cy + r2 * Math.sin(a * Math.PI / 180)).toFixed(1)];
  let d = 'M' + P(a0, rx, ry).join(' ');
  for (let i = 1; i <= n; i++) {
    const a = a0 + (a1 - a0) * i / n, m = a0 + (a1 - a0) * (i - .5) / n;
    d += ` Q${P(m, rx + b, ry + b).join(' ')} ${P(a, rx, ry).join(' ')}`;
  }
  return d;
};
const star = (x, y, r) => 'M' + Array.from({ length: 10 }, (_, i) => {
  const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r;
  return `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
}).join(' L') + 'Z';
const heart = (x, y, k = 1) => `M${x} ${y + 12 * k} C${x - 20 * k} ${y - 2 * k} ${x - 15 * k} ${y - 20 * k} ${x} ${y - 10 * k} C${x + 15 * k} ${y - 20 * k} ${x + 20 * k} ${y - 2 * k} ${x} ${y + 12 * k}Z`;
const mirror = (T, f) => f(T.L, 1) + f(T.R, -1);

const H = {
  wavyBangs: bangs('Hair on top', 'A big rainbow over the head, then wavy bangs.',
    T => `M${T.L + 8} ${fy(T)} Q${T.L + 48} ${fy(T) - 2} 150 ${T.top + 22} Q172 ${fy(T) - 10} ${T.R - 6} ${fy(T) + 2}`),
  midPart: bangs('Hair on top', 'A rainbow on top, a smaller rainbow inside it, and a line in the middle.',
    T => `M${T.L + 2} ${T.y - 15} Q${T.L + 20} ${fy(T) - 30} 150 ${T.top + 30} Q${T.R - 20} ${fy(T) - 30} ${T.R - 2} ${T.y - 15}`,
    T => `<path d="M150 ${T.top} V${T.top + 30}"/>`),
  pulled: bangs('Hair pulled back', 'A rainbow on top, and a smooth curve for her forehead.',
    T => `M${T.L + 8} ${fy(T) - 2} Q${T.L + 40} ${T.top + 36} 150 ${T.top + 32} Q${T.R - 40} ${T.top + 36} ${T.R - 8} ${fy(T) - 2}`),
  sideBangs: bangs('Side bangs', 'A rainbow on top, and bangs that swoop to one side like a wave.',
    T => `M${T.L + 6} ${fy(T) + 5} Q${T.L + 60} ${fy(T) - 10} ${T.R - 50} ${T.top + 14} Q${T.R - 30} ${fy(T) - 20} ${T.R - 4} ${fy(T) + 2}`),
  spikyBangs: bangs('Pointy bangs', 'A rainbow on top, then zig-zag bangs like little mountains! ⛰️',
    T => { const f = fy(T), L = T.L, R = T.R; return `M${L + 4} ${f + 12} L${L + 26} ${f - 10} L${L + 42} ${f + 16} L${L + 62} ${f - 14} L150 ${f + 14} L${R - 62} ${f - 14} L${R - 42} ${f + 16} L${R - 26} ${f - 10} L${R - 4} ${f + 12}`; }),
  straightBangs: bangs('Straight bangs', 'A rainbow on top, then a straight line across her forehead. Snip snip! ✂️',
    T => `M${T.L + 6} ${fy(T) - 6} H${T.R - 6}`),
  long: T => { const { L, R, y } = T, side = `M${L} ${y} Q${L - 14} ${y + 85} ${L + 16} ${y + 135} Q${L + 30} ${y + 125} ${L + 34} ${y + 97}`,
      side2 = `M${R} ${y} Q${R + 14} ${y + 85} ${R - 16} ${y + 135} Q${R - 30} ${y + 125} ${R - 34} ${y + 97}`;
    return { t:'Long hair', tip:'Long curvy lines down to the shoulders. Swish!', svg:`<path d="${side}"/><path d="${side2}"/>`,
      back:`<path fill="@H" d="${side} L${R - 34} ${y + 97} Q${R - 30} ${y + 125} ${R - 16} ${y + 135} Q${R + 14} ${y + 85} ${R} ${y} Q${R + 4} ${T.top + 2} 150 ${T.top} Q${L - 4} ${T.top + 2} ${L} ${y}Z"/>` }; },
  wavyLong: T => { const { L, R, y } = T,
      a = `M${L + 2} ${y - 15} Q${L - 22} ${y + 25} ${L - 4} ${y + 55} Q${L - 22} ${y + 92} ${L + 4} ${y + 127} Q${L + 18} ${y + 137} ${L + 30} ${y + 117}`,
      b = `M${R - 2} ${y - 15} Q${R + 22} ${y + 25} ${R + 4} ${y + 55} Q${R + 22} ${y + 92} ${R - 4} ${y + 127} Q${R - 18} ${y + 137} ${R - 30} ${y + 117}`;
    return { t:'Wavy long hair', tip:'Wavy lines down each side. Wiggle, wiggle, wiggle!', svg:`<path d="${a}"/><path d="${b}"/>`,
      back:`<path fill="@H" d="${a} L${R - 30} ${y + 117} Q${R - 18} ${y + 137} ${R - 4} ${y + 127} Q${R + 22} ${y + 92} ${R + 4} ${y + 55} Q${R + 22} ${y + 25} ${R - 2} ${y - 15} Q${R + 4} ${T.top + 2} 150 ${T.top} Q${L - 4} ${T.top + 2} ${L + 2} ${y - 15}Z"/>` }; },
  bob: T => { const { L, R, y } = T, d = `M${L + 20} ${y + 63} Q${L - 8} ${y + 61} ${L - 4} ${y + 25} Q${L - 14} ${T.top - 2} 150 ${T.top - 4} Q${R + 14} ${T.top - 2} ${R + 4} ${y + 25} Q${R + 8} ${y + 61} ${R - 20} ${y + 63}`;
    return { t:'Bob haircut', tip:'A big round helmet shape around the head, down to her chin.', svg:`<path d="${d}"/>`, back:`<path fill="@H" d="${d}Z"/>` }; },
  shortWavy: T => { const { L, R, y } = T, f = fy(T), d = `M${L} ${y + 5} Q${L - 14} ${y - 25} ${L + 2} ${y - 53} Q${L + 4} ${T.top + 10} ${L + 50} ${T.top + 2} Q150 ${T.top - 12} ${R - 50} ${T.top + 2} Q${R - 4} ${T.top + 10} ${R - 2} ${y - 53} Q${R + 14} ${y - 25} ${R} ${y + 5}`;
    return { t:'Fluffy short hair', tip:'A bumpy line around the top of the head.', svg:`<path d="${d}"/>`, back:`<path fill="@H" d="${d}Z"/>`,
      front:`<path fill="@H" d="M${L + 4} ${f - 2} Q${L + 4} ${T.top + 4} 150 ${T.top + 2} Q${R - 4} ${T.top + 4} ${R - 4} ${f - 2} Q150 ${f - 44} ${L + 4} ${f - 2}Z"/>` }; },
  cloud: T => { const d = scallop(150, T.cy, (T.R - T.L) / 2 + 28, T.ry + 16, 140, 400, 14, 20);
    return { t:'Curly cloud', tip:'Lots of little bumps all around the head, like a fluffy cloud! ☁️', svg:`<path d="${d}"/>`, back:`<path fill="@H" d="${d}Z"/>` }; },
  curlBangs: T => { const xs = [0, 1, 2, 3, 4].map(i => T.L + 28 + i * (T.R - T.L - 56) / 4), cy = i => fy(T) - 24 - [0, 8, 12, 8, 0][i];
    const c = (a = '') => xs.map((x, i) => `<circle ${a} cx="${x}" cy="${cy(i)}" r="15"/>`).join('');
    return { t:'Curls on top', tip:'Five little circles in a row on her forehead.', svg:c(),
      front:`<path fill="@H" d="M${T.L + 6} ${fy(T) - 6} Q${T.L + 4} ${T.top + 2} 150 ${T.top} Q${T.R - 4} ${T.top + 2} ${T.R - 6} ${fy(T) - 6}Z"/>` + c('fill="@H"') }; },
  pigtails: T => { const { L, R, y } = T, a = `M${L + 4} ${y - 45} Q${L - 42} ${y - 55} ${L - 38} ${y} Q${L - 34} ${y + 50} ${L - 8} ${y + 71} Q${L - 2} ${y + 25} ${L + 2} ${y - 15}`,
      b = `M${R - 4} ${y - 45} Q${R + 42} ${y - 55} ${R + 38} ${y} Q${R + 34} ${y + 50} ${R + 8} ${y + 71} Q${R + 2} ${y + 25} ${R - 2} ${y - 15}`;
    return { t:'Two pigtails', tip:'Two big puffy pigtails, one on each side!', svg:`<path d="${a}"/><path d="${b}"/><circle cx="${L + 2}" cy="${y - 38}" r="8"/><circle cx="${R - 2}" cy="${y - 38}" r="8"/>`,
      back:`<path fill="@H" d="${a}Z ${b}Z"/>`, front:`<circle fill="@A" cx="${L + 2}" cy="${y - 38}" r="8"/><circle fill="@A" cx="${R - 2}" cy="${y - 38}" r="8"/>` }; },
  ponytail: T => { const { R, top } = T, d = `M${R - 34} ${top + 12} Q${R + 22} ${top - 24} ${R + 36} ${top + 32} Q${R + 46} ${top + 92} ${R + 14} ${top + 146} Q${R + 20} ${top + 80} ${R - 4} ${top + 40}`;
    return { t:'Ponytail', tip:'A long ponytail swinging out from the top, with a hair tie!', svg:`<path d="${d}"/><ellipse cx="${R - 25}" cy="${top + 16}" rx="10" ry="8"/>`,
      back:`<path fill="@H" d="${d}Z"/>`, front:`<ellipse fill="@A" cx="${R - 25}" cy="${top + 16}" rx="10" ry="8"/>` }; },
  buns: T => { const c = (a = '') => `<circle ${a} cx="${T.L + 22}" cy="${T.top + 12}" r="28"/><circle ${a} cx="${T.R - 22}" cy="${T.top + 12}" r="28"/>`;
    return { t:'Two buns', tip:'Two round buns on top, like two cookies! 🍪', svg:c() + `<path d="M${T.L + 12} ${T.top + 10} q10 -10 20 0"/><path d="M${T.R - 32} ${T.top + 10} q10 -10 20 0"/>`, back:c('fill="@H"') }; },
  highBun: T => ({ t:'A bun', tip:'A round bun on top of her head.', svg:`<circle cx="150" cy="${T.top - 12}" r="24"/><path d="M137 ${T.top - 12} q13 -11 26 0"/>`, back:`<circle fill="@H" cx="150" cy="${T.top - 12}" r="24"/>` }),
  braids: T => { const ys = [31, 61, 91, 121].map(d => T.y + d), e = (a = '') => ys.map(y => `<ellipse ${a} cx="${T.L + 4}" cy="${y}" rx="13" ry="16"/><ellipse ${a} cx="${T.R - 4}" cy="${y}" rx="13" ry="16"/>`).join('');
    return { t:'Braids', tip:'Stack little ovals down each side to make braids.', svg:e(), front:e('fill="@H"') }; },
};

// ---------- Fun extras
const A = {
  bow: T => { const x = T.R - 24, y = T.top + 24, d = `M${x} ${y} L${x - 22} ${y - 18} L${x - 18} ${y + 18}Z M${x} ${y} L${x + 22} ${y - 18} L${x + 18} ${y + 18}Z`;
    return { t:'A pretty bow', tip:'Two triangles with a dot in the middle. 🎀', svg:`<path d="${d}"/><circle cx="${x}" cy="${y}" r="6"/>`, front:`<path fill="@A" d="${d}"/><circle fill="@A" cx="${x}" cy="${y}" r="6"/>` }; },
  heartClip: T => { const d = heart(T.R - 28, fy(T) - 20);
    return { t:'Heart clip', tip:'A little heart on the side of her hair. 💖', svg:`<path d="${d}"/>`, front:`<path fill="@A" d="${d}"/>` }; },
  flower: T => { const x = T.R - 8, y = fy(T) - 30, p = (a = '') => [[0, -9], [9, -3], [6, 8], [-6, 8], [-9, -3]].map(([dx, dy]) => `<circle ${a} cx="${x + dx}" cy="${y + dy}" r="7"/>`).join('');
    return { t:'A flower', tip:'Five round petals and a dot in the middle. 🌼', svg:p() + `<circle cx="${x}" cy="${y}" r="5"/>`, front:p('fill="@A"') + `<circle fill="#fff" cx="${x}" cy="${y}" r="5"/>` }; },
  crown: T => { const b = T.top + 14, d = `M108 ${b} L112 ${b - 44} L131 ${b - 22} L150 ${b - 52} L169 ${b - 22} L188 ${b - 44} L192 ${b}Z`;
    return { t:'A crown', tip:'A crown with three points on top! 👑', svg:`<path d="${d}"/><g class="fade" fill="#ff6fae" stroke="none"><circle cx="150" cy="${b - 16}" r="6"/><circle cx="124" cy="${b - 10}" r="4"/><circle cx="176" cy="${b - 10}" r="4"/></g>`, front:`<path fill="@A" d="${d}"/>` }; },
  catEars: T => { const d = `M${T.L + 14} ${T.top + 46} L${T.L + 8} ${T.top - 24} L${T.L + 60} ${T.top + 12} M${T.R - 14} ${T.top + 46} L${T.R - 8} ${T.top - 24} L${T.R - 60} ${T.top + 12}`;
    return { t:'Kitty ears', tip:'Two pointy triangles on top. Meow! 🐱', svg:`<path d="${d}"/><g class="fade" fill="#ffc2dc" stroke="none"><path d="M${T.L + 20} ${T.top + 30} L${T.L + 17} ${T.top - 6} L${T.L + 46} ${T.top + 14}Z M${T.R - 20} ${T.top + 30} L${T.R - 17} ${T.top - 6} L${T.R - 46} ${T.top + 14}Z"/></g>`,
      back:`<path fill="@H" d="${d.replace(/ M/, 'Z M')}Z"/>` }; },
  bunnyEars: T => { const e = (a = '') => `<ellipse ${a} cx="112" cy="${T.top - 22}" rx="15" ry="40" transform="rotate(-14 112 ${T.top - 22})"/><ellipse ${a} cx="188" cy="${T.top - 22}" rx="15" ry="40" transform="rotate(14 188 ${T.top - 22})"/>`;
    return { t:'Bunny ears', tip:'Two long ovals on top, a little tilted. Hop hop! 🐰', svg:e() + `<g class="fade" fill="#ffc2dc" stroke="none">${e().replace(/rx="15" ry="40"/g, 'rx="7" ry="28"')}</g>`, back:e('fill="@A"') }; },
  witchHat: T => { const b = T.top + 14, cone = `M${150 - 62} ${b} L162 6 L${150 + 62} ${b}`;
    return { t:'A witch hat', tip:'A big pointy triangle, then a long flat oval for the brim. 🧙‍♀️',
      svg:`<path d="${cone}"/><ellipse cx="150" cy="${b}" rx="${(T.R - T.L) / 2 + 26}" ry="14"/><g class="fade" fill="#ffd23f" stroke="none"><path d="${star(150, b - 30, 12)}"/></g>`,
      front:`<path fill="@A" d="${cone}Z"/><ellipse fill="@A" cx="150" cy="${b}" rx="${(T.R - T.L) / 2 + 26}" ry="14"/>` }; },
  headband: T => { const f = fy(T), a = `M${T.L + 4} ${f - 2} Q150 ${f - 44} ${T.R - 4} ${f - 2}`, b = `M${T.L + 6} ${f - 18} Q150 ${f - 60} ${T.R - 6} ${f - 18}`;
    return { t:'Headband', tip:'Two curvy lines across the top of her head.', svg:`<path d="${a}"/><path d="${b}"/>`, front:`<path fill="@A" d="${a} L${T.R - 6} ${f - 18} Q150 ${f - 60} ${T.L + 6} ${f - 18}Z"/>` }; },
  starClips: T => { const s = star(T.L + 34, fy(T) - 6, 12) + star(T.L + 58, fy(T) - 22, 10);
    return { t:'Star clips', tip:'Two little stars in her hair. ⭐', svg:`<path d="${s}"/>`, front:`<path fill="@A" d="${s}"/>` }; },
  glasses: T => ({ t:'Glasses', tip:'Two big circles around the eyes and a little bridge. 👓',
    svg:mirror(T, (_, s) => `<circle cx="${150 - s * T.edx}" cy="${T.ey}" r="${T.er + 9}"/>`) + `<path d="M${150 - T.edx + T.er + 9} ${T.ey - 2} Q150 ${T.ey - 10} ${150 + T.edx - T.er - 9} ${T.ey - 2}"/>` }),
  whiskers: T => ({ t:'Whiskers', tip:'Two little lines on each cheek.',
    svg:mirror(T, (_, s) => { const x = 150 - s * (T.cheekDX - 8), y = T.cheekY + 4; return `<path d="M${x} ${y} h${-s * 26}"/><path d="M${x} ${y + 8} l${-s * 25} 9"/>`; }) }),
  freckles: T => ({ t:'Freckles', tip:'Three little dots on each cheek!',
    svg:`<g class="fade" fill="#b8693e" stroke="none">${mirror(T, (_, s) => { const x = 150 - s * T.cheekDX; return [[0, -4], [8, 3], [-4, 6]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${T.cheekY + dy}" r="3"/>`).join(''); })}</g>` }),
  hat: T => { const f = fy(T), dome = `M${T.L - 2} ${f - 6} Q${T.L - 4} ${T.top - 16} 150 ${T.top - 16} Q${T.R + 4} ${T.top - 16} ${T.R + 2} ${f - 6}`, band = `M${T.L - 8} ${f - 6} H${T.R + 8} V${f + 16} H${T.L - 8}Z`;
    return [{ t:'Hair', tip:'Some hair peeking out on each side.', svg:`<path d="M${T.L + 2} ${f + 16} Q${T.L - 14} ${f + 45} ${T.L} ${f + 75}"/><path d="M${T.R - 2} ${f + 16} Q${T.R + 14} ${f + 45} ${T.R} ${f + 75}"/>`,
        back:`<path fill="@H" d="M${T.L + 2} ${f + 16} Q${T.L - 14} ${f + 45} ${T.L} ${f + 75} L${T.L + 12} ${f + 16}Z M${T.R - 2} ${f + 16} Q${T.R + 14} ${f + 45} ${T.R} ${f + 75} L${T.R - 12} ${f + 16}Z"/>` },
      { t:'A warm hat', tip:'A dome on top, then a long band at the bottom.', svg:`<path d="${dome}"/><path d="${band}"/>`, front:`<path fill="@A" d="${dome}Z"/><path fill="#fff" d="${band}"/>` },
      { t:'Pom-pom', tip:'A fluffy ball on top of the hat!', svg:`<circle cx="150" cy="${T.top - 26}" r="16"/>`, front:`<circle fill="#fff" cx="150" cy="${T.top - 26}" r="16"/>` }]; },
  headphones: T => { const band = `M${T.L - 4} ${T.y - 10} Q${T.L - 10} ${T.top - 18} 150 ${T.top - 20} Q${T.R + 10} ${T.top - 18} ${T.R + 4} ${T.y - 10}`,
      cups = `M${T.L - 16} ${T.y - 24} h22 v44 h-22Z M${T.R - 6} ${T.y - 24} h22 v44 h-22Z`;
    return { t:'Headphones', tip:'A big curve over her head and a box on each ear. 🎧', svg:`<path d="${band}"/><path d="${cups}"/>`, front:`<path fill="@A" d="${cups}"/>` }; },
};

// ---------- Clothes details
const C = {
  collar: T => { const a = T.nx0 - 16, b = T.nx1 + 16, y = T.ny, d = `M${a} ${y + 4} Q${a + 10} ${y + 30} 150 ${y + 8} Q${b - 10} ${y + 30} ${b} ${y + 4}`;
    return { t:'A cute collar', tip:'Two round flaps under her neck.', svg:`<path d="${d}"/>`, front:`<path fill="#fff" d="${d} Q150 ${y + 12} ${a} ${y + 4}Z"/>` }; },
  vneck: T => ({ t:'V-neck shirt', tip:'A "V" shape under her neck.', svg:`<path d="M${T.nx0} ${T.ny} L150 ${T.ny + 30} L${T.nx1} ${T.ny}"/>`, front:`<path fill="@S" d="M${T.nx0} ${T.ny} L150 ${T.ny + 30} L${T.nx1} ${T.ny}Z"/>` }),
  necklace: T => { const pts = [0, 1, 2, 3, 4, 5, 6].map(i => { const u = i / 6; return [T.nx0 - 6 + u * (T.nx1 - T.nx0 + 12), T.ny + 4 + 18 * (1 - (2 * u - 1) ** 2)]; });
    const beads = (a = '') => pts.map(([x, y]) => `<circle ${a} cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5"/>`).join('');
    return { t:'A necklace', tip:'Little round beads and a heart in the middle. 💖', svg:beads() + `<path d="${heart(150, T.ny + 34, .55)}"/>`, front:beads('fill="#fff"') + `<path fill="@A" d="${heart(150, T.ny + 34, .55)}"/>` }; },
  gown: T => { const y = T.ny, d = `M78 ${y + 32} Q150 ${y + 6} 222 ${y + 32}`;
    return { t:'Princess gown', tip:'A curvy line across, and puffy round sleeves.', svg:`<path d="${d}"/><circle cx="84" cy="${y + 40}" r="16"/><circle cx="216" cy="${y + 40}" r="16"/>`,
      front:`<path fill="@S" d="M${T.nx0} ${y - 2} Q92 ${y + 2} 78 ${y + 32} Q150 ${y + 6} 222 ${y + 32} Q208 ${y + 2} ${T.nx1} ${y - 2}Z"/><circle fill="@C" cx="84" cy="${y + 40}" r="16"/><circle fill="@C" cx="216" cy="${y + 40}" r="16"/>` }; },
  dressBow: T => { const y = T.ny + 8, d = `M150 ${y} L134 ${y - 9} L134 ${y + 9}Z M150 ${y} L166 ${y - 9} L166 ${y + 9}Z`;
    return { t:'A little bow', tip:'A tiny bow at the top of her dress.', svg:`<path d="${d}"/>`, front:`<path fill="@A" d="${d}"/>` }; },
  sailor: T => { const y = T.ny, d = `M${T.nx0 - 22} ${y} L150 ${y + 36} L${T.nx1 + 22} ${y}`, bw = `M150 ${y + 36} L132 ${y + 26} L134 ${y + 50}Z M150 ${y + 36} L168 ${y + 26} L166 ${y + 50}Z`;
    return { t:'Sailor collar', tip:'A big "V" collar with a bow at the bottom. ⚓', svg:`<path d="${d}"/><path d="${bw}"/>`, front:`<path fill="#fff" d="${d}Z"/><path fill="@A" d="${bw}"/>` }; },
};

// ---------- The girls
function girl(name, style, tpl, colors, eyes, iris, mouth, extras) {
  const T = TPL[tpl];
  const steps = [T.head, { t:'Guidelines', tip:'Draw very light lines: one down the middle, one across for the eyes, and two short ones for the nose and mouth. They help you place everything!', svg:`<path class="guide" d="${T.guide}"/><path class="guide solid" d="${T.ticks}"/>`, guide:true },
    { t:'Two ears', tip:'A little C on each side.', svg:T.ears.map(d => `<path d="${d}"/>`).join('') }, T.neck,
    EYES(T, eyes, iris), ...(T.nose ? [NOSE(T)] : []), MOUTH(T, mouth), ...extras.flatMap(f => f(T))];
  return { name, style, tpl, ...colors, steps };
}
const GIRLS = [
  girl('Mimi', 'Chibi · pigtails', 'chibi', { skin:'#ffe3d0', hair:'#ff7eb6', acc:'#ffd23f', shirt:'#8fd3ff', bg:'#ffe3f1' }, 'kawaii', '#ff6fae', 'laugh', [H.midPart, H.pigtails, C.dressBow]),
  girl('Sakura', 'Anime · pink hair', 'anime', { skin:'#ffe6d6', hair:'#ffa3c8', acc:'#ff5c9e', shirt:'#2f4b8f', bg:'#e6f0ff' }, 'anime', '#e05a9c', 'smile', [H.long, H.spikyBangs, A.flower, C.sailor]),
  girl('Aurora', 'Princess', 'classic', { skin:'#f6d1b5', hair:'#ffcf5c', acc:'#ffd23f', shirt:'#ff8fc0', bg:'#fff0d6' }, 'almond', '#3d8fd6', 'lips', [H.midPart, H.wavyLong, A.crown, C.gown]),
  girl('Kiki', 'Chibi · kitty', 'chibi', { skin:'#ffe6d6', hair:'#7a5cc0', acc:'#ffc2dc', shirt:'#ffb98a', bg:'#efe6ff' }, 'kawaii', '#9b6dff', 'cat', [H.bob, H.sideBangs, A.catEars, A.whiskers]),
  girl('Yuki', 'Anime · ponytail', 'anime', { skin:'#f1c19a', hair:'#3d5afe', acc:'#ffd23f', shirt:'#ffffff', bg:'#e3f6ff' }, 'anime', '#2ec4d6', 'smile', [H.pulled, H.ponytail, C.vneck]),
  girl('Rosie', 'Fluffy curls', 'classic', { skin:'#8d5a3b', hair:'#2b1b17', acc:'#ffd23f', shirt:'#3fb6e8', bg:'#fff4c9' }, 'round', '#6b3a1e', 'laugh', [H.cloud, H.curlBangs, A.flower, C.necklace]),
  girl('Bunny Bea', 'Chibi · bunny', 'chibi', { skin:'#ffe3d0', hair:'#f2d27a', acc:'#ffffff', shirt:'#c7f0c2', bg:'#eaffea' }, 'kawaii', '#4caf50', 'tiny', [H.bob, H.straightBangs, A.bunnyEars]),
  girl('Luna', 'Anime · braids', 'anime', { skin:'#c68b5e', hair:'#1c1c2e', acc:'#ff6fae', shirt:'#ffd23f', bg:'#e8e4ff' }, 'anime', '#8e5cff', 'smile', [H.midPart, H.braids, C.collar]),
  girl('Wendy', 'Chibi · little witch', 'chibi', { skin:'#ffe6d6', hair:'#ff8a3d', acc:'#6a3fb5', shirt:'#6a3fb5', bg:'#f3e6ff' }, 'kawaii', '#ff8a3d', 'smile', [H.long, H.spikyBangs, A.witchHat]),
  girl('Lily', 'Long hair & bow', 'classic', { skin:'#ffe0c9', hair:'#a0612d', acc:'#ff8fc0', shirt:'#b9a3ff', bg:'#ffe3ef' }, 'round', '#7a4a2a', 'smile', [H.wavyBangs, H.long, A.bow, C.collar]),
  girl('Jade', 'Anime · headphones', 'anime', { skin:'#f6d1b5', hair:'#1f8a70', acc:'#ff5c9e', shirt:'#2b2b3a', bg:'#dcfff3' }, 'anime', '#1f8a70', 'tiny', [H.bob, H.sideBangs, A.headphones]),
  girl('Bella', 'Chibi · two buns', 'chibi', { skin:'#ffe3d0', hair:'#e8a33d', acc:'#ffd23f', shirt:'#9b6dff', bg:'#fff3d6' }, 'kawaii', '#c2702a', 'laugh', [H.buns, H.sideBangs, A.starClips]),
  girl('Nora', 'Bun & glasses', 'classic', { skin:'#f1c19a', hair:'#a0612d', acc:'#4a2c5e', shirt:'#38c6b0', bg:'#e0fbf6' }, 'round', '#3f8f5a', 'smile', [H.pulled, H.highBun, A.glasses, C.vneck]),
  girl('Coco', 'Cozy hat', 'classic', { skin:'#8d5a3b', hair:'#2b1b17', acc:'#ff6fae', shirt:'#ffd23f', bg:'#ffe6ee' }, 'happy', '#000', 'laugh', [A.hat]),
  girl('Sunny', 'Anime · freckles', 'anime', { skin:'#ffe0c9', hair:'#d9542b', acc:'#ffd23f', shirt:'#3fb6e8', bg:'#fff1dc' }, 'anime', '#3f8f5a', 'laugh', [H.shortWavy, A.headband, A.freckles]),
];
const FINAL = { t:'Color her in!', tip:'Erase the guidelines and color her with your crayons. You did it, Dayan! 🌟', final:true };

// ---------- Drawing the picture
const $ = id => document.getElementById(id);
const paint = (g, s) => (s || '').replace(/@H/g, g.hair).replace(/@A/g, g.acc).replace(/@S/g, g.skin).replace(/@C/g, g.shirt);

// The finished, colored girl (last step and thumbnails).
// Advanced pictures stack in layers: a step marked "under" goes behind what was drawn before (like back petals).
function layered(g, upto, chunk) {
  const out = [];
  g.steps.slice(0, upto + 1).forEach((s, j) => {
    const item = { bg: s.bg, html: chunk(s, j) };
    if (!s.under) return out.push(item);
    let at = 0; out.forEach((o, i) => { if (o.bg) at = i + 1; }); // behind everything, but in front of the sky/ground fill
    out.splice(at, 0, item);
  });
  return out.map(o => o.html).join('');
}
function finished(g) {
  const T = TPL[g.tpl], s = g.steps, bg = `<circle cx="150" cy="170" r="146" fill="${g.bg}"/>`;
  if (g.adv) return markerG(bg) + layered(g, s.length - 1, x => markerG((x.back || '') + (x.front || '')) + pencilG(`<g class="done" stroke="${LINE}">${x.guide ? '' : x.svg}</g>`));
  if (!T) return markerG(bg + s.map(x => x.back).join('') + s.map(x => x.front).join('')) + pencilG(`<g class="done" stroke="${LINE}">${s.map(x => x.svg).join('')}</g>`);
  return paint(g, markerG(bg + s.map(x => x.back).join('') +
    `<path fill="@S" d="${T.skinNeck}"/><path fill="@C" d="${T.body}"/><path fill="@S" d="${T.ears.map(d => d + 'Z').join(' ')}"/>${T.headFill}
     <g fill="#ff7fb0" opacity=".35"><circle cx="${150 - T.cheekDX}" cy="${T.cheekY}" r="11"/><circle cx="${150 + T.cheekDX}" cy="${T.cheekY}" r="11"/></g>` +
    s.map(x => x.front).join('')) +
    pencilG(`<g class="done" stroke="${LINE}">${s.filter(x => !x.guide).map(x => x.svg).join('')}</g>`));
}
// Step i: earlier parts gray, the new part pink.
// (Advanced: each part gets a white fill so lines behind it are hidden, just like on paper.)
const partial = (g, i) => pencilG(g.adv ? layered(g, i, (s, j) => (g.keepFill ? (s.back || '') + (s.front || '') : ((s.back || '') + (s.front || '')).replace(/fill="[^"]*"/g, 'fill="#fffef9"')) + `<g class="${j === i ? 'new' : 'old'}">${s.svg}</g>`) : g.steps.slice(0, i + 1).map((s, j) => `<g class="${j === i ? 'new' : 'old'}">${s.svg}</g>`).join(''));

// ---------- Lesson (the home screen is built in things.js, after all pictures exist)
const demo = $('demo');
let ITEMS = GIRLS, cur, steps, step = 0, anim = 0;
function open_(i) {
  cur = ITEMS[i]; steps = [...cur.steps, cur.tpl ? FINAL : { ...FINAL, t:'Color it in!', tip:'Now color it with your crayons. You did it, Dayan! 🌟' }];
  $('home').hidden = true; $('lesson').hidden = false;
  $('who').textContent = `Let's draw ${cur.tpl ? cur.name : 'a ' + cur.name.toLowerCase()}!`;
  go(0);
}
$('homeBtn').onclick = () => { cancelAnimationFrame(anim); $('lesson').hidden = true; $('home').hidden = false; scrollTo(0, 0); };

// A pencil travels along each new line, one after another, drawing it.
function playDemo() {
  cancelAnimationFrame(anim);
  const last = step === steps.length - 1;
  demo.innerHTML = (last ? finished(cur) : partial(cur, step)) +
    `<g id="pencil" style="display:none" stroke="none"><g transform="rotate(-45) scale(1.3)">
      <polygon points="0,0 10,-4 10,4" fill="#f1d3a3"/><polygon points="0,0 3.5,-1.4 3.5,1.4" fill="#e0457b"/>
      <rect x="10" y="-4" width="34" height="8" fill="#e8b93a"/><rect x="10" y="-4" width="34" height="2" fill="#f6d366"/><rect x="44" y="-4" width="6" height="8" rx="1.5" fill="#d9d4cc"/></g></g>`;
  if (last) return party();
  const lines = [...demo.querySelectorAll('.new > :is(path, circle, ellipse)')];
  const pencil = $('pencil');
  lines.forEach(el => { const L = el.getTotalLength(); el.style.strokeDasharray = L; el.style.strokeDashoffset = L; el._len = L; });
  let i = 0, t0 = performance.now() + 300;
  const frame = now => {
    const el = lines[i]; if (!el) { pencil.style.display = 'none'; return; }
    const dur = Math.max(900, Math.min(3200, el._len * 11)), k = Math.max(0, Math.min(1, (now - t0) / dur));
    const d = el._len * (k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2); // ease in-out
    el.style.strokeDashoffset = el._len - d;
    const p = el.getPointAtLength(d), tm = el.transform.baseVal.consolidate();
    const pt = tm ? p.matrixTransform(tm.matrix) : p; // follow rotated shapes too
    pencil.style.display = ''; pencil.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    if (k >= 1) { el.style.strokeDasharray = ''; el.style.strokeDashoffset = ''; i++; t0 = now + 300; }
    anim = requestAnimationFrame(frame);
  };
  anim = requestAnimationFrame(frame);
}

function go(i) {
  step = i;
  playDemo();
  const s = steps[step], last = step === steps.length - 1;
  $('num').textContent = `Step ${step + 1} of ${steps.length}`;
  $('title').textContent = s.t;
  $('tip').textContent = s.tip;
  $('back').disabled = step === 0;
  $('next').textContent = last ? '🏠 More' : 'Next ➡️';
  $('dots').innerHTML = steps.map((_, j) =>
    `<button class="dot ${j < step ? 'done' : j === step ? 'now' : ''}" aria-label="Step ${j + 1}" onclick="go(${j})"></button>`).join('');
}
$('next').onclick = () => step === steps.length - 1 ? $('homeBtn').onclick() : go(step + 1);
$('back').onclick = () => go(Math.max(0, step - 1));
$('replay').onclick = playDemo;

// Big picture: drawing fills the screen. Remembered, and uses real full screen where the browser allows it.
const root = document.documentElement;
const setBig = on => {
  $('lesson').classList.toggle('big', on); $('bigBtn').classList.toggle('on', on);
  try { localStorage.setItem('dayan-big', on ? '1' : '0'); } catch {}
  try {
    if (on && !document.fullscreenElement) (root.requestFullscreen || root.webkitRequestFullscreen)?.call(root)?.catch?.(() => {});
    if (!on && document.fullscreenElement) document.exitFullscreen?.();
  } catch {}
};
$('bigBtn').onclick = () => setBig(!$('lesson').classList.contains('big'));
let wantBig = true; try { wantBig = localStorage.getItem('dayan-big') !== '0'; } catch {}
$('lesson').classList.toggle('big', wantBig); $('bigBtn').classList.toggle('on', wantBig);

function party() {
  const p = document.createElement('div'); p.className = 'party';
  p.innerHTML = Array.from({ length: 24 }, () =>
    `<span style="left:${Math.random() * 100}%;animation-delay:${Math.random()}s">${['🌟', '🎀', '💖', '🌸', '🎉'][Math.floor(Math.random() * 5)]}</span>`).join('');
  document.body.appendChild(p); setTimeout(() => p.remove(), 4000);
}
