// JavaScript Document
const menuLinks = document.querySelectorAll('.menu-content a');
const menuCheckbox = document.getElementById('menu-btn-check');
const menuContent = document.querySelector('.menu-content');

// メニューを閉じる関数（アニメーション付き）
function closeMenu() {
  // リンクをフェードアウト
  menuLinks.forEach(link => link.classList.add('closed'));

  // アニメーション後にチェックを外す
  setTimeout(() => {
    menuCheckbox.checked = false;
    menuLinks.forEach(link => link.classList.remove('closed'));
  }, 300); // CSSで設定したフェード時間と合わせる
}

// リンククリックで閉じる
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// スクロールで閉じる
window.addEventListener('scroll', () => {
  if (menuCheckbox.checked) closeMenu();
});

// リサイズで閉じる
window.addEventListener('resize', () => {
  if (menuCheckbox.checked) closeMenu();
});

// スマホ用固定メニューがフッター付近で消える
document.addEventListener("DOMContentLoaded", function () {
  const bottomMenu = document.querySelector(".bottom-menu");
  const footer = document.querySelector("footer");

  function checkFooterVisibility() {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // フッターが画面内に見え始めたらメニューを非表示
    if (footerRect.top < windowHeight) {
      bottomMenu.classList.add("hide");
    } else {
      bottomMenu.classList.remove("hide");
    }
  }

  window.addEventListener("scroll", checkFooterVisibility);
});
