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

// 離脱防止アラート
let isFormChanged = false;

// 対象となるフォーム要素を指定（複数フォームがある場合にも対応）
const forms = document.querySelectorAll("form");

// 入力や変更があったらフラグをON
document.addEventListener("input", function (e) {
  if (e.target.closest("form")) {
    isFormChanged = true;
  }
});

// フォームが送信された場合は警告をOFF（送信後は離脱警告を出さない）
forms.forEach((form) => {
  form.addEventListener("submit", function () {
    isFormChanged = false;
  });
});

// ページ離脱時に警告を表示
window.addEventListener("beforeunload", function (event) {
  if (isFormChanged) {
    event.preventDefault();
    event.returnValue = ""; // この設定でブラウザ標準の離脱確認が出る
  }
});
