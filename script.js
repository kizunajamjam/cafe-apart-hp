/**
 * cafe apart - Main Script (Advanced Features Version)
 */

/* =========================================
 *  オーナー様 編集領域：メニュー・価格データ
 *  （ここのデータを編集すると、5つのデザインすべてに自動反映されます）
 * ========================================= */
const CAFE_MENU_DATA = [
    // --- DRINK (Photo Included) ---
    { category: "drink", img: "./assets/images/気合の一杯_Coffe_500.jpg", title: "気合の一杯", desc: "Coffee", price: "¥500", note: "香り豊かなこだわりの一杯" },
    { category: "drink", img: "./assets/images/カフェラテ_Latte(iced hot)_600.jpg", title: "カフェラテ", desc: "Latte (Iced & Hot)", price: "¥600", note: "優しいミルクの甘さ" },
    { category: "drink", img: "./assets/images/自家製レモネード_Lemonade_600.jpg", title: "自家製レモネード", desc: "Lemonade", price: "¥600", note: "さっぱり爽快自家製レモネード" },
    { category: "drink", img: "./assets/images/バナナジュース_Banana Juice_600.jpg", title: "バナナジュース", desc: "Banana Juice", price: "¥600", note: "お子様にも大人気" },
    { category: "drink", img: "./assets/images/ティーサイダー_Teacider_800.jpg", title: "ティーサイダー", desc: "Tea Cider", price: "¥800", note: "新感覚のティードリンク" },

    // --- DRINK (No Photo) ---
    { category: "drink", img: "", title: "カフェアメリカーノ", desc: "Americano (iced/hot)", price: "¥500", note: "" },
    { category: "drink", img: "", title: "エスプレッソ", desc: "Espresso", price: "¥300", note: "" },
    { category: "drink", img: "", title: "エスプレッソトニック", desc: "Espresso Tonic", price: "¥700", note: "" },
    { category: "drink", img: "", title: "抹茶ラテ", desc: "Matcha Latte (iced/hot)", price: "¥600", note: "" },
    { category: "drink", img: "", title: "オレンジジュース", desc: "Orange Juice", price: "¥500", note: "" },
    { category: "drink", img: "", title: "アップルジュース", desc: "Apple Juice", price: "¥500", note: "" },
    { category: "drink", img: "", title: "ジンジャーエール", desc: "Ginger Ale", price: "¥500", note: "" },
    { category: "drink", img: "", title: "コカ・コーラ", desc: "Coca-Cola", price: "¥500", note: "" },
    { category: "drink", img: "", title: "クリームソーダ", desc: "Cream Soda", price: "¥600", note: "" },

    // --- ALCOHOL (No Photo) ---
    { category: "drink", img: "", title: "瓶ビール", desc: "Beer", price: "¥800", note: "" },
    { category: "drink", img: "", title: "ハイボール", desc: "Highball", price: "¥800", note: "" },

    // --- T2 TEA (No Photo) ---
    { category: "drink", img: "", title: "ふんわりバニラのメルボルンブレックファースト", desc: "T2 Tea", price: "Cup ¥700 / Pot ¥1000", note: "" },
    { category: "drink", img: "", title: "フローラルなフレンチアールグレイ", desc: "T2 Tea", price: "Cup ¥700 / Pot ¥1000", note: "" },
    { category: "drink", img: "", title: "フルーティーなパックス・ア・ピーチ", desc: "T2 Tea", price: "Cup ¥700 / Pot ¥1000", note: "" },
    { category: "drink", img: "", title: "スパイシーなオーガニックチャイ", desc: "T2 Tea", price: "Cup ¥700 / Pot ¥1000", note: "" },
    { category: "drink", img: "", title: "ロイヤルミルクティー", desc: "Royal Milk Tea", price: "¥800", note: "" },

    // --- FOOD (Photo Included) ---
    { category: "food", img: "./assets/images/ニューヨークホットドック_Hotdog_680.jpg", title: "ニューヨークホットドック", desc: "Hotdog", price: "¥680", note: "パリッとジューシー" },
    { category: "food", img: "./assets/images/華麗なカレーとドライなカレー_Curry_1000.jpg", title: "華麗なカレーとドライなカレー", desc: "Original Curry", price: "¥1000", note: "スパイスの効いた本格カレー" },
    { category: "food", img: "./assets/images/マクドみたいなポテト_French Fries_500.jpg", title: "マクドみたいなポテト", desc: "French Fries", price: "¥500", note: "みんなでシェアできるポテト" },
    { category: "food", img: "./assets/images/クリームどんちゃん_SalmonCream UDOM_1000.jpg", title: "クリームどんちゃん", desc: "Salmon Cream UDON", price: "¥1000", note: "クリーミーで濃厚な特製サーモンうどん" },

    // --- FOOD (No Photo) ---
    { category: "food", img: "", title: "華麗なカレーと激ウマバケット", desc: "Curry", price: "¥1000", note: "" },
    { category: "food", img: "", title: "バタートースト", desc: "Toast with Butter", price: "¥400", note: "" },
    { category: "food", img: "", title: "あんバターサンド", desc: "An-Butter Sandwich", price: "¥680", note: "" },
    { category: "food", img: "", title: "ブルーチーズバナナトースト", desc: "Bluecheese & Banana Toast", price: "¥680", note: "" },
    { category: "food", img: "", title: "ピザトースト(バケット)", desc: "Pizza Toast", price: "¥680", note: "" },
    { category: "food", img: "", title: "たまごっちサンド", desc: "Egg Sandwich", price: "¥700", note: "" },
    { category: "food", img: "", title: "たまごっちハーフ", desc: "Egg Sandwich HALF", price: "¥500", note: "" },
    { category: "food", img: "", title: "ブルックリンブランチ", desc: "Brooklyn Brunch", price: "¥750", note: "" },
    { category: "food", img: "", title: "ポテトチップス", desc: "Potato Chips", price: "¥400", note: "" },

    // --- SWEETS (Photo Included) ---
    { category: "sweets", img: "./assets/images/ティラミス風パフェ_Parfait_600.jpg", title: "ティラミス風パフェ", desc: "Tiramisu Parfait", price: "¥600", note: "濃厚でとろける味わい" },
    { category: "sweets", img: "./assets/images/手作りキャロットケーキ_Caroke_600.jpg", title: "手作りキャロットケーキ", desc: "Carrot Cake", price: "¥600", note: "手作りの優しい味わい" },

    // --- KIDS DESSERT (No Photo) ---
    { category: "sweets", img: "", title: "バナナスティックケーキ", desc: "Kids Dessert", price: "¥350", note: "※Kidsドリンク付き" },
    { category: "sweets", img: "", title: "国産豆乳プリンタルト", desc: "Kids Dessert", price: "¥350", note: "※Kidsドリンク付き" },
    { category: "sweets", img: "", title: "ガトーショコラ", desc: "Kids Dessert", price: "¥350", note: "※Kidsドリンク付き" },
    { category: "sweets", img: "", title: "国産りんごのタルト", desc: "Kids Dessert", price: "¥350", note: "※Kidsドリンク付き" },
    { category: "sweets", img: "", title: "さつまいもと栗のタルト", desc: "Kids Dessert", price: "¥350", note: "※Kidsドリンク付き" },
    { category: "sweets", img: "", title: "クレープ(みかんorいちご)", desc: "Kids Dessert", price: "¥350", note: "※Kidsドリンク付き" },

    // --- TREATS (No Photo) ---
    { category: "sweets", img: "", title: "チーズケーキ", desc: "Cheese Cake", price: "¥600", note: "" },
    { category: "sweets", img: "", title: "クレープ", desc: "Crepe", price: "¥700", note: "" },
    { category: "sweets", img: "", title: "アイスクリーム", desc: "Ice Cream", price: "¥500", note: "" },
    { category: "sweets", img: "", title: "チャンキーアイスクリーム", desc: "Chunky Ice Cream", price: "¥600", note: "" },
    { category: "sweets", img: "", title: "アフォガート", desc: "Affogato", price: "¥600", note: "" },
    { category: "sweets", img: "", title: "手作りフロランタン", desc: "Florentine", price: "¥400", note: "" },
    { category: "sweets", img: "", title: "手作り焦がしミルクチョコブラウニー", desc: "Brownie", price: "¥400", note: "" }
];

