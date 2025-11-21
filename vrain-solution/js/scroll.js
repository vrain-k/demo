// トップページのみ適用
window.addEventListener("scroll", function() {
  const header = document.querySelector(".top-header");
  const logoImg = document.querySelector("#logo"); // ロゴ画像を取得  
  const firstView = document.querySelector(".first-view");
  
  // first-viewがあるページ（＝トップページ）だけ実行
  if (!firstView) return;
  
  const firstViewHeight = firstView.offsetHeight;

  if (window.scrollY > firstViewHeight) {
    header.classList.add("scrolled");
    logoImg.src = "img/logo-color.svg"; // スクロール後のロゴ
  } else {
    header.classList.remove("scrolled");
    logoImg.src = "img/logo-white.svg"; // 元のロゴ
  }
});

// カテゴリチェック
  const labels = document.querySelectorAll('.category-label');
  const allBtn = document.getElementById('allBtn');

  // ▼ フィルタ処理
  function filterItems() {
    const activeCategories = [...labels]
      .filter(label => label.querySelector('.checkbox').classList.contains('checked'))
      .map(label => label.dataset.category);

    const items = document.querySelectorAll('.industry-box');

    // 「全て」が選択されている or 何も選ばれていない → 全部表示
    if (activeCategories.includes("全て") || activeCategories.length === 0) {
      items.forEach(item => item.style.display = "block");
      return;
    }

    // 選ばれたカテゴリだけ表示
    items.forEach(item => {
      const category = item.querySelector('.ind-span').innerText.trim();
      item.style.display = activeCategories.includes(category) ? "block" : "none";
    });
  }

  // ▼ チェックボックスの制御（前と同じ）
  labels.forEach(label => {
    label.addEventListener('click', () => {
      const box = label.querySelector('.checkbox');

      // 全て
      if (label === allBtn) {
        const isAll = !box.classList.contains('checked');
        labels.forEach(l => l.querySelector('.checkbox').classList.toggle('checked', isAll));
      } else {
        box.classList.toggle('checked');

        const allChecked = [...labels]
          .filter(l => l !== allBtn)
          .every(l => l.querySelector('.checkbox').classList.contains('checked'));
        allBtn.querySelector('.checkbox').classList.toggle('checked', allChecked);
      }

      filterItems();
    });
  });

  // ▼ 初期表示：全件表示
  filterItems();

// ページ内リンクのスムーズスクロール（ヘッダー高さ考慮）
const headerHeight = 80; // ヘッダーの高さ

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault(); // デフォルトのジャンプを無効化
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      // ヘッダー高さ分を引いた位置にスクロール
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
