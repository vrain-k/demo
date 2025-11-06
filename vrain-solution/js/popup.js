// JavaScript Document

// 共通：ポップアップ表示
function showPopup() {
  const popup = document.getElementById('popup');
  if (!popup || popup.dataset.shown) return;

  const isMobile = window.innerWidth <= 767;

  if (isMobile) {
    popup.classList.add('show');
    popup.style.display = 'flex';
  } else {
    popup.style.display = 'flex';
  }

  popup.dataset.shown = true;
}

// 共通：閉じる処理
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
  popup.classList.remove('show');
  localStorage.setItem('popupClosed', 'true');
}

// 閉じるボタン
document.getElementById('popup-close').addEventListener('click', closePopup);

// 背景クリックで閉じる（リンククリックは除外）
document.getElementById('popup').addEventListener('click', (e) => {
  if (e.target.id === 'popup') {
    closePopup();
  }
});

// ページ滞在10秒後に表示（再表示防止付き）
setTimeout(() => {
  if (localStorage.getItem('popupClosed') !== 'true') {
    showPopup();
  }
}, 10000);

// ページスクロールに応じて表示（スクロールが半分を超えたら）
window.addEventListener('scroll', function() {
  if (window.scrollY > window.innerHeight * 0.5) {
    showPopup();
  }
});