document.addEventListener('DOMContentLoaded', () => {

    // 動的にメニューデータをHTMLへ流し込む処理
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        CAFE_MENU_DATA.forEach((item, index) => {
            const imageBlock = item.img 
                ? `<div class="img-wrapper"><img src="${item.img}" alt="${item.title}" loading="lazy"></div>` 
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
    }


    /* =========================================
       1. Splash Screen Loader
       ========================================= */
    const loader = document.getElementById('loader');
    // Hide loader after 1.5 seconds minimum, or when window fully loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger initial fade-up for hero
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
    // Check if it's a touch device, if so, we shouldn't run cursor logic
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect to all links and buttons
        const interactables = document.querySelectorAll('a, button, .tilt');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }


    /* =========================================
       4. Scroll Progress Bar & Header 
       ========================================= */
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        // Header styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Progress Bar
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if(progressBar) progressBar.style.width = progress + '%';
    });


    /* =========================================
       5. Menu Filtering
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    // Retrigger animation
                    item.style.animation = 'none';
                    item.offsetHeight; // trigger reflow
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
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Sub-Parallax for Concept Images smoothly
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxImg = document.querySelector('.parallax-slow');
        if(parallaxImg && scrolled < 2000) {
            // Apply slight vertical shift based on scroll
            parallaxImg.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });


    /* =========================================
       7. 3D Tilt Effect
       ========================================= */
    const tiltElements = document.querySelectorAll('.tilt');
    
    if(!isTouchDevice) {
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', handleTilt);
            el.addEventListener('mouseleave', resetTilt);
        });
    }

    function handleTilt(e) {
        const el = this;
        const rect = el.getBoundingClientRect();
        
        // Calculate mouse position relative to element
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate percentage from center (-1 to 1)
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        const maxTilt = el.getAttribute('data-tilt-max') || 10;
        
        // Reverse Y axis so it tilts towards mouse
        const tiltX = (percentY * maxTilt * -1).toFixed(2);
        const tiltY = (percentX * maxTilt).toFixed(2);
        
        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function resetTilt() {
        this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }


    /* =========================================
       8. Mobile Menu Toggle
       ========================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       11. Weather Widget Logic (Open-Meteo API)
       ========================================= */
    const weatherWidget = document.getElementById('weather-widget');
    const weatherIconEl = document.getElementById('weather-icon');
    const weatherTempEl = document.getElementById('weather-temp');

    if (weatherIconEl && weatherTempEl) {
        // Fetch weather for Ibaraki, Osaka
        fetch('https://api.open-meteo.com/v1/forecast?latitude=34.8155&longitude=135.5683&current_weather=true&timezone=Asia%2FTokyo')
            .then(res => res.json())
            .then(data => {
                const temp = Math.round(data.current_weather.temperature);
                const code = data.current_weather.weathercode;
                
                // Get icon based on WMO Weather interpretation codes
                let icon = '☀️'; // Default clear
                if (code === 1 || code === 2 || code === 3) icon = '☁️';
                else if (code >= 45 && code <= 48) icon = '🌫️';
                else if (code >= 51 && code <= 67) icon = '🌧️';
                else if (code >= 71 && code <= 77) icon = '❄️';
                else if (code >= 80 && code <= 82) icon = '☔';
                else if (code >= 95) icon = '⛈️';
                
                weatherTempEl.textContent = temp;
                weatherIconEl.textContent = icon;
            })
            .catch(err => {
                console.error("Failed to load weather data", err);
                if(weatherWidget) weatherWidget.style.display = 'none'; // Hide if failed
            });
    }

});
