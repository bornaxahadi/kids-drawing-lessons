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

// ---------- Blocky girls (front view, oblique 3D boxes)
function blocky(name, style, c, o) {
  const Y = y => y + 34, dress = !!o.dress, hy = Y(38), accs = [].concat(o.acc || []);
  const head = ob(112, hy, 76, 76, 28), torso = ob(110, Y(116), 80, dress ? 78 : 90, 28);
  const lt = dress ? Y(246) : Y(206), lh = dress ? 46 : 88;
  const legL = ob(110, lt, 38, lh, 28), legR = ob(152, lt, 38, lh, 28), skirt = ob(96, Y(188), 108, 60, 34);
  const tailB = [ob(110, Y(206), 80, 30, 28), ob(118, Y(236), 64, 28, 26), ob(126, Y(264), 48, 22, 24), ob(96, Y(286), 108, 8, 22)];
  const armL = ob(80, Y(118), 28, 86, 28), armR = ob(192, Y(118), 28, 86, 28), hand = Y(118) + 62;
  const hairB = ob(106, Y(32), 88, o.long ? 150 : 96, 38), fringe = ob(108, Y(30), 84, 28, 32);
  const arm = (b, t, tip, under) => ({ ...S(t, tip, `<path d="${b.all}"/><path d="M${b.x} ${hand} H${b.x + b.w}"/>`, obF(b, c.top) + obLow(b, hand, c.skin)), under });
  const st = Y(116) + (dress ? 56 : 62), st2 = Y(116) + (dress ? 66 : 74), bottomY = o.tail ? Y(294) : lt + lh;
  const steps = [
    obStep('Head block', 'Draw a square, then a top and a side. It is a 3D block! Blocky characters are built from boxes.', [head], [c.skin]),
    obStep('Body block', 'A taller box under the head. Same depth, so the sides line up!', [torso], [c.top]),
    ...(dress ? [obStep('Skirt', 'A wider, flatter box for the skirt. It goes behind the body.', [skirt], [c.dress], true)] : []),
    ...(o.tail ? [obStep('Mermaid tail', 'Three boxes stacked under the body, each smaller than the last. Then a wide flat box for the fin!', tailB, [c.tail, shade(c.tail, .1), shade(c.tail, .2), shade(c.tail, -.1)], true)]
      : [obStep(dress ? 'Legs' : 'Left and right leg', 'Two boxes with a tiny gap between them. They go behind the body.', [legL, legR], [dress ? c.skin : c.bottom], true)]),
    arm(armL, 'Left arm', 'A long box on the left. It goes behind the body. The hand is a different color!', true),
    arm(armR, 'Right arm', 'The same on the right side. This one is in front of the body.', false),
    ...(o.pom ? [obStep('Pom-poms', 'Two big fluffy boxes in her hands!', [ob(54, hand - 8, 44, 42, 30), ob(202, hand - 8, 44, 42, 30)], [c.acc])] : []),
    obStep('Hair at the back', o.long ? 'A tall box behind the head, all the way down. Long hair!' : 'A box behind the head that is a little bigger than the head.', [hairB], [c.hair], true),
    ...(o.pony ? [obStep('Ponytail', 'A tall thin box on the right side of her head. Swish!', [ob(190, Y(52), 24, 76, 26)], [c.hair], true)] : []),
    obStep('Hair on top', 'A flat wide box across the top of the head is her fringe.', [fringe], [c.hair]),
    ...accs.flatMap(k => accessory(k, c, Y)),
    S('Face', 'Two square eyes with a tiny shine, pink cheeks and a blocky smile.',
      `<path d="M133 ${hy + 30} h9 v12 h-9Z"/><path d="M158 ${hy + 30} h9 v12 h-9Z"/><path d="M120 ${hy + 50} h14 v8 h-14Z"/><path d="M166 ${hy + 50} h14 v8 h-14Z"/><path d="M138 ${hy + 54} V${hy + 58} H144 V${hy + 62} H156 V${hy + 58} H162 V${hy + 54}"/>`,
      `<path fill="#2b2b3a" d="M133 ${hy + 30} h9 v12 h-9Z M158 ${hy + 30} h9 v12 h-9Z"/><path fill="#fff" d="M134 ${hy + 31} h3 v3 h-3Z M159 ${hy + 31} h3 v3 h-3Z"/><path fill="#ff9fb8" d="M120 ${hy + 50} h14 v8 h-14Z M166 ${hy + 50} h14 v8 h-14Z"/>`),
    ...accs.flatMap(k => accessoryAfter(k, c, hy)),
    ...(o.tail ? [] : [S('Shoes', 'Make the bottom of each leg a different color. Those are shoes!', `<path d="M110 ${lt + lh - 14} H148"/><path d="M152 ${lt + lh - 14} H190"/>`, obLow(legL, lt + lh - 14, c.shoe) + obLow(legR, lt + lh - 14, c.shoe))]),
    o.star ? S('Star badge', 'A big star in the middle of the shirt. Five points! ⭐', `<path d="${star(150, Y(116) + 42, 20)}"/>`, '', `<path fill="${c.acc}" d="${star(150, Y(116) + 42, 20)}"/>`)
      : S(dress ? 'Dress stripe' : 'Shirt stripe', 'A stripe across the body, like a belt. Draw it straight!', `<path d="M110 ${st} H190"/><path d="M110 ${st2} H190"/>`,
        `<path fill="${c.acc}" d="M110 ${st} H190 V${st2} H110Z"/><path fill="${shade(c.acc, -.22)}" d="M190 ${st} L${190 + torso.ox} ${st + torso.oy} V${st2 + torso.oy} L190 ${st2}Z"/>`),
    shadowEl(160, bottomY + 6, 86, 12)];
  return { name, style, adv: true, bg: c.bg, steps };
}
function accessory(kind, c, Y) {
  if (kind === 'bow') return [obStep('A big bow', 'Two small boxes with a tiny box in the middle. A blocky bow! 🎀', [ob(160, Y(8), 18, 22, 12), ob(190, Y(8), 18, 22, 12), ob(178, Y(12), 12, 14, 12)], [c.acc])];
  if (kind === 'crown') return [obStep('A crown', 'A thin box on the hair, then three little boxes standing up. 👑', [ob(112, Y(18), 76, 14, 30), ob(114, Y(2), 16, 20, 14), ob(142, Y(-10), 16, 32, 14), ob(170, Y(2), 16, 20, 14)], [c.acc])];
  if (kind === 'ears') return [obStep('Kitty ears', 'Two small boxes on top of the head. Meow! 🐱', [ob(114, Y(6), 22, 28, 14), ob(166, Y(6), 22, 28, 14)], [c.hair], false, '', `<path fill="#ffc2dc" d="M118 ${Y(14)} h14 v16 h-14Z M170 ${Y(14)} h14 v16 h-14Z"/>`)];
  if (kind === 'bunny') return [obStep('Bunny ears', 'Two LONG boxes on top, standing up. Hop hop! 🐰', [ob(120, Y(-26), 16, 60, 14), ob(164, Y(-26), 16, 60, 14)], [c.hair], false, '', `<path fill="#ffc2dc" d="M124 ${Y(-18)} h8 v40 h-8Z M168 ${Y(-18)} h8 v40 h-8Z"/>`)];
  if (kind === 'witch') return [obStep('Witch hat', 'A flat wide box for the brim, then two smaller boxes stacked up. Pointy! 🧙‍♀️', [ob(96, Y(20), 108, 10, 36), ob(120, Y(-6), 60, 28, 28), ob(134, Y(-28), 32, 24, 22)], [c.acc])];
  if (kind === 'wings') return [obStep('Fairy wings', 'Two big thin boxes behind her back, one on each side. They go behind everything. 🧚', [ob(46, Y(104), 46, 84, 12), ob(208, Y(104), 46, 84, 12)], [c.wing], true)];
  if (kind === 'headphones') return [obStep('Headphones', 'A band over the head, then a box on each ear. 🎧', [ob(104, Y(22), 92, 10, 36), ob(98, Y(56), 14, 30, 12), ob(188, Y(56), 14, 30, 12)], ['#3b3b44', '#ff6fae', '#ff6fae'])];
  if (kind === 'chef') return [obStep('Chef hat', 'A tall white box, then a wider flat box on top for the puffy part. 👩‍🍳', [ob(120, Y(-4), 60, 36, 26), ob(106, Y(-24), 88, 24, 32)], ['#ffffff'])];
  if (kind === 'cape') return [obStep('Hero cape', 'A big flat box behind her, like a cape flying in the wind.', [ob(96, Y(116), 108, 130, 14)], [c.cape], true)];
  return [];
}
function accessoryAfter(kind, c, hy) {
  if (kind !== 'mask') return [];
  return [S('Hero mask', 'A flat band across the eyes with two holes. A secret hero! 🦸', `<path d="M112 ${hy + 24} H188 V${hy + 48} H112Z"/><path d="M131 ${hy + 31} h13 v10 h-13Z"/><path d="M156 ${hy + 31} h13 v10 h-13Z"/>`, '',
    `<path fill="${c.mask}" fill-rule="evenodd" d="M112 ${hy + 24} H188 V${hy + 48} H112Z M131 ${hy + 31} h13 v10 h-13Z M156 ${hy + 31} h13 v10 h-13Z"/>`)];
}
const BLOCKY = [
  blocky('Blocky Ruby', 'Blocky · ponytail', { skin:'#ffdcb8', hair:'#6b3f23', top:'#ff6fae', bottom:'#4a7bd8', shoe:'#3b3b44', acc:'#ffd23f', bg:'#ffe6f0' }, { pony:true, acc:'bow' }),
  blocky('Blocky Princess', 'Blocky · dress & crown', { skin:'#f5cfa6', hair:'#e8a33d', top:'#ff8fc0', dress:'#ff8fc0', bottom:'#ff8fc0', shoe:'#ff6fae', acc:'#ffd23f', bg:'#fff0d6' }, { dress:true, long:true, acc:'crown' }),
  blocky('Blocky Kitty', 'Blocky · cat ears', { skin:'#ffe3d0', hair:'#7a5cc0', top:'#b9a3ff', bottom:'#6b5bb0', shoe:'#3b3b44', acc:'#ffc2dc', bg:'#efe6ff' }, { acc:'ears' }),
  blocky('Blocky Bunny', 'Blocky · bunny ears', { skin:'#ffdcb8', hair:'#ffffff', top:'#8fd3ff', dress:'#8fd3ff', bottom:'#8fd3ff', shoe:'#ff9fb8', acc:'#ffd23f', bg:'#e6f6ff' }, { dress:true, acc:'bunny' }),
  blocky('Blocky Witch', 'Blocky · little witch', { skin:'#ffe3d0', hair:'#d9542b', top:'#7a52c9', dress:'#7a52c9', bottom:'#7a52c9', shoe:'#3b3b44', acc:'#5a3aa8', bg:'#f0e6ff' }, { dress:true, long:true, acc:'witch' }),
  blocky('Blocky Fairy', 'Blocky · wings', { skin:'#ffdcb8', hair:'#ff9ec7', top:'#c7f0c2', dress:'#c7f0c2', bottom:'#c7f0c2', shoe:'#ff9ec7', acc:'#ffd23f', wing:'#b9e8ff', bg:'#eaffea' }, { dress:true, long:true, acc:['wings', 'crown'] }),
  blocky('Blocky Pop Star', 'Blocky · headphones', { skin:'#f5cfa6', hair:'#2b2b3a', top:'#ff6fae', bottom:'#9b6dff', shoe:'#ffd23f', acc:'#ffd23f', bg:'#ffe6f5' }, { long:true, acc:'headphones', star:true }),
  blocky('Blocky Chef', 'Blocky · little chef', { skin:'#ffdcb8', hair:'#8a5a2b', top:'#ffffff', bottom:'#3b3b44', shoe:'#8a5a2b', acc:'#ff6fae', bg:'#fff3d6' }, { pony:true, acc:'chef' }),
  blocky('Blocky Hero', 'Blocky · superhero', { skin:'#ffdcb8', hair:'#2b2b3a', top:'#e8507e', bottom:'#4d96ff', shoe:'#ffd23f', acc:'#ffd23f', cape:'#4d96ff', mask:'#ffd23f', bg:'#e6f0ff' }, { acc:['cape', 'mask'], star:true }),
  blocky('Blocky Ninja', 'Blocky · ninja', { skin:'#ffdcb8', hair:'#2b2b3a', top:'#2b2b3a', bottom:'#2b2b3a', shoe:'#e8507e', acc:'#e8507e', mask:'#2b2b3a', bg:'#e6e6f0' }, { pony:true, acc:'mask' }),
  blocky('Blocky Knight', 'Blocky · brave knight', { skin:'#ffdcb8', hair:'#8a5a2b', top:'#aab6cc', bottom:'#8f9bb3', shoe:'#5a6577', acc:'#ffd23f', cape:'#e8507e', bg:'#eef2f8' }, { acc:['cape', 'crown'], star:true }),
  blocky('Blocky Mermaid', 'Blocky · mermaid', { skin:'#ffdcb8', hair:'#e8507e', top:'#ff9ec7', tail:'#38c6b0', shoe:'#38c6b0', acc:'#ffd23f', bg:'#dff6f6' }, { long:true, tail:true, acc:'crown' }),
  blocky('Blocky Cheerleader', 'Blocky · pom-poms', { skin:'#ffdcb8', hair:'#e8a33d', top:'#ff6fae', dress:'#ff6fae', bottom:'#ff6fae', shoe:'#ffffff', acc:'#ffd23f', bg:'#fff0f5' }, { dress:true, pony:true, pom:true, acc:'bow' }),
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

// ---------- True 3D (isometric) blocky characters, seen from a corner like in a game.
function isoGirl(name, c, o) {
  const P = isoP(150, 272, 52), bx = (x, y, z, a, b, h) => box(P, x, y, z, a, b, h), dress = !!o.dress;
  const lz = dress ? 1.1 : 1.5, tz = dress ? 1.9 : 1.5, th = dress ? 1.3 : 1.5, hz = tz + th, az = tz + th - 1.4;
  const legL = bx(0, 0, 0, .5, .5, lz), legR = bx(.5, 0, 0, .5, .5, lz), skirt = bx(-.3, -.25, 1, 1.6, 1, .9), torso = bx(0, 0, tz, 1, .5, th);
  const head = bx(0, -.25, hz, 1, 1, 1), armL = bx(-.4, 0, az, .4, .5, 1.4), armR = bx(1, 0, az, .4, .5, 1.4);
  const cap = bx(-.05, -.3, hz + .62, 1.1, 1.1, .45), fringe = bx(-.05, .55, hz + .68, 1.1, .25, .32);
  const lockL = bx(-.14, -.2, hz - .9, .16, .8, 1.5), lockR = bx(.98, -.2, hz - .9, .16, .8, 1.5);
  const hand = (b, x0, x1) => { const h = bx(x0, 0, az, x1 - x0, .5, .45); return `<path fill="${c.skin}" d="${h.left}"/><path fill="${shade(c.skin, -.28)}" d="${h.right}"/>`; };
  const ln = (a, b) => `<path d="${seg(a, b)}"/>`;
  const fy = (x0, x1, z0, z1) => poly([P(x0, .76, z0), P(x1, .76, z0), P(x1, .76, z1), P(x0, .76, z1)]);
  const L = (b, col, u) => ({ svg: boxLines(b), fill: boxFill(b, col), under: u });
  const mk = (t, tip, parts, extra = '', extraFill = '', under = false) => ({ ...S(t, tip, parts.map(p => p.svg).join('') + extra, parts.map(p => p.fill).join('') + extraFill), under });
  const acc = { crown: [mk('A crown', 'A thin flat box on top of the hair, then three little boxes standing up. 👑', [L(bx(0, -.2, hz + 1.07, 1, .9, .14), c.acc), L(bx(.08, .5, hz + 1.21, .2, .2, .3), c.acc), L(bx(.4, .5, hz + 1.21, .2, .2, .42), c.acc), L(bx(.72, .5, hz + 1.21, .2, .2, .3), c.acc)])],
    ears: [mk('Kitty ears', 'Two small boxes on top of the head. Meow! 🐱', [L(bx(.08, 0, hz + 1.07, .28, .3, .32), c.hair), L(bx(.64, 0, hz + 1.07, .28, .3, .32), c.hair)])],
    bow: [mk('A big bow', 'Two small boxes with a tiny box in the middle. 🎀', [L(bx(.5, .3, hz + 1.07, .22, .22, .22), c.acc), L(bx(.84, .3, hz + 1.07, .22, .22, .22), c.acc), L(bx(.72, .34, hz + 1.1, .12, .14, .14), c.acc)])] }[o.acc] || [];
  const steps = [
    mk('Body box', 'Draw a tall box: a top diamond, then the left and right sides. This is the body!', [L(torso, c.top)]),
    mk('Head cube', 'A bigger cube on top of the body. Heads are cubes in blocky worlds!', [L(head, c.skin)]),
    ...(dress ? [mk('Skirt', 'A wider flat box that sticks out around the body. It goes behind the body.', [L(skirt, c.dress)], '', '', true)] : []),
    mk('Legs', 'Two thin boxes under the body, side by side. They go behind the body.', [L(legL, dress ? c.skin : c.bottom), L(legR, dress ? c.skin : c.bottom)], '', '', true),
    mk('Left arm', 'A long thin box on the left side. It goes behind the body. Add the hand!', [L(armL, c.top)], ln(P(-.4, .5, az + .45), P(0, .5, az + .45)), hand(armL, -.4, 0), true),
    mk('Right arm', 'The same on the right side. This one is in front of the body.', [L(armR, c.top)], ln(P(1, .5, az + .45), P(1.4, .5, az + .45)) + ln(P(1.4, .5, az + .45), P(1.4, 0, az + .45)), hand(armR, 1, 1.4)),
    ...(o.long ? [mk('Long hair', 'Two long thin boxes on each side of the face.', [L(lockL, c.hair), L(lockR, c.hair)])] : []),
    mk('Hair on top', 'A flat box on top of the head, a little wider than the head.', [L(cap, c.hair)]),
    mk('Fringe', 'A small flat box on the front of the forehead.', [L(fringe, c.hair)]),
    ...acc,
    S('Face', 'Two square eyes with a shine, pink cheeks and a blocky smile. Draw them flat on the front face.',
      `<path d="${fy(.2, .4, hz + .28, hz + .5)}"/><path d="${fy(.6, .8, hz + .28, hz + .5)}"/><path d="${fy(.1, .28, hz + .1, hz + .2)}"/><path d="${fy(.72, .9, hz + .1, hz + .2)}"/><path d="${fy(.38, .62, hz + .09, hz + .15)}"/>`,
      `<path fill="#2b2b3a" d="${fy(.2, .4, hz + .28, hz + .5)} ${fy(.6, .8, hz + .28, hz + .5)}"/><path fill="#fff" d="${fy(.22, .28, hz + .42, hz + .5)} ${fy(.62, .68, hz + .42, hz + .5)}"/><path fill="#ff9fb8" d="${fy(.1, .28, hz + .1, hz + .2)} ${fy(.72, .9, hz + .1, hz + .2)}"/><path fill="#e8507e" d="${fy(.38, .62, hz + .09, hz + .15)}"/>`),
    mk('Shoes', 'The bottom of each leg is a different color. Shoes!', [{ svg: ln(P(0, .5, .3), P(.5, .5, .3)) + ln(P(.5, .5, .3), P(1, .5, .3)) + ln(P(1, .5, 0), P(1, .5, .3)), fill: [legL, legR].map((l, i) => { const s = bx(i * .5, 0, 0, .5, .5, .3); return `<path fill="${c.shoe}" d="${s.left}"/><path fill="${shade(c.shoe, -.28)}" d="${s.right}"/>`; }).join('') }]),
    UN('Shadow', 'A flat oval shadow on the ground, a little to the right.', '<ellipse cx="172" cy="296" rx="104" ry="22"/>', '<ellipse fill="#aab6cc" cx="172" cy="296" rx="104" ry="22"/>')];
  return { name, style: '3D · blocky', adv: true, bg: c.bg, steps };
}
const BLOCKY3D = [
  isoGirl('3D Ruby', { skin:'#ffdcb8', hair:'#6b3f23', top:'#ff6fae', bottom:'#4a7bd8', shoe:'#3b3b44', acc:'#ffd23f', bg:'#ffe6f0' }, { long:true, acc:'bow' }),
  isoGirl('3D Princess', { skin:'#f5cfa6', hair:'#e8a33d', top:'#ff8fc0', dress:'#ff8fc0', shoe:'#ff6fae', acc:'#ffd23f', bg:'#fff0d6' }, { dress:true, long:true, acc:'crown' }),
  isoGirl('3D Kitty', { skin:'#ffe3d0', hair:'#7a5cc0', top:'#b9a3ff', bottom:'#6b5bb0', shoe:'#3b3b44', acc:'#ffc2dc', bg:'#efe6ff' }, { acc:'ears' }),
];

// ---------- Optical illusions: lines and boxes that trick the eye. Mostly black and white, with one color.
const pl = pts => 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
const plZ = pts => pl(pts) + 'Z';
const DK = '#3b3b44', PK = '#e8507e';
const illu = (name, bg, steps) => ({ name, style: 'Illusion', adv: true, keepFill: true, bg, steps });

// 1. Twisted squares: each square joins dots placed a little way along the sides of the one before.
const TW = (() => { const out = [[[40, 70], [260, 70], [260, 290], [40, 290]]]; for (let i = 0; i < 16; i++) { const p = out[i]; out.push(p.map((a, k) => { const b = p[(k + 1) % 4]; return [a[0] + (b[0] - a[0]) * .14, a[1] + (b[1] - a[1]) * .14]; })); } return out; })();
const twAll = TW.map(plZ).join(' ');
// 2. String art: connect dots on two lines. Straight lines make a curve!
const SA = (() => { const N = 10, d = 11, q = []; for (const [sx, sy] of [[1, -1], [-1, -1], [-1, 1], [1, 1]]) { let s = ''; for (let i = 0; i <= N; i++) s += `M${150 + sx * i * d} 180 L150 ${180 + sy * (N - i) * d} `; q.push(s); } return q; })();
// 3. Cafe wall: rows of squares shifted a half step make straight lines look slanted.
const CW = (() => { const s = 26, x0 = 20, y0 = 76, odd = [], even = [], lines = []; for (let r = 0; r < 8; r++) { lines.push(`M${x0} ${y0 + r * s} H${x0 + 10 * s}`); for (let k = 0; k < 5; k++) { const x = r % 2 ? x0 + s * (2 * k) + s / 2 : x0 + s * 2 * k; if (x + s <= x0 + 10 * s) (r % 2 ? even : odd).push(`M${x} ${y0 + r * s} h${s} v${s} h${-s}Z`); } } lines.push(`M${x0} ${y0 + 8 * s} H${x0 + 10 * s}`); return { s, x0, y0, odd: odd.join(' '), even: even.join(' '), lines: lines.join(' '), bars: lines.map((_, i) => `M${x0} ${y0 + i * s - 1.6} h${10 * s} v3.2 h${-10 * s}Z`).join(' ') }; })();
// 4. Bulge checkerboard: a square grid pushed out in the middle.
const bulge = (u, v) => { const k = 1 + .3 * (1 - (u * u + v * v) / 2); return [150 + 100 * k * u, 180 + 100 * k * v]; };
const BG = (() => { const N = 8, U = i => -1 + 2 * i / N, line = (f, n = 16) => pl(Array.from({ length: n + 1 }, (_, i) => f(-1 + 2 * i / n)));
  const vert = [1, 2, 3, 4, 5, 6, 7].map(i => line(t => bulge(U(i), t))).join(' '), hor = [1, 2, 3, 4, 5, 6, 7].map(j => line(t => bulge(t, U(j)))).join(' ');
  const frame = [line(t => bulge(t, -1)), line(t => bulge(1, t)), line(t => bulge(t, 1)), line(t => bulge(-1, t))].join(' ');
  const cell = (i, j) => { const e = (a, b, c, d) => Array.from({ length: 5 }, (_, k) => bulge(a + (c - a) * k / 4, b + (d - b) * k / 4)); const u0 = U(i), u1 = U(i + 1), v0 = U(j), v1 = U(j + 1);
    return plZ([...e(u0, v0, u1, v0), ...e(u1, v0, u1, v1).slice(1), ...e(u1, v1, u0, v1).slice(1), ...e(u0, v1, u0, v0).slice(1, -1)]); };
  const dark = []; for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if ((i + j) % 2 === 0) dark.push(cell(i, j));
  return { vert, hor, frame, dark: dark.join(' ') }; })();
// 5. Tunnel: squares that shrink by the same amount each time look like they go far away.
const TN = Array.from({ length: 9 }, (_, k) => { const h = 112 * Math.pow(.78, k); return plZ([[150 - h, 180 - h], [150 + h, 180 - h], [150 + h, 180 + h], [150 - h, 180 + h]]); });
// 6. Ripple: straight lines that bulge in the middle.
const RP = Array.from({ length: 13 }, (_, i) => { const y = 64 + i * 19; return Array.from({ length: 25 }, (_, k) => { const x = 28 + k * 10.25, g = Math.exp(-(((x - 150) ** 2) + ((y - 180) ** 2)) / (2 * 62 * 62)); return [x, y + (y - 180) * .4 * g]; }); });
const rpBand = i => plZ([...RP[i], ...RP[i + 1].slice().reverse()]);

const ILLU = [
  illu('Twisted squares', '#fff0f5', [
    S('Big square', 'Use a ruler to draw a big square. Make the corners neat!', `<path d="${plZ(TW[0])}"/>`),
    S('Smaller square', 'Make a dot a little way along each side (about 1 finger-width from the corner). Then join the 4 dots with a ruler.', `<path d="${plZ(TW[1])}"/>`),
    S('Keep going', 'Do the same again and again, inside each new square. It starts to spin like a whirlpool!', `<path d="${TW.slice(2).map(plZ).join(' ')}"/>`),
    S('Color the rings', 'Color every other ring dark. Take your time. The picture seems to twist and swirl!', `<path d="${twAll}"/>`, TW.map((p, i) => `<path fill="${i % 2 ? '#fff' : DK}" d="${plZ(p)}"/>`).join(''))]),
  illu('String art', '#e6f4ff', [
    S('Draw a cross', 'Draw a plus sign with a ruler: one line across and one line up and down.', '<path d="M40 180 H260 M150 70 V290"/>'),
    S('Make dots', 'Put 10 little dots along each half of the lines. Keep the gaps the same!', `<path d="${[1, -1].flatMap(s => Array.from({ length: 10 }, (_, i) => `M${150 + s * (i + 1) * 11} 175 v10 M145 ${180 + s * (i + 1) * 11} h10`)).join(' ')}"/>`),
    S('First curve', 'Join the first dot on the right to the LAST dot going up, then the second to the second-to-last... Straight lines make a curve!', `<path d="${SA[0]}"/>`),
    S('Turn it around', 'Do the same in the other three corners. Now you have a star made of curves!', `<path d="${SA.slice(1).join(' ')}"/>`, SA.map((q, i) => `<path fill="none" stroke="${['#e8507e', '#4d96ff', '#6bcB77', '#ffd23f'][i]}" stroke-width="1.6" d="${q}"/>`).join(''))]),
  illu('Cafe wall', '#f0f0f0', [
    S('Rows', 'Draw 9 straight lines across, same distance apart. Use a ruler! These make 8 rows.', `<path d="${CW.lines}"/>`),
    S('Rows 1, 3, 5, 7', 'Color dark squares in the odd rows. Leave a white square between every dark one.', `<path d="${CW.odd}"/>`, `<path fill="${DK}" d="${CW.odd}"/>`),
    S('Rows 2, 4, 6, 8', 'Now the other rows, but start HALF a square over. Move each row a little to the side!', `<path d="${CW.even}"/>`, `<path fill="${DK}" d="${CW.even}"/>`),
    S('Gray lines', 'Draw a thin gray line along each row line. The lines look slanted, but they are all straight! Check with a ruler! 🤯', `<path d="${CW.lines}"/>`, `<path fill="#9a9a9a" d="${CW.bars}"/>`)]),
  illu('Bulge', '#fff3d6', [
    S('Outside edge', 'Draw the edge of a square, but bend each side outward a little, like a pillow.', `<path d="${BG.frame}"/>`),
    S('Curvy lines up', 'Draw 7 curves from top to bottom. They bend outward in the middle and meet at the top and bottom.', `<path d="${BG.vert}"/>`),
    S('Curvy lines across', 'Draw 7 curves from left to right. Now you have a bulging grid!', `<path d="${BG.hor}"/>`),
    S('Checkerboard', 'Color every other square dark, like a chessboard. It looks like a ball is pushing out of the paper! 🤯', `<path d="${BG.frame} ${BG.vert} ${BG.hor}"/>`, `<path fill="${DK}" d="${BG.dark}"/>`)]),
  illu('Tunnel', '#f3e6ff', [
    S('Big square', 'Draw a big square with a ruler.', `<path d="${TN[0]}"/>`),
    S('Corner lines', 'Draw a line from each corner to the middle of the paper. Stop before you reach the center!', '<path d="M38 68 L128 158 M262 68 L172 158 M262 292 L172 202 M38 292 L128 202"/>'),
    S('Smaller squares', 'Draw squares inside, each a bit smaller than the last. Their corners touch the corner lines!', `<path d="${TN.slice(1).join(' ')}"/>`),
    S('Color the rings', 'Color every other ring purple. Now it looks like a deep tunnel going away from you! 🌀', `<path d="${TN.join(' ')}"/>`, TN.map((p, i) => `<path fill="${i % 2 ? '#fff' : '#7a62b8'}" d="${p}"/>`).join(''))]),
  illu('Ripple', '#e6fff6', [
    S('Top lines', 'Draw wavy lines across the top half. Near the middle, bend them UP, away from the center.', `<path d="${RP.slice(0, 6).map(pl).join(' ')}"/>`),
    S('Bottom lines', 'Now the bottom half. Near the middle, bend them DOWN. Make each line keep the same gap from its neighbor!', `<path d="${RP.slice(6).map(pl).join(' ')}"/>`),
    S('Stripes', 'Color every other stripe dark. Your paper looks like it is pushed out in the middle! 🌊', `<path d="${RP.map(pl).join(' ')}"/>`, RP.slice(0, 12).map((_, i) => i % 2 ? '' : `<path fill="${DK}" d="${rpBand(i)}"/>`).join(''))]),
];

// ---------- Texture sampler: six pencil textures, each in its own box.
const SW = [[28, 45], [157, 45], [28, 155], [157, 155], [28, 265], [157, 265]].map(([x, y]) => ({ x, y, w: 115, h: 92 }));
const swFrame = s => `M${s.x} ${s.y} h${s.w} v${s.h} h${-s.w}Z`;
const diag = (s, step, dir) => { let d = ''; for (let t = -s.h; t <= s.w; t += step) { let x1 = s.x + t, y1 = s.y, x2 = s.x + t + s.h, y2 = s.y + s.h;
  if (dir < 0) { x1 = s.x + s.w - t; x2 = x1 - s.h; }
  const c = (ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay; let t0 = 0, t1 = 1;
    for (const [p, q] of [[-dx, ax - s.x], [dx, s.x + s.w - ax], [-dy, ay - s.y], [dy, s.y + s.h - ay]]) { if (p === 0) { if (q < 0) return ''; } else { const r = q / p; if (p < 0) t0 = Math.max(t0, r); else t1 = Math.min(t1, r); } }
    return t0 >= t1 ? '' : `M${(ax + dx * t0).toFixed(1)} ${(ay + dy * t0).toFixed(1)} L${(ax + dx * t1).toFixed(1)} ${(ay + dy * t1).toFixed(1)} `; };
  d += c(x1, y1, x2, y2); } return d; };
const dots = s => { let d = ''; for (let i = 0; i < 70; i++) { const u = ((i * 37) % 70) / 70, v = ((i * 53) % 70) / 70; const x = s.x + 6 + u * (s.w - 12), y = s.y + 6 + v * (s.h - 12); if (u + v * .3 < .35 + (i % 5) * .12) d += `M${x.toFixed(1)} ${y.toFixed(1)} h.1 `; } for (let i = 0; i < 90; i++) { const x = s.x + 6 + ((i * 29) % 90) / 90 * (s.w - 12) * .55, y = s.y + 6 + ((i * 41) % 90) / 90 * (s.h - 12); d += `M${x.toFixed(1)} ${y.toFixed(1)} h.1 `; } return d; };
const bricks = s => { let d = ''; const bh = s.h / 5, bw = s.w / 4; for (let r = 1; r < 5; r++) d += `M${s.x} ${s.y + r * bh} h${s.w} `; for (let r = 0; r < 5; r++) for (let c = 1; c < 4; c++) { const x = s.x + c * bw + (r % 2 ? bw / 2 : 0); if (x < s.x + s.w - 2 && x > s.x + 2) d += `M${x} ${s.y + r * bh} v${bh} `; } return d + (''); };
const waves = s => { let d = ''; for (let r = 1; r <= 6; r++) { const y = s.y + r * s.h / 7; d += `M${s.x} ${y}`; for (let x = 0; x < s.w; x += 23) d += ` q5.75 -9 11.5 0 q5.75 9 11.5 0`; d += ' '; } return d; };
const fur = s => { let d = ''; for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) { const x = s.x + 8 + c * 12.5 + (r % 2) * 6, y = s.y + 10 + r * 14; if (x < s.x + s.w - 8) d += `M${x} ${y} l${3 + (c % 3)} 9 `; } return d; };
const TEX = illu('Texture sampler', '#fff3d6', [
  S('Six boxes', 'Draw 6 boxes, 2 across and 3 down. Use a ruler! Each box gets its own texture.', SW.map(s => `<path d="${swFrame(s)}"/>`).join('')),
  S('Hatching', 'Straight parallel lines, all leaning the same way. Keep the gaps equal.', `<path d="${diag(SW[0], 10, 1)}"/>`),
  S('Cross-hatching', 'Lines one way, then lines the other way on top. Darker where they cross!', `<path d="${diag(SW[1], 12, 1)} ${diag(SW[1], 12, -1)}"/>`),
  S('Dots', 'Tiny dots only, no lines. Put more dots on one side to make it look darker there!', `<path d="${dots(SW[2])}"/>`),
  S('Bricks', 'Straight rows, then short up-and-down lines. Shift every second row!', `<path d="${bricks(SW[3])}"/>`),
  S('Waves', 'Rows of little wavy "s" lines that go on and on.', `<path d="${waves(SW[4])}"/>`),
  S('Fluffy fur', 'Lots of short little lines, like tiny hairs, all pointing down.', `<path d="${fur(SW[5])}"/>`)]);
