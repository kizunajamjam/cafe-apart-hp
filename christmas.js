/**
 * cafe apart - Christmas
 * 下の期間（日本時間）だけ、サイトに大人しめでクールなクリスマスの飾りを追加する。
 * 期間外は何もしないので、読み込まれていても見た目は変わらない。
 *
 * 確認用ページ（christmas-preview/）では window.XMAS_PREVIEW = true で、期間外でも表示する。
 * 公開するときは index.html に christmas.css と christmas.js を読み込む2行を足す。
 * 片付けるときはその2行と christmas.js / christmas.css を削除する。
 */
(function () {
    var XMAS_START = '2026-12-01T00:00:00+09:00';
    var XMAS_END = '2026-12-25T23:59:59+09:00';

    var now = Date.now();
    var inSeason = now >= new Date(XMAS_START).getTime() && now <= new Date(XMAS_END).getTime();
    if (!inSeason && !window.XMAS_PREVIEW) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 絵のパーツ (細い線だけのミニマルな絵) ---------- */

    var STAR_SVG =
        '<svg viewBox="0 0 20 20" aria-hidden="true">' +
        '<path d="M10 0 L11.6 8.4 L20 10 L11.6 11.6 L10 20 L8.4 11.6 L0 10 L8.4 8.4 Z" fill="currentColor"/>' +
        '</svg>';

    var TREE_SVG =
        '<svg viewBox="0 0 40 56" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M20 6 L30 22 H24 L34 38 H26 L36 50 H4 L14 38 H6 L16 22 H10 Z"/>' +
        '<path d="M20 50 V55"/>' +
        '<path d="M20 0.5 L21 3.5 L24 4 L21 4.6 L20 7.5 L19 4.6 L16 4 L19 3.5 Z" fill="currentColor" stroke="none"/>' +
        '</svg>';

    // 吊るすオーナメント (丸・しずく・星)
    function ornamentSVG(kind) {
        var body;
        if (kind === 'drop') {
            body = '<path d="M12 6 C17 12 19 18 19 22 A7 7 0 0 1 5 22 C5 18 7 12 12 6 Z" fill="currentColor"/>';
        } else if (kind === 'star') {
            body = '<path d="M12 7 L13.8 14.2 L21 16 L13.8 17.8 L12 25 L10.2 17.8 L3 16 L10.2 14.2 Z" fill="currentColor"/>';
        } else {
            body = '<circle cx="12" cy="17" r="8" fill="currentColor"/>' +
                '<path d="M6.5 15 Q12 12.5 17.5 15" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="0.8"/>';
        }
        return '<svg viewBox="0 0 24 28" aria-hidden="true">' +
            '<rect x="10" y="3" width="4" height="4" rx="1" fill="#c2a878"/>' + body + '</svg>';
    }

    function el(tag, className, html) {
        var node = document.createElement(tag);
        node.className = className;
        if (html) node.innerHTML = html;
        node.setAttribute('aria-hidden', 'true');
        return node;
    }

    /* ---------- ヒーロー: 静かに降る雪 ---------- */

    function addSnow(hero) {
        if (reduceMotion) return;
        var canvas = el('canvas', 'xm-snow');
        hero.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        var flakes = [];
        var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

        function resize() {
            w = hero.clientWidth; h = hero.clientHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            var count = Math.round(Math.min(70, w / 18));
            while (flakes.length < count) flakes.push(newFlake(true));
            flakes.length = count;
        }
        function newFlake(anywhere) {
            return {
                x: Math.random() * w,
                y: anywhere ? Math.random() * h : -6,
                r: 0.6 + Math.random() * 1.8,
                vy: 0.25 + Math.random() * 0.55,
                drift: Math.random() * Math.PI * 2,
                a: 0.35 + Math.random() * 0.5
            };
        }
        var visible = true;
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(hero);
        }
        function tick() {
            if (visible && !document.hidden) {
                ctx.clearRect(0, 0, w, h);
                for (var i = 0; i < flakes.length; i++) {
                    var f = flakes[i];
                    f.drift += 0.01;
                    f.y += f.vy;
                    f.x += Math.sin(f.drift) * 0.25;
                    if (f.y > h + 6) flakes[i] = newFlake(false);
                    ctx.beginPath();
                    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255,255,255,' + f.a + ')';
                    ctx.fill();
                }
            }
            requestAnimationFrame(tick);
        }
        resize();
        window.addEventListener('resize', resize);
        requestAnimationFrame(tick);
    }

    /* ---------- ヒーロー: 吊るしたオーナメント ---------- */

    function addOrnaments(hero) {
        var row = el('div', 'xm-ornaments');
        // [横位置 %, 紐の長さ px, 形, 色]
        [[8, 70, 'ball', 'gold'], [15, 120, 'star', 'silver'], [22, 46, 'drop', 'pine'],
         [78, 96, 'drop', 'silver'], [85, 54, 'ball', 'pine'], [92, 132, 'star', 'gold']]
            .forEach(function (o, i) {
                var item = el('span', 'xm-ornament xm-' + o[3], ornamentSVG(o[2]));
                item.style.left = o[0] + '%';
                item.style.setProperty('--len', o[1] + 'px');
                item.style.setProperty('--delay', (i * -0.9).toFixed(1) + 's');
                row.appendChild(item);
            });
        hero.appendChild(row);
    }

    /* ---------- ヒーロー: 小さな Merry Christmas ---------- */

    function addGreeting() {
        var inner = document.querySelector('.hero-inner');
        if (!inner) return;
        var p = el('p', 'xm-greeting', '<span class="xm-line"></span><span class="xm-greeting-text">Merry Christmas</span><span class="xm-line"></span>');
        p.removeAttribute('aria-hidden');
        inner.appendChild(p);
    }

    /* ---------- そのほかの小さな飾り ---------- */

    function addDetails() {
        // ロゴの右肩に小さな星
        var logo = document.querySelector('.header .logo');
        if (logo) logo.appendChild(el('span', 'xm-logo-star', STAR_SVG));

        // セクション見出しの上に小さな星
        document.querySelectorAll('.section-title').forEach(function (title) {
            title.classList.add('xm-has-star');
            title.insertBefore(el('span', 'xm-title-star', STAR_SVG), title.firstChild);
        });

        // ニュースの流れる帯に一言
        document.querySelectorAll('.news-content').forEach(function (content) {
            var items = content.querySelectorAll('.news-item');
            for (var i = 3; i < items.length; i += 4) {
                var a = el('span', 'news-item xm-news');
                a.removeAttribute('aria-hidden');
                a.textContent = '✦ Merry Christmas ✦';
                items[i].after(a);
            }
        });

        // フッターに線画のツリーとメッセージ
        var container = document.querySelector('.footer .container');
        if (container) {
            var box = el('div', 'xm-footer', '<span class="xm-footer-tree">' + TREE_SVG + '</span>' +
                '<p class="xm-footer-msg">Merry Christmas &amp; Happy New Year</p>');
            box.querySelector('.xm-footer-msg').removeAttribute('aria-hidden');
            container.insertBefore(box, container.firstChild);
        }

        // 読み込み画面に小さな星
        var loader = document.querySelector('.loader-content');
        if (loader) loader.appendChild(el('span', 'xm-loader-star', STAR_SVG));
    }

    function init() {
        document.body.classList.add('christmas');
        var hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(el('div', 'xm-tint'));
            addSnow(hero);
            addOrnaments(hero);
        }
        addGreeting();
        addDetails();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
