// JavaScript Document

document.addEventListener('DOMContentLoaded', () => {
  // ======== 要素取得 ======== //
  const popup        = document.getElementById('popup');
  const closeBtn     = document.getElementById('popup-close');
  const popupImg     = document.querySelector('.popup__image');
  const menuCheckbox = document.getElementById('menu-btn-check'); // ハンバーガー

  if (!popup || !popupImg) return;

  // ★ data-popup-id からページ種別を取得
  const popupId = popup.dataset.popupId || 'lpai';

  // ======== ページ別設定マップ ======== //
  const POPUP_CONFIG = {
    // LP A（通常版）
    lpai: {
      pageKey: 'lpai',
      images: [
        './img/popup-lpai_a.png',
        './img/popup-lpai_b.png',
        './img/popup-lpai_c.png'
      ]
    },
    // LP B（free-test 版）
    lpfree: {
      pageKey: 'lpfree',
      images: [
        './img/popup-lpfree_a.png',
        './img/popup-lpfree_b.png'
      ]
    }
  };

  // 対応する設定がなければデフォルト lpai を使う
  const config  = POPUP_CONFIG[popupId] || POPUP_CONFIG['lpai'];
  const PAGE_KEY = config.pageKey;
  const IMAGES   = config.images;

  // ======== メニュー開閉状態を判定 ======== //
  function isMenuOpen() {
    return menuCheckbox && menuCheckbox.checked;
  }

  // ======== LocalStorage 設定 ======== //
  const STORAGE_KEY = `popupshown_${PAGE_KEY}`;
  const today = new Date().toISOString().split('T')[0];
  let popupData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    date: today,
    count: 0,
    shownIndexes: []
  };

  // 日付が変わったらリセット
  if (popupData.date !== today) {
    popupData = { date: today, count: 0, shownIndexes: [] };
  }

  // すでに3回表示済みなら終了
  if (popupData.count >= 3) return;

  // ======== 表示する画像を選択 ======== //
  let availableIndexes = IMAGES.map((_, i) => i).filter(i => !popupData.shownIndexes.includes(i));
  if (availableIndexes.length === 0) {
    availableIndexes = IMAGES.map((_, i) => i);
    popupData.shownIndexes = [];
  }

  const indexToShow = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  popupImg.src = IMAGES[indexToShow];

  // ======== 表示処理 ======== //
  const showPopup = () => {
    // ハンバーガーメニューが開いている間は出さない
    if (isMenuOpen()) return;

    if (popup.classList.contains('show')) return;
    popup.style.display = 'flex';
    requestAnimationFrame(() => popup.classList.add('show'));
  };

  // ======== 閉じる処理 ======== //
  const closePopup = () => {
    popup.classList.remove('show');
    popup.addEventListener('transitionend', () => {
      popup.style.display = 'none';
    }, { once: true });

    // 表示履歴更新（1日3回まで）
    popupData.count++;
    popupData.shownIndexes.push(indexToShow);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(popupData));
  };

  // ======== イベント登録 ======== //
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // 背景クリックで閉じる
  popup.addEventListener('click', e => {
    if (e.target.id === 'popup') closePopup();
  });

  // ハンバーガーメニュー開いたらポップアップを閉じる
  if (menuCheckbox) {
    menuCheckbox.addEventListener('change', () => {
      if (menuCheckbox.checked && popup.classList.contains('show')) {
        closePopup();
      }
    });
  }

  // ======== 表示トリガー ======== //
  // ① ページ滞在10秒後
  setTimeout(() => {
    if (popupData.count < 3) showPopup();
  }, 10000);

  // ② スクロール率80%以上
  window.addEventListener('scroll', () => {
    if (popupData.count >= 3) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / docHeight) * 100;
    if (percent >= 80) showPopup();
  });
});
