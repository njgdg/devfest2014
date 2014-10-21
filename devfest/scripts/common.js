(function() {
  function setBannerHeight() {
    var win_width = $(window).width();

    $("#slogenBanner").height(win_width * 673 / 1366)

    $('#J_map').height(win_width * 900 / 1366)

    $('#aboutBanner').height(win_width * 598 / 1366)

    $('#joinBanner').height(win_width * 598 / 1366)

    $('#guestBanner').height(win_width * 598 / 1366)
  }
  setBannerHeight();
  $(window).resize(setBannerHeight);

  // wxshare
  var WxOptions = {
    "img_width": "120",
    "img_height": "120",
    "link": 'http://www.njgdg.org/devfest', //分享链接
    "img_url": "http://www.njgdg.org/devfest/img/data/logo.jpg", //logo
    "title": "2014年11月9日南京GDG DevFest2014开发者大会即将开战！", //定义分享标题
    "desc": "2014年11月9日南京大学鼓楼校区科学技术报告厅"
  };
  document.addEventListener('WeixinJSBridgeReady', function(){
    WeixinJSBridge.on('menu:share:appmessage', function() {
      WeixinJSBridge.invoke('sendAppMessage', WxOptions);
    });
    WeixinJSBridge.on('menu:share:timeline', function() {
      WeixinJSBridge.invoke('shareTimeline', WxOptions);
    });
  }, false);
}())