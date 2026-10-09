/**
 * cafe apart - Halloween
 * 10月（日本時間）のあいだだけ、サイトにハロウィン要素をこっそり追加する。
 * 11月1日 0:00 (JST) になると自動的に何も表示されなくなる。
 */
(function () {
    // 日本時間の「月」を取得（閲覧者の端末のタイムゾーンに左右されないように）
    var jstMonth = new Date(Date.now() + 9 * 60 * 60 * 1000).getUTCMonth() + 1;
    if (jstMonth !== 10) return;

    var GHOST_SVG =
        '<svg viewBox="0 0 30 36">' +
        '<path d="M15 2C8 2 3 7 3 14v20l4-3 4 3 4-3 4 3 4-3 4 3V14C27 7 22 2 15 2z" fill="#fdfbf7" stroke="#2c3e50" stroke-width="1.5"/>' +
        '<circle cx="11" cy="14" r="2" fill="#2c3e50"/><circle cx="19" cy="14" r="2" fill="#2c3e50"/>' +
        '<ellipse cx="15" cy="20" rx="2" ry="2.5" fill="#2c3e50"/>' +
        '</svg>';

    function init() {
        document.body.classList.add('halloween');
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // 1. フッターの小さなかぼちゃ
        var copyright = document.querySelector('.footer p');
        if (copyright) {
            var pumpkin = document.createElement('span');
            pumpkin.className = 'hw-pumpkin';
            pumpkin.title = 'Happy Halloween';
            pumpkin.innerHTML =
                '<svg viewBox="0 0 32 32" aria-hidden="true">' +
                '<path d="M16 7c0-2 1-4 3-4.5" stroke="#6b8e4e" stroke-width="2" fill="none" stroke-linecap="round"/>' +
                '<ellipse cx="10" cy="18" rx="7" ry="10" fill="#e8862a"/>' +
                '<ellipse cx="22" cy="18" rx="7" ry="10" fill="#e8862a"/>' +
                '<ellipse cx="16" cy="18" rx="7" ry="11" fill="#f39a3c"/>' +
                '<path class="hw-face" fill="#5a2d0c" d="M9 15l3-3 2 3zM18 15l2-3 3 3zM9 21q7 6 14 0l-2 1-1.5-1.5-2 1.5-1.5-1.5-1.5 1.5-2-1.5-1.5 1.5z"/>' +
                '</svg>';
            copyright.appendChild(pumpkin);
        }

        // 2. トップへ戻るボタンの後ろに隠れたおばけ
        var backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            var ghost = document.createElement('span');
            ghost.className = 'hw-ghost';
            ghost.setAttribute('aria-hidden', 'true');
            ghost.innerHTML = GHOST_SVG;
            backToTop.appendChild(ghost);
        }

        // 3. ヘッダーのロゴに小さな魔女の帽子
        var logo = document.querySelector('.header .logo');
        if (logo) {
            var hat = document.createElement('span');
            hat.className = 'hw-hat';
            hat.setAttribute('aria-hidden', 'true');
            hat.innerHTML =
                '<svg viewBox="0 0 40 32">' +
                '<path d="M8 26 C14 20 17 10 22 2 C23 8 25 14 30 18 L27 19 C29 22 31 24 32 26 Z" fill="#2b2238"/>' +
                '<rect x="15.5" y="20.5" width="12" height="3.5" rx="1" fill="#e8862a" transform="rotate(-6 21 22)"/>' +
                '<ellipse cx="20" cy="27" rx="19" ry="3.5" fill="#2b2238"/>' +
                '</svg>';
            logo.appendChild(hat);
        }

        // 4. MENU の見出しからクモがぶら下がる
        var menuTitle = document.querySelector('#menu .section-title');
        if (menuTitle) {
            var spider = document.createElement('span');
            spider.className = 'hw-spider';
            spider.setAttribute('aria-hidden', 'true');
            spider.innerHTML =
                '<svg viewBox="0 0 24 20">' +
                '<g stroke="#2b2238" stroke-width="1.3" fill="none" stroke-linecap="round">' +
                '<path d="M9 9 4 5 1 8M9 11 3 10 0 13M10 12 5 15 3 19M15 9l5-4 3 3M15 11l6-1 3 3M14 12l5 3 2 4"/>' +
                '</g>' +
                '<ellipse cx="12" cy="11" rx="4" ry="4.5" fill="#2b2238"/>' +
                '<circle cx="10.5" cy="10.5" r="0.9" fill="#e8862a"/><circle cx="13.5" cy="10.5" r="0.9" fill="#e8862a"/>' +
                '</svg>';
            menuTitle.appendChild(spider);
        }

        // 5. Access のカードの角にクモの巣
        var infoCard = document.querySelector('.info-card');
        if (infoCard) {
            var web = document.createElement('span');
            web.className = 'hw-web';
            web.setAttribute('aria-hidden', 'true');
            web.innerHTML =
                '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="0.8">' +
                '<path d="M60 0 0 0M60 0 60 60M60 0 8 30M60 0 30 52M60 0 20 12M60 0 48 40"/>' +
                '<path d="M48 0q-2 4 1.5 6 2 3 4 4 3 1 6.5 2"/>' +
                '<path d="M34 0q-3 7 2 13 3 5 7 8 5 3 10 4 4 1 7 1"/>' +
                '<path d="M18 0q-4 10 3 20 4 7 10 11 7 5 14 7 8 3 15 3"/>' +
                '</svg>';
            infoCard.appendChild(web);
        }

        // 6. Instagram の写真にカーソルを乗せると、おばけも一緒に出てくる
        document.querySelectorAll('.ig-overlay').forEach(function (overlay) {
            var mini = document.createElement('span');
            mini.className = 'hw-ig-ghost';
            mini.setAttribute('aria-hidden', 'true');
            mini.innerHTML = GHOST_SVG;
            overlay.insertBefore(mini, overlay.firstChild);
        });

        // 7. ニュースティッカーにこっそり一言
        document.querySelectorAll('.news-content').forEach(function (content) {
            var items = content.querySelectorAll('.news-item');
            // 4件ごとの繰り返しのまとまりそれぞれに1件ずつ足す（ループの見た目を崩さないため）
            for (var i = 3; i < items.length; i += 4) {
                var trick = document.createElement('span');
                trick.className = 'news-item hw-news';
                trick.textContent = 'Trick or Treat?';
                items[i].after(trick);
            }
        });

        // 8. ギャラリーの上を黒猫がとことこ歩く
        var gallery = document.querySelector('.gallery');
        if (gallery && !reduceMotion) {
            var cat = document.createElement('div');
            cat.className = 'hw-cat';
            cat.setAttribute('aria-hidden', 'true');
            cat.innerHTML =
                '<svg viewBox="0 0 48 30" fill="#1f1a26">' +
                '<path d="M38 6l2-5 3 5c2 1 3 3 3 6 0 3-2 5-5 5h-1l-1 11h-3l-1-8H17l-2 8h-3l1-9c-3-1-5-4-5-8 0-1-1-3-4-4C1 6 1 3 3 2c0 3 2 4 4 5 2 1 3 2 4 3h21c1-2 3-4 6-4z"/>' +
                '<circle cx="40" cy="10" r="1" fill="#f3c74a"/><circle cx="43.5" cy="10" r="1" fill="#f3c74a"/>' +
                '</svg>';
            gallery.appendChild(cat);
        }

        // 9. 開発者ツールをのぞいた人へ
        if (window.console && console.log) {
            console.log('%c🎃 Trick or Treat! — cafe apart', 'color:#e8862a;font-size:14px;font-weight:bold;');
        }

        // 10. ヒーロー画像の上を、たまにコウモリが横切る
        var hero = document.querySelector('.hero');
        if (hero && !reduceMotion) {
            var bat = document.createElement('div');
            bat.className = 'hw-bat';
            bat.setAttribute('aria-hidden', 'true');
            bat.innerHTML =
                '<svg viewBox="0 0 64 32" fill="currentColor">' +
                '<path d="M32 10c-2 0-3 1-3.5 2.5L27 10l-1 4C20 8 10 6 2 10c5 1 8 4 9 8 3-2 7-2 9 1 2-2 6-2 8 1l4 4 4-4c2-3 6-3 8-1 2-3 6-3 9-1 1-4 4-7 9-8-8-4-18-2-24 4l-1-4-1.5 2.5C35 11 34 10 32 10z"/>' +
                '</svg>';
            hero.appendChild(bat);

            var fly = function () {
                if (document.hidden) return;
                bat.style.top = (12 + Math.random() * 30) + '%';
                bat.classList.remove('flying');
                void bat.offsetWidth; // アニメーションを再始動させる
                bat.classList.add('flying');
            };
            setTimeout(fly, 4000);
            setInterval(fly, 45000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
