// showPopup: display をセットしてからクラスを付与（アニメーションを発火）
function showPopup() {
  if (!popup || popup.dataset.shown) return;

  // まず表示ブロック化（display が none の場合のみ）
  if (getComputedStyle(popup).display === 'none') {
    popup.style.display = 'flex';
  }

  // 次のフレームでクラスを付ける（確実に transition を発火させる）
  requestAnimationFrame(() => {
    popup.classList.add('show');
  });

  popup.dataset.shown = 'true';
}

// closePopup: class を外して transitionend で display:none にする
function closePopup() {
  if (!popup) return;
  popup.classList.remove('show');

  // after transition finish, hide element
  const onTransitionEnd = (e) => {
    // 影響を受けるプロパティでフィルタする（opacity）
    if (e.propertyName && e.propertyName !== 'opacity') return;

    popup.style.display = 'none';
    popup.removeEventListener('transitionend', onTransitionEnd);
  };

  // もし transitionend が発火しないケースの保険でタイムアウトも付ける
  popup.addEventListener('transitionend', onTransitionEnd);
  setTimeout(() => {
    // safety fallback (in case transitionend didn't fire)
    if (getComputedStyle(popup).opacity === '0') {
      popup.style.display = 'none';
      try { popup.removeEventListener('transitionend', onTransitionEnd); } catch(e){}
    }
  }, 700); // transition + マージン
  localStorage.setItem('popupClosed', 'true');
}

// イベント登録（DOMContentLoaded 後に安全に行う）
document.addEventListener('DOMContentLoaded', () => {
  // ======== ページ判定 ======== //
  const path = location.pathname;
  let PAGE_KEY = '';
  let IMAGES = [];

  if (path === '/demo/LP/' || path.endsWith('/demo/LP/index.html')) {
    // メインLP
    PAGE_KEY = 'lpai';
    IMAGES = [
      './img/popup-lp_a.png',
      './img/popup-lp_b.png',
      './img/popup-lp_c.png'
    ];
  } else if (path.includes('/demo/LP/free-test/')) {
    // 無償テストLP
    PAGE_KEY = 'lpfree';
    IMAGES = [
      './../img/popup-test_a.png',
      './../img/popup-test_b.png',
      './../img/popup-test_c.png'
    ];
  } else {
    // 対象外ページでは処理しない
    return;
  }

  // ======== 要素取得 ======== //
  const popup = document.getElementById('popup');
  const closeBtn = document.getElementById('popup-close');
  const popupImg = document.querySelector('.popup__image');
  if (!popup || !popupImg) return;

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

  // 1日3回以上なら終了
  if (popupData.count >= 3) return;

  // ======== ランダム画像選択（重複防止） ======== //
  let availableIndexes = IMAGES.map((_, i) => i).filter(i => !popupData.shownIndexes.includes(i));
  if (availableIndexes.length === 0) {
    availableIndexes = IMAGES.map((_, i) => i);
    popupData.shownIndexes = [];
  }

  const indexToShow = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  popupImg.src = IMAGES[indexToShow];

  // ======== 表示処理 ======== //
  const showPopup = () => {
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

    // 履歴更新
    popupData.count++;
    popupData.shownIndexes.push(indexToShow);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(popupData));
  };

  // ======== イベント登録 ======== //
  if (closeBtn) closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', e => {
    if (e.target.id === 'popup') closePopup();
  });

  // ======== 表示トリガー ======== //
  // 滞在10秒後
  setTimeout(() => {
    if (popupData.count < 3) showPopup();
  }, 10000);

  // スクロール80%以上
  window.addEventListener('scroll', () => {
    if (popupData.count >= 3) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / docHeight) * 100;
    if (percent >= 80) showPopup();
  });
});
