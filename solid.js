// 3D lessons: isometric (cube, city, gift box), one-point perspective (road), and light & shadow (ball).
// Isometric trick: x runs down-right, y runs down-left, z runs straight up. Everything is drawn from those 3 directions.
const UN = (...a) => ({ ...S(...a), under: true });
const BGS = (...a) => ({ ...S(...a), bg: true });
const shade = (hex, p) => { const n = parseInt(hex.slice(1), 16), t = p < 0 ? 0 : 255, q = Math.abs(p);
  const c = s => Math.round(((n >> s) & 255) * (1 - q) + t * q); return `rgb(${c(16)},${c(8)},${c(0)})`; };
const isoP = (ox, oy, k) => (x, y, z) => [ox + (x - y) * .866 * k, oy + (x + y) * .5 * k - z * k];
const poly = pts => 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + 'Z';
const seg = (a, b) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
function box(P, x0, y0, z0, a, b, h) {
  return {
    top: poly([P(x0, y0, z0 + h), P(x0 + a, y0, z0 + h), P(x0 + a, y0 + b, z0 + h), P(x0, y0 + b, z0 + h)]),
    right: poly([P(x0 + a, y0, z0), P(x0 + a, y0 + b, z0), P(x0 + a, y0 + b, z0 + h), P(x0 + a, y0, z0 + h)]),
    left: poly([P(x0, y0 + b, z0), P(x0 + a, y0 + b, z0), P(x0 + a, y0 + b, z0 + h), P(x0, y0 + b, z0 + h)]),
  };
}
const boxLines = bx => `<path d="${bx.top}"/><path d="${bx.left}"/><path d="${bx.right}"/>`;
const boxFill = (bx, c, f = { top: .35, left: 0, right: -.28 }) =>
  `<path fill="${shade(c, f.top)}" d="${bx.top}"/><path fill="${shade(c, f.left)}" d="${bx.left}"/><path fill="${shade(c, f.right)}" d="${bx.right}"/>`;

// ---- Cube
const cP = isoP(150, 160, 110), CUBE = '#6cc0f2';
const cTop = poly([cP(0, 0, 1), cP(1, 0, 1), cP(1, 1, 1), cP(0, 1, 1)]);
const cLeft = poly([cP(0, 1, 0), cP(1, 1, 0), cP(1, 1, 1), cP(0, 1, 1)]);
const cRight = poly([cP(1, 0, 0), cP(1, 1, 0), cP(1, 1, 1), cP(1, 0, 1)]);
const cShadow = poly([cP(1, 0, 0), cP(1, 1, 0), cP(1.6, 1.2, 0), cP(1.6, .2, 0)]);

// ---- Tiny city
const kP = isoP(150, 190, 50);
const BUILD = [{ x: 0, y: 0, h: 3, c: '#ff8fc0' }, { x: 1.3, y: 0, h: 2, c: '#8fd3ff' }, { x: 0, y: 1.3, h: 2.5, c: '#ffd23f' }, { x: 1.3, y: 1.3, h: 1.3, c: '#b9a3ff' }];
function windows(b) {
  const cols = [.18, .56], rows = []; for (let z = .4; z + .3 < b.h - .15; z += .6) rows.push(z);
  const r = [], l = [];
  rows.forEach(z => cols.forEach(c => {
    r.push(poly([kP(b.x + 1, b.y + c, z), kP(b.x + 1, b.y + c + .26, z), kP(b.x + 1, b.y + c + .26, z + .3), kP(b.x + 1, b.y + c, z + .3)]));
    l.push(poly([kP(b.x + c, b.y + 1, z), kP(b.x + c + .26, b.y + 1, z), kP(b.x + c + .26, b.y + 1, z + .3), kP(b.x + c, b.y + 1, z + .3)]));
  }));
  return { r: r.join(' '), l: l.join(' '), n: rows.length };
}
const cityStep = (b, i) => {
  const bx = box(kP, b.x, b.y, 0, 1, 1, b.h), w = windows(b);
  return S(['Tall pink tower', 'Blue building', 'Yellow building', 'Little purple house'][i],
    ['Start with the tallest, at the BACK. A top diamond, then the left and right sides. Then add windows on both sides!',
     'Next building, a bit shorter. Draw back to front, so the front one covers the back one.',
     'Another one on the left side.', 'The smallest building goes in FRONT. Last one!'][i],
    boxLines(bx) + `<path d="${w.l}"/><path d="${w.r}"/>`,
    boxFill(bx, b.c) + `<path fill="#fff6c9" d="${w.l}"/><path fill="${shade('#fff6c9', -.2)}" d="${w.r}"/>`);
};
const slab = box(kP, -.5, -.5, -.25, 3, 3, .25);

