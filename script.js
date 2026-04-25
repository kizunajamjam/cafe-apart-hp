/**
 * cafe apart - Main Script (Advanced Features Version + Google Sheets DB)
 */

const SPREADSHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3obFx_eeJzUPLGj1btfJrzDKeo4tq9XUJcnB3yKRqMsxK1uw3z4_o4m7fMVkQbg2iFf3BD_EtBoic/pub?output=csv";

document.addEventListener('DOMContentLoaded', () => {

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    /* =========================================
       1. Splash Screen Loader
       ========================================= */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            const heroInner = document.querySelector('.hero-inner');
            if (heroInner) heroInner.classList.add('visible');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 1200);
    });

    /* =========================================
       2. Custom Cursor
       ========================================= */
    const cursor = document.getElementById('cursor');
    if (!isTouchDevice && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Use event delegation for cursor hover to handle dynamic elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.tilt')) {
                cursor.classList.add('hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.tilt')) {
                cursor.classList.remove('hover');
            }
        });
    }

    /* =========================================
       4. Scroll Progress Bar & Header 
       ========================================= */
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if(progressBar) progressBar.style.width = progress + '%';

        // Back to Top Visibility
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================
       5. Menu Filtering
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            // Query dynamic items dynamically instead of caching them outside
            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    item.style.animation = 'none';
                    item.offsetHeight; 
                    item.style.animation = null;
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    /* =========================================
       6. Scroll Fade Animations
       ========================================= */
    const fadeElements = document.querySelectorAll('.content-fade');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxImg = document.querySelector('.parallax-slow');
        if(parallaxImg && scrolled < 2000) {
            parallaxImg.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });

    /* =========================================
       7. Mobile Menu Toggle
       ========================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       8. Weather Widget Logic
       ========================================= */
    const weatherWidget = document.getElementById('weather-widget');
    const weatherIconEl = document.getElementById('weather-icon');
    const weatherTempEl = document.getElementById('weather-temp');

    if (weatherIconEl && weatherTempEl) {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=34.8155&longitude=135.5683&current_weather=true&timezone=Asia%2FTokyo')
            .then(res => res.json())
            .then(data => {
                const temp = Math.round(data.current_weather.temperature);
                const code = data.current_weather.weathercode;
                
                let icon = '☀️';
                if (code === 1 || code === 2 || code === 3) icon = '☁️';
                else if (code >= 45 && code <= 48) icon = '🌫️';
                else if (code >= 51 && code <= 67) icon = '🌧️';
                else if (code >= 71 && code <= 77) icon = '❄️';
                else if (code >= 80 && code <= 82) icon = '☔';
                else if (code >= 95) icon = '⛈️';
                
                weatherTempEl.textContent = temp;
                weatherIconEl.textContent = icon;

                // Visual Enhancement: Background Overlay based on weather
                const hero = document.querySelector('.hero');
                if (hero) {
                    const overlay = document.createElement('div');
                    overlay.className = 'weather-overlay';
                    if (code === 0) overlay.classList.add('weather-clear');
                    else if (code >= 1 && code <= 3) overlay.classList.add('weather-cloudy');
                    else if (code >= 51) overlay.classList.add('weather-rainy');
                    hero.appendChild(overlay);
                }
            })
            .catch(err => {
                console.error("Failed to load weather data", err);
                if(weatherWidget) weatherWidget.style.display = 'none';
            });
    }

    /* =========================================
       9. Image Lightbox (Setup UI)
       ========================================= */
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
            backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
        }
        .lightbox-overlay.active { opacity: 1; pointer-events: all; }
        .lightbox-overlay img {
            max-width: 90vw; max-height: 85vh; border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95);
            transition: transform 0.3s ease; object-fit: contain;
        }
        .lightbox-overlay.active img { transform: scale(1); }
        .lightbox-close {
            position: absolute; top: 20px; right: 30px; color: #fff;
            font-size: 50px; cursor: pointer; font-weight: 200; line-height: 1;
        }
        .img-wrapper img { cursor: zoom-in; }
    `;
    document.head.appendChild(style);

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `<div class="lightbox-close">&times;</div><img src="" alt="Popup">`;
    document.body.appendChild(lightbox);
    const lightboxImg = lightbox.querySelector('img');

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    /* =========================================
       10. Google Sheets DB & Dynamic Menu Rendering
       ========================================= */
    const menuContainer = document.getElementById('menu-container');

    async function loadMenu() {
        if (!menuContainer) return;
        
        // Show Loading state
        menuContainer.innerHTML = '<div style="text-align:center; padding: 60px; font-size: 1.2rem; color: var(--primary-color);">Now Loading... ☕️</div>';

        try {
            const res = await fetch(SPREADSHEET_CSV_URL);
            const csvText = await res.text();
            
            const lines = csvText.split('\n').filter(line => line.trim().length > 0);
            const data = [];
            
            for(let i=1; i < lines.length; i++) {
                // Regex for correctly splitting CSV containing quoted commas like "¥1,000"
                const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());
                if(row.length >= 5) {
                    data.push({
                        category: row[0],
                        img: row[1] || "",
                        title: row[2] || "",
                        desc: row[3] || "",
                        price: row[4] || "",
                        note: row[5] || "",
                        memo: row[6] || ""
                    });
                }
            }

            renderMenuItems(data);

        } catch (err) {
            console.error("Failed to load DB", err);
            menuContainer.innerHTML = '<div style="color:red; text-align:center;">Failed to load menu data. Please try again later.</div>';
        }
    }

    function renderMenuItems(data) {
        menuContainer.innerHTML = ''; 

        data.forEach((item, index) => {
            // Fix mismatched image paths from CSV
            let imageSrc = item.img;
            if (imageSrc.includes('creamy-salmon.jpg')) {
                imageSrc = imageSrc.replace('creamy-salmon.jpg', 'salmon-cream-udon.jpg');
            }

            const imageBlock = imageSrc 
                ? `<div class="img-wrapper"><img src="${imageSrc}" alt="${item.title}" loading="lazy"></div>` 
                : '';

            const noteBlock = item.note
                ? `<p class="menu-note" style="font-size: 0.9rem;">${item.note}</p>`
                : '';

            const html = `
                <div class="menu-item tilt" data-category="${item.category}" style="--delay: ${index + 1}" data-tilt-max="20">
                    ${imageBlock}
                    <div class="menu-info">
                        <h4>${item.title}</h4>
                        <p style="font-family: var(--font-en); font-size: 0.85rem; letter-spacing: 0.05em; margin-bottom: 4px;">${item.desc}</p>
                        ${noteBlock}
                        <p class="price" style="margin-top:8px; font-weight:bold; color:var(--primary-color);">${item.price}</p>
                    </div>
                </div>
            `;
            menuContainer.insertAdjacentHTML('beforeend', html);
        });

        attachDynamicEvents();
        adjustMenuLogos();
    }

    function attachDynamicEvents() {
        // Attach Lightbox logic to new images
        const menuImages = document.querySelectorAll('.img-wrapper img');
        menuImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        // Initialize 3D Tilt for new items
        const tiltElements = document.querySelectorAll('.tilt');
        if(!isTouchDevice) {
            tiltElements.forEach(el => {
                el.addEventListener('mousemove', handleTilt);
                el.addEventListener('mouseleave', resetTilt);
            });
        }
    }

    function handleTilt(e) {
        const el = this;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        const maxTilt = el.getAttribute('data-tilt-max') || 10;
        const tiltX = (percentY * maxTilt * -1).toFixed(2);
        const tiltY = (percentX * maxTilt).toFixed(2);
        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function resetTilt() {
        this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }

    // Trigger the fetch!
    loadMenu();

    /* =========================================
       11. Dynamic Menu Logo Sizing
       ========================================= */
    function adjustMenuLogos() {
        const items = Array.from(document.querySelectorAll('.menu-item'));
        
        // 1. Reset all
        items.forEach(item => item.classList.remove('show-logo'));

        // 2. Group items by their vertical position (rows)
        const rows = {};
        items.forEach(item => {
            if (item.offsetParent === null) return; // Hidden elements
            const top = Math.round(item.getBoundingClientRect().top);
            if (!rows[top]) rows[top] = [];
            rows[top].push(item);
        });

        // 3. Process each row
        Object.values(rows).forEach(rowItems => {
            // Check if this row contains any REAL image
            const rowHasImage = rowItems.some(item => {
                const imgWrap = item.querySelector('.img-wrapper');
                return imgWrap && imgWrap.querySelector('img');
            });

            // If the row has at least one image, enable logos for the others if they are stretched
            if (rowHasImage) {
                rowItems.forEach(item => {
                    const imgWrap = item.querySelector('.img-wrapper');
                    if (imgWrap && imgWrap.querySelector('img')) return; // Already has image
                    
                    const info = item.querySelector('.menu-info');
                    if (!info) return;

                    const gap = item.getBoundingClientRect().height - info.getBoundingClientRect().height;
                    if (gap > 60) {
                        item.classList.add('show-logo');
                    }
                });
            }
        });
    }

    const menuObserver = new ResizeObserver(() => {
        adjustMenuLogos();
    });

    // We start observing the menu container once it exists
    const menuContainerEl = document.getElementById('menu-container');
    if (menuContainerEl) {
        menuObserver.observe(menuContainerEl);
        // Also observe individual items as they are added? 
        // Better: periodic check or after renderMenuItems
    }
});
