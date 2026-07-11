document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 1. Navbar Scroll & Bubble Hover Effect
    const navbar = document.getElementById('navbar');
    const navBubble = document.getElementById('nav-bubble-bg');
    const navItems = document.querySelectorAll('.nav-item');
    const navLinksContainer = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Bubble interaction logic
    function updateBubblePosition(target) {
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const containerRect = navLinksContainer.getBoundingClientRect();
        
        navBubble.style.width = `${rect.width}px`;
        navBubble.style.height = `${rect.height}px`;
        navBubble.style.left = `${rect.left - containerRect.left + navLinksContainer.scrollLeft}px`;
        navBubble.style.top = `${rect.top - containerRect.top + navLinksContainer.scrollTop}px`;
        navBubble.style.opacity = '1';
    }

    navItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            updateBubblePosition(e.target);
        });
    });

    navLinksContainer.addEventListener('mouseleave', () => {
        navBubble.style.opacity = '0';
    });

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // On initial load, trigger animations for elements already in view
    setTimeout(() => {
        document.querySelectorAll('.fade-up, .slide-up').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // 3. OS Folder Logic
    const folders = document.querySelectorAll('.folder');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryContainer = document.getElementById('gallery-container');
    const closeGalleryBtn = document.getElementById('close-gallery');

    // Sample data for gallery
    const galleryData = {
        restaurants: [
            { id: 'bella', title: "Bella's Restaurant", img: 'placeholder-bella.webp', desc: 'Brand Identity & Web Design' },
            { id: 'biteme', title: "Bite Me", img: 'placeholder-biteme.webp', desc: 'UI/UX Redesign' },
            { id: 'pizza', title: "Pizza House", img: 'placeholder-pizza.webp', desc: 'App Development' }
        ],
        business: [
            { id: 'landing', title: "SaaS Landing Page", img: 'placeholder-landing.webp', desc: 'Conversion Optimization' },
            { id: 'ai', title: "AI Studio", img: 'placeholder-ai.webp', desc: 'Web Application' },
            { id: 'dashboard', title: "Finance Dashboard", img: 'placeholder-dashboard.webp', desc: 'Data Visualization' }
        ],
        personal: [
            { id: 'portfolio', title: "Previous Portfolio", img: 'placeholder-portfolio.webp', desc: 'Web Design' },
            { id: 'branding', title: "Personal Branding", img: 'placeholder-branding.webp', desc: 'Brand Guidelines' }
        ]
    };

    folders.forEach(folder => {
        // Toggle folder open state on click
        folder.addEventListener('click', (e) => {
            // Prevent opening if clicking on a file link directly inside the folder content
            if (e.target.closest('.file-item')) {
                return;
            }
            
            const isOpen = folder.classList.contains('open');
            
            // Close all folders first
            folders.forEach(f => f.classList.remove('open'));
            
            if (!isOpen) {
                folder.classList.add('open');
                
                // If you wanted to auto-open the gallery instead of just showing files,
                // you would trigger the gallery here. 
                // But the requested interaction is: click folder -> files slide up -> click file or just gallery opens?
                // Request: "Folder lid opens -> Files slide upward -> Gallery appears"
                // Let's automate the gallery appearance after folder opens for the pure OS feel.
                
                setTimeout(() => {
                    const folderType = folder.parentElement.getAttribute('data-folder');
                    openGallery(folderType);
                }, 800); // wait for folder animation to finish
            }
        });

        // Keyboard accessibility
        folder.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                folder.click();
            }
        });
    });

    // 4. Gallery Functions
    function openGallery(folderType) {
        const items = galleryData[folderType];
        if (!items) return;

        // Clear existing gallery
        galleryContainer.innerHTML = '';

        // Populate new items
        items.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'gallery-item fade-up delay-' + ((index % 3) + 1);
            el.innerHTML = `
                <a href="project.html?id=${item.id}">
                    <img src="${item.img}" alt="${item.title}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AInter%2C%20sans-serif%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23eee%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22140%22%20y%3D%22158%22%3E${item.title.replace(' ','%20')}%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </a>
            `;
            galleryContainer.appendChild(el);
        });

        // Show overlay
        galleryOverlay.classList.remove('hidden');
        
        // Trigger animations for gallery items
        setTimeout(() => {
            document.querySelectorAll('.gallery-item').forEach(el => {
                el.classList.add('visible');
            });
        }, 50);
    }

    closeGalleryBtn.addEventListener('click', () => {
        galleryOverlay.classList.add('hidden');
        // Reset folders
        folders.forEach(f => f.classList.remove('open'));
    });

    // Close gallery on clicking outside
    galleryOverlay.addEventListener('click', (e) => {
        if (e.target === galleryOverlay) {
            closeGalleryBtn.click();
        }
    });
    
    // Close gallery on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !galleryOverlay.classList.contains('hidden')) {
            closeGalleryBtn.click();
        }
    });

    // 5. Canvas Mouse Trail (Sebastian Wittig style)
    const canvas = document.getElementById('trail-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let points = [];
        const maxPoints = 12; // Shortened tail so it disappears faster
        
        let mouse = { x: 0, y: 0 };
        let isMoving = false;

        // Resize canvas to fill window
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            isMoving = true;
        });

        // Loop to animate the trail
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isMoving) {
                // Add current mouse position
                points.push({ x: mouse.x, y: mouse.y });
                
                // Limit points array size
                if (points.length > maxPoints) {
                    points.shift();
                }
            }

            if (points.length > 1) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);

                // Draw a smooth curve through the points
                for (let i = 1; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }

                ctx.quadraticCurveTo(
                    points[points.length - 1].x,
                    points[points.length - 1].y,
                    points[points.length - 1].x,
                    points[points.length - 1].y
                );

                ctx.strokeStyle = 'rgba(17, 17, 17, 0.16)'; // More visible grey trail
                ctx.lineWidth = 2.5;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();
            }

            // Slowly decay the points when mouse stops moving
            if (points.length > 0 && !isMoving) {
                points.splice(0, 2);
            }

            // Reset moving flag so we can decay if mouse stops
            isMoving = false;

            requestAnimationFrame(animate);
        }
        
        // Start animation loop
        animate();
        
        // Prevent trail from breaking when mouse leaves window
        document.addEventListener('mouseleave', () => {
            points = [];
        });
    }

    // 6. Dynamic logo text splitting for rolling wave effect
    const brandBold = document.querySelector('.brand-bold');
    if (brandBold) {
        const text = brandBold.textContent;
        brandBold.innerHTML = '';
        [...text].forEach(char => {
            const wrapper = document.createElement('span');
            wrapper.className = 'char-wrapper';
            
            const charSpan = document.createElement('span');
            charSpan.className = 'char-item';
            charSpan.textContent = char === ' ' ? '\u00A0' : char; // use non-breaking space
            
            const hoverSpan = document.createElement('span');
            hoverSpan.className = 'char-hover';
            hoverSpan.textContent = char === ' ' ? '\u00A0' : char;
            
            wrapper.appendChild(charSpan);
            wrapper.appendChild(hoverSpan);
            brandBold.appendChild(wrapper);
        });
    }

    // 7. Background Micro-movements (Mouse Parallax for Lines & Blobs)
    let bgMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let bgCurrent = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const bgEase = 0.08;

    window.addEventListener('mousemove', (e) => {
        bgMouse.x = e.clientX;
        bgMouse.y = e.clientY;
    });

    const lineLeft = document.querySelector('.bg-line-left');
    const lineRight = document.querySelector('.bg-line-right');
    const lineH1 = document.querySelector('.bg-line-h1');
    const lineH2 = document.querySelector('.bg-line-h2');
    const blob1Container = document.querySelector('.blob-1');
    const blob2Container = document.querySelector('.blob-2');

    function animateBgParallax() {
        // Interpolate for buttery-smooth movements
        bgCurrent.x += (bgMouse.x - bgCurrent.x) * bgEase;
        bgCurrent.y += (bgMouse.y - bgCurrent.y) * bgEase;

        // Micro offset calculations (max ~15px translation)
        const offsetX = (bgCurrent.x - window.innerWidth / 2) * 0.025;
        const offsetY = (bgCurrent.y - window.innerHeight / 2) * 0.025;

        // Shift vertical lines slightly left-to-right
        if (lineLeft) lineLeft.style.transform = `translateX(${offsetX}px)`;
        if (lineRight) lineRight.style.transform = `translateX(${offsetX}px)`;
        
        // Shift horizontal lines slightly up-and-down
        if (lineH1) lineH1.style.transform = `translateY(${offsetY}px)`;
        if (lineH2) lineH2.style.transform = `translateY(${offsetY}px)`;

        // Shift blob containers slightly in opposite direction for depth feel
        if (blob1Container) blob1Container.style.transform = `translate(${-offsetX * 1.8}px, ${-offsetY * 1.8}px)`;
        if (blob2Container) blob2Container.style.transform = `translate(${-offsetX * 1.8}px, ${-offsetY * 1.8}px)`;

        requestAnimationFrame(animateBgParallax);
    }
    animateBgParallax();
});
