// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        onComplete: () => loadingScreen.remove()
    });
});

// Animate skill cards on scroll
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    const progress = card.getAttribute('data-skill');
    const progressFill = card.querySelector('.progress-fill');

    ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
            progressFill.style.width = `${progress}%`;
        }
    });
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => item.classList.add('visible')
    });
});

// Magnetic Button Effect
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        btn.style.transform = `translate3d(${deltaX * 10}px, ${deltaY * 10}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
    });
});

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble effect
const phrases = ['Developer', 'Designer', 'Creator'];
const el = document.querySelector('.scramble-text');
const fx = new TextScramble(el);
let counter = 0;

const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
};

next();

// Interactive Background
const canvas = document.createElement('canvas');
canvas.id = 'background-canvas';
document.body.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create particles
const particles = new THREE.BufferGeometry();
const particleCount = 1000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xe2b0ff
});

const particleMesh = new THREE.Points(particles, material);
scene.add(particleMesh);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particleMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});