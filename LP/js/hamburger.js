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
