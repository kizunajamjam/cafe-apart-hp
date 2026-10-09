/**
 * cafe apart - Halloween
 * 10月（日本時間）のあいだだけ、サイトにハロウィン要素をこっそり追加する。
 * 11月1日 0:00 (JST) になると自動的に何も表示されなくなる。
 */
(function () {
    // 日本時間の「月」を取得（閲覧者の端末のタイムゾーンに左右されないように）
    var jstMonth = new Date(Date.now() + 9 * 60 * 60 * 1000).getUTCMonth() + 1;
    if (jstMonth !== 10) return;

    function init() {
        document.body.classList.add('halloween');

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
            ghost.innerHTML =
                '<svg viewBox="0 0 30 36">' +
                '<path d="M15 2C8 2 3 7 3 14v20l4-3 4 3 4-3 4 3 4-3 4 3V14C27 7 22 2 15 2z" fill="#fdfbf7" stroke="#2c3e50" stroke-width="1.5"/>' +
                '<circle cx="11" cy="14" r="2" fill="#2c3e50"/><circle cx="19" cy="14" r="2" fill="#2c3e50"/>' +
                '<ellipse cx="15" cy="20" rx="2" ry="2.5" fill="#2c3e50"/>' +
                '</svg>';
            backToTop.appendChild(ghost);
        }

        // 3. ヒーロー画像の上を、たまにコウモリが横切る
        var hero = document.querySelector('.hero');
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