// ---- Gift box
const gP = isoP(150, 215, 55), GIFT = '#ff7aa8', GOLD = '#ffd23f';
const gBody = box(gP, 0, 0, 0, 2, 2, 1.4), gLid = box(gP, -.12, -.12, 1.4, 2.24, 2.24, .45);
const rbA = [poly([gP(-.12, .85, 1.85), gP(2.12, .85, 1.85), gP(2.12, 1.15, 1.85), gP(-.12, 1.15, 1.85)]),
  poly([gP(2.12, .85, 1.4), gP(2.12, 1.15, 1.4), gP(2.12, 1.15, 1.85), gP(2.12, .85, 1.85)]),
  poly([gP(2, .85, 0), gP(2, 1.15, 0), gP(2, 1.15, 1.4), gP(2, .85, 1.4)])];
const rbB = [poly([gP(.85, -.12, 1.85), gP(1.15, -.12, 1.85), gP(1.15, 2.12, 1.85), gP(.85, 2.12, 1.85)]),
  poly([gP(.85, 2.12, 1.4), gP(1.15, 2.12, 1.4), gP(1.15, 2.12, 1.85), gP(.85, 2.12, 1.85)]),
  poly([gP(.85, 2, 0), gP(1.15, 2, 0), gP(1.15, 2, 1.4), gP(.85, 2, 1.4)])];
const bc = gP(1, 1, 1.85);
const loopL = `M${bc[0]} ${bc[1]} Q${bc[0] - 58} ${bc[1] - 66} ${bc[0] - 70} ${bc[1] - 24} Q${bc[0] - 66} ${bc[1] + 10} ${bc[0]} ${bc[1]}`;
const loopR = `M${bc[0]} ${bc[1]} Q${bc[0] + 58} ${bc[1] - 66} ${bc[0] + 70} ${bc[1] - 24} Q${bc[0] + 66} ${bc[1] + 10} ${bc[0]} ${bc[1]}`;
const tailL = `M${bc[0] - 3} ${bc[1] + 4} Q${bc[0] - 16} ${bc[1] + 34} ${bc[0] - 38} ${bc[1] + 42} L${bc[0] - 28} ${bc[1] + 14}`;
const tailR = `M${bc[0] + 3} ${bc[1] + 4} Q${bc[0] + 16} ${bc[1] + 34} ${bc[0] + 38} ${bc[1] + 42} L${bc[0] + 28} ${bc[1] + 14}`;
const gShadow = poly([gP(2, 0, 0), gP(2, 2, 0), gP(2.6, 2, 0), gP(2.6, 0, 0)]);

// ---- Road in perspective (vanishing point = where everything meets)
const VPY = 160, rx = (t, s) => 150 + s * 125 * t;
const tr = (t, s) => { const x = rx(t, s), yb = VPY + 170 * t, tw = 5 * t, th = 46 * t, r = 30 * t, cy = yb - th - r * .7;
  return { x, yb, tw, th, r, cy, trunk: `M${x - tw} ${yb} V${yb - th} H${x + tw} V${yb}Z`, crown: `<circle cx="${x}" cy="${cy}" r="${r}"/>` }; };
const trees = (ts, s) => ts.map(t => tr(t, s));
const dashQuad = (t1, t2) => poly([[150 - 7 * t1, VPY + 170 * t1], [150 + 7 * t1, VPY + 170 * t1], [150 + 7 * t2, VPY + 170 * t2], [150 - 7 * t2, VPY + 170 * t2]]);
const TT = [.25, .45, .8];

