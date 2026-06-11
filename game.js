const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// 17 níveis de evolução (simplificado)
const evolutions = [
  "Rato","Camarão","Esquilo","Coelho","Pombo",
  "Porco","Truta","Raposa","Zebra","Guepardo",
  "Leão","Crocodilo","Elefante","Kraken","Fênix",
  "Classe Apex","Dragão Negro"
];

let player = {
  x: 100,
  y: 100,
  level: 0,
  xp: 0,
  speed: 3,
  color: "white"
};

let enemies = [];

function spawnEnemies() {
  enemies = [];
  for (let i = 0; i < 10; i++) {
    enemies.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10 + Math.random() * 10,
      color: "red"
    });
  }
}

spawnEnemies();

function movePlayer() {
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;
}

function updateEvolution() {
  if (player.xp > (player.level + 1) * 100) {
    player.level++;
    player.speed += 0.5;
    player.xp = 0;
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, 10 + player.level, 0, Math.PI * 2);
  ctx.fill();
}

function drawEnemies() {
  enemies.forEach(e => {
    ctx.fillStyle = e.color;
    ctx.fillRect(e.x, e.y, e.size, e.size);
  });
}

function checkCollisions() {
  enemies.forEach((e, i) => {
    let dx = player.x - e.x;
    let dy = player.y - e.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 20) {
      enemies.splice(i, 1);
      player.xp += 25;
    }
  });
}

function drawUI() {
  document.getElementById("stats").innerHTML =
    `Criatura: ${evolutions[player.level]} <br>
     XP: ${player.xp}`;
}

function applyWeatherEffects() {
  if (typeof weatherData !== "undefined") {
    if (weatherData.temp > 30) player.speed = 2;
    else player.speed = 3 + player.level * 0.2;
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  applyWeatherEffects();
  movePlayer();
  checkCollisions();
  updateEvolution();

  drawPlayer();
  drawEnemies();
  drawUI();

  requestAnimationFrame(loop);
}

loop();
