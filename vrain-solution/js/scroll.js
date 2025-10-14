// トップページのみ適用
window.addEventListener("scroll", function() {
  const header = document.querySelector(".top-header");
  const firstViewHeight = document.querySelector(".first-view").offsetHeight;
  const logoImg = document.querySelector("#logo"); // ロゴ画像を取得

  if (window.scrollY > firstViewHeight) {
    header.classList.add("scrolled");
    logoImg.src = "img/logo-color.svg"; // スクロール後のロゴ
  } else {
    header.classList.remove("scrolled");
    logoImg.src = "img/logo-white.svg"; // 元のロゴ
  }
});