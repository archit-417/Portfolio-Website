//-----------------PROJECTS SECTION-----------------------
// Add click event listeners to all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
        // Don't flip if clicking on buttons
        if (e.target.classList.contains('project-btn')) {
            return;
        }

        // Toggle the is-flipped class
        const content = this.querySelector('.project-content');
        content.classList.toggle('is-flipped');
    });
});


//-----------------ABOUT SECTION-----------------------
// To toggle between diffrent sections in About Section
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, e) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    e.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


//-----------------BUTTONS LISTENER-----------------------
function openResume() {
    window.open("https://drive.google.com/file/d/1Catj_Nuqx_VTTqEFOCn7KxuHityzW6v_/view?usp=sharing", "_blank");
}

function openMail() {
    window.location.href = "mailto:architsrivastava417@gmail.com";
}

function openProjects(){
    window.location.href = "#projects";
}

function openAbout(){
    window.location.href = "#about";
}

//------------------COPY BUTTON LISTENER-------------------
const paragraph = document.querySelector('p.copyable');
paragraph.addEventListener('click', () => {
  navigator.clipboard.writeText(paragraph.textContent)
    .then(() => {
      alert('✓ Phone number copied to clipboard');
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
});