import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const gridHelper = new THREE.GridHelper(200, 50);
// const controls = new OrbitControls(camera, renderer.domElement);
// scene.add(gridHelper);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100);

const NUM_OF_TEXTS = 3;
const MAX_TIME = 150;
const LOADER = new FontLoader();

var unchosen = [
  "print(\"Hello world!\")",
  "self.text_pos = ((Button.PADDING_HORZ, self.height/2 - font_size[1]/2))",
  "for a, b in zip(x, y):\n  print(f\"{a} + {b} {a+b}\")",
  "if event.type == QUIT:\n  running = False",
  "from django.contrib.auth.models import AbstractUser",
  "return HttpResponseRedirect(reverse(\"index\"))",
  "num_links = {site: len(links) for site, links in corpus.items()}",
  "result = self.backtrack(new_assignment)",
  "if neighbor not in open_nodes and not neighbor.visited:\n  heappush(open_nodes, neighbor)",
  "return [[0] for _ in xrange(num_buns)]",
  "numbers = [int(''.join([str(i) for i in permutation])) for permutation in permutations(range(n))]",
  "paths = queue.Queue()",
  "asc, desc = sorted(digits, reverse=True), sorted(digits)",
  "r = R * sin(theta/2) / (1 + sin(theta/2))",
  "t = Turtle()",
  "parser = argparse.ArgumentParser()",
  "indentation, code = re.search(\"(\s*)(.*)\", line).groups()",
  "t = np.linspace(0, 150, 10000)",
  "users = soup.select(\".table-recently-updated\")[0].select(\"tr\")",
  "energy = c * Math.pow(v, 2) / 2;",
  "for (double resistance : Resistors) {\n  eqResistance += 1 / resistance;\n}\nreturn 1 / eqResistance",
  "super(x, y, halfWidth, halfHeight, filled);",
  "WeightedQuickUnionUF uf = new WeightedQuickUnionUF(grid.length, grid[0].length);",
  "StdDraw.setFont(new Font(\"SansSerif\", Font.PLAIN, 12));",
  "methodBoard.board = game.getGrid();",
  "MessageDigest newHash = MessageDigest.getInstance(\"MD5\");",
  "Queue<Node[]> nodes = new LinkedList<Node[]>();",
  "String filename = sc.nextLine();",
  "Pattern p = Pattern.compile(\"\\w\");",
  "int index = hash(word);",
  "for (String prereq : adjlist.get(currentID)) {\n   if (DFSCycleChecker(adjlist, prereq, compareTo)) {\n    return true;\n  }\n}",
  "while (ptr != null) {\n  ptr = ptr.getNext();\n}",
  "huffmanRoot = Target.dequeue();",
  "const num = rollDice();\nclient.say(target, `You rolled a ${num}`);",
  "var percent = Math.floor((Math.random() * 100) + 1);",
  "document.addEventListener('keypress', event => key_pressed = event.key);",
  "var canvas = document.getElementById('myCanvas');",
  "row = r >= 1 && r <= MAX_ROWS ? r : row;",
  "var line_coords = coords.length == 2 ? [ox, oy, ...coords] : [...coords];",
  "ctx.fillRect(x, y, pxWidth, pxHeight);",
  "import * as THREE from 'three';",
  "fetch(`/emails/${id}`)\n.then(response => response.json())\n.then(email => { compose_email(email); });",
  "document.querySelector('#popup').style.display = 'none';",
  "const NUM_PAGINATOR_PAGES = 5;",
  "document.querySelector('#next').style.display = posts.length < 10 ? 'none' : '';",
  "<link rel=\"stylesheet\" href=\"style.css\">",
  "<a href=\"/index.html\"><img src=\"logo.png\" alt=\"Logo\"></a>",
  "{% block script %}\n  <script src=\"{% static 'app/main.js' %}\"></script>\n{% endblock %}",
  "<ul>\n  {% for item in watchlist %}\n    <li><a href=\"{% url 'listing' item.id %}\">{{ item.title }}</a></li>\n  {% empty %}\n    <li>Nothing is on your watchlist.</li>\n  {% endfor %}\n</ul>",
  "<h1 class=\"col clickable\">Description</h1>",
  "{% if request.user.is_authenticated %}\n  <p>You are signed in.</p>\n{% endif %}",
  "<script type=\"module\" src=\"/main.js\" defer></script>",
  "#bg {\n  position: fixed;\n  top: 0;\n  left: 0;\n}",
  ".box > h5 {\n  display: inline-block;\n}",
  "SELECT * FROM Products WHERE Price < 20",
  "SELECT COUNT(PlayerID) FROM MLBPlayers WHERE Team=\"New York Mets\"",
]
var chosen = Array(NUM_OF_TEXTS).fill('');
var uuids = Array(NUM_OF_TEXTS).fill(0);
var times = Array(NUM_OF_TEXTS).fill(0);

async function t() {
  for (let index = 0; index < NUM_OF_TEXTS; index++) {
    uuids[index] = await generate_text(index, chosen);
    times[index] = index / NUM_OF_TEXTS * MAX_TIME;
    scene.getObjectByProperty('uuid', uuids[index]).material.opacity = Math.sin(times[index] * Math.PI / MAX_TIME);
  }
  return;
}

async function q() {
  await t();
  animate();
}
q();

async function generate_text(index, chosen) {
  return await new Promise( resolve => LOADER.load('fonts/DejaVu Sans Mono_Book.json', function (font) {

    chosen[index] = select_code();
    let geometry = new TextGeometry(chosen[index], {
      font: font,
      size: 8,
      height: 1,
      curveSegments: 12,
    });

    let material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    material.transparent = true;
    material.opacity = 0;
    
    let text = new THREE.Mesh(geometry, material);
    
    let sign = (Math.floor(Math.random() * 2) * 2 - 1);
    let pos = [
      (Math.random() * 100 + 250) * sign,
      Math.random() * 300 - 150,
      -400
    ];
    text.position.set(...pos);
    text.rotation.y = -sign * 0.3;
    
    scene.add(text);
    resolve(text.uuid);
  }));
}


function select_code() {
  let index = Math.floor(Math.random() * unchosen.length);
  let code = unchosen[index];
  unchosen.splice(index, 1);
  return code;
}


function dispose(text) {
  let i = uuids.findIndex(uuid => uuid == text.uuid);
  unchosen.push(chosen[i]);
  chosen[i] = '';
  
  text.geometry.dispose();
  text.material.dispose();
  scene.remove(text);
}


async function update(uuid, index, uuids) {
  let text = scene.getObjectByProperty('uuid', uuid);
  text.material.opacity = Math.sin(times[index] * Math.PI / MAX_TIME);
  text.position.z += 1;

  if (text.material.opacity <= 0.001) {
    dispose(text);
    uuids[index] = await generate_text(index, chosen);
  }
}


function animate() {
  window.requestAnimationFrame(animate);
  times.forEach((time, index, times) => {times[index] = (time + 1) % MAX_TIME});
  uuids.forEach((uuid, index, uuids) => update(uuid, index, uuids));

  renderer.render(scene, camera);
}