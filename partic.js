class Particle {
  constructor(x, y, mass) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.mass = mass;

    this.radius = Math.sqrt(this.mass / PI) * SCALE;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  applyForce(force) {
    this.acceleration.add(p5.Vector.div(force, this.mass));
  }

  physics(particle) {
    if (this === particle) return;

    let mass = this.mass * particle.mass;
    let radius = this.radius + particle.radius;
    let distance = this.position.dist(particle.position);

    if (distance <= radius) return;

    let force = p5.Vector.sub(particle.position, this.position)
      .setMag(G * mass / (distance ** 2));

    particle.applyForce(force);
  }

  update() {
    this.velocity.add(p5.Vector.mult(this.acceleration, deltaTime * 0.001));
    this.position.add(p5.Vector.mult(this.velocity, deltaTime * 0.001));
    this.acceleration.set(0, 0);
  }
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let mass = random(2e8, 1e9);
    particles.push(new Particle(x, y, mass));
  }
}

function draw() {
  background(51, 51, 51);
  for (const particleA of particles) {
    for (const particleB of particles) {
      if (particleA !== particleB) {
        particleA.physics(particleB);
      }
    }
  }
  for (const particle of particles) {
    particle.update();
    particle.draw();
  }
}

const G = 6.67e-11;
const SCALE = 0.001;
let particles = [];
