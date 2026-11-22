// More lessons: blocky characters (3D boxes), pixel art on a grid, shadows, and girly things.
// Everything here is an original design. Needs S, UN, fade, eyesDot, ring, star, heart, shade, isoP, poly, seg, bigEyes, blush.

// ---------- Blocky helpers: a box drawn with its front, top and side (oblique 3D).
const ob = (x, y, w, h, d = 28) => { const ox = d * .6, oy = -d * .45;
  const f = `M${x} ${y} H${x + w} V${y + h} H${x}Z`, t = `M${x} ${y} L${x + ox} ${y + oy} H${x + w + ox} L${x + w} ${y}Z`, s = `M${x + w} ${y} L${x + w + ox} ${y + oy} V${y + h + oy} L${x + w} ${y + h}Z`;
  return { x, y, w, h, ox, oy, f, t, s, all: `${f} ${t} ${s}` }; };
const obF = (b, c) => `<path fill="${c}" d="${b.f}"/><path fill="${shade(c, .3)}" d="${b.t}"/><path fill="${shade(c, -.22)}" d="${b.s}"/>`;
const obLow = (b, y0, c) => `<path fill="${c}" d="M${b.x} ${y0} H${b.x + b.w} V${b.y + b.h} H${b.x}Z"/><path fill="${shade(c, -.22)}" d="M${b.x + b.w} ${y0} L${b.x + b.w + b.ox} ${y0 + b.oy} V${b.y + b.h + b.oy} L${b.x + b.w} ${b.y + b.h}Z"/>`;
const obStep = (t, tip, boxes, cols, under, extra = '', extraFill = '') =>
  ({ ...S(t, tip, boxes.map(b => `<path d="${b.all}"/>`).join('') + extra, boxes.map((b, i) => obF(b, cols[i] ?? cols[0])).join('') + extraFill), under });
const shadowEl = (cx, cy, rx, ry, t = 'Shadow', tip = 'A flat oval shadow on the ground, a little to the right. Now it stands on the floor!') =>
  UN(t, tip, `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`, `<ellipse fill="#aab6cc" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`);

// ---------- Blocky girls
function blocky(name, style, c, o) {
  const Y = y => y + 34, dress = !!o.dress, hy = Y(38);
  const head = ob(112, hy, 76, 76, 28), torso = ob(110, Y(116), 80, dress ? 78 : 90, 28);
  const lt = dress ? Y(246) : Y(206), lh = dress ? 46 : 88;
  const legL = ob(110, lt, 38, lh, 28), legR = ob(152, lt, 38, lh, 28), skirt = ob(96, Y(188), 108, 60, 34);
  const armL = ob(80, Y(118), 28, 86, 28), armR = ob(192, Y(118), 28, 86, 28), hand = Y(118) + 62;
  const hairB = ob(106, Y(32), 88, o.long ? 150 : 96, 38), fringe = ob(108, Y(30), 84, 28, 32);
  const arm = (b, t, tip, under) => ({ ...S(t, tip, `<path d="${b.all}"/><path d="M${b.x} ${hand} H${b.x + b.w}"/>`, obF(b, c.top) + obLow(b, hand, c.skin)), under });
  const steps = [
    obStep('Head block', 'Draw a square, then a top and a side. It is a 3D block! Blocky characters are built from boxes.', [head], [c.skin]),
    obStep('Body block', 'A taller box under the head. Same depth, so the sides line up!', [torso], [c.top]),
    ...(dress ? [obStep('Skirt', 'A wider, flatter box for the skirt. It goes behind the body.', [skirt], [c.dress], true)] : []),
    obStep(dress ? 'Legs' : 'Left and right leg', 'Two boxes with a tiny gap between them. They go behind the body.', [legL, legR], [dress ? c.skin : c.bottom], true),
    arm(armL, 'Left arm', 'A long box on the left. It goes behind the body. The hand is a different color!', true),
    arm(armR, 'Right arm', 'The same on the right side. This one is in front of the body.', false),
    obStep('Hair at the back', o.long ? 'A tall box behind the head, all the way down. Long hair!' : 'A box behind the head that is a little bigger than the head.', [hairB], [c.hair], true),
    ...(o.pony ? [obStep('Ponytail', 'A tall thin box on the right side of her head. Swish!', [ob(190, Y(52), 24, 76, 26)], [c.hair], true)] : []),
    obStep('Hair on top', 'A flat wide box across the top of the head is her fringe.', [fringe], [c.hair]),
    ...accessory(o.acc, c, Y),
    S('Face', 'Two square eyes with a tiny shine, pink cheeks and a blocky smile.',
      `<path d="M133 ${hy + 30} h9 v12 h-9Z"/><path d="M158 ${hy + 30} h9 v12 h-9Z"/><path d="M120 ${hy + 50} h14 v8 h-14Z"/><path d="M166 ${hy + 50} h14 v8 h-14Z"/><path d="M138 ${hy + 54} V${hy + 58} H144 V${hy + 62} H156 V${hy + 58} H162 V${hy + 54}"/>`,
      `<path fill="#2b2b3a" d="M133 ${hy + 30} h9 v12 h-9Z M158 ${hy + 30} h9 v12 h-9Z"/><path fill="#fff" d="M134 ${hy + 31} h3 v3 h-3Z M159 ${hy + 31} h3 v3 h-3Z"/><path fill="#ff9fb8" d="M120 ${hy + 50} h14 v8 h-14Z M166 ${hy + 50} h14 v8 h-14Z"/>`),
    S('Shoes', 'Make the bottom of each leg a different color. Those are shoes!', `<path d="M110 ${lt + lh - 14} H148"/><path d="M152 ${lt + lh - 14} H190"/>`, obLow(legL, lt + lh - 14, c.shoe) + obLow(legR, lt + lh - 14, c.shoe)),
    S(dress ? 'Dress stripe' : 'Shirt stripe', 'A stripe across the body, like a belt. Draw it straight!',
      `<path d="M110 ${Y(116) + (dress ? 56 : 62)} H190"/><path d="M110 ${Y(116) + (dress ? 66 : 74)} H190"/>`,
      `<path fill="${c.acc}" d="M110 ${Y(116) + (dress ? 56 : 62)} H190 V${Y(116) + (dress ? 66 : 74)} H110Z"/><path fill="${shade(c.acc, -.22)}" d="M190 ${Y(116) + (dress ? 56 : 62)} L${190 + torso.ox} ${Y(116) + (dress ? 56 : 62) + torso.oy} V${Y(116) + (dress ? 66 : 74) + torso.oy} L190 ${Y(116) + (dress ? 66 : 74)}Z"/>`),
    shadowEl(160, lt + lh + 4, 86, 12)];
  return { name, style, adv: true, bg: c.bg, steps };
}
function accessory(kind, c, Y) {
  if (kind === 'bow') return [obStep('A big bow', 'Two small boxes with a tiny box in the middle. A blocky bow! 🎀', [ob(160, Y(8), 18, 22, 12), ob(190, Y(8), 18, 22, 12), ob(178, Y(12), 12, 14, 12)], [c.acc])];
  if (kind === 'crown') return [obStep('A crown', 'A thin box on the hair, then three little boxes standing up. 👑', [ob(112, Y(18), 76, 14, 30), ob(114, Y(2), 16, 20, 14), ob(142, Y(-10), 16, 32, 14), ob(170, Y(2), 16, 20, 14)], [c.acc])];
  if (kind === 'ears') return [obStep('Kitty ears', 'Two small boxes on top of the head. Meow! 🐱', [ob(114, Y(6), 22, 28, 14), ob(166, Y(6), 22, 28, 14)], [c.hair], false, '', `<path fill="#ffc2dc" d="M118 ${Y(14)} h14 v16 h-14Z M170 ${Y(14)} h14 v16 h-14Z"/>`)];
  if (kind === 'bunny') return [obStep('Bunny ears', 'Two LONG boxes on top, standing up. Hop hop! 🐰', [ob(120, Y(-26), 16, 60, 14), ob(164, Y(-26), 16, 60, 14)], [c.hair], false, '', `<path fill="#ffc2dc" d="M124 ${Y(-18)} h8 v40 h-8Z M168 ${Y(-18)} h8 v40 h-8Z"/>`)];
  if (kind === 'witch') return [obStep('Witch hat', 'A flat wide box for the brim, then two smaller boxes stacked up. Pointy! 🧙‍♀️', [ob(96, Y(20), 108, 10, 36), ob(120, Y(-6), 60, 28, 28), ob(134, Y(-28), 32, 24, 22)], [c.acc, c.acc, c.acc])];
  return [];
}
const BLOCKY = [
  blocky('Blocky Ruby', 'Blocky · ponytail', { skin:'#ffdcb8', hair:'#6b3f23', top:'#ff6fae', bottom:'#4a7bd8', shoe:'#3b3b44', acc:'#ffd23f', bg:'#ffe6f0' }, { pony:true, acc:'bow' }),
  blocky('Blocky Princess', 'Blocky · dress & crown', { skin:'#f5cfa6', hair:'#e8a33d', top:'#ff8fc0', dress:'#ff8fc0', bottom:'#ff8fc0', shoe:'#ff6fae', acc:'#ffd23f', bg:'#fff0d6' }, { dress:true, long:true, acc:'crown' }),
  blocky('Blocky Kitty', 'Blocky · cat ears', { skin:'#ffe3d0', hair:'#7a5cc0', top:'#b9a3ff', bottom:'#6b5bb0', shoe:'#3b3b44', acc:'#ffc2dc', bg:'#efe6ff' }, { acc:'ears' }),
  blocky('Blocky Bunny', 'Blocky · bunny ears', { skin:'#ffdcb8', hair:'#ffffff', top:'#8fd3ff', dress:'#8fd3ff', bottom:'#8fd3ff', shoe:'#ff9fb8', acc:'#ffd23f', bg:'#e6f6ff' }, { dress:true, acc:'bunny' }),
  blocky('Blocky Witch', 'Blocky · little witch', { skin:'#ffe3d0', hair:'#d9542b', top:'#7a52c9', dress:'#7a52c9', bottom:'#7a52c9', shoe:'#3b3b44', acc:'#5a3aa8', bg:'#f0e6ff' }, { dress:true, long:true, acc:'witch' }),
];