// ---- Ball
const bx0 = 150, by0 = 165, br = 80, arcP = (r, a) => `${(bx0 + r * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(by0 + r * Math.sin(a * Math.PI / 180)).toFixed(1)}`;
const arc = (r, a0, a1) => `<path d="M${arcP(r, a0)} A${r} ${r} 0 0 1 ${arcP(r, a1)}"/>`;

const SOLID = [
  { name:'Cube', style:'3D · isometric', adv:true, bg:'#eaf6ff', steps:[
    S('Top diamond', 'Start with a diamond, like a squashed square. This is the TOP of the cube. Make the sides equal!', `<path d="${cTop}"/>`, `<path fill="${shade(CUBE, .35)}" d="${cTop}"/>`),
    S('Three lines down', 'Draw 3 straight lines going DOWN: from the left corner, the bottom corner and the right corner. Same length!',
      `<path d="${seg(cP(0, 1, 1), cP(0, 1, 0))}"/><path d="${seg(cP(1, 1, 1), cP(1, 1, 0))}"/><path d="${seg(cP(1, 0, 1), cP(1, 0, 0))}"/>`),
    S('Close the bottom', 'Connect the bottoms with a "V". Wow, now it looks 3D!', `<path d="M${cP(0, 1, 0).map(n => n.toFixed(1)).join(' ')} L${cP(1, 1, 0).map(n => n.toFixed(1)).join(' ')} L${cP(1, 0, 0).map(n => n.toFixed(1)).join(' ')}"/>`,
      `<path fill="${CUBE}" d="${cLeft}"/><path fill="${shade(CUBE, -.28)}" d="${cRight}"/>`),
    S('Shadow lines', 'The light comes from the top-left, so the right side is darker. Draw straight lines on it to make it dark!',
      [.2, .4, .6, .8].map(y => `<path d="${seg(cP(1, y, 1), cP(1, y, 0))}"/>`).join('')),
    UN('Ground shadow', 'The shadow lies on the ground and goes away from the light. Draw a slanted shape to the right.',
      `<path d="${cShadow}"/>`, `<path fill="#c3d1e3" d="${cShadow}"/>`)] },

  { name:'Tiny city', style:'3D · isometric', adv:true, bg:'#e6f4ff', steps:[
    S('Thick ground tile', 'Draw a big diamond, then a thin box under it — like a slice of cake. The city sits on this!', boxLines(slab), boxFill(slab, '#8ed081', { top: .1, left: -.35, right: -.5 })),
    ...BUILD.map(cityStep),
    S('Rooftop details', 'A thin antenna on the tallest tower, and a tiny box on the yellow roof.',
      `<path d="${seg(kP(.5, .5, 3), kP(.5, .5, 3.45))}"/><circle cx="${kP(.5, .5, 3.45)[0]}" cy="${kP(.5, .5, 3.45)[1] - 3}" r="3"/>` + boxLines(box(kP, .3, 1.6, 2.5, .4, .4, .3)), '',
      `<circle fill="#e8505b" cx="${kP(.5, .5, 3.45)[0]}" cy="${kP(.5, .5, 3.45)[1] - 3}" r="3"/>` + boxFill(box(kP, .3, 1.6, 2.5, .4, .4, .3), '#ff8a3d')),
    S('Road and trees', 'A flat road stripe in front, and little round trees with trunks.', `<path d="${poly([kP(2.15, -.1, 0), kP(2.35, -.1, 0), kP(2.35, 2.4, 0), kP(2.15, 2.4, 0)])}"/><circle cx="${kP(-.1, 2.1, .6)[0]}" cy="${kP(-.1, 2.1, .6)[1]}" r="14"/><path d="${seg(kP(-.1, 2.1, 0), kP(-.1, 2.1, .3))}"/>`,
      `<path fill="#6b6f7e" d="${poly([kP(2.15, -.1, 0), kP(2.35, -.1, 0), kP(2.35, 2.4, 0), kP(2.15, 2.4, 0)])}"/><circle fill="#2e9e4f" cx="${kP(-.1, 2.1, .6)[0]}" cy="${kP(-.1, 2.1, .6)[1]}" r="14"/>`)] },

  { name:'Gift box', style:'3D · isometric', adv:true, bg:'#fff3d6', steps:[
    S('The box', 'Draw a cube-like box: a top diamond, then the left and right sides. Make it a bit tall!', boxLines(gBody), boxFill(gBody, GIFT)),
    S('A bigger lid', 'The lid is a flat box on top. Make it a little BIGGER than the box so it hangs over the edge.', boxLines(gLid), boxFill(gLid, '#ff9bbd')),
    S('First ribbon', 'A strip across the top, then down the right side — over the lid and over the box. Keep the strip straight!',
      rbA.map(d => `<path d="${d}"/>`).join(''), `<path fill="${shade(GOLD, .2)}" d="${rbA[0]}"/><path fill="${shade(GOLD, -.25)}" d="${rbA[1]} ${rbA[2]}"/>`),
    S('Second ribbon', 'Now a strip the other way: across the top and down the LEFT side. They make a cross!',
      rbB.map(d => `<path d="${d}"/>`).join(''), `<path fill="${shade(GOLD, .2)}" d="${rbB[0]}"/><path fill="${GOLD}" d="${rbB[1]} ${rbB[2]}"/>`),
    S('Bow loops', 'Two big loops on top, like bunny ears. Then a small circle for the knot in the middle!',
      `<path d="${loopL}"/><path d="${loopR}"/><circle cx="${bc[0]}" cy="${bc[1] - 2}" r="9"/>`, `<path fill="${GOLD}" d="${loopL} ${loopR}"/><circle fill="${shade(GOLD, -.15)}" cx="${bc[0]}" cy="${bc[1] - 2}" r="9"/>`),
    S('Ribbon tails', 'Two ribbon ends hanging down from the knot, with a pointy tip.', `<path d="${tailL}"/><path d="${tailR}"/>`, `<path fill="${GOLD}" d="${tailL}Z ${tailR}Z"/>`),
    UN('Shadow', 'A shadow on the ground on the right side, so the box feels heavy and real.', `<path d="${gShadow}"/>`, `<path fill="#e0c9a0" d="${gShadow}"/>`)] },

  { name:'Long road', style:'3D · perspective', adv:true, bg:'#dff2ff', steps:[
    BGS('Horizon and dot', 'Draw a flat line across the middle — the horizon. Put one dot on it. This is the VANISHING POINT, where everything far away meets!',
      `<path d="M20 ${VPY} H280"/><circle cx="150" cy="${VPY}" r="5"/>`, `<path fill="#bfe3ff" d="M20 40 H280 V${VPY} H20Z"/><path fill="#8ed081" d="M20 ${VPY} H280 V330 H20Z"/>`),
    { ...S('Guide lines', 'Draw light lines from the dot going out like sun rays. Things get smaller along these lines!',
      `<path class="guide" d="M150 ${VPY} L50 330 M150 ${VPY} L250 330 M150 ${VPY} L25 330 M150 ${VPY} L275 330 M150 ${VPY} L20 230 M150 ${VPY} L280 230"/>`), guide: true },
    S('The road', 'Two lines from the dot to the bottom. Far away the road is thin, close to you it is WIDE.', `<path d="M150 ${VPY} L50 330"/><path d="M150 ${VPY} L250 330"/>`, `<path fill="#6b6f7e" d="M150 ${VPY} L50 330 H250Z"/>`),
    S('Road stripes', 'Dashes in the middle. Far ones are tiny and close together, near ones are big and long.',
      [[.12, .2], [.28, .4], [.5, .68], [.8, 1]].map(([a, b]) => `<path d="${dashQuad(a, b)}"/>`).join(''), [[.12, .2], [.28, .4], [.5, .68], [.8, 1]].map(([a, b]) => `<path fill="#fff" d="${dashQuad(a, b)}"/>`).join('')),
    S('Trees on the left', 'Same trees, but each one smaller as it goes farther. Draw a trunk and a round top.', trees(TT, -1).map(t => `<path d="${t.trunk}"/>${t.crown}`).join(''),
      trees(TT, -1).map(t => `<path fill="#9b6b43" d="${t.trunk}"/>${t.crown.replace('<circle', '<circle fill="#2e9e4f"')}`).join('')),
    S('Trees on the right', 'Now the same on the right side. They follow the same guide line!', trees(TT, 1).map(t => `<path d="${t.trunk}"/>${t.crown}`).join(''),
      trees(TT, 1).map(t => `<path fill="#9b6b43" d="${t.trunk}"/>${t.crown.replace('<circle', '<circle fill="#3aae5c"')}`).join('')),
    UN('Faraway mountains', 'Mountains behind everything. Draw them small and light, because they are SO far away.', '<path d="M20 160 L78 104 L128 160"/><path d="M110 160 L190 94 L270 160"/>', '<path fill="#9aa7cf" d="M20 160 L78 104 L128 160Z"/><path fill="#b6c1e4" d="M110 160 L190 94 L270 160Z"/>'),
    UN('Sun', 'A sun in the sky, behind the mountains. Circle and rays! ☀️', '<circle cx="232" cy="70" r="16"/>' + ring(8, a => `<path d="M${(232 + 22 * Math.cos(a)).toFixed(1)} ${(70 + 22 * Math.sin(a)).toFixed(1)} L${(232 + 32 * Math.cos(a)).toFixed(1)} ${(70 + 32 * Math.sin(a)).toFixed(1)}"/>`), '', '<circle fill="#ffd23f" cx="232" cy="70" r="16"/>')] },

  { name:'Shiny ball', style:'3D · light & shadow', adv:true, bg:'#eaf3ff', steps:[
    S('A round circle', 'Draw a nice big circle. Take your time and go slowly!', `<circle cx="${bx0}" cy="${by0}" r="${br}"/>`, `<circle fill="#d8502f" cx="${bx0}" cy="${by0}" r="${br}"/>`),
    UN('Shadow on the ground', 'The ball touches the floor at ONE point. Draw a flat oval shadow that goes to the right, away from the light.', '<ellipse cx="190" cy="252" rx="86" ry="18"/>', '<ellipse fill="#aab6cc" cx="190" cy="252" rx="86" ry="18"/>'),
    S('Where is the light?', 'Draw a little sun at the top-left. The light shines from there!', '<circle cx="42" cy="44" r="12"/>' + ring(8, a => `<path d="M${(42 + 17 * Math.cos(a)).toFixed(1)} ${(44 + 17 * Math.sin(a)).toFixed(1)} L${(42 + 26 * Math.cos(a)).toFixed(1)} ${(44 + 26 * Math.sin(a)).toFixed(1)}"/>`), '', '<circle fill="#ffd23f" cx="42" cy="44" r="12"/>'),
    S('Dark side lines', 'The side far from the sun is dark. Draw curved lines that hug the ball, on the bottom-right!',
      arc(72, 12, 100) + arc(62, 16, 96) + arc(52, 24, 90) + arc(42, 34, 84), `<path fill="#ff8a5c" d="M185.5 93.3 A80 80 0 0 0 78.3 200.5 A76 76 0 0 0 185.5 93.3Z"/>`),
    S('Shiny spot', 'A little tilted oval at the top-left, where the light hits the most. Leave it white!', '<ellipse cx="116" cy="118" rx="16" ry="10" transform="rotate(-38 116 118)"/>', '', '<ellipse fill="#fff" cx="116" cy="118" rx="16" ry="10" transform="rotate(-38 116 118)"/>'),
    S('Bounce light', 'One thin curve near the bottom edge. Light bounces up from the floor!', `<path d="M${arcP(70, 62)} A70 70 0 0 1 ${arcP(70, 92)}"/>`),
    S('Table line', 'A long flat line under the ball for the table. Now it looks like it is sitting there!', '<path d="M30 250 Q150 258 270 250"/>')] },
];
