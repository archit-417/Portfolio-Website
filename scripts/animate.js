// Custom cursor animation
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

function scrambleTextEffect(element, finalText, speed) {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let currentText = finalText.split("").map(() => characters[Math.floor(Math.random() * characters.length)]);
    let iteration = 0;

    let interval = setInterval(() => {
        element.innerText = currentText.join("");

        if (iteration >= finalText.length) {
            clearInterval(interval);
        }

        for (let i = 0; i <= iteration; i++) {
            currentText[i] = finalText[i];
        }

        iteration++;
    }, speed);
}

// Example usage:
let textElement = document.getElementById("scramble-text");
scrambleTextEffect(textElement, "Archit Srivastava", 100);
