$(function () {
  // --- URLのハッシュ（#pressなど）を見てタブを自動切り替え ---
  const hash = window.location.hash;
  if (hash) {
    const tabName = hash.replace('#', '');
    setTimeout(function() {
      $('.top-news__category-heading[data-tab="' + tabName + '"]').trigger('click');
    }, 100);
  }

  // ハンバーガーメニュー
  $("#js-hamburger").on("click", function () {
    $(".header").toggleClass("open");
  });

  // ニュース切り替え
  $(".top-news__category-heading").on("click", function () {
    const target = $(this).attr("data-tab");
    $(".top-news__content, .top-news__category-heading").removeClass("is-active");
    $(this).addClass("is-active");

    if (target) {
      $("#" + target).addClass("is-active");
    } else {
      $(this).closest(".top-news__content").addClass("is-active");
    }
  });

  // ==========================================
  // 追記：スムーススクロール
  // ==========================================
  $('a[href^="#"]').on("click", function () {
    const speed = 500;
    const href = $(this).attr("href");
    const target = $(href == "#" || href == "" ? "html" : href);

    // 固定ヘッダーがある場合はその高さを取得（クラス名は適宜合わせてください）
    const headerHeight = $(".header").innerHeight(); 
    const position = target.offset().top - headerHeight;

    $("body,html").animate({ scrollTop: position }, speed, "swing");

    // ハンバーガーメニューが開いている場合は閉じる
    if ($(".header").hasClass("open")) {
      $(".header").removeClass("open");
    }
    
    return false;
  });

  // ==========================================
  // 追記：ふわっと浮き上がるアニメーション（スクロール監視）
  // ==========================================
  $(window).on("scroll load", function () { // 読み込み時にも実行
    $(".u-fade-up").each(function () {
      const scroll = $(window).scrollTop();
      const target = $(this).offset().top;
      const windowHeight = $(window).height();

      // セクションが画面の下から200pxの位置に来たら表示
      if (scroll > target - windowHeight + 200) {
        $(this).addClass("is-show");
      }
    });
  });
});