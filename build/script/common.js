(function() {
  function setBannerHeight() {
    var win_width = $(window).width();

    $("#slogenBanner").height(win_width * 673 / 1366)

    $('#J_map').height(win_width * 506 / 1366)

    $('#aboutBanner').height(win_width * 598 / 1366)

    $('#joinBanner').height(win_width * 598 / 1366)

    $('#guestBanner').height(win_width * 598 / 1366)
  }
  setBannerHeight();
  $(window).resize(setBannerHeight);


}())