// ---------- Blocky animals and things (side view, oblique boxes)
function blockAnimal(name, c, o) {
  const head = ob(36, 152, 60, 62, 36), body = ob(96, 176, 132, 70, 56);
  const near = [ob(104, 246, 24, 44, 26), ob(190, 246, 24, 44, 26)], far = [ob(134, 236, 24, 44, 22), ob(212, 236, 24, 44, 22)];
  const steps = [
    obStep('Head block', 'A square for the head, with a top and a side. This animal faces left!', [head], [c.skin]),
    obStep('Long body block', 'A long box next to the head. It is longer than it is tall.', [body], [c.skin]),
    obStep('Front legs', 'Two short boxes under the body. They go behind it.', near, [c.leg], true),
    obStep('Back legs', 'Two more legs a little higher and further back. Far things look higher up!', far, [shade(c.leg, -.1)], true),
    ...o.extra(c),
    S('Eye and nose', 'A small dark square for the eye with a white shine, and a nose.', `<path d="M56 172 h9 v9 h-9Z"/><path d="M26 198 h10 v8 h-10Z"/>`,
      `<path fill="#2b2b3a" d="M56 172 h9 v9 h-9Z"/><path fill="#fff" d="M57 173 h3 v3 h-3Z"/><path fill="#e8507e" d="M26 198 h10 v8 h-10Z"/>`),
    shadowEl(170, 294, 120, 12)];
  return { name, style:'Blocky · animal', adv:true, bg:c.bg, steps };
}
const pigX = c => [obStep('Snout', 'A small box sticking out of the front of the face.', [ob(22, 186, 16, 26, 16)], [c.snout]),
  obStep('Ears and tail', 'Two tiny ears on top, and a tiny box for the tail at the back.', [ob(42, 138, 16, 14, 12), ob(72, 138, 16, 14, 12), ob(258, 176, 14, 14, 10)], [c.skin])];
const catX = c => [obStep('Pointy ears', 'Two small boxes on top of the head.', [ob(40, 132, 18, 22, 12), ob(72, 132, 18, 22, 12)], [c.skin]),
  obStep('Tall tail', 'A long thin box standing up at the back, like a question mark!', [ob(262, 150, 14, 80, 10)], [c.leg], true),
  S('Whiskers', 'Three little lines on each side of the nose.', '<path d="M30 200 H4"/><path d="M30 206 L6 214"/><path d="M30 194 L6 186"/>')];
const dogX = c => [obStep('Floppy ear', 'A long hanging box on the side of the head.', [ob(66, 150, 22, 44, 12)], [c.leg]),
  obStep('Snout and tail', 'A bigger snout box, and a tail pointing up.', [ob(18, 184, 22, 30, 18), ob(260, 158, 14, 44, 10)], [c.skin])];
