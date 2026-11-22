// Animals and things to draw. Same step format as the girls, with real colors in the fills.
const S = (t, tip, svg, back = '', front = '') => ({ t, tip, svg, back, front });
const fade = (fill, inner) => `<g class="fade" fill="${fill}" stroke="none">${inner}</g>`;
const eyesDot = (xs, y, r) => fade(INK, xs.map(x => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')) +
  fade('#fff', xs.map(x => `<circle cx="${x - r * .3}" cy="${y - r * .35}" r="${r * .35}"/>`).join('')) + xs.map(x => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('');
const ring = (n, f) => Array.from({ length: n }, (_, i) => f(i * 2 * Math.PI / n, i)).join('');

const CAT_BODY = 'M108 180 Q78 260 96 320 H204 Q222 260 192 180';
const CAT_TAIL = 'M200 310 Q262 306 252 244 Q248 226 262 214 Q272 230 266 250 Q276 318 204 324';
const DOG_EARS = 'M94 104 Q60 100 62 150 Q64 190 90 180 Q100 150 100 120 M206 104 Q240 100 238 150 Q236 190 210 180 Q200 150 200 120';
const BUTTER_TOP = 'M144 160 Q80 70 56 120 Q44 176 144 190 M156 160 Q220 70 244 120 Q256 176 156 190';
const BUTTER_BOT = 'M144 196 Q70 196 78 250 Q96 292 146 226 M156 196 Q230 196 222 250 Q204 292 154 226';
const SCOOP = 'M100 192 Q96 140 150 136 Q204 140 200 192 Q186 204 172 192 Q158 206 150 194 Q140 206 126 192 Q112 204 100 192';
const TREE_TOP = scallop(150, 140, 84, 74, 0, 360, 12, 22);
const LEAF = 'M60 300 Q50 120 240 60 Q260 250 60 300';
const closed = d => d.replace(/ M/g, 'Z M') + 'Z';

const THINGS = [
  { name:'Cat', style:'Animal', bg:'#ffeccf', steps:[
    S('Round head', 'A big circle for the head.', '<circle cx="150" cy="130" r="62"/>', '', '<circle fill="#ffb26b" cx="150" cy="130" r="62"/>'),
    S('Pointy ears', 'Two triangles on top of the head.', '<path d="M98 96 L92 40 L134 72"/><path d="M202 96 L208 40 L166 72"/>' + fade('#ffc2dc', '<path d="M102 82 L100 54 L124 72Z M198 82 L200 54 L176 72Z"/>'),
      '<path fill="#ffb26b" d="M98 96 L92 40 L134 72Z M202 96 L208 40 L166 72Z"/>'),
    S('Cat eyes', 'Two ovals with a thin line in the middle — cat eyes!', fade('#7bd389', '<ellipse cx="126" cy="124" rx="11" ry="14"/><ellipse cx="174" cy="124" rx="11" ry="14"/>') +
      fade(INK, '<ellipse cx="126" cy="125" rx="3.5" ry="10"/><ellipse cx="174" cy="125" rx="3.5" ry="10"/>') + '<ellipse cx="126" cy="124" rx="11" ry="14"/><ellipse cx="174" cy="124" rx="11" ry="14"/>'),
    S('Nose and mouth', 'A tiny triangle nose and a little "w" mouth.', fade('#ff8fb0', '<path d="M143 148 H157 L150 157Z"/>') + '<path d="M143 148 H157 L150 157Z"/><path d="M150 157 q-6 10 -14 4"/><path d="M150 157 q6 10 14 4"/>'),
    S('Whiskers and stripes', 'Two whiskers on each side, and three stripes on her head.', '<path d="M116 152 H82"/><path d="M116 160 L84 170"/><path d="M184 152 H218"/><path d="M184 160 L216 170"/><path d="M140 80 l4 14"/><path d="M150 76 v16"/><path d="M160 80 l-4 14"/>'),
    S('Body', 'A round body sitting under the head.', `<path d="${CAT_BODY}"/>`, `<path fill="#ffb26b" d="${CAT_BODY}Z"/>`, fade('#fff1dc', '<ellipse cx="150" cy="262" rx="30" ry="44"/>')),
    S('Tail and paws', 'A curly tail and two little paws.', `<path d="${CAT_TAIL}"/><path d="M118 320 q0 -18 14 -18 q14 0 14 18"/><path d="M154 320 q0 -18 14 -18 q14 0 14 18"/>`, `<path fill="#ffb26b" d="${CAT_TAIL}Z"/>`)] },

  { name:'Dog', style:'Animal', bg:'#e6f4ff', steps:[
    S('Head', 'A wide oval for the head.', '<ellipse cx="150" cy="135" rx="66" ry="58"/>', '', '<ellipse fill="#f3d1a2" cx="150" cy="135" rx="66" ry="58"/>'),
    S('Floppy ears', 'Two long floppy ears hanging down. Flop!', `<path d="${DOG_EARS}"/>`, '', `<path fill="#9b6b43" d="${closed(DOG_EARS)}"/>`),
    S('Eyes and a spot', 'Two dark eyes, and a big spot around one eye.', '<ellipse cx="176" cy="124" rx="20" ry="18"/>' + eyesDot([126, 174], 126, 9), '', '<ellipse fill="#c99560" cx="176" cy="124" rx="20" ry="18"/>'),
    S('Snout and nose', 'A round snout, and a big dark nose on top.', '<ellipse cx="150" cy="162" rx="28" ry="21"/>' + fade(INK, '<ellipse cx="150" cy="152" rx="12" ry="8"/>') + '<ellipse cx="150" cy="152" rx="12" ry="8"/>', '', '<ellipse fill="#fff1dc" cx="150" cy="162" rx="28" ry="21"/>'),
    S('Mouth and tongue', 'A little line down, a smile, and a pink tongue!', fade('#ff8fa3', '<path d="M143 172 q7 18 14 0Z"/>') + '<path d="M150 160 V170"/><path d="M150 170 q-10 9 -18 2"/><path d="M150 170 q10 9 18 2"/><path d="M143 172 q7 18 14 0"/>'),
    S('Body', 'A body under the head, like a big bean.', '<path d="M112 186 Q86 256 100 320 H200 Q214 256 188 186"/>', '<path fill="#f3d1a2" d="M112 186 Q86 256 100 320 H200 Q214 256 188 186Z"/>'),
    S('Collar', 'A collar around the neck with a round tag.', '<path d="M110 186 Q150 206 190 186 L188 198 Q150 218 112 198Z"/><circle cx="150" cy="214" r="8"/>', '', '<path fill="#e8505b" d="M110 186 Q150 206 190 186 L188 198 Q150 218 112 198Z"/><circle fill="#ffd23f" cx="150" cy="214" r="8"/>'),
    S('Paws and tail', 'Two paws, and a wagging tail. Wag wag!', '<path d="M116 320 q0 -18 16 -18 q16 0 16 18"/><path d="M152 320 q0 -18 16 -18 q16 0 16 18"/><path d="M200 296 Q244 290 238 246"/><path d="M250 250 l10 -6"/><path d="M252 266 l12 0"/>')] },

  { name:'Bird', style:'Animal', bg:'#fff6d6', steps:[
    S('Round body', 'A big round shape — birds are like little balls!', '<ellipse cx="150" cy="180" rx="72" ry="66"/>', '', '<ellipse fill="#6ec6ff" cx="150" cy="180" rx="72" ry="66"/>'),
    S('Belly', 'An oval on the bottom for the tummy.', '<path d="M100 214 Q150 262 200 214 Q150 190 100 214"/>', '', '<path fill="#fff3c4" d="M100 214 Q150 262 200 214 Q150 190 100 214Z"/>'),
    S('Wing', 'A wing shape on the side, like a leaf.', '<path d="M158 172 Q212 156 226 198 Q190 216 158 172"/>', '', '<path fill="#3d8fd6" d="M158 172 Q212 156 226 198 Q190 216 158 172Z"/>'),
    S('Eye and beak', 'A dark eye, and a little triangle beak.', eyesDot([118], 160, 10) + '<path d="M82 168 L56 180 L84 192"/>', '', '<path fill="#ffa94d" d="M82 168 L56 180 L84 192Z"/>'),
    S('Tail', 'Tail feathers sticking out the back.', '<path d="M218 196 L264 176 L256 204 L272 216 L220 222"/>', '<path fill="#3d8fd6" d="M218 196 L264 176 L256 204 L272 216 L220 222Z"/>'),
    S('Head feathers', 'Two little curls on top of the head.', '<path d="M140 116 q-6 -22 10 -28"/><path d="M152 115 q4 -20 20 -22"/>'),
    S('Legs and branch', 'Two little legs, standing on a branch with a leaf.', '<path d="M134 244 v22"/><path d="M166 244 v22"/><path d="M36 268 Q150 256 270 272"/><path d="M228 266 q16 -24 36 -14 q-14 22 -36 14"/>', '', '<path fill="#7bc96f" d="M228 266 q16 -24 36 -14 q-14 22 -36 14Z"/>')] },

  { name:'Bunny', style:'Animal', bg:'#ffe6f0', steps:[
    S('Head', 'A round head, a little wider than tall.', '<ellipse cx="150" cy="170" rx="60" ry="54"/>', '', '<ellipse fill="#fff" cx="150" cy="170" rx="60" ry="54"/>'),
    S('Long ears', 'Two long ovals on top. Bunnies have BIG ears!', '<ellipse cx="124" cy="82" rx="16" ry="46" transform="rotate(-8 124 82)"/><ellipse cx="176" cy="82" rx="16" ry="46" transform="rotate(8 176 82)"/>' +
      fade('#ffc2dc', '<ellipse cx="124" cy="86" rx="7" ry="32" transform="rotate(-8 124 86)"/><ellipse cx="176" cy="86" rx="7" ry="32" transform="rotate(8 176 86)"/>'),
      '<ellipse fill="#fff" cx="124" cy="82" rx="16" ry="46" transform="rotate(-8 124 82)"/><ellipse fill="#fff" cx="176" cy="82" rx="16" ry="46" transform="rotate(8 176 82)"/>'),
    S('Eyes', 'Two shiny dark eyes.', eyesDot([126, 174], 164, 8)),
    S('Nose, mouth and teeth', 'A tiny pink nose, a little mouth, and two teeth.', fade('#ff8fb0', '<path d="M144 184 H156 L150 191Z"/>') + '<path d="M144 184 H156 L150 191Z"/><path d="M150 191 q-6 9 -13 4"/><path d="M150 191 q6 9 13 4"/><path d="M145 197 h10 v9 h-10Z"/>', '', fade('#ff9fbf', '<circle cx="110" cy="190" r="9"/><circle cx="190" cy="190" r="9"/>')),
    S('Body', 'A round body, like a ball under the head.', '<path d="M112 216 Q86 280 104 324 H196 Q214 280 188 216"/>', '<path fill="#fff" d="M112 216 Q86 280 104 324 H196 Q214 280 188 216Z"/>'),
    S('Feet and tail', 'Two oval feet and a fluffy round tail.', '<ellipse cx="122" cy="324" rx="22" ry="10"/><ellipse cx="178" cy="324" rx="22" ry="10"/><circle cx="208" cy="294" r="14"/>', '<circle fill="#fff" cx="208" cy="294" r="14"/>', '<ellipse fill="#fff" cx="122" cy="324" rx="22" ry="10"/><ellipse fill="#fff" cx="178" cy="324" rx="22" ry="10"/>')] },

  { name:'Butterfly', style:'Animal', bg:'#eaf9e6', steps:[
    S('Body', 'A long thin oval in the middle.', '<ellipse cx="150" cy="192" rx="10" ry="58"/>', '', '<ellipse fill="#4a2c5e" cx="150" cy="192" rx="10" ry="58"/>'),
    S('Head and feelers', 'A small circle head, and two curly feelers.', '<circle cx="150" cy="122" r="14"/><path d="M145 110 Q132 76 118 70"/><path d="M155 110 Q168 76 182 70"/><circle cx="116" cy="68" r="5"/><circle cx="184" cy="68" r="5"/>', '', '<circle fill="#4a2c5e" cx="150" cy="122" r="14"/>'),
    S('Top wings', 'Two big round wings on top, one on each side.', `<path d="${BUTTER_TOP}"/>`, `<path fill="#ff8fc0" d="${closed(BUTTER_TOP)}"/>`),
    S('Bottom wings', 'Two smaller wings at the bottom.', `<path d="${BUTTER_BOT}"/>`, `<path fill="#b9a3ff" d="${closed(BUTTER_BOT)}"/>`),
    S('Spots', 'Circles on the wings. Make both sides the same!', '<circle cx="98" cy="130" r="13"/><circle cx="202" cy="130" r="13"/><circle cx="108" cy="240" r="9"/><circle cx="192" cy="240" r="9"/>', '',
      '<g fill="#ffd23f"><circle cx="98" cy="130" r="13"/><circle cx="202" cy="130" r="13"/><circle cx="108" cy="240" r="9"/><circle cx="192" cy="240" r="9"/></g>')] },

  { name:'House', style:'Thing', bg:'#e3f6ff', steps:[
    S('Square walls', 'A big square for the house.', '<path d="M70 170 H230 V320 H70Z"/>', '<path fill="#ffe08a" d="M70 170 H230 V320 H70Z"/>'),
    S('Triangle roof', 'A big triangle on top, a little wider than the walls.', '<path d="M54 176 L150 82 L246 176Z"/>', '', '<path fill="#e8607f" d="M54 176 L150 82 L246 176Z"/>'),
    S('Door', 'A door with a round top, and a little knob.', '<path d="M130 320 V254 Q150 232 170 254 V320"/><circle cx="162" cy="290" r="4"/>', '', '<path fill="#9b6b43" d="M130 320 V254 Q150 232 170 254 V320Z"/>'),
    S('Windows', 'Two square windows, each with a cross inside.', '<path d="M86 200 H122 V236 H86Z"/><path d="M104 200 V236 M86 218 H122"/><path d="M178 200 H214 V236 H178Z"/><path d="M196 200 V236 M178 218 H214"/>', '', '<path fill="#bfe8ff" d="M86 200 H122 V236 H86Z M178 200 H214 V236 H178Z"/>'),
    S('Chimney and smoke', 'A chimney on the roof, with curly smoke.', '<path d="M190 128 V88 H214 V152"/><path d="M202 78 q-12 -12 0 -24 q12 -12 0 -24"/>', '<path fill="#c2456b" d="M190 140 V88 H214 V152Z"/>'),
    S('Round window', 'A little round window in the roof.', '<circle cx="150" cy="140" r="14"/>', '', '<circle fill="#bfe8ff" cx="150" cy="140" r="14"/>'),
    S('Ground and path', 'A line for the ground, and a path to the door.', '<path d="M16 320 H284"/><path d="M130 320 L110 352"/><path d="M170 320 L190 352"/>', '', '<path fill="#8ed081" d="M16 320 H284 V352 H16Z"/><path fill="#e8d3b0" d="M130 320 L110 352 H190 L170 320Z"/>')] },

  { name:'Tree', style:'Nature', bg:'#e8f8ff', steps:[
    S('Trunk', 'Two lines up, getting a little closer at the top.', '<path d="M128 330 L136 220"/><path d="M172 330 L164 220"/>', '<path fill="#9b6b43" d="M128 330 L136 210 H164 L172 330Z"/>'),
    S('Branches', 'Two branches like arms going up.', '<path d="M138 240 Q114 226 104 200"/><path d="M162 236 Q186 222 196 198"/>'),
    S('Leafy top', 'A big bumpy cloud shape for all the leaves.', `<path d="${TREE_TOP}"/>`, '', `<path fill="#4caf50" d="${TREE_TOP}Z"/>`),
    S('Apples', 'Little red circles — yummy apples! 🍎', [[110, 120], [180, 104], [150, 170], [204, 160], [96, 176]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/>`).join(''), '',
      `<g fill="#e8505b">${[[110, 120], [180, 104], [150, 170], [204, 160], [96, 176]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/>`).join('')}</g>`),
    S('Grass', 'A ground line with little grass points.', '<path d="M50 330 H250"/><path d="M80 330 l6 -12 l6 12 M200 330 l6 -12 l6 12 M110 330 l5 -9 l5 9"/>')] },

  { name:'Leaf', style:'Nature', bg:'#fff4d6', steps:[
    S('Leaf shape', 'A big shape, round on one side and pointy on the end.', `<path d="${LEAF}"/>`, '', `<path fill="#7bc96f" d="${LEAF}Z"/>`),
    S('Middle line', 'A curvy line from the bottom to the tip.', '<path d="M60 300 Q150 190 240 60"/>'),
    S('Little lines', 'Small lines coming out of the middle line, like a fishbone.', '<path d="M100 252 Q96 220 80 200"/><path d="M100 252 Q130 254 150 266"/><path d="M146 196 Q140 160 124 140"/><path d="M146 196 Q180 196 204 208"/><path d="M192 136 Q188 110 176 94"/><path d="M192 136 Q216 136 230 146"/>'),
    S('Stem', 'A short stem at the bottom.', '<path d="M60 300 L36 334"/>'),
    S('Ladybug', 'A little ladybug on the leaf! Red circle and black dots. 🐞', '<circle cx="176" cy="170" r="18"/><path d="M176 152 V188"/>' + fade(INK, '<circle cx="168" cy="164" r="3.5"/><circle cx="184" cy="164" r="3.5"/><circle cx="168" cy="178" r="3.5"/><circle cx="184" cy="178" r="3.5"/>') + '<circle cx="176" cy="148" r="7"/>',
      '', '<circle fill="#e8505b" cx="176" cy="170" r="18"/><circle fill="' + INK + '" cx="176" cy="148" r="7"/>')] },

  { name:'Flower', style:'Nature', bg:'#fff0f6', steps:[
    S('Flower pot', 'A pot: a long rectangle on top, then a shape that gets smaller at the bottom.', '<path d="M92 236 H208 V256 H92Z"/><path d="M100 256 L112 330 H188 L200 256"/>', '', '<path fill="#e07a4a" d="M100 256 L112 330 H188 L200 256Z"/><path fill="#c9663a" d="M92 236 H208 V256 H92Z"/>'),
    S('Stem', 'A long line going up from the pot.', '<path d="M150 236 V132"/>'),
    S('Leaves', 'Two leaves on the stem, one on each side.', '<path d="M150 204 Q120 180 108 200 Q128 216 150 204"/><path d="M150 186 Q180 162 192 182 Q172 198 150 186"/>', '', '<path fill="#4caf50" d="M150 204 Q120 180 108 200 Q128 216 150 204Z M150 186 Q180 162 192 182 Q172 198 150 186Z"/>'),
    S('Petals', 'Oval petals all around in a circle.', ring(8, a => { const x = (150 + 36 * Math.cos(a)).toFixed(1), y = (108 + 36 * Math.sin(a)).toFixed(1); return `<ellipse cx="${x}" cy="${y}" rx="14" ry="22" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x} ${y})"/>`; }),
      ring(8, a => { const x = (150 + 36 * Math.cos(a)).toFixed(1), y = (108 + 36 * Math.sin(a)).toFixed(1); return `<ellipse fill="#ff8fc0" cx="${x}" cy="${y}" rx="14" ry="22" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x} ${y})"/>`; })),
    S('Center', 'A round circle in the middle.', '<circle cx="150" cy="108" r="22"/>', '', '<circle fill="#ffd23f" cx="150" cy="108" r="22"/>'),
    S('Happy face', 'Two dot eyes and a smile. Hello flower! 🌸', eyesDot([142, 158], 102, 3) + '<path d="M141 113 Q150 121 159 113"/>')] },

  { name:'Ice cream', style:'Yummy', bg:'#e6f7ff', steps:[
    S('Cone', 'A long triangle pointing down.', '<path d="M110 190 L150 330 L190 190"/>', '<path fill="#f2b366" d="M110 190 L150 330 L190 190Z"/>'),
    S('Waffle lines', 'Lines crossing each other on the cone.', '<path d="M126 204 L166 274"/><path d="M174 204 L134 274"/><path d="M150 196 L176 240"/><path d="M150 196 L124 240"/>'),
    S('Top scoop', 'A round scoop on top.', '<path d="M114 146 Q110 96 150 92 Q190 96 186 146"/>', '<path fill="#fff1dc" d="M114 146 Q110 96 150 92 Q190 96 186 146Z"/>'),
    S('Bottom scoop', 'A bigger scoop with a wavy bottom, like it is melting!', `<path d="${SCOOP}"/>`, '', `<path fill="#ff9ec7" d="${SCOOP}Z"/>`),
    S('Cherry', 'A cherry on top with a little stem. 🍒', '<circle cx="150" cy="80" r="12"/><path d="M150 68 q4 -16 18 -20"/>', '', '<circle fill="#e8505b" cx="150" cy="80" r="12"/>'),
    S('Sprinkles', 'Tiny lines all over — sprinkles!', '<path d="M128 112 l6 -4"/><path d="M166 108 l6 4"/><path d="M146 124 l2 -7"/><path d="M178 130 l-6 -3"/><path d="M122 132 l7 1"/>'),
    S('Happy face', 'Two eyes and a smile on the pink scoop.', eyesDot([134, 166], 164, 6) + '<path d="M140 176 Q150 186 160 176"/>')] },

  { name:'Rocket', style:'Space', bg:'#1f2a5c', steps:[
    S('Rocket body', 'A tall shape, pointy at the top and flat at the bottom.', '<path d="M150 50 Q206 110 196 250 H104 Q94 110 150 50Z"/>', '', '<path fill="#f2f2f7" d="M150 50 Q206 110 196 250 H104 Q94 110 150 50Z"/>'),
    S('Red top', 'A curved line near the top. We color above it red!', '<path d="M118 112 Q150 98 182 112"/>', '', '<path fill="#e8505b" d="M150 50 Q174 72 182 112 Q150 98 118 112 Q126 72 150 50Z"/>'),
    S('Window', 'A round window, with a smaller circle inside.', '<circle cx="150" cy="160" r="26"/><circle cx="150" cy="160" r="17"/>', '', '<circle fill="#9aa4c8" cx="150" cy="160" r="26"/><circle fill="#8fd3ff" cx="150" cy="160" r="17"/>'),
    S('Fins', 'A fin on each side, like little wings.', '<path d="M104 196 L66 262 L104 250"/><path d="M196 196 L234 262 L196 250"/>', '<path fill="#e8505b" d="M104 196 L66 262 L104 250Z M196 196 L234 262 L196 250Z"/>'),
    S('Fire', 'Fire coming out the bottom. Whoosh! 🔥', '<path d="M118 250 Q126 300 150 336 Q174 300 182 250"/>' + fade('#ffd23f', '<path d="M134 250 Q140 284 150 306 Q160 284 166 250Z"/>'), '<path fill="#ff8a3d" d="M118 250 Q126 300 150 336 Q174 300 182 250Z"/>'),
    S('Stars', 'Some stars in the sky around the rocket. ⭐', `<path d="${star(56, 70, 14)}"/><path d="${star(250, 120, 12)}"/><path d="${star(60, 200, 10)}"/><path d="${star(244, 300, 14)}"/>`, '',
      `<path fill="#ffd23f" d="${star(56, 70, 14)} ${star(250, 120, 12)} ${star(60, 200, 10)} ${star(244, 300, 14)}"/>`)] },
];

