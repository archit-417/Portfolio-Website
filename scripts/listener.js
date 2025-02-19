// Add click event listeners to all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't flip if clicking on buttons
        if (e.target.classList.contains('project-btn')) {
            return;
        }
        
        // Toggle the is-flipped class
        const content = this.querySelector('.project-content');
        content.classList.toggle('is-flipped');
    });
});


// To toggle between diffrent sections in About Section
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, e) {
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }

    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    
    e.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}