const BLOCKY2 = [
  blockAnimal('Blocky Piggy', { skin:'#ffb3cf', leg:'#ff9ec7', snout:'#ff8fb6', bg:'#ffe6f0' }, { extra: pigX }),
  blockAnimal('Blocky Cat', { skin:'#ffb26b', leg:'#f29a4a', bg:'#fff0d6' }, { extra: catX }),
  blockAnimal('Blocky Puppy', { skin:'#e0b27a', leg:'#9b6b43', bg:'#e6f4ff' }, { extra: dogX }),
  { name:'Blocky Tree', style:'Blocky · nature', adv:true, bg:'#e3f6ff', steps:[
    obStep('Trunk', 'A tall brown box.', [ob(128, 200, 44, 110, 34)], ['#9b6b43']),
    obStep('Big leaf block', 'A big wide green box on top of the trunk. It covers the top of the trunk!', [ob(84, 118, 132, 86, 60)], ['#4caf50']),
    obStep('Top leaf block', 'A smaller box on top of the big one.', [ob(108, 62, 84, 62, 50)], ['#5cc15f']),
    S('Apples', 'Little squares on the leaves. Make some red apples! 🍎', [[100, 160], [176, 148], [140, 186], [150, 92]].map(([x, y]) => `<path d="M${x} ${y} h14 v14 h-14Z"/>`).join(''), '', `<path fill="#e8505b" d="${[[100, 160], [176, 148], [140, 186], [150, 92]].map(([x, y]) => `M${x} ${y} h14 v14 h-14Z`).join(' ')}"/>`),
    S('Grass block', 'A flat wide box under the tree for the grass.', `<path d="${ob(50, 306, 200, 18, 60).all}"/>`, obF(ob(50, 306, 200, 18, 60), '#7bc96f')),
    shadowEl(170, 332, 100, 10)] },
  { name:'Blocky Cabin', style:'Blocky · house', adv:true, bg:'#e6f4ff', steps:[
    obStep('Wall block', 'A big box for the house. Wide and not too tall.', [ob(66, 190, 160, 100, 64)], ['#d9a066']),
    S('Wood planks', 'Straight lines across the front wall, like wooden planks.', [214, 238, 262].map(y => `<path d="M66 ${y} H226"/>`).join('')),
    obStep('Flat roof', 'A wide flat box on top. It sticks out past the walls!', [ob(54, 166, 184, 28, 76)], ['#c2456b']),
    S('Door and windows', 'A tall door in the middle, and a square window with a cross on each side.',
      `<path d="M134 290 V226 H168 V290"/><path d="M82 218 h34 v34 h-34Z"/><path d="M99 218 V252 M82 235 H116"/><path d="M186 218 h30 v34 h-30Z"/><path d="M201 218 V252 M186 235 H216"/>`, '',
      `<path fill="#7a4f2e" d="M134 290 V226 H168 V290Z"/><path fill="#bfe8ff" d="M82 218 h34 v34 h-34Z M186 218 h30 v34 h-30Z"/>`),
    obStep('Chimney', 'A small tall box on the roof, at the back.', [ob(190, 118, 26, 52, 16)], ['#8a8f99'], true),
    S('Smoke', 'Three puffs going up. Make them bigger and bigger!', '<path d="M208 112 q-10 -8 0 -14"/><circle cx="212" cy="86" r="8"/><circle cx="220" cy="62" r="11"/>'),
    shadowEl(170, 300, 124, 12)] },
];

// ---------- Pixel art: draw a grid, then color one square at a time. Outline squares are found automatically.
function pixel(name, rows, legend, order) {
  const R = rows.length, C = rows[0].length, s = Math.floor(240 / Math.max(R, C)), x0 = Math.round(150 - C * s / 2), y0 = Math.round(180 - R * s / 2);
  const at = (r, c) => rows[r]?.[c] ?? '.';
  const kind = (r, c) => { const ch = at(r, c); if (ch === '.') return '.'; const edge = [[-1, 0], [1, 0], [0, -1], [0, 1]].some(([dr, dc]) => at(r + dr, c + dc) === '.'); return edge ? 'o' : ch; };
  const cells = ch => { const out = []; for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (kind(r, c) === ch) out.push(`M${x0 + c * s} ${y0 + r * s} h${s} v${s} h${-s}Z`); return out.join(' '); };
  const grid = Array.from({ length: R + 1 }, (_, r) => `M${x0} ${y0 + r * s} H${x0 + C * s}`).join(' ') + ' ' + Array.from({ length: C + 1 }, (_, c) => `M${x0 + c * s} ${y0} V${y0 + R * s}`).join(' ');
  const steps = [{ ...S('Make a grid', `Draw ${C} squares across and ${R} squares down. Use a ruler! Every square is one pixel.`, `<path class="guide solid" d="${grid}"/>`), guide: true },
    ...['o', ...order].filter(ch => cells(ch)).map(ch => S(ch === 'o' ? 'Outline squares' : legend[ch][1], ch === 'o' ? 'Color the squares along the edge dark. This makes the shape of your picture!' : `Fill these squares with ${legend[ch][1].toLowerCase()}. Count the squares carefully.`,
      `<path d="${cells(ch)}"/>`, `<path fill="${ch === 'o' ? '#3b3b44' : legend[ch][0]}" d="${cells(ch)}"/>`))];
  return { name, style:'Pixel art', adv:true, keepFill:true, bg:'#fffef9', steps };
}
const PIXEL = [
  pixel('Pixel heart', ['..xxx.xxx..', '.xwxxxxxxx.', 'xxwxxxxxxxx', 'xxxxxxxxxxx', 'xxxxxxxxxxx', '.xxxxxxxxx.', '..xxxxxxx..', '...xxxxx...', '....xxx....', '.....x.....'],
    { x:['#ff5c8a', 'Pink squares'], w:['#ffffff', 'White shine squares'] }, ['x', 'w']),
  pixel('Pixel kitty', ['xx........xx', 'xpx......xpx', 'xxxxxxxxxxxx', 'xxxxxxxxxxxx', 'xxeexxxxeexx', 'xxeexxxxeexx', 'xcxxxnnxxxcx', 'xxxxmxxmxxxx', 'xxxxxmmxxxxx', 'xxxxxxxxxxxx', '.xxxxxxxxxx.'],
    { x:['#ffb26b', 'Orange squares'], p:['#ffc2dc', 'Pink ear squares'], e:['#2b2b3a', 'Dark eye squares'], c:['#ff9fb8', 'Pink cheek squares'], n:['#ff7a9a', 'Nose squares'], m:['#3b3b44', 'Mouth squares'] }, ['x', 'p', 'e', 'c', 'n', 'm']),
  pixel('Pixel cupcake', ['.....rr.....', '....ffff....', '...ffkfff...', '..ffffffff..', '.ffkfffffff.', '..ffffffff..', '.bbbbbbbbbb.', '.bsbsbsbsbs.', '.bsbsbsbsbs.', '..bsbsbsb...', '...bsbsb....'],
    { r:['#e8505b', 'Red cherry squares'], f:['#fff3f8', 'Cream frosting squares'], k:['#6bcB77', 'Green sprinkle squares'], b:['#ff9ec7', 'Pink paper squares'], s:['#ff6fae', 'Dark pink stripe squares'] }, ['f', 'r', 'k', 'b', 's']),
  pixel('Pixel girl', ['...hhhhhh...', '..hhhhhhhh..', '.hhhhhhhhhh.', '.hhssssssshh', 'hhsssssssshh', 'hhseesseeshh', 'hhseesseeshh', 'hhsssssssshh', 'hhscsssscshh', '.hhsmmmmshh.', '..hhssssshh.', '...hhhhhhh..'],
    { h:['#8a5a2b', 'Brown hair squares'], s:['#ffdcb8', 'Skin squares'], e:['#2b2b3a', 'Dark eye squares'], c:['#ff9fb8', 'Pink cheek squares'], m:['#e8507e', 'Smile squares'] }, ['h', 's', 'e', 'c', 'm']),
];