ILLU.push(TEX);

// ---------- More 3D perspective
const rP = isoP(150, 150, 44);
const rFloor = poly([rP(0, 0, 0), rP(3, 0, 0), rP(3, 3, 0), rP(0, 3, 0)]);
const rWallL = poly([rP(0, 0, 0), rP(0, 3, 0), rP(0, 3, 2.6), rP(0, 0, 2.6)]), rWallR = poly([rP(0, 0, 0), rP(3, 0, 0), rP(3, 0, 2.6), rP(0, 0, 2.6)]);
const win = poly([rP(1, 0, 1.1), rP(2, 0, 1.1), rP(2, 0, 2.1), rP(1, 0, 2.1)]);
const bed = box(rP, 0, .5, 0, 1.3, 2, .5), blanket = box(rP, 0, 1.2, .5, 1.3, 1.3, .16), pillow = box(rP, .1, .6, .5, 1.1, .5, .16);
const rug = poly([rP(1.6, 1.4, 0), rP(2.8, 1.4, 0), rP(2.8, 2.7, 0), rP(1.6, 2.7, 0)]);
const sP = isoP(150, 200, 40);
const STAIRS = [3, 2, 1, 0].map(i => box(sP, (3 - i) * .8 - .8 + .8 - .8, 0, 0, .8 + (3 - i) * 0, 2, (i + 1) * .45));
const stairBoxes = [0, 1, 2, 3].map(i => box(sP, (3 - i) * .8, 0, 0, .8, 2, (i + 1) * .45));
const stairCols = ['#ffd0e1', '#ffc2dc', '#ffb3cf', '#ff9ec7'];
const ex = (f, x) => 100 + 160 * f + (170 - (100 + 160 * f)) * (Math.abs(x - 150) / 130);
const cornerLines = side => { const xs = [150 + side * 28, 150 + side * 56, 150 + side * 84]; let d = ''; xs.forEach(x => { d += `M${x} ${ex(0, x).toFixed(1)} V${ex(1, x).toFixed(1)} `; }); [.25, .5, .75].forEach(f => { d += `M150 ${100 + 160 * f} L${150 + side * 90} ${ex(f, 150 + side * 90).toFixed(1)} `; }); return d; };
const wins = side => { const xs = [150 + side * 14, 150 + side * 42, 150 + side * 70, 150 + side * 98], rows = [[.1, .3], [.4, .6], [.7, .9]]; let d = ''; for (const [f0, f1] of rows) for (let c = 0; c < 3; c++) { const a = xs[c], b = xs[c + 1] ; const xa = a + side * 6, xb = b - side * 6; d += `M${xa} ${ex(f0, xa).toFixed(1)} L${xb} ${ex(f0, xb).toFixed(1)} L${xb} ${ex(f1, xb).toFixed(1)} L${xa} ${ex(f1, xa).toFixed(1)}Z `; } return d; };
const wallQuad = side => { const x = 150 + side * 90; return poly([[150, 100], [x, ex(0, x)], [x, ex(1, x)], [150, 260]]); };
const PERSP = [
  { name:'Cozy room', style:'3D · isometric room', adv:true, bg:'#fff0f5', steps:[
    S('Floor diamond', 'Draw a big diamond lying flat. This is the floor of the room.', `<path d="${rFloor}"/>`, `<path fill="#f3d9b1" d="${rFloor}"/>`),
    S('Two back walls', 'Draw two walls standing on the BACK edges of the floor, like the corner of a box. Same height!', `<path d="${rWallL}"/><path d="${rWallR}"/>`, `<path fill="#ffd0e1" d="${rWallL}"/><path fill="#ffe3ee" d="${rWallR}"/>`),
    S('Window', 'A rectangle on the right wall, with a cross inside. Follow the slant of the wall!', `<path d="${win}"/><path d="${seg(rP(1.5, 0, 1.1), rP(1.5, 0, 2.1))}"/><path d="${seg(rP(1, 0, 1.6), rP(2, 0, 1.6))}"/>`, `<path fill="#bfe8ff" d="${win}"/>`),
    S('Bed', 'A long low box against the left wall. Draw it like a cube, just longer!', boxLines(bed), boxFill(bed, '#8fd3ff')),
    S('Blanket and pillow', 'A thin flat box for the blanket, and a small thin box for the pillow. 🛏️', boxLines(blanket) + boxLines(pillow), boxFill(blanket, '#ff8fc0') + boxFill(pillow, '#ffffff')),
    S('Rug', 'A flat shape on the floor. It follows the same slanted lines as the floor!', `<path d="${rug}"/>`, `<path fill="#b9a3ff" d="${rug}"/>`)] },
  { name:'3D stairs', style:'3D · isometric', adv:true, bg:'#f3e6ff', steps:[
    ...[3, 2, 1, 0].map((i, n) => ({ ...S(['Tallest step at the back', 'Next step down', 'Another step down', 'Lowest step at the front'][n], ['Draw a tall box. Start with the back one so the front ones can cover it!', 'A box in front of it, a bit shorter. Same width!', 'One more box, even shorter.', 'The last box is the lowest. Now you can see a staircase!'][n], boxLines(stairBoxes[i]), boxFill(stairBoxes[i], stairCols[i])) })),
    S('Flag on top', 'A thin pole on the top step and a little flag. 🚩', `<path d="${seg(sP(.4, 1, 1.8), sP(.4, 1, 2.8))}"/><path d="${poly([sP(.4, 1, 2.8), sP(.4, 1, 2.35), sP(.4, 1.5, 2.6)])}"/>`, `<path fill="#e8507e" d="${poly([sP(.4, 1, 2.8), sP(.4, 1, 2.35), sP(.4, 1.5, 2.6)])}"/>`),
    UN('Shadow', 'The steps make a shadow on the ground, to the right.', `<path d="${poly([sP(3.2, 0, 0), sP(3.2, 2, 0), sP(3.9, 2.3, 0), sP(3.9, .3, 0)])}"/>`, `<path fill="#c9bfe0" d="${poly([sP(3.2, 0, 0), sP(3.2, 2, 0), sP(3.9, 2.3, 0), sP(3.9, .3, 0)])}"/>`)] },
  { name:'City corner', style:'3D · 2-point perspective', adv:true, bg:'#dff0ff', steps:[
    S('Horizon and 2 dots', 'Draw a flat line across. Put one dot near each end. These are TWO vanishing points!', '<path d="M20 170 H280"/><circle cx="20" cy="170" r="4"/><circle cx="280" cy="170" r="4"/>'),
    S('Corner line', 'A tall straight line in the middle. This is the closest corner of the building.', '<path d="M150 100 V260"/>'),
    { ...S('Guidelines', 'From the top and the bottom of the corner, draw light lines to BOTH dots. They show how the walls shrink.', `<path class="guide" d="M150 100 L20 170 M150 260 L20 170 M150 100 L280 170 M150 260 L280 170"/>`), guide: true },
    S('Side edges', 'Draw a straight line up and down at the end of each wall. The walls get shorter far away!', `<path d="${seg([60, ex(0, 60)], [60, ex(1, 60)])}"/><path d="${seg([240, ex(0, 240)], [240, ex(1, 240)])}"/>`, `<path fill="#ffd9e6" d="${wallQuad(-1)}"/><path fill="#d6c9ff" d="${wallQuad(1)}"/>`),
    S('Close the building', 'Draw the top and bottom lines of both walls, along the guidelines.', `<path d="${seg([150, 100], [60, ex(0, 60)])}"/><path d="${seg([150, 260], [60, ex(1, 60)])}"/><path d="${seg([150, 100], [240, ex(0, 240)])}"/><path d="${seg([150, 260], [240, ex(1, 240)])}"/>`),
    S('Windows left', 'Draw windows on the left wall. Their top and bottom edges follow the slant to the left dot.', `<path d="${wins(-1)}"/>`, `<path fill="#fff2a8" d="${wins(-1)}"/>`),
    S('Windows right', 'The same on the right wall. The windows far away are narrower than the close ones!', `<path d="${wins(1)}"/>`, `<path fill="#fff2a8" d="${wins(1)}"/>`)] },
];

// ---------- Home screen with all groups
const GROUPS2 = [['👧 Girls', GIRLS], ['🧱 Blocky characters', BLOCKY], ['🧊 3D blocky characters', BLOCKY3D], ['🐷 Blocky animals & things', BLOCKY2], ['🟦 Pixel art (on a grid)', PIXEL], ['🎀 Girly things', GIRLY], ['🐼 Cute animals', CUTE],
  ['🐱 Animals, nature & more', THINGS], ['🧊 3D, light & shadow', [...SOLID, ...SOLID2, ...PERSP]], ['🌀 Optical illusions (lines & boxes)', ILLU], ['⭐ Advanced (for big kids)', ADV]];
ITEMS = GROUPS2.flatMap(([, list]) => list);
$('grid').innerHTML = GROUPS2.map(([title, list]) => `<h2 class="group">${title}</h2><div class="grid">${list.map(card).join('')}</div>`).join('');
