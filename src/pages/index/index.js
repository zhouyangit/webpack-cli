import bxslider from "common/js/jquery.bxslider";
import 'common/css/jquery.bxslider.css'
import "./crawler_index.less";
import {show} from "./common";

$(function() {
  let zhouyang = '123test';
  console.log(zhouyang);
 show();
  $(".m-slider").bxSlider({
    auto: true,
    controls: false,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    startSlide: 0,
    slideMargin: 60,
    pager: true
  });
  $(".headNav ul li").eq(0).addClass("active");
  loadTrends();

  //加载最新动态信息
  function loadTrends() {
    $.ajax({
      //   url: '@@include('../components/url.html')news',
      type: "get",
      data: {},
      dataType: "json",
      success: function(data) {
        if (data.rc == 0) {
          var trends = data.result.items;
          if (trends && trends.length > 0) {
            $(".announcement ul").empty();
            for (n in trends) {
              var name = trends[n].name;
              var li = $('<li title="' + name + '"></li>').appendTo(
                $(".announcement ul")
              );
              var url = trends[n].url;
              if (url) {
                name =
                  '<a target="_blank" href="' +
                  url +
                  '" style="color:white;">' +
                  name +
                  "</a>";
              }
              $("<i></i><span>" + name + "</span>").appendTo($(li));
            }
          }
        } else {
          console.info("最新动态加载失败！");
        }
      },
      error: function(data) {
        console.info(data);
      }
    });
  }
});