// ---------- Shadows and 3D objects
const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const PA = [150, 170], PL = [67, 278], PR = [233, 278], PF = [150, 326], PB = [150, 230];
const APPLE = 'M150 112 C120 90 62 100 62 168 C62 240 110 296 150 282 C190 296 238 240 238 168 C238 100 180 90 150 112Z';
const BERRY = 'M150 96 C100 84 56 116 66 168 C76 236 124 296 150 302 C176 296 224 236 234 168 C244 116 200 84 150 96Z';
const SEEDS = [[112, 150], [150, 142], [188, 150], [96, 190], [132, 184], [168, 184], [204, 190], [118, 226], [150, 222], [182, 226], [134, 262], [166, 262]];
const SOLID2 = [
  { name:'Apple', style:'3D · light & shadow', adv:true, bg:'#fff0f0', steps:[
    S('Apple shape', 'Two round bumps on top with a little dent between them, then a round bottom.', `<path d="${APPLE}"/>`, `<path fill="#e8505b" d="${APPLE}Z"/>`),
    S('Stem and leaf', 'A short curved stem and a pointy leaf with a line in the middle. 🍃', '<path d="M150 112 Q148 84 164 64"/><path d="M158 96 Q192 62 230 78 Q200 112 158 96Z"/><path d="M162 94 Q196 84 222 80"/>', '', '<path fill="#5cb85c" d="M158 96 Q192 62 230 78 Q200 112 158 96Z"/>'),
    S('Dark side', 'Light comes from the top-left, so the right side is darker. Draw curved lines that hug the apple.', '<path d="M222 150 Q230 205 200 258"/><path d="M210 156 Q216 204 192 250"/><path d="M198 164 Q202 204 184 240"/>', '<path fill="#c93a48" d="M238 168 C238 240 190 296 150 282 C176 262 212 224 210 170 C209 134 188 108 164 104 C214 98 238 124 238 168Z"/>'),
    S('Shine', 'A tilted white oval at the top-left, where the light hits the most. Leave it white!', '<ellipse cx="98" cy="158" rx="9" ry="24" transform="rotate(-14 98 158)"/><circle cx="112" cy="196" r="4"/>', '', '<ellipse fill="#fff" cx="98" cy="158" rx="9" ry="24" transform="rotate(-14 98 158)"/><circle fill="#fff" cx="112" cy="196" r="4"/>'),
    shadowEl(172, 294, 86, 15, 'Shadow on the table', 'The apple touches the table at one point. Draw a flat oval shadow going to the right, away from the light.'),
    S('Table line', 'A long flat line for the table.', '<path d="M30 292 Q150 302 270 292"/>')] },
  { name:'Soda can', style:'3D · cylinder', adv:true, bg:'#ffe9f2', steps:[
    S('Top oval', 'A flat oval for the top of the can. A circle seen from the side is an oval!', '<ellipse cx="150" cy="96" rx="66" ry="21"/>', '', '<ellipse fill="#d8dbe6" cx="150" cy="96" rx="66" ry="21"/>'),
    { ...S('Sides and bottom', 'Two straight lines down. Then connect them with a curve that bends DOWN, like half an oval.', '<path d="M84 96 V262"/><path d="M216 96 V262"/><path d="M84 262 A66 21 0 0 0 216 262"/>', '<path fill="#ff8fc0" d="M84 96 V262 A66 21 0 0 0 216 262 V96Z"/>'), under: true },
    S('Label band', 'Two curved lines across, bending down the same way as the bottom.', '<path d="M84 150 A66 21 0 0 0 216 150"/><path d="M84 214 A66 21 0 0 0 216 214"/>', '', '<path fill="#fff" d="M84 150 A66 21 0 0 0 216 150 V214 A66 21 0 0 1 84 214Z"/>'),
    S('Rim and tab', 'A smaller oval inside the top, and a little oval for the pull tab.', '<ellipse cx="150" cy="96" rx="54" ry="15"/><ellipse cx="166" cy="92" rx="14" ry="6"/>'),
    S('Shine', 'A tall thin white strip on the left side. It makes the can look shiny metal.', '<path d="M98 112 H110 V252 H98Z"/>', '', '<path fill="#fff" fill-opacity=".7" d="M98 112 H110 V252 H98Z"/>'),
    S('Dark side lines', 'Straight lines going down on the right side, where it is dark.', '<path d="M196 116 V252"/><path d="M204 112 V254"/><path d="M210 108 V256"/>'),
    S('Straw', 'Two lines for a bendy straw sticking out of the top.', '<path d="M164 92 L192 24 L224 14"/><path d="M174 94 L202 28 L228 20"/>'),
    shadowEl(196, 272, 104, 20, 'Shadow', 'A long flat shadow on the ground to the right.')] },
  { name:'Pyramid', style:'3D · isometric', adv:true, bg:'#fff3d6', steps:[
    S('Base diamond', 'Start with a diamond lying flat. This is the bottom of the pyramid.', `<path d="${poly([PB, PR, PF, PL])}"/>`, `<path fill="#e9c46a" d="${poly([PB, PR, PF, PL])}"/>`),
    S('Pick the top', 'Put a point high above the middle, then draw 3 lines down to the left, front and right corners.', `<path d="${seg(PA, PL)}"/><path d="${seg(PA, PF)}"/><path d="${seg(PA, PR)}"/>`, `<path fill="#f4c95d" d="${poly([PA, PL, PF])}"/><path fill="#c99a3b" d="${poly([PA, PF, PR])}"/>`),
    S('Stone lines', 'Lines across, parallel to the bottom. They get shorter near the top!', [.28, .52, .76].map(t => `<path d="${seg(lerp2(PA, PL, t), lerp2(PA, PF, t))}"/><path d="${seg(lerp2(PA, PF, t), lerp2(PA, PR, t))}"/>`).join('')),
    S('Dark side', 'The right side is in shadow. Draw lines going down it.', [.2, .4, .6, .8].map(u => `<path d="${seg(lerp2(PA, PR, u), lerp2(PF, PR, u))}"/>`).join('')),
    UN('Shadow', 'The shadow stretches on the ground to the right, away from the light.', `<path d="${poly([PR, PF, [196, 338], [285, 300]])}"/>`, `<path fill="#d6c19a" d="${poly([PR, PF, [196, 338], [285, 300]])}"/>`),
    S('Sun', 'A little sun at the top-left. The light comes from there!', '<circle cx="46" cy="48" r="14"/>' + ring(8, a => `<path d="M${(46 + 20 * Math.cos(a)).toFixed(1)} ${(48 + 20 * Math.sin(a)).toFixed(1)} L${(46 + 30 * Math.cos(a)).toFixed(1)} ${(48 + 30 * Math.sin(a)).toFixed(1)}"/>`), '', '<circle fill="#ffd23f" cx="46" cy="48" r="14"/>')] },
  { name:'Strawberry', style:'3D · light & shadow', adv:true, bg:'#fff0f3', steps:[
    S('Berry shape', 'A heart shape with a rounded bottom point.', `<path d="${BERRY}"/>`, `<path fill="#e8505b" d="${BERRY}Z"/>`),
    S('Leaves', 'Three pointy leaves on top, like a little crown.', '<path d="M150 98 Q118 70 96 88 Q122 112 150 98Z"/><path d="M150 98 Q182 70 204 88 Q178 112 150 98Z"/><path d="M150 98 Q140 66 150 52 Q160 66 150 98Z"/>', '', '<path fill="#5cb85c" d="M150 98 Q118 70 96 88 Q122 112 150 98Z M150 98 Q182 70 204 88 Q178 112 150 98Z M150 98 Q140 66 150 52 Q160 66 150 98Z"/>'),
    S('Seeds', 'Little diamond shapes in rows. Space them out evenly!', `<path d="${SEEDS.map(([x, y]) => `M${x - 3} ${y} L${x} ${y - 5} L${x + 3} ${y} L${x} ${y + 5}Z`).join(' ')}"/>`, '', `<path fill="#ffe08a" d="${SEEDS.map(([x, y]) => `M${x - 3} ${y} L${x} ${y - 5} L${x + 3} ${y} L${x} ${y + 5}Z`).join(' ')}"/>`),
    S('Dark side', 'The right side is darker. Add curved lines on it.', '<path d="M224 150 Q230 214 190 270"/><path d="M212 160 Q216 214 182 258"/>', '<path fill="#c93a48" d="M234 168 C224 236 176 296 150 302 C186 280 214 228 214 172 C214 130 190 102 162 98 C208 100 244 124 234 168Z"/>'),
    S('Shine', 'A white tilted oval at the top-left.', '<ellipse cx="96" cy="150" rx="8" ry="20" transform="rotate(-18 96 150)"/>', '', '<ellipse fill="#fff" cx="96" cy="150" rx="8" ry="20" transform="rotate(-18 96 150)"/>'),
    shadowEl(172, 312, 84, 13)] },
];

