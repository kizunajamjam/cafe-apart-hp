/**
 * cafe apart - Halloween
 * 下の期間（日本時間）だけ、サイトにハロウィンの飾りと動きを追加する。
 * 期間を過ぎると何も表示されなくなり、いつものサイトに戻る。
 * 完全に片付けるときは halloween.js / halloween.css と、index.html でそれを読み込んでいる2行を削除する。
 */
(function () {
    var HALLOWEEN_START = '2026-10-09T00:00:00+09:00';
    var HALLOWEEN_END = '2026-10-31T23:59:59+09:00';

    var now = Date.now();
    if (now < new Date(HALLOWEEN_START).getTime() || now > new Date(HALLOWEEN_END).getTime()) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 絵のパーツ ---------- */

    function pumpkinSVG() {
        return '<svg viewBox="0 0 120 112" aria-hidden="true">' +
            '<path d="M56 24C55 14 58 7 66 3l5 4c-6 3-7 8-6 17z" fill="#55733a"/>' +
            '<path d="M67 9c8-7 16-4 18 3" fill="none" stroke="#6b8e4e" stroke-width="3" stroke-linecap="round"/>' +
            '<ellipse cx="33" cy="68" rx="30" ry="40" fill="#d9661a"/>' +
            '<ellipse cx="87" cy="68" rx="30" ry="40" fill="#d9661a"/>' +
            '<ellipse cx="60" cy="66" rx="33" ry="44" fill="#f28b25"/>' +
            '<path d="M45 28q-12 38 0 80M75 28q12 38 0 80" fill="none" stroke="#c45a14" stroke-width="2" opacity=".6"/>' +
            '<path class="hw-face" d="M34 56l12-17 9 19zM65 58l9-19 12 17zM56 70l4-7 4 7zM28 76q32 30 64 0l-8 5-4-7-7 9-6-7-7 9-7-9-6 7-7-9-4 7z"/>' +
            '</svg>';
    }

    var GHOST_SVG =
        '<svg viewBox="0 0 60 72" aria-hidden="true">' +
        '<path d="M30 3C15 3 5 14 5 29v40l8-6 8 6 9-6 9 6 8-6 8 6V29C55 14 45 3 30 3z" fill="#fdfbf7" stroke="#2c3e50" stroke-width="2"/>' +
        '<ellipse cx="21" cy="28" rx="4" ry="5" fill="#2c3e50"/><ellipse cx="39" cy="28" rx="4" ry="5" fill="#2c3e50"/>' +
        '<ellipse cx="30" cy="42" rx="5" ry="6" fill="#2c3e50"/>' +
        '<ellipse cx="14" cy="36" rx="4" ry="2.5" fill="#f7a8b8" opacity=".7"/><ellipse cx="46" cy="36" rx="4" ry="2.5" fill="#f7a8b8" opacity=".7"/>' +
        '</svg>';

    var BAT_SVG =
        '<svg viewBox="0 0 64 32" fill="currentColor" aria-hidden="true">' +
        '<path d="M32 10c-2 0-3 1-3.5 2.5L27 10l-1 4C20 8 10 6 2 10c5 1 8 4 9 8 3-2 7-2 9 1 2-2 6-2 8 1l4 4 4-4c2-3 6-3 8-1 2-3 6-3 9-1 1-4 4-7 9-8-8-4-18-2-24 4l-1-4-1.5 2.5C35 11 34 10 32 10z"/>' +
        '</svg>';

    var SPIDER_SVG =
        '<svg viewBox="0 0 24 20" aria-hidden="true">' +
        '<g stroke="#2b2238" stroke-width="1.3" fill="none" stroke-linecap="round">' +
        '<path d="M9 9 4 5 1 8M9 11 3 10 0 13M10 12 5 15 3 19M15 9l5-4 3 3M15 11l6-1 3 3M14 12l5 3 2 4"/>' +
        '</g>' +
        '<ellipse cx="12" cy="11" rx="4" ry="4.5" fill="#2b2238"/>' +
        '<circle cx="10.5" cy="10.5" r="0.9" fill="#ff9f1c"/><circle cx="13.5" cy="10.5" r="0.9" fill="#ff9f1c"/>' +
        '</svg>';

    var WEB_SVG =
        '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="0.8" aria-hidden="true">' +
        '<path d="M60 0 0 0M60 0 60 60M60 0 8 30M60 0 30 52M60 0 20 12M60 0 48 40"/>' +
        '<path d="M48 0q-2 4 1.5 6 2 3 4 4 3 1 6.5 2"/>' +
        '<path d="M34 0q-3 7 2 13 3 5 7 8 5 3 10 4 4 1 7 1"/>' +
        '<path d="M18 0q-4 10 3 20 4 7 10 11 7 5 14 7 8 3 15 3"/>' +
        '<path d="M4 0q-4 14 5 28 6 10 15 16 10 7 21 10 8 3 15 3"/>' +
        '</svg>';

    var CAT_SVG =
        '<svg viewBox="0 0 48 30" fill="#1f1a26" aria-hidden="true">' +
        '<path d="M38 6l2-5 3 5c2 1 3 3 3 6 0 3-2 5-5 5h-1l-1 11h-3l-1-8H17l-2 8h-3l1-9c-3-1-5-4-5-8 0-1-1-3-4-4C1 6 1 3 3 2c0 3 2 4 4 5 2 1 3 2 4 3h21c1-2 3-4 6-4z"/>' +
        '<circle cx="40" cy="10" r="1" fill="#f3c74a"/><circle cx="43.5" cy="10" r="1" fill="#f3c74a"/>' +
        '</svg>';

    var WITCH_SVG =
        '<svg viewBox="0 -14 130 84" fill="#1f1a26" aria-hidden="true">' +
        '<path d="M8 52 100 38" stroke="#5a3a22" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M96 34l26-8-6 12 10 4-12 4 6 10-24-12z" fill="#c9962e"/>' +
        '<path d="M44 46 66 16l16 28z"/>' +
        '<path d="M48 44Q30 26 18 40q14-2 30 6z"/>' +
        '<circle cx="68" cy="13" r="7"/>' +
        '<path d="M56 10l26-3-3 3z"/>' +
        '<path d="M62 9 82 6 74-12z"/>' +
        '<path d="M62 30 78 44" stroke="#1f1a26" stroke-width="4" stroke-linecap="round"/>' +
        '</svg>';

    function el(tag, className, html) {
        var node = document.createElement(tag);
        node.className = className;
        if (html) node.innerHTML = html;
        node.setAttribute('aria-hidden', 'true');
        return node;
    }

    /* ---------- お菓子がはじけるエフェクト ---------- */

    var TREATS = ['🍬', '🍭', '🎃', '👻', '🦇', '🍫', '⭐'];

    function burst(x, y, count) {
        if (reduceMotion) return;
        for (var i = 0; i < count; i++) {
            var p = el('span', 'hw-particle');
            p.textContent = TREATS[Math.floor(Math.random() * TREATS.length)];
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            document.body.appendChild(p);

            var angle = Math.random() * Math.PI * 2;
            var dist = 60 + Math.random() * 90;
            var dx = Math.cos(angle) * dist;
            var dy = Math.sin(angle) * dist - 40;
            var rot = (Math.random() - 0.5) * 540;
            var anim = p.animate([
                { transform: 'translate(-50%, -50%) scale(0.4)', opacity: 1 },
                { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) scale(1.1) rotate(' + rot / 2 + 'deg)', opacity: 1, offset: 0.55 },
                { transform: 'translate(calc(-50% + ' + dx * 1.2 + 'px), calc(-50% + ' + (dy + 110) + 'px)) scale(0.9) rotate(' + rot + 'deg)', opacity: 0 }
            ], { duration: 1100 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,.4,1)' });
            anim.onfinish = (function (node) { return function () { node.remove(); }; })(p);
        }
    }

    /* ---------- 各パーツの取り付け ---------- */

    function addGarland(hero) {
        var letters = 'HAPPY*HALLOWEEN'.split('');
        var colors = ['#f28b25', '#6b3fa0', '#1f1a26'];
        var garland = el('div', 'hw-garland');
        garland.innerHTML =
            '<svg class="hw-garland-string" viewBox="0 0 100 20" preserveAspectRatio="none">' +
            '<path d="M0 1 Q50 26 100 1" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="0.6" vector-effect="non-scaling-stroke"/>' +
            '</svg>';
        var row = el('div', 'hw-garland-flags');
        letters.forEach(function (ch, i) {
            var t = i / (letters.length - 1);
            var sag = 1 - Math.pow(2 * t - 1, 2); // 真ん中ほど垂れ下がる
            var flag = el('span', 'hw-flag');
            flag.style.setProperty('--sag', sag.toFixed(3));
            flag.style.setProperty('--delay', (i * -0.23).toFixed(2) + 's');
            flag.style.background = colors[i % colors.length];
            if (ch === '*') {
                flag.classList.add('hw-flag-pumpkin');
                flag.innerHTML = pumpkinSVG();
            } else {
                flag.textContent = ch;
            }
            row.appendChild(flag);
        });
        garland.appendChild(row);
        hero.appendChild(garland);
    }

    function addHeroPumpkins(hero) {
        var patch = el('div', 'hw-patch');
        [['hw-pk-big', 0], ['hw-pk-small', -0.8], ['hw-pk-tiny', -1.6]].forEach(function (cfg) {
            var pk = el('button', 'hw-pumpkin ' + cfg[0], pumpkinSVG());
            pk.type = 'button';
            pk.removeAttribute('aria-hidden');
            pk.setAttribute('aria-label', 'Trick or Treat!');
            pk.style.setProperty('--delay', cfg[1] + 's');
            patch.appendChild(pk);
        });
        hero.appendChild(patch);
    }

    function addBats(hero) {
        if (reduceMotion) return;
        var bats = [];
        for (var i = 0; i < 5; i++) {
            var bat = el('div', 'hw-bat', BAT_SVG);
            hero.appendChild(bat);
            bats.push(bat);
        }
        var flyFlock = function () {
            if (document.hidden) return;
            var baseTop = 12 + Math.random() * 25;
            var leftToRight = Math.random() < 0.5;
            bats.forEach(function (bat, i) {
                bat.classList.remove('flying', 'reverse');
                bat.style.top = (baseTop + (Math.random() - 0.3) * 18) + '%';
                bat.style.setProperty('--size', (38 + Math.random() * 36).toFixed(0) + 'px');
                bat.style.animationDelay = (i * 0.35 + Math.random() * 0.3).toFixed(2) + 's';
                void bat.offsetWidth; // アニメーションを再始動させる
                bat.classList.add('flying');
                if (!leftToRight) bat.classList.add('reverse');
            });
        };
        setTimeout(flyFlock, 2500);
        setInterval(flyFlock, 14000);
    }

    function addWitch() {
        if (reduceMotion) return;
        var witch = el('div', 'hw-witch', WITCH_SVG);
        document.body.appendChild(witch);
        var fly = function () {
            if (document.hidden) return;
            witch.style.top = (14 + Math.random() * 30) + 'vh';
            witch.classList.remove('flying');
            void witch.offsetWidth;
            witch.classList.add('flying');
        };
        setTimeout(fly, 9000);
        setInterval(fly, 32000);
    }

    function addFloatingGhosts() {
        if (reduceMotion) return;
        var layer = el('div', 'hw-ghost-layer');
        [
            { x: '4%', size: 64, dur: 22, delay: 0 },
            { x: '88%', size: 52, dur: 26, delay: -9 },
            { x: '10%', size: 40, dur: 30, delay: -18 },
            { x: '80%', size: 72, dur: 34, delay: -25 }
        ].forEach(function (g) {
            var ghost = el('div', 'hw-float-ghost', GHOST_SVG);
            ghost.style.left = g.x;
            ghost.style.setProperty('--size', g.size + 'px');
            ghost.style.animationDuration = g.dur + 's';
            ghost.style.animationDelay = g.delay + 's';
            layer.appendChild(ghost);
        });
        document.body.appendChild(layer);
    }

    function addSpiders() {
        ['#concept .section-title', '#menu .section-title', '#instagram .section-title', '#access .section-title']
            .forEach(function (sel, i) {
                var title = document.querySelector(sel);
                if (!title) return;
                var spider = el('span', 'hw-spider' + (i % 2 ? ' hw-spider-left' : ''), SPIDER_SVG);
                spider.style.setProperty('--delay', (i * -0.9) + 's');
                title.appendChild(spider);
            });
    }

    function addWebs() {
        [['#concept', 'hw-web-tl'], ['#instagram', 'hw-web-tr'], ['.info-card', 'hw-web-tr hw-web-card'], ['#menu', 'hw-web-tl']]
            .forEach(function (cfg) {
                var host = document.querySelector(cfg[0]);
                if (!host) return;
                host.classList.add('hw-has-web');
                host.appendChild(el('span', 'hw-web ' + cfg[1], WEB_SVG));
            });
    }

    function addMenuPumpkin() {
        var menu = document.getElementById('menu');
        if (!menu) return;
        var corner = el('div', 'hw-menu-corner');
        var ghost = el('div', 'hw-peek-ghost', GHOST_SVG);
        var pk = el('button', 'hw-pumpkin hw-pk-menu', pumpkinSVG());
        pk.type = 'button';
        pk.removeAttribute('aria-hidden');
        pk.setAttribute('aria-label', 'Trick or Treat!');
        corner.appendChild(ghost);
        corner.appendChild(pk);
        menu.appendChild(corner);
    }

    function addFooter() {
        var footer = document.querySelector('.footer');
        if (!footer) return;
        var row = el('div', 'hw-footer-pumpkins');
        [56, 84, 44, 70, 50, 92, 46, 64].forEach(function (size, i) {
            var pk = el('button', 'hw-pumpkin hw-pk-footer', pumpkinSVG());
            pk.type = 'button';
            pk.removeAttribute('aria-hidden');
            pk.setAttribute('aria-label', 'Trick or Treat!');
            pk.style.setProperty('--size', size + 'px');
            pk.style.setProperty('--delay', (i * -0.37).toFixed(2) + 's');
            row.appendChild(pk);
        });
        footer.appendChild(row);

        var msg = el('p', 'hw-footer-msg');
        msg.removeAttribute('aria-hidden');
        msg.textContent = 'Happy Halloween!';
        footer.querySelector('.container').insertBefore(msg, footer.querySelector('.container').firstChild);
    }

    function addTicker() {
        document.querySelectorAll('.news-content').forEach(function (content) {
            var items = content.querySelectorAll('.news-item');
            // 4件ごとの繰り返しのまとまりそれぞれに同じだけ足す（ループの見た目を崩さないため）
            for (var i = 3; i < items.length; i += 4) {
                var a = el('span', 'news-item hw-news');
                a.removeAttribute('aria-hidden');
                a.textContent = '🎃 Happy Halloween 🎃';
                var b = el('span', 'news-item hw-news');
                b.removeAttribute('aria-hidden');
                b.textContent = '👻 Trick or Treat? 👻';
                items[i].after(a, b);
            }
        });
    }

    function addMisc() {
        // ロゴの魔女の帽子
        var logo = document.querySelector('.header .logo');
        if (logo) {
            logo.appendChild(el('span', 'hw-hat',
                '<svg viewBox="0 0 40 32">' +
                '<path d="M8 26 C14 20 17 10 22 2 C23 8 25 14 30 18 L27 19 C29 22 31 24 32 26 Z" fill="#2b2238"/>' +
                '<rect x="15.5" y="20.5" width="12" height="3.5" rx="1" fill="#f28b25" transform="rotate(-6 21 22)"/>' +
                '<ellipse cx="20" cy="27" rx="19" ry="3.5" fill="#2b2238"/>' +
                '</svg>'));
        }

        // トップへ戻るボタンにつかまるおばけ
        var backToTop = document.getElementById('back-to-top');
        if (backToTop) backToTop.appendChild(el('span', 'hw-btt-ghost', GHOST_SVG));

        // ギャラリーを歩く黒猫
        var gallery = document.querySelector('.gallery');
        if (gallery && !reduceMotion) gallery.appendChild(el('div', 'hw-cat', CAT_SVG));

        // Instagram の写真に重なるおばけ
        document.querySelectorAll('.ig-overlay').forEach(function (overlay) {
            overlay.insertBefore(el('span', 'hw-ig-ghost', GHOST_SVG), overlay.firstChild);
        });

        // 読み込み画面のかぼちゃ
        var loaderContent = document.querySelector('.loader-content');
        if (loaderContent) loaderContent.appendChild(el('div', 'hw-loader-pumpkin', pumpkinSVG()));

        if (window.console && console.log) {
            console.log('%c🎃 Trick or Treat! — cafe apart', 'color:#f28b25;font-size:16px;font-weight:bold;');
        }
    }

    function bindClicks() {
        document.addEventListener('click', function (e) {
            var pk = e.target.closest && e.target.closest('.hw-pumpkin');
            if (pk) {
                pk.classList.remove('hw-jump');
                void pk.offsetWidth;
                pk.classList.add('hw-jump');
                var r = pk.getBoundingClientRect();
                burst(r.left + r.width / 2, r.top + r.height / 3, 16);
                return;
            }
            // それ以外の場所をクリックしても、ちょっとだけお菓子が飛ぶ
            burst(e.clientX, e.clientY, 5);
        });
    }

    function init() {
        // 飾り文字用のフォント（期間中だけ読み込む）
        var font = document.createElement('link');
        font.rel = 'stylesheet';
        font.href = 'https://fonts.googleapis.com/css2?family=Creepster&display=swap';
        document.head.appendChild(font);

        document.body.classList.add('halloween');

        var hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(el('div', 'hw-hero-night'));
            addGarland(hero);
            addHeroPumpkins(hero);
            addBats(hero);
        }
        addWitch();
        addFloatingGhosts();
        addSpiders();
        addWebs();
        addMenuPumpkin();
        addFooter();
        addTicker();
        addMisc();
        bindClicks();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
