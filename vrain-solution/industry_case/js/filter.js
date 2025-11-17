// JavaScript Document
    document.addEventListener("DOMContentLoaded", function () {
      const labels = document.querySelectorAll('.category-label');
      const allBtn = document.getElementById('allBtn');
      const items = document.querySelectorAll('.industry-box');
      const categorySelect = document.getElementById('categorySelect');

      function showAllItems() {
        items.forEach(item => {
          item.style.display = "block";
        });
      }

      function filterItems() {
        const activeCategories = [...labels]
          .filter(label => label.querySelector('.checkbox').classList.contains('checked'))
          .map(label => label.dataset.category);

        if (activeCategories.length === 0 || activeCategories.includes("全て")) {
          showAllItems();
          return;
        }

        items.forEach(item => {
          const category = item.querySelector('.ind-span').innerText.trim();
          item.style.display = activeCategories.includes(category) ? "block" : "none";
        });
      }
      
// ★★ SPセレクト用：選択された値に合わせてチェックボックス状態を更新してから filterItems を呼ぶ
      if (categorySelect) {
        categorySelect.addEventListener('change', function () {
          const value = this.value; // ""（全て） or "食品" など

          // いったん全チェックをクリア
          labels.forEach(label => {
            label.querySelector('.checkbox').classList.remove('checked');
          });

          if (value === "") {
            // 全て → 全件表示（チェックはなし）
            showAllItems();
          } else {
            // 該当カテゴリのラベルだけchecked状態に
            labels.forEach(label => {
              if (label.dataset.category === value) {
                label.querySelector('.checkbox').classList.add('checked');
              }
            });
            filterItems();
          }
        });
      }    

      labels.forEach(label => {
        label.addEventListener('click', () => {
          const box = label.querySelector('.checkbox');

          if (label === allBtn) {
            const isAllNow = !box.classList.contains('checked');
            if (isAllNow) {
              labels.forEach(l => l.querySelector('.checkbox').classList.add('checked'));
            } else {
              labels.forEach(l => l.querySelector('.checkbox').classList.remove('checked'));
            }
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

      // 初期状態：全部表示、チェックは全部OFF
      labels.forEach(label => {
        label.querySelector('.checkbox').classList.remove('checked');
      });
      showAllItems();
      
// 追加↓
// ページ読み込み時にURLの ?category=◯◯ を取得
      const params = new URLSearchParams(window.location.search);
      const categoryFromURL = params.get('category');

      if (categoryFromURL) {
        // チェックボックスを該当カテゴリだけONに
        labels.forEach(label => {
          const box = label.querySelector('.checkbox');
          if (label.dataset.category === categoryFromURL) {
            box.classList.add('checked');
          } else if (label.dataset.category !== '全て') {
            box.classList.remove('checked');
          }
        });
        // 全件表示ボタンも調整
        const allChecked = [...labels].filter(l => l !== allBtn).every(l => l.querySelector('.checkbox').classList.contains('checked'));
        allBtn.querySelector('.checkbox').classList.toggle('checked', allChecked);

        filterItems(); // フィルタ更新
      }
    });