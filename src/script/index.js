(function() {

  "use strict";

  function loopWithPause(arr, func, time, end) {
    if (!arr.length) {
      return;
    }

    function one(idx, arr) {
      if (idx === arr.length) {
        end && end.call(null);
        return;
      } else {
        setTimeout(function() {
          func.call(arr[idx], idx, arr[idx]);
          idx++;
          one(idx, arr);
        }, time);
      }
    }

    func.call(arr[0], 0, arr[0]);
    one(1, arr);
  }

  var InputArea = function(domId) {
    this.dom = document.getElementById(domId);
  }
  InputArea.prototype = {
    run: function(wordsArr) {
      var _ = this;
      var i = 0;
      _.flash = setInterval(function() {
        _.dom.style.borderColor = (++i) % 2 === 0 ? 'transparent' : 'yellow';
      }, 500);

      var start = -1;
      var size = wordsArr.length - 1;
      
      function doInput(){
        _.input(wordsArr[++start], function(){
          if(start === size){
            start = -1;
          }
          setTimeout(doInput, 5000);
        });
      }
      
      doInput();
    },
    input: function(word, end) {
      this.dom.innerHTML = '';
      var _ = this;
      var chars = word.split('');

      loopWithPause(chars, function(i, item) {
        _.dom.innerHTML = _.dom.innerHTML + item;
      }, 50, end);
    }
  }

  var sloganArea = new InputArea('J_sloganArea');
  sloganArea.run(['have fun!', 'coding!', 'rocking!']);


  // var map = new BMap.Map('J_map');
  // map.centerAndZoom(new BMap.Point(118.819224, 31.950503), 32);
  // var marker = new BMap.Marker(new BMap.Point(118.819224, 31.950503));
  // map.addOverlay(marker);
  // var opts = {
  //   width: 220, // 信息窗口宽度      
  //   height: 60, // 信息窗口高度      
  //   title: "南京GDG DevFest 2014" // 信息窗口标题     
  // }
  // var infoWindow = new BMap.InfoWindow('<div style="font-size: 12px">地址：南京市鼓楼区南京大学 <br />电话：18260008278</div>', opts); // 创建信息窗口对象      

  // marker.addEventListener('click', function() {
  //   map.openInfoWindow(infoWindow, marker.getPosition()); // 打开信息窗口
  // });

}())