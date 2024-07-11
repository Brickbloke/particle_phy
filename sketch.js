class Particle {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.mass = mass;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  physics(other) {
    let force = p5.Vector.sub(other.pos, this.pos);
    let distanceSq = constrain(force.magSq(), 25, 500);
    let strength = (G * this.mass * other.mass) / distanceSq;
    force.setMag(strength);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); 
  }

  draw() {
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
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

