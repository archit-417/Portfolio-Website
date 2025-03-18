document.addEventListener('DOMContentLoaded', function() {
    // Array of image paths - replace with your actual image paths
    const images = [
        'images/about-1.jpg', 
        'images/about-2.jpg', 
        'images/about-3.jpg',
        'images/about-4.jpg'
    ];
    
    
            // Get the slideshow container
            const slideshowContainer = document.querySelector('.slideshow-container');
            
            // Check if the slideshow container exists
            if (!slideshowContainer) {
                console.error('Slideshow container not found!');
                return;
            }
            
            // Clear any existing content
            slideshowContainer.innerHTML = '';
            
            // Create slides
            images.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = `slide ${index === 0 ? 'active' : ''}`;
                
                const img = document.createElement('img');
                img.src = image;
                img.alt = `Portfolio image ${index + 1}`;
                img.loading = "lazy";
                
                slide.appendChild(img);
                slideshowContainer.appendChild(slide);
            });
            
            // Create navigation buttons
            const prevBtn = document.createElement('button');
            prevBtn.className = 'prev-btn';
            prevBtn.setAttribute('aria-label', 'Previous image');
            prevBtn.innerHTML = '&#10094;';
            slideshowContainer.appendChild(prevBtn);
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'next-btn';
            nextBtn.setAttribute('aria-label', 'Next image');
            nextBtn.innerHTML = '&#10095;';
            slideshowContainer.appendChild(nextBtn);
            
            // Create indicators container
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'slide-indicators';
            slideshowContainer.appendChild(indicatorsContainer);
            
            // Create indicators
            images.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
                indicator.dataset.index = index;
                indicatorsContainer.appendChild(indicator);
            });
            
            // Get all slides and indicators
            const slides = document.querySelectorAll('.slide');
            const indicators = document.querySelectorAll('.indicator');
            
            let currentIndex = 0;
            let slideInterval;
            
            // Function to show a specific slide
            function showSlide(index) {
                currentIndex = index;
                
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(dot => dot.classList.remove('active'));
                
                slides[currentIndex].classList.add('active');
                indicators[currentIndex].classList.add('active');
            }
            
            // Function to show next slide
            function nextSlide() {
                const newIndex = (currentIndex + 1) % slides.length;
                showSlide(newIndex);
            }
            
            // Function to show previous slide
            function prevSlide() {
                const newIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(newIndex);
            }
            
            // Start automatic slideshow
            function startSlideshow() {
                stopSlideshow();
                slideInterval = setInterval(nextSlide, 3000);
            }
            
            // Stop automatic slideshow
            function stopSlideshow() {
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
            }
            
            // Event listeners
            nextBtn.addEventListener('click', function() {
                nextSlide();
                startSlideshow();
            });
            
            prevBtn.addEventListener('click', function() {
                prevSlide();
                startSlideshow();
            });
            
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    showSlide(index);
                    startSlideshow();
                });
            });
            
            // Touch events for swiping
            let touchStartX = 0;
            let touchEndX = 0;
            
            slideshowContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                stopSlideshow();
            }, { passive: true });
            
            slideshowContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startSlideshow();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeDistance = touchEndX - touchStartX;
                
                if (Math.abs(swipeDistance) > 50) {
                    if (swipeDistance > 0) {
                        prevSlide();
                    } else {
                        nextSlide();
                    }
                }
            }
            
            // Start the slideshow
            startSlideshow();
        });