// ---------- Girly things
const CLOUD = 'M-52 0 Q-74 0 -70 -20 Q-66 -38 -42 -34 Q-36 -64 0 -60 Q28 -66 40 -42 Q66 -44 68 -20 Q70 0 48 0Z';
const hb = (cx, cy, s) => `M${cx} ${cy + 46 * s} C${cx - 90 * s} ${cy - 4 * s} ${cx - 48 * s} ${cy - 70 * s} ${cx} ${cy - 26 * s} C${cx + 48 * s} ${cy - 70 * s} ${cx + 90 * s} ${cy - 4 * s} ${cx} ${cy + 46 * s}Z`;
const BALLS = [[100, 120, 1, '#ff6fae'], [200, 100, .9, '#b9a3ff'], [150, 196, .7, '#ffd23f']];
const RB = [120, 108, 96, 84, 72, 60, 48], RBC = ['#ff5c5c', '#ff9f43', '#ffd93d', '#6bcB77', '#4d96ff', '#9b6dff'];
const ringBand = i => `M${150 - RB[i]} 262 A${RB[i]} ${RB[i]} 0 0 1 ${150 + RB[i]} 262 H${150 + RB[i + 1]} A${RB[i + 1]} ${RB[i + 1]} 0 0 0 ${150 - RB[i + 1]} 262Z`;
const GIRLY = [
  { name:'Cupcake', style:'Girly · yummy', adv:true, bg:'#ffe6f0', steps:[
    S('Paper cup', 'A shape that is wide at the top and narrow at the bottom. Then straight lines for the folds.', `<path d="M98 206 L114 312 H186 L202 206Z"/>` + [1, 2, 3, 4].map(i => `<path d="M${98 + 104 * i / 5} 206 L${114 + 72 * i / 5} 312"/>`).join(''), '', '<path fill="#ff9ec7" d="M98 206 L114 312 H186 L202 206Z"/>'),
    S('Bottom frosting', 'A wide wavy bump on top of the cup. It hangs over the edge!', '<path d="M84 206 Q64 168 108 160 Q150 176 192 160 Q236 168 216 206 Q150 220 84 206Z"/>', '', '<path fill="#fff3f8" d="M84 206 Q64 168 108 160 Q150 176 192 160 Q236 168 216 206 Q150 220 84 206Z"/>'),
    S('Middle frosting', 'A smaller bump on top of that one.', '<path d="M102 162 Q92 132 126 124 Q150 134 174 124 Q208 132 198 162 Q150 176 102 162Z"/>', '', '<path fill="#fff3f8" d="M102 162 Q92 132 126 124 Q150 134 174 124 Q208 132 198 162 Q150 176 102 162Z"/>'),
    S('Top swirl', 'An even smaller bump. Like a little tower!', '<path d="M126 126 Q124 98 150 80 Q176 98 174 126 Q150 136 126 126Z"/>', '', '<path fill="#fff3f8" d="M126 126 Q124 98 150 80 Q176 98 174 126 Q150 136 126 126Z"/>'),
    S('Cherry', 'A round cherry on top with a curvy stem. 🍒', '<circle cx="150" cy="74" r="10"/><path d="M150 64 Q154 48 168 44"/>', '', '<circle fill="#e8505b" cx="150" cy="74" r="10"/>'),
    S('Sprinkles', 'Tiny dashes all over the frosting.', '<path d="M112 184 l8 -4 M160 190 l6 6 M190 176 l8 -3 M130 146 l7 4 M172 142 l7 -4 M140 104 l5 6"/>', '', ['#ff4d8d', '#4d96ff', '#ffd23f', '#6bcB77', '#9b6dff', '#ff9f43'].map((c, i) => `<circle fill="${c}" cx="${[116, 163, 194, 133, 175, 142][i]}" cy="${[182, 193, 174, 148, 140, 107][i]}" r="3.5"/>`).join('')),
    shadowEl(160, 316, 76, 11)] },
  { name:'Donut', style:'Girly · yummy', adv:true, bg:'#fff5e0', steps:[
    S('Donut top', 'A big flat oval. A circle seen from the side looks like an oval!', '<ellipse cx="150" cy="170" rx="110" ry="68"/>', '', '<ellipse fill="#f0b97a" cx="150" cy="170" rx="110" ry="68"/>'),
    S('Thickness', 'Two short lines down from the sides, and a curve under it. Now it is thick!', '<path d="M40 170 V196 A110 68 0 0 0 260 196 V170"/>', '<path fill="#d9954f" d="M40 170 V196 A110 68 0 0 0 260 196 V170 A110 68 0 0 1 40 170Z"/>'),
    S('Hole', 'A small oval in the middle.', '<ellipse cx="150" cy="172" rx="40" ry="22"/>', '', '<ellipse fill="#fff5f8" cx="150" cy="172" rx="40" ry="22"/>'),
    S('Icing', 'A wavy line around the top for the icing, going around the hole too.', '<path d="M58 160 Q60 118 108 108 Q150 96 192 108 Q240 118 242 160 Q250 188 218 204 Q200 222 176 214 Q150 228 124 214 Q98 222 82 202 Q50 186 58 160Z M110 172 A40 22 0 1 0 190 172 A40 22 0 1 0 110 172Z"/>', '', '<path fill="#ff9ec7" fill-rule="evenodd" d="M58 160 Q60 118 108 108 Q150 96 192 108 Q240 118 242 160 Q250 188 218 204 Q200 222 176 214 Q150 228 124 214 Q98 222 82 202 Q50 186 58 160Z M110 172 A40 22 0 1 0 190 172 A40 22 0 1 0 110 172Z"/>'),
    S('Sprinkles', 'Little rounded dashes on the icing. All pointing different ways!', '<path d="M90 150 l8 -4 M120 128 l6 6 M170 124 l8 -3 M206 148 l6 7 M84 180 l8 3 M222 176 l-4 8 M110 200 l6 -5 M196 196 l7 -3"/>', '', ['#ffd23f', '#4d96ff', '#fff', '#6bcB77', '#9b6dff', '#ffd23f', '#4d96ff', '#fff'].map((c, i) => `<circle fill="${c}" cx="${[94, 123, 174, 209, 88, 220, 113, 199][i]}" cy="${[148, 131, 122, 151, 181, 180, 197, 194][i]}" r="3.5"/>`).join('')),
    S('Shine', 'A curved white line on the icing, on the top-left.', '<path d="M82 150 Q98 126 130 118"/>'),
    shadowEl(160, 270, 118, 20)] },
  { name:'Teddy bear', style:'Girly · cuddly', adv:true, bg:'#fff0e0', steps:[
    S('Round head', 'A big round circle for the head.', '<circle cx="150" cy="112" r="54"/>', '', '<circle fill="#c98b52" cx="150" cy="112" r="54"/>'),
    UN('Round ears', 'Two circles on top, with a smaller circle inside each one.', '<circle cx="104" cy="70" r="22"/><circle cx="196" cy="70" r="22"/><circle cx="104" cy="72" r="11"/><circle cx="196" cy="72" r="11"/>', '<circle fill="#c98b52" cx="104" cy="70" r="22"/><circle fill="#c98b52" cx="196" cy="70" r="22"/><circle fill="#f3d1a2" cx="104" cy="72" r="11"/><circle fill="#f3d1a2" cx="196" cy="72" r="11"/>'),
    S('Face', 'A light oval for the muzzle, two dot eyes, a nose, and a little smile.', '<ellipse cx="150" cy="130" rx="22" ry="17"/>' + eyesDot([130, 170], 102, 5) + fade(INK, '<ellipse cx="150" cy="122" rx="8" ry="5"/>') + '<ellipse cx="150" cy="122" rx="8" ry="5"/><path d="M150 127 v6"/><path d="M150 133 q-8 8 -14 2"/><path d="M150 133 q8 8 14 2"/>', '', '<ellipse fill="#f3d1a2" cx="150" cy="130" rx="22" ry="17"/>'),
    UN('Body', 'A big round pear shape for the body. It goes under the head.', '<path d="M106 166 Q62 222 96 290 Q150 316 204 290 Q238 222 194 166 Q150 180 106 166Z"/>', '<path fill="#c98b52" d="M106 166 Q62 222 96 290 Q150 316 204 290 Q238 222 194 166 Q150 180 106 166Z"/>'),
    S('Tummy', 'A light oval on the tummy.', '<ellipse cx="150" cy="246" rx="40" ry="46"/>', '', '<ellipse fill="#f3d1a2" cx="150" cy="246" rx="40" ry="46"/>'),
    UN('Arms', 'Two long ovals, tilted, on each side of the body.', '<ellipse cx="84" cy="214" rx="14" ry="34" transform="rotate(30 84 214)"/><ellipse cx="216" cy="214" rx="14" ry="34" transform="rotate(-30 216 214)"/>', '<ellipse fill="#c98b52" cx="84" cy="214" rx="14" ry="34" transform="rotate(30 84 214)"/><ellipse fill="#c98b52" cx="216" cy="214" rx="14" ry="34" transform="rotate(-30 216 214)"/>'),
    UN('Legs and paws', 'Two big oval feet at the bottom, with a round pad on each.', '<ellipse cx="112" cy="296" rx="30" ry="24"/><ellipse cx="188" cy="296" rx="30" ry="24"/><circle cx="112" cy="298" r="12"/><circle cx="188" cy="298" r="12"/>', '<ellipse fill="#c98b52" cx="112" cy="296" rx="30" ry="24"/><ellipse fill="#c98b52" cx="188" cy="296" rx="30" ry="24"/><circle fill="#f3d1a2" cx="112" cy="298" r="12"/><circle fill="#f3d1a2" cx="188" cy="298" r="12"/>'),
    S('Bow tie', 'Two triangles meeting in the middle with a small circle. 🎀', '<path d="M150 172 L124 158 V186Z"/><path d="M150 172 L176 158 V186Z"/><circle cx="150" cy="172" r="6"/>', '', '<path fill="#ff6fae" d="M150 172 L124 158 V186Z M150 172 L176 158 V186Z"/><circle fill="#e8507e" cx="150" cy="172" r="6"/>'),
    shadowEl(160, 322, 90, 12)] },
  { name:'Perfume', style:'Girly · sparkle', adv:true, bg:'#ffe6f5', steps:[
    S('Bottle', 'A rounded rectangle for the glass bottle.', '<path d="M90 160 Q90 140 110 140 H190 Q210 140 210 160 V268 Q210 292 186 292 H114 Q90 292 90 268Z"/>', '', '<path fill="#ffd6ea" d="M90 160 Q90 140 110 140 H190 Q210 140 210 160 V268 Q210 292 186 292 H114 Q90 292 90 268Z"/>'),
    S('Neck and cap', 'A short thin neck, then a taller cap on top with two lines across.', '<path d="M132 140 V116 H168 V140"/><path d="M122 116 V74 Q122 62 134 62 H166 Q178 62 178 74 V116Z"/><path d="M128 88 H172"/><path d="M128 100 H172"/>', '', '<path fill="#ffd23f" d="M122 116 V74 Q122 62 134 62 H166 Q178 62 178 74 V116Z"/>'),
    S('Perfume inside', 'A wavy line across the bottle. Everything under it is perfume!', '<path d="M96 200 Q123 190 150 200 Q177 210 204 200"/>', '', '<path fill="#ff8fc0" d="M96 200 Q123 190 150 200 Q177 210 204 200 V268 Q204 286 186 286 H114 Q96 286 96 268Z"/>'),
    S('Heart label', 'A little heart in the middle of the bottle. 💖', `<path d="${heart(150, 238, 1.6)}"/>`, '', `<path fill="#fff" d="${heart(150, 238, 1.6)}"/>`),
    S('Glass shine', 'A tall thin white strip on the left side.', '<path d="M101 162 H111 V250 H101Z"/>', '', '<path fill="#fff" fill-opacity=".8" d="M101 162 H111 V250 H101Z"/>'),
    S('Sparkles', 'Two sparkly stars next to the bottle. ✨', `<path d="${star(244, 84, 18)}"/><path d="${star(266, 140, 11)}"/>`, '', `<path fill="#ffd23f" d="${star(244, 84, 18)} ${star(266, 140, 11)}"/>`),
    shadowEl(170, 296, 84, 11)] },
  { name:'Handbag', style:'Girly · fashion', adv:true, bg:'#ffe6f0', steps:[
    S('Bag body', 'A wide shape that is a bit wider at the bottom, with rounded bottom corners.', '<path d="M70 150 H230 L246 288 Q246 306 228 306 H72 Q54 306 54 288Z"/>', '', '<path fill="#ff8fc0" d="M70 150 H230 L246 288 Q246 306 228 306 H72 Q54 306 54 288Z"/>'),
    S('Flap', 'A curved flap across the top, pointing down in the middle.', '<path d="M70 150 H230 L238 202 Q150 236 62 202Z"/>', '', '<path fill="#ff6fae" d="M70 150 H230 L238 202 Q150 236 62 202Z"/>'),
    UN('Handle', 'A big curved handle on top. Draw two curves, one inside the other.', '<path d="M104 150 Q98 66 150 66 Q202 66 196 150 H182 Q186 82 150 82 Q114 82 118 150Z"/>', '<path fill="#a0612d" d="M104 150 Q98 66 150 66 Q202 66 196 150 H182 Q186 82 150 82 Q114 82 118 150Z"/>'),
    S('Clasp', 'A round clasp in the middle of the flap.', '<circle cx="150" cy="222" r="11"/><circle cx="150" cy="222" r="4"/>', '', '<circle fill="#ffd23f" cx="150" cy="222" r="11"/>'),
    S('Stitches', 'A dashed line along the flap, like real stitches.', '<path d="M84 162 H216" stroke-dasharray="7 6"/>'),
    S('Bow charm', 'A tiny bow hanging on the side. 🎀', '<path d="M216 188 l-14 -9 v18Z"/><path d="M216 188 l14 -9 v18Z"/>', '', '<path fill="#ffd23f" d="M216 188 l-14 -9 v18Z M216 188 l14 -9 v18Z"/>'),
    shadowEl(160, 312, 100, 11)] },
  { name:'Heart balloons', style:'Girly · party', adv:true, bg:'#e6f4ff', steps:[
    S('Big heart', 'A big heart shape: two round bumps and a point at the bottom.', `<path d="${hb(100, 120, 1)}"/>`, `<path fill="${BALLS[0][3]}" d="${hb(100, 120, 1)}"/>`),
    UN('Heart behind', 'A second heart behind the first one. Only draw the part you can see!', `<path d="${hb(200, 100, .9)}"/>`, `<path fill="${BALLS[1][3]}" d="${hb(200, 100, .9)}"/>`),
    S('Small heart', 'A smaller heart in front, a bit lower.', `<path d="${hb(150, 196, .7)}"/>`, `<path fill="${BALLS[2][3]}" d="${hb(150, 196, .7)}"/>`),
    S('Knots', 'A tiny triangle under each heart.', BALLS.map(([x, y, s]) => `<path d="M${x} ${y + 46 * s} L${x - 7} ${y + 46 * s + 12} H${x + 7}Z"/>`).join(''), '', BALLS.map(([x, y, s, c]) => `<path fill="${shade(c, -.2)}" d="M${x} ${y + 46 * s} L${x - 7} ${y + 46 * s + 12} H${x + 7}Z"/>`).join('')),
    S('Strings', 'A curvy string from each knot, all meeting at the bottom.', BALLS.map(([x, y, s], i) => `<path d="M${x} ${y + 46 * s + 12} Q${[130, 190, 150][i]} ${[250, 260, 270][i]} 150 318"/>`).join('')),
    S('Bow', 'A ribbon bow where the strings meet. 🎀', '<path d="M150 318 l-18 -10 v20Z"/><path d="M150 318 l18 -10 v20Z"/><circle cx="150" cy="318" r="5"/>', '', '<path fill="#ff6fae" d="M150 318 l-18 -10 v20Z M150 318 l18 -10 v20Z"/>'),
    S('Shine', 'A little white oval on the top-left of each heart.', BALLS.map(([x, y, s]) => `<ellipse cx="${x - 30 * s}" cy="${y - 18 * s}" rx="${8 * s}" ry="${14 * s}" transform="rotate(30 ${x - 30 * s} ${y - 18 * s})"/>`).join(''), '', BALLS.map(([x, y, s]) => `<ellipse fill="#fff" cx="${x - 30 * s}" cy="${y - 18 * s}" rx="${8 * s}" ry="${14 * s}" transform="rotate(30 ${x - 30 * s} ${y - 18 * s})"/>`).join(''))] },
  { name:'Rainbow', style:'Girly · sky', adv:true, bg:'#dff0ff', steps:[
    S('Big arc', 'Draw a big curve like half a circle. This is the outside of the rainbow!', `<path d="M${150 - RB[0]} 262 A${RB[0]} ${RB[0]} 0 0 1 ${150 + RB[0]} 262"/>`),
    S('More arcs', 'Draw 6 more arcs inside it, each one a little smaller. Keep the gaps the same!', RB.slice(1).map(r => `M${150 - r} 262 A${r} ${r} 0 0 1 ${150 + r} 262`).join(' ').replace(/^/, '<path d="') + '"/>', RBC.map((c, i) => `<path fill="${c}" d="${ringBand(i)}"/>`).join('')),
    S('Clouds', 'Fluffy clouds at both ends. Bumpy on top, flat on the bottom! ☁️', `<path transform="translate(62 266) scale(.85)" d="${CLOUD}"/><path transform="translate(238 266) scale(.85)" d="${CLOUD}"/>`, '', `<path fill="#fff" transform="translate(62 266) scale(.85)" d="${CLOUD}"/><path fill="#fff" transform="translate(238 266) scale(.85)" d="${CLOUD}"/>`),
    S('Sun', 'A sun in the corner with rays all around. ☀️', '<circle cx="250" cy="58" r="18"/>' + ring(8, a => `<path d="M${(250 + 26 * Math.cos(a)).toFixed(1)} ${(58 + 26 * Math.sin(a)).toFixed(1)} L${(250 + 38 * Math.cos(a)).toFixed(1)} ${(58 + 38 * Math.sin(a)).toFixed(1)}"/>`), '', '<circle fill="#ffd23f" cx="250" cy="58" r="18"/>'),
    S('Hearts and stars', 'Little hearts and stars floating around. 💖', `<path d="${heart(52, 70, .9)}"/><path d="${heart(96, 40, .6)}"/><path d="${star(60, 130, 12)}"/>`, '', `<path fill="#ff6fae" d="${heart(52, 70, .9)} ${heart(96, 40, .6)}"/><path fill="#ffd23f" d="${star(60, 130, 12)}"/>`)] },
  { name:'Unicorn', style:'Girly · magic', adv:true, bg:'#f3e6ff', steps:[
    S('Face shape', 'A big rounded oval for the face.', '<ellipse cx="150" cy="184" rx="66" ry="74"/>', '', '<ellipse fill="#fff" cx="150" cy="184" rx="66" ry="74"/>'),
    UN('Ears', 'Two pointy ears on top, one on each side.', '<path d="M96 124 L84 76 L124 108Z"/><path d="M204 124 L216 76 L176 108Z"/>', '<path fill="#fff" d="M96 124 L84 76 L124 108Z M204 124 L216 76 L176 108Z"/>'),
    UN('Mane', 'Long wavy hair falling down on both sides of the face.', '<path d="M92 112 Q36 130 50 200 Q36 250 80 280 Q96 250 90 200Z"/><path d="M208 112 Q264 130 250 200 Q264 250 220 280 Q204 250 210 200Z"/>', '<path fill="#ff9ec7" d="M92 112 Q36 130 50 200 Q36 250 80 280 Q96 250 90 200Z"/><path fill="#b9a3ff" d="M208 112 Q264 130 250 200 Q264 250 220 280 Q204 250 210 200Z"/>'),
    S('Magic horn', 'A tall thin triangle on the forehead. Then short lines across it for the twist. ✨', '<path d="M136 120 L150 34 L164 120Z"/><path d="M139 104 L161 96"/><path d="M142 88 L158 82"/><path d="M145 72 L155 68"/>', '', '<path fill="#ffd23f" d="M136 120 L150 34 L164 120Z"/>'),
    S('Fringe', 'Three curvy bumps of hair across the forehead.', '<path d="M96 130 Q104 98 130 120 Q150 90 170 120 Q196 98 204 130 Q150 108 96 130Z"/>', '', '<path fill="#ff9ec7" d="M96 130 Q104 98 130 120 Q150 90 170 120 Q196 98 204 130 Q150 108 96 130Z"/>'),
    S('Sparkly eyes', 'Big eyes with a colored middle and two white shines.', bigEyes(188, 32, '#9b6dff', 14)),
    S('Muzzle', 'A light oval for the nose area, two nostrils and a little smile.', '<ellipse cx="150" cy="236" rx="34" ry="22"/><ellipse cx="140" cy="238" rx="3" ry="4"/><ellipse cx="160" cy="238" rx="3" ry="4"/><path d="M138 250 Q150 258 162 250"/>', '', '<ellipse fill="#ffe1ee" cx="150" cy="236" rx="34" ry="22"/>'),
    S('Cheeks', 'Two pink cheeks make her look happy! 💖', '<ellipse cx="104" cy="222" rx="12" ry="8"/><ellipse cx="196" cy="222" rx="12" ry="8"/>', '', '<ellipse fill="#ff9fbf" cx="104" cy="222" rx="12" ry="8"/><ellipse fill="#ff9fbf" cx="196" cy="222" rx="12" ry="8"/>')] },
];

// ---------- Home screen with all groups
const GROUPS2 = [['👧 Girls', GIRLS], ['🧱 Blocky characters', BLOCKY], ['🐷 Blocky animals & things', BLOCKY2], ['🟦 Pixel art (on a grid)', PIXEL], ['🎀 Girly things', GIRLY], ['🐼 Cute animals', CUTE],
  ['🐱 Animals, nature & more', THINGS], ['🧊 3D, light & shadow', [...SOLID, ...SOLID2]], ['⭐ Advanced (for big kids)', ADV]];
ITEMS = GROUPS2.flatMap(([, list]) => list);
$('grid').innerHTML = GROUPS2.map(([title, list]) => `<h2 class="group">${title}</h2><div class="grid">${list.map(card).join('')}</div>`).join('');
