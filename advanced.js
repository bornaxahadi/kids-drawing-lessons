// Advanced lessons (for big kids) and cute Korean-style animals. They use layers: a step with
// `under: true` goes BEHIND the parts already drawn, so overlapping looks right (like real drawing).
const U = (t, tip, svg, back = '', front = '') => ({ t, tip, svg, back, front, under: true });
const pt = (cx, cy, r, a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
const petal = (cx, cy, a, r0, r1, w) => { const m = (r0 + r1) / 2 + 8;
  return `M${pt(cx, cy, r0, a - w)} Q${pt(cx, cy, m, a - w * 1.15)} ${pt(cx, cy, r1, a)} Q${pt(cx, cy, m, a + w * 1.15)} ${pt(cx, cy, r0, a + w)}`; };
// Straight lines across a circle (for the sunflower seeds).
const chords = (cx, cy, r, ang, ds) => ds.map(d => { const ux = Math.cos(ang), uy = Math.sin(ang), h = Math.sqrt(r * r - d * d), x = cx - uy * d, y = cy + ux * d;
  return `<path d="M${(x - ux * h).toFixed(1)} ${(y - uy * h).toFixed(1)} L${(x + ux * h).toFixed(1)} ${(y + uy * h).toFixed(1)}"/>`; }).join('');
const pine = (x, b, s) => `M${x} ${b - 70 * s} L${x - 24 * s} ${b - 34 * s} H${x - 14 * s} L${x - 32 * s} ${b} H${x + 32 * s} L${x + 14 * s} ${b - 34 * s} H${x + 24 * s}Z`;
const pineTrunk = (x, b, s) => `M${x - 5 * s} ${b} V${b + 14 * s} H${x + 5 * s} V${b}`;
const grid = (xs, ys, ok, f) => xs.flatMap(x => ys.filter(y => ok(x, y)).map(y => f(x, y))).join('');
const range = (a, b, s) => Array.from({ length: Math.floor((b - a) / s) + 1 }, (_, i) => a + i * s);
const both = (d, fill) => [`<path d="${d}"/>`, `<path fill="${fill}" d="${d}Z"/>`];

// ---------- Advanced
const FISH_BODY = 'M60 180 Q110 110 190 140 Q230 155 236 180 Q230 205 190 220 Q110 250 60 180';
const FISH_TAIL = 'M232 176 Q266 118 292 128 Q268 158 274 180 Q268 202 292 232 Q266 242 232 186';
const OWL = 'M150 70 Q230 74 226 200 Q222 300 150 304 Q78 300 74 200 Q70 74 150 70';
const OWL_FACE = 'M150 110 Q110 80 92 116 Q80 160 120 172 Q146 178 150 160 Q154 178 180 172 Q220 160 208 116 Q190 80 150 110';
const OWL_BELLY = 'M108 188 Q150 168 192 188 Q202 262 150 290 Q98 262 108 188';
const SKY = 'M20 40 H280 V200 H20Z';

const ADV = [
  { name:'Sunflower', style:'Advanced', adv:true, bg:'#e6f6ff', steps:[
    S('Two circles', 'Draw a circle for the middle, then a smaller circle inside it.', '<circle cx="150" cy="120" r="40"/><circle cx="150" cy="120" r="28"/>', '', '<circle fill="#7a4a22" cx="150" cy="120" r="40"/><circle fill="#4a2a12" cx="150" cy="120" r="28"/>'),
    S('Seed pattern', 'Draw lines one way, then lines the other way. It makes little diamonds — that is called cross-hatching!',
      chords(150, 120, 28, Math.PI / 4, [-21, -14, -7, 0, 7, 14, 21]) + chords(150, 120, 28, -Math.PI / 4, [-21, -14, -7, 0, 7, 14, 21])),
    U('Front petals', 'Pointy petals all the way around, like a clock. They start at the big circle.', ring(12, a => `<path d="${petal(150, 120, a, 36, 92, .2)}"/>`), '',
      ring(12, a => `<path fill="#ffc928" d="${petal(150, 120, a, 36, 92, .2)}Z"/>`)),
    U('Back petals', 'Now draw petals peeking out BETWEEN the front petals. Only draw the parts you can see!', ring(12, a => `<path d="${petal(150, 120, a + Math.PI / 12, 36, 102, .19)}"/>`), '',
      ring(12, a => `<path fill="#f29f16" d="${petal(150, 120, a + Math.PI / 12, 36, 102, .19)}Z"/>`)),
    S('Petal lines', 'A short line in the middle of each front petal. It makes them look real.', ring(12, a => `<path d="M${pt(150, 120, 50, a)} L${pt(150, 120, 74, a)}"/>`)),
    U('Thick stem', 'Two lines next to each other going down. A thick stem holds a big flower!', '<path d="M144 158 Q136 250 144 340"/><path d="M156 158 Q148 250 156 340"/>', '',
      '<path fill="#4caf50" d="M144 158 Q136 250 144 340 H156 Q148 250 156 158Z"/>'),
    U('Big leaves', 'Two big leaves on the stem, with a curvy line in the middle of each.',
      '<path d="M142 262 Q96 220 58 244 Q96 294 142 276"/><path d="M142 270 Q100 252 62 246"/><path d="M154 228 Q202 186 242 208 Q206 258 154 242"/><path d="M154 236 Q198 220 238 210"/>', '',
      '<path fill="#5cb85c" d="M142 262 Q96 220 58 244 Q96 294 142 276Z M154 228 Q202 186 242 208 Q206 258 154 242Z"/>'),
    S('Leaf veins', 'Little lines coming out from the middle of each leaf.', '<path d="M118 260 l-8 -14"/><path d="M96 252 l-6 -12"/><path d="M110 262 l-4 12"/><path d="M180 228 l8 -14"/><path d="M204 220 l8 -12"/><path d="M192 228 l2 12"/>'),
    S('A buzzy bee', 'A little striped oval with two wings. Bzzz! 🐝', '<ellipse cx="244" cy="62" rx="16" ry="12"/><path d="M240 51 V73"/><path d="M250 52 V72"/><ellipse cx="238" cy="46" rx="8" ry="11"/><ellipse cx="252" cy="46" rx="8" ry="11"/>' + fade(INK, '<circle cx="232" cy="60" r="2.5"/>'), '',
      '<ellipse fill="#ffd23f" cx="244" cy="62" rx="16" ry="12"/><ellipse fill="#e6f6ff" cx="238" cy="46" rx="8" ry="11"/><ellipse fill="#e6f6ff" cx="252" cy="46" rx="8" ry="11"/>')] },

  { name:'Fluffy clouds', style:'Advanced', adv:true, bg:'#bfe3ff', steps:[
    S('Flat bottom', 'Clouds sit on a flat, slightly curved bottom line.', '<path d="M48 236 Q150 246 252 236"/>'),
    S('Big middle puff', 'A big round bump in the middle. This is the biggest part.', '<path d="M108 238 Q92 150 150 140 Q206 132 212 210"/>', '', '<path fill="#fff" d="M108 238 Q92 150 150 140 Q206 132 212 210 L214 240Z"/>'),
    U('Left puffs', 'Two smaller bumps on the left. They go BEHIND the big puff.', '<path d="M48 236 Q30 196 66 186 Q74 160 110 172"/>', '', '<path fill="#fff" d="M48 236 Q30 196 66 186 Q74 160 116 168 L120 240Z"/>'),
    U('Right puff', 'A medium bump on the right, also behind.', '<path d="M200 214 Q252 186 262 214 Q272 232 252 236"/>', '', '<path fill="#fff" d="M196 214 Q252 186 262 214 Q272 232 252 236 L196 240Z"/>'),
    S('Top puff', 'One more round bump on top of the big puff. Clouds are puffs on puffs!', '<path d="M126 156 Q122 98 170 100 Q214 104 204 162"/>', '', '<path fill="#fff" d="M126 156 Q122 98 170 100 Q214 104 204 162 Q166 176 126 156Z"/>'),
    S('Inside curves', 'Little "C" curves inside show where puffs overlap.', '<path d="M118 206 Q126 188 146 190"/><path d="M170 160 Q184 148 200 156"/><path d="M210 224 Q216 212 230 212"/>'),
    S('Shadow', 'Short slanted lines at the bottom make a shadow. Now the cloud looks fluffy and round!',
      '<path d="M76 232 l10 -12"/><path d="M92 236 l10 -12"/><path d="M118 238 l10 -12"/><path d="M178 238 l10 -12"/><path d="M200 238 l10 -12"/><path d="M226 236 l10 -12"/>', '',
      '<path fill="#d4e2f5" d="M50 234 Q100 220 150 228 Q200 220 252 234 Q150 248 50 234Z"/>'),
    U('Faraway cloud', 'A small cloud far away, behind. Faraway things look smaller!', '<path d="M30 120 Q26 96 50 98 Q58 78 82 88 Q102 84 102 108 Q114 120 98 124 H36 Q24 124 30 120"/>', '',
      '<path fill="#f4f9ff" d="M30 120 Q26 96 50 98 Q58 78 82 88 Q102 84 102 108 Q114 120 98 124 H36 Q24 124 30 120Z"/>'),
    U('Sun behind', 'The sun peeking out from behind the cloud, with rays. ☀️', '<circle cx="226" cy="112" r="34"/>' + ring(9, a => `<path d="M${pt(226, 112, 44, a)} L${pt(226, 112, 60, a)}"/>`), '',
      '<circle fill="#ffd23f" cx="226" cy="112" r="34"/>')] },

  { name:'Mountain lake', style:'Advanced', adv:true, bg:'#ffffff', steps:[
    { bg:true, ...S('Frame and horizon', 'Draw a big rectangle frame, then a straight line across — that is the horizon.', '<path d="M20 40 H280 V330 H20Z"/><path d="M20 200 H280"/>', `<path fill="#cfeaff" d="${SKY}"/>`) },
    S('Big mountain', 'A big triangle mountain sitting on the horizon.', '<path d="M40 200 L136 80 L232 200"/>', '', '<path fill="#8e9bc4" d="M40 200 L136 80 L232 200Z"/>'),
    S('Snowy top', 'A zig-zag line near the top for snow. ❄️', '<path d="M114 108 L125 112 L134 104 L142 114 L149 104 L158 108"/>', '', '<path fill="#fff" d="M114 108 L136 80 L158 108 L149 104 L142 114 L134 104 L125 112Z"/>'),
    U('Faraway mountain', 'A smaller mountain BEHIND the big one. Far things are smaller and lighter.', '<path d="M150 200 L226 124 L280 178"/>', '', '<path fill="#c3cbe6" d="M150 200 L226 124 L280 178 V200Z"/>'),
    S('Lake and grass', 'A curvy line under the horizon for the edge of the lake, and short lines for water shine.',
      '<path d="M20 214 Q150 246 280 214"/><path d="M60 208 h18"/><path d="M110 212 h30"/><path d="M190 210 h24"/>', '',
      '<path fill="#7cc4f0" d="M20 200 H280 V214 Q150 246 20 214Z"/><path fill="#8ed081" d="M20 214 Q150 246 280 214 V330 H20Z"/>'),
    S('Winding path', 'A path that starts thin far away and gets WIDER close to you. That is called perspective!',
      '<path d="M144 232 Q122 268 142 296 Q160 316 120 330"/><path d="M156 232 Q162 268 188 296 Q210 316 200 330"/>', '',
      '<path fill="#f0dcb0" d="M144 232 Q122 268 142 296 Q160 316 120 330 H200 Q210 316 188 296 Q162 268 156 232Z"/>'),
    S('Big pine tree', 'A pine tree close to you: two triangles stacked, and a trunk. 🌲', `<path d="${pine(64, 300, 1.2)}"/><path d="${pineTrunk(64, 300, 1.2)}"/>`, '',
      `<path fill="#9b6b43" d="${pineTrunk(64, 300, 1.2)}Z"/><path fill="#2e7d32" d="${pine(64, 300, 1.2)}"/>`),
    S('Small trees far away', 'The same trees, but tiny — because they are far away!', `<path d="${pine(214, 206, .42)}"/><path d="${pine(236, 210, .5)}"/><path d="${pine(256, 206, .38)}"/>`, '',
      `<path fill="#3d8b40" d="${pine(214, 206, .42)} ${pine(236, 210, .5)} ${pine(256, 206, .38)}"/>`),
    S('Sun and birds', 'A sun in the corner, and birds like little "m"s.', '<circle cx="246" cy="74" r="20"/><path d="M70 80 q7 -7 14 0 q7 -7 14 0"/><path d="M100 104 q5 -5 10 0 q5 -5 10 0"/>', '', '<circle fill="#ffd23f" cx="246" cy="74" r="20"/>'),
    S('Grass and flowers', 'Grass tufts and little flowers close to you.', '<path d="M190 318 l4 -12 l4 12 l4 -12 l4 12"/><path d="M240 290 l4 -12 l4 12 l4 -12 l4 12"/><circle cx="112" cy="290" r="5"/><circle cx="228" cy="314" r="5"/><circle cx="96" cy="316" r="5"/>', '',
      '<g fill="#ff6fae"><circle cx="112" cy="290" r="5"/><circle cx="228" cy="314" r="5"/><circle cx="96" cy="316" r="5"/></g>')] },

  { name:'Koi fish', style:'Advanced', adv:true, bg:'#d9f2ff', steps:[
    S('Body', 'A long smooth shape: round at the head, thinner at the tail.', `<path d="${FISH_BODY}"/>`, '', `<path fill="#fff6ee" d="${FISH_BODY}Z"/>`),
    S('Head line', 'A curved line behind the eye shows where the head ends.', '<path d="M106 144 Q122 180 106 220"/>'),
    S('Eye and mouth', 'A round eye with a shine, and a little mouth.', eyesDot([84], 172, 8) + '<path d="M62 184 q6 6 14 4"/>'),
    U('Flowing tail', 'A big tail like a ribbon. It goes behind the body.', `<path d="${FISH_TAIL}"/><path d="M244 174 L282 138"/><path d="M246 182 L280 180"/><path d="M244 190 L282 224"/>`, '', `<path fill="#ff7a3d" d="${FISH_TAIL}Z"/>`),
    U('Top fin', 'A fin on the back, with lines in it like a fan.', '<path d="M120 128 Q150 76 204 142"/><path d="M140 120 L148 100"/><path d="M162 124 L174 102"/><path d="M182 132 L192 114"/>', '', '<path fill="#ff7a3d" d="M120 128 Q150 76 204 142Z"/>'),
    U('Bottom fins', 'Two small fins underneath.', '<path d="M126 226 Q136 264 166 226"/><path d="M178 220 Q198 250 208 212"/>', '', '<path fill="#ff7a3d" d="M126 226 Q136 264 166 226Z M178 220 Q198 250 208 212Z"/>'),
    S('Scales', 'Lots of small ")" shapes in rows. These are the scales — be patient!',
      grid(range(122, 206, 16), range(152, 208, 14), (x, y) => ((x - 148) / 88) ** 2 + ((y - 180) / 36) ** 2 < .55, (x, y) => `<path d="M${x + ((y / 14) % 2 ? 8 : 0)} ${y - 6} q7 6 0 12"/>`)),
    S('Koi spots', 'Draw some patch shapes. We color them orange, like a real koi!', '<path d="M118 150 Q150 136 166 160 Q150 182 124 170Z"/><path d="M176 186 Q206 178 214 196 Q196 214 178 204Z"/>', '',
      '<path fill="#ff7a3d" d="M118 150 Q150 136 166 160 Q150 182 124 170Z M176 186 Q206 178 214 196 Q196 214 178 204Z"/>'),
    S('Bubbles and water', 'Bubbles and some lines for moving water.', '<circle cx="44" cy="146" r="9"/><circle cx="36" cy="114" r="6"/><circle cx="48" cy="90" r="4"/><path d="M30 290 q30 -12 60 0 t60 0 t60 0 t60 0"/><path d="M60 318 q30 -10 60 0 t60 0 t60 0"/>')] },

  { name:'Owl', style:'Advanced', adv:true, bg:'#2b3570', steps:[
    S('Body', 'A big egg shape for the owl.', `<path d="${OWL}"/>`, '', `<path fill="#9b6b43" d="${OWL}Z"/>`),
    U('Ear tufts', 'Two pointy feather tufts on top, behind the head.', '<path d="M96 100 L84 50 L130 78"/><path d="M204 100 L216 50 L170 78"/>', '<path fill="#7a4f2e" d="M96 100 L84 50 L130 78Z M204 100 L216 50 L170 78Z"/>'),
    S('Face shape', 'A heart shape for the face — owls have flat round faces.', `<path d="${OWL_FACE}"/>`, '', `<path fill="#f3d1a2" d="${OWL_FACE}Z"/>`),
    S('Big eyes', 'Two BIG circles. Then a colored circle, a dark middle, and a shine.',
      '<circle cx="122" cy="130" r="22"/><circle cx="178" cy="130" r="22"/>' + fade('#ffb300', '<circle cx="122" cy="132" r="14"/><circle cx="178" cy="132" r="14"/>') + eyesDot([122, 178], 132, 8), '',
      '<circle fill="#fff" cx="122" cy="130" r="22"/><circle fill="#fff" cx="178" cy="130" r="22"/>'),
    S('Beak', 'A small triangle beak between the eyes.', '<path d="M142 150 L150 172 L158 150Z"/>', '', '<path fill="#ffa94d" d="M142 150 L150 172 L158 150Z"/>'),
    S('Belly', 'A big round belly shape.', `<path d="${OWL_BELLY}"/>`, '', `<path fill="#f3e1c2" d="${OWL_BELLY}Z"/>`),
    S('Belly feathers', 'Small "u" shapes in rows. That is how feathers look!',
      grid(range(122, 178, 14), range(206, 270, 14), (x, y) => ((x - 150) / 40) ** 2 + ((y - 236) / 52) ** 2 < .6, (x, y) => `<path d="M${x + ((y - 206) / 14 % 2 ? 7 : 0) - 6} ${y} q6 7 12 0"/>`)),
    S('Wings', 'A wing on each side, like big leaves.', '<path d="M80 170 Q46 230 94 284 Q104 230 98 180"/><path d="M220 170 Q254 230 206 284 Q196 230 202 180"/>', '',
      '<path fill="#7a4f2e" d="M80 170 Q46 230 94 284 Q104 230 98 180Z M220 170 Q254 230 206 284 Q196 230 202 180Z"/>'),
    S('Feet and branch', 'Little feet holding a branch.', '<path d="M20 306 Q150 298 280 312"/><path d="M20 322 Q150 314 280 328"/><path d="M124 300 v10 M132 300 v10 M140 300 v10 M160 300 v10 M168 300 v10 M176 300 v10"/>', '',
      '<path fill="#6b4226" d="M20 306 Q150 298 280 312 V328 Q150 314 20 322Z"/>'),
    U('Moon and stars', 'A big moon and stars behind — owls come out at night! 🌙', `<circle cx="236" cy="62" r="26"/><path d="${star(50, 60, 10)}"/><path d="${star(262, 160, 8)}"/><path d="${star(40, 190, 8)}"/>`, '',
      `<circle fill="#fff3b0" cx="236" cy="62" r="26"/><path fill="#ffd23f" d="${star(50, 60, 10)} ${star(262, 160, 8)} ${star(40, 190, 8)}"/>`)] },
];

// ---------- Cute Korean-style animals
const PANDA_BODY = 'M96 204 Q76 300 110 330 H190 Q224 300 204 204';
const MONKEY_FACE = 'M150 112 Q120 86 104 112 Q92 140 110 160 Q100 192 150 196 Q200 192 190 160 Q208 140 196 112 Q180 86 150 112';
const HAMSTER = 'M150 100 Q236 100 240 200 Q244 300 150 300 Q56 300 60 200 Q64 100 150 100';
const HAMSTER_FACE = 'M150 150 Q100 150 96 210 Q100 290 150 290 Q200 290 204 210 Q200 150 150 150';
const BRIT = 'M150 76 Q238 78 240 160 Q244 226 150 230 Q56 226 60 160 Q62 78 150 76';
const catBody = 'M96 210 Q74 300 104 330 H196 Q226 300 204 210';
const whiskers = (y = 186) => `<path d="M112 ${y} H78"/><path d="M112 ${y + 8} L80 ${y + 18}"/><path d="M188 ${y} H222"/><path d="M188 ${y + 8} L220 ${y + 18}"/>`;
const blush = (y, dx = 50) => fade('#ff9fbf', `<ellipse cx="${150 - dx}" cy="${y}" rx="12" ry="8"/><ellipse cx="${150 + dx}" cy="${y}" rx="12" ry="8"/>`);
const bigEyes = (y, dx, iris, r = 14) => fade(iris, `<circle cx="${150 - dx}" cy="${y}" r="${r}"/><circle cx="${150 + dx}" cy="${y}" r="${r}"/>`) +
  fade(INK, `<ellipse cx="${150 - dx}" cy="${y}" rx="${r * .45}" ry="${r * .75}"/><ellipse cx="${150 + dx}" cy="${y}" rx="${r * .45}" ry="${r * .75}"/>`) +
  fade('#fff', `<circle cx="${150 - dx - 4}" cy="${y - 5}" r="${r * .3}"/><circle cx="${150 + dx - 4}" cy="${y - 5}" r="${r * .3}"/>`) +
  `<circle cx="${150 - dx}" cy="${y}" r="${r}"/><circle cx="${150 + dx}" cy="${y}" r="${r}"/>`;

const CUTE = [
  { name:'Panda', style:'Cute · with bamboo', adv:true, bg:'#e6f7e6', steps:[
    S('Round head', 'A big wide circle for the head.', '<ellipse cx="150" cy="150" rx="88" ry="78"/>', '', '<ellipse fill="#fff" cx="150" cy="150" rx="88" ry="78"/>'),
    U('Round ears', 'Two round ears on top, behind the head.', '<circle cx="84" cy="88" r="24"/><circle cx="216" cy="88" r="24"/>', '', `<circle fill="${INK}" cx="84" cy="88" r="24"/><circle fill="${INK}" cx="216" cy="88" r="24"/>`),
    S('Eye patches', 'Two tilted ovals — the famous panda eye patches!', '<ellipse cx="116" cy="152" rx="20" ry="27" transform="rotate(25 116 152)"/><ellipse cx="184" cy="152" rx="20" ry="27" transform="rotate(-25 184 152)"/>', '',
      `<ellipse fill="${INK}" cx="116" cy="152" rx="20" ry="27" transform="rotate(25 116 152)"/><ellipse fill="${INK}" cx="184" cy="152" rx="20" ry="27" transform="rotate(-25 184 152)"/>`),
    S('Shiny eyes', 'A small white circle inside each patch, with a dark dot.', fade('#fff', '<circle cx="118" cy="150" r="8"/><circle cx="182" cy="150" r="8"/>') + fade(INK, '<circle cx="119" cy="151" r="4.5"/><circle cx="181" cy="151" r="4.5"/>') + '<circle cx="118" cy="150" r="8"/><circle cx="182" cy="150" r="8"/>'),
    S('Nose and mouth', 'A little oval nose and a "w" mouth. Pink cheeks too!', fade(INK, '<ellipse cx="150" cy="178" rx="9" ry="6"/>') + '<ellipse cx="150" cy="178" rx="9" ry="6"/><path d="M150 184 q-8 10 -16 4"/><path d="M150 184 q8 10 16 4"/>' + blush(192, 58)),
    U('Chubby body', 'A round body under the head.', `<path d="${PANDA_BODY}"/>`, '', `<path fill="#fff" d="${PANDA_BODY}Z"/>`),
    U('Bamboo', 'A tall bamboo stick behind the panda: two lines with little rings, and leaves. 🎋',
      '<path d="M218 340 V168"/><path d="M234 340 V168"/><path d="M218 220 H234"/><path d="M218 270 H234"/><path d="M218 316 H234"/><path d="M234 186 Q266 168 276 186 Q256 198 234 186"/><path d="M234 230 Q262 220 272 236 Q252 244 234 230"/>', '',
      '<path fill="#7bc96f" d="M218 340 V168 H234 V340Z"/><path fill="#4caf50" d="M234 186 Q266 168 276 186 Q256 198 234 186Z M234 230 Q262 220 272 236 Q252 244 234 230Z"/>'),
    S('Arms', 'Two dark arms. One hugs the bamboo!', '<path d="M106 232 Q78 262 104 286 Q128 292 132 268"/><path d="M194 230 Q240 232 230 268 Q214 288 190 268"/>', '',
      `<path fill="${INK}" d="M106 232 Q78 262 104 286 Q128 292 132 268Z M194 230 Q240 232 230 268 Q214 288 190 268Z"/>`),
    S('Feet', 'Two round dark feet at the bottom.', '<ellipse cx="122" cy="330" rx="24" ry="14"/><ellipse cx="178" cy="330" rx="24" ry="14"/>', '',
      `<ellipse fill="${INK}" cx="122" cy="330" rx="24" ry="14"/><ellipse fill="${INK}" cx="178" cy="330" rx="24" ry="14"/>`)] },

  { name:'Monkey', style:'Cute · banana', adv:true, bg:'#fff3d6', steps:[
    S('Round head', 'A circle for the head.', '<circle cx="150" cy="140" r="70"/>', '', '<circle fill="#a0693d" cx="150" cy="140" r="70"/>'),
    U('Big ears', 'Round ears on the sides, with a smaller circle inside.', '<circle cx="78" cy="142" r="24"/><circle cx="222" cy="142" r="24"/><circle cx="78" cy="142" r="13"/><circle cx="222" cy="142" r="13"/>', '',
      '<circle fill="#a0693d" cx="78" cy="142" r="24"/><circle fill="#a0693d" cx="222" cy="142" r="24"/><circle fill="#f3c9a0" cx="78" cy="142" r="13"/><circle fill="#f3c9a0" cx="222" cy="142" r="13"/>'),
    S('Face shape', 'A big peanut shape for the face.', `<path d="${MONKEY_FACE}"/>`, '', `<path fill="#f3c9a0" d="${MONKEY_FACE}Z"/>`),
    S('Eyes', 'Two shiny dot eyes.', eyesDot([130, 170], 130, 8)),
    S('Nose and big smile', 'Two tiny dots for the nose, and a big happy smile!', fade(INK, '<circle cx="144" cy="160" r="2.5"/><circle cx="156" cy="160" r="2.5"/>') + '<path d="M126 172 Q150 194 174 172"/>' + blush(176, 42)),
    S('Hair curl', 'A little curl of hair on top.', '<path d="M140 72 q2 -18 16 -16 q-8 8 -2 16"/>'),
    U('Body', 'A small body, with a light tummy.', '<path d="M110 196 Q90 280 112 320 H188 Q210 280 190 196"/><ellipse cx="150" cy="268" rx="28" ry="38"/>', '',
      '<path fill="#a0693d" d="M110 196 Q90 280 112 320 H188 Q210 280 190 196Z"/><ellipse fill="#f3c9a0" cx="150" cy="268" rx="28" ry="38"/>'),
    U('Curly tail', 'A long tail that curls at the end like a spiral. 🌀', '<path d="M186 300 Q252 312 252 262 Q252 230 226 236 Q212 246 228 256"/>'),
    S('Banana', 'A yellow banana in its hands. Yum! 🍌', '<path d="M116 246 Q150 284 192 240 Q160 266 124 242Z"/><circle cx="118" cy="250" r="10"/><circle cx="188" cy="244" r="10"/>', '',
      '<path fill="#ffd23f" d="M116 246 Q150 284 192 240 Q160 266 124 242Z"/><circle fill="#a0693d" cx="118" cy="250" r="10"/><circle fill="#a0693d" cx="188" cy="244" r="10"/>')] },

  { name:'Hamster', style:'Cute · chubby', adv:true, bg:'#ffeef3', steps:[
    S('Round body', 'One big round shape — the hamster is head and body together!', `<path d="${HAMSTER}"/>`, '', `<path fill="#f2b366" d="${HAMSTER}Z"/>`),
    U('Little ears', 'Two small round ears on top.', '<circle cx="98" cy="112" r="18"/><circle cx="202" cy="112" r="18"/>' + fade('#ffc2dc', '<circle cx="98" cy="114" r="9"/><circle cx="202" cy="114" r="9"/>'), '',
      '<circle fill="#f2b366" cx="98" cy="112" r="18"/><circle fill="#f2b366" cx="202" cy="112" r="18"/>'),
    S('White face', 'A big round shape for the white face and tummy.', `<path d="${HAMSTER_FACE}"/>`, '', `<path fill="#fff6ea" d="${HAMSTER_FACE}Z"/>`),
    S('Eyes', 'Two shiny dark eyes.', eyesDot([120, 180], 170, 8)),
    S('Nose and mouth', 'A tiny pink nose and a little "w" mouth.', fade('#ff8fb0', '<path d="M145 188 H155 L150 194Z"/>') + '<path d="M145 188 H155 L150 194Z"/><path d="M150 194 q-6 8 -12 3"/><path d="M150 194 q6 8 12 3"/>'),
    S('Chubby cheeks', 'Big pink cheeks — hamsters keep food in their cheeks!', '<ellipse cx="102" cy="206" rx="16" ry="11"/><ellipse cx="198" cy="206" rx="16" ry="11"/>', '',
      '<ellipse fill="#ffb3c8" cx="102" cy="206" rx="16" ry="11"/><ellipse fill="#ffb3c8" cx="198" cy="206" rx="16" ry="11"/>'),
    S('Paws and a seed', 'Two tiny paws holding a sunflower seed.', '<ellipse cx="150" cy="244" rx="10" ry="17"/><path d="M150 230 V258"/><ellipse cx="132" cy="238" rx="10" ry="8"/><ellipse cx="168" cy="238" rx="10" ry="8"/>', '',
      `<ellipse fill="${INK}" cx="150" cy="244" rx="10" ry="17"/><ellipse fill="#ffc2dc" cx="132" cy="238" rx="10" ry="8"/><ellipse fill="#ffc2dc" cx="168" cy="238" rx="10" ry="8"/>`),
    S('Tiny feet', 'Two little pink feet at the bottom.', '<ellipse cx="118" cy="300" rx="16" ry="8"/><ellipse cx="182" cy="300" rx="16" ry="8"/>', '',
      '<ellipse fill="#ffc2dc" cx="118" cy="300" rx="16" ry="8"/><ellipse fill="#ffc2dc" cx="182" cy="300" rx="16" ry="8"/>')] },

  { name:'Scottish Fold cat', style:'Cute · folded ears', adv:true, bg:'#efe6ff', steps:[
    S('Round head', 'A wide round head.', '<ellipse cx="150" cy="150" rx="86" ry="76"/>', '', '<ellipse fill="#e8dccd" cx="150" cy="150" rx="86" ry="76"/>'),
    S('Folded ears', 'Tiny ears that fold down — that is what makes this cat special!', '<path d="M94 100 Q98 74 124 82 Q112 92 108 108"/><path d="M206 100 Q202 74 176 82 Q188 92 192 108"/>', '',
      '<path fill="#d4c2ae" d="M94 100 Q98 74 124 82 Q112 92 108 108Z M206 100 Q202 74 176 82 Q188 92 192 108Z"/>'),
    S('Big round eyes', 'Very big round eyes with a colored circle. So cute!', bigEyes(150, 34, '#ffc94d', 17)),
    S('Puffy muzzle', 'Two little puffs under the nose, and a pink nose on top.', '<path d="M150 182 q-18 -6 -20 8 q4 12 20 6 q16 6 20 -6 q-2 -14 -20 -8"/>' + fade('#ff8fb0', '<path d="M144 174 H156 L150 182Z"/>') + '<path d="M144 174 H156 L150 182Z"/>' + blush(196, 56), '',
      '<path fill="#fff" d="M150 182 q-18 -6 -20 8 q4 12 20 6 q16 6 20 -6 q-2 -14 -20 -8Z"/>'),
    S('Whiskers and stripes', 'Whiskers on the cheeks and three stripes on the forehead.', whiskers(186) + '<path d="M136 90 q4 12 0 22"/><path d="M150 86 v24"/><path d="M164 90 q-4 12 0 22"/>'),
    U('Round body', 'A round sitting body behind the head.', `<path d="${catBody}"/>`, '', `<path fill="#e8dccd" d="${catBody}Z"/>`),
    U('Fluffy tail', 'A thick tail curling around.', '<path d="M196 322 Q256 322 252 270 Q250 252 236 254 Q240 300 196 306"/>', '', '<path fill="#d4c2ae" d="M196 322 Q256 322 252 270 Q250 252 236 254 Q240 300 196 306Z"/>'),
    S('Paws', 'Two round paws in front.', '<ellipse cx="126" cy="328" rx="20" ry="12"/><ellipse cx="174" cy="328" rx="20" ry="12"/>', '', '<ellipse fill="#fff" cx="126" cy="328" rx="20" ry="12"/><ellipse fill="#fff" cx="174" cy="328" rx="20" ry="12"/>')] },

  { name:'British cat', style:'Cute · chubby cheeks', adv:true, bg:'#e3f0ff', steps:[
    S('Chubby head', 'A very round, chubby head — wider at the cheeks.', `<path d="${BRIT}"/>`, '', `<path fill="#8f9bb3" d="${BRIT}Z"/>`),
    U('Small ears', 'Two small rounded triangle ears.', '<path d="M84 114 L82 58 L128 86"/><path d="M216 114 L218 58 L172 86"/>' + fade('#ffc2dc', '<path d="M92 100 L91 72 L114 86Z M208 100 L209 72 L186 86Z"/>'), '',
      '<path fill="#8f9bb3" d="M84 114 L82 58 L128 86Z M216 114 L218 58 L172 86Z"/>'),
    S('Copper eyes', 'Big round orange eyes — British cats have copper eyes!', bigEyes(150, 34, '#ff9d2e', 16)),
    S('Chubby cheeks', 'A wide puffy muzzle, like a little cloud.', '<path d="M150 180 Q124 170 122 192 Q128 210 150 200 Q172 210 178 192 Q176 170 150 180"/>', '', '<path fill="#b4bed3" d="M150 180 Q124 170 122 192 Q128 210 150 200 Q172 210 178 192 Q176 170 150 180Z"/>'),
    S('Nose and smile', 'A little nose and a happy cat smile.', fade('#7d6b8a', '<path d="M144 176 H156 L150 184Z"/>') + '<path d="M144 176 H156 L150 184Z"/><path d="M150 186 q-8 10 -16 4"/><path d="M150 186 q8 10 16 4"/>' + blush(198, 62)),
    S('Whiskers', 'Two whiskers on each side.', whiskers(192)),
    U('Body', 'A round body under the head.', `<path d="${catBody}"/>`, '', `<path fill="#8f9bb3" d="${catBody}Z"/>`),
    S('Bow tie', 'A fancy red bow tie! 🎀', '<path d="M150 238 L128 226 L128 250Z"/><path d="M150 238 L172 226 L172 250Z"/><circle cx="150" cy="238" r="6"/>', '',
      '<path fill="#e8505b" d="M150 238 L128 226 L128 250Z M150 238 L172 226 L172 250Z"/><circle fill="#c2456b" cx="150" cy="238" r="6"/>'),
    S('Paws and tail', 'Two paws in front and a tail on the side.', '<ellipse cx="126" cy="328" rx="20" ry="12"/><ellipse cx="174" cy="328" rx="20" ry="12"/><path d="M200 314 Q248 316 246 270"/>', '',
      '<ellipse fill="#8f9bb3" cx="126" cy="328" rx="20" ry="12"/><ellipse fill="#8f9bb3" cx="174" cy="328" rx="20" ry="12"/>')] },
];

// ---------- Home screen
const GROUPS = [['👧 Girls', GIRLS], ['🐼 Cute animals', CUTE], ['🐱 Animals, nature & more', THINGS], ['⭐ Advanced (for big kids)', ADV], ['🧊 3D drawing (perspective & isometric)', SOLID]];
ITEMS = GROUPS.flatMap(([, list]) => list);
// Cards start empty. The picture is drawn only when the card scrolls near the screen (see more.js).
const card = g => `<button class="pick" onclick="open_(${ITEMS.indexOf(g)})">
  <svg viewBox="0 0 300 360" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" data-i="${ITEMS.indexOf(g)}"></svg>
  <b>${g.name}</b><span>${g.style}</span></button>`;
