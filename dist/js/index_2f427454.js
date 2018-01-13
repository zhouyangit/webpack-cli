!(function(t) {
  function e(n) {
    if (i[n]) return i[n].exports;
    var s = (i[n] = { i: n, l: !1, exports: {} });
    return t[n].call(s.exports, s, s.exports, e), (s.l = !0), s.exports;
  }
  var i = {};
  (e.m = t),
    (e.c = i),
    (e.d = function(t, i, n) {
      e.o(t, i) ||
        Object.defineProperty(t, i, {
          configurable: !1,
          enumerable: !0,
          get: n
        });
    }),
    (e.n = function(t) {
      var i =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return e.d(i, "a", i), i;
    }),
    (e.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (e.p = ""),
    e((e.s = 0));
})([
  function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var s = i(1),
      o = (i.n(s), i(2)),
      r = (i.n(o), i(3)),
      a = (i.n(r), i(4));
    i.n(a);
    $(function() {
      console.log("123test"),
        aaa(),
        $(".m-slider").bxSlider({
          auto: !0,
          controls: !1,
          minSlides: 1,
          maxSlides: 1,
          moveSlides: 1,
          startSlide: 0,
          slideMargin: 60,
          pager: !0
        }),
        $(".headNav ul li")
          .eq(0)
          .addClass("active"),
        (function() {
          $.ajax({
            type: "get",
            data: {},
            dataType: "json",
            success: function(t) {
              if (0 == t.rc) {
                var e = t.result.items;
                if (e && e.length > 0) {
                  $(".announcement ul").empty();
                  for (n in e) {
                    var i = e[n].name,
                      s = $('<li title="' + i + '"></li>').appendTo(
                        $(".announcement ul")
                      ),
                      o = e[n].url;
                    o &&
                      (i =
                        '<a target="_blank" href="' +
                        o +
                        '" style="color:white;">' +
                        i +
                        "</a>"),
                      $("<i></i><span>" + i + "</span>").appendTo($(s));
                  }
                }
              } else console.info("最新动态加载失败！");
            },
            error: function(t) {
              console.info(t);
            }
          });
        })();
    });
  },
  function(t, e) {
    !(function(t) {
      var e = {},
        n = {
          mode: "horizontal",
          slideSelector: "",
          infiniteLoop: !0,
          hideControlOnEnd: !1,
          speed: 500,
          easing: null,
          slideMargin: 0,
          startSlide: 0,
          randomStart: !1,
          captions: !1,
          ticker: !1,
          tickerHover: !1,
          adaptiveHeight: !1,
          adaptiveHeightSpeed: 500,
          video: !1,
          useCSS: !0,
          preloadImages: "visible",
          responsive: !0,
          slideZIndex: 50,
          wrapperClass: "bx-wrapper",
          touchEnabled: !0,
          swipeThreshold: 50,
          oneToOneTouch: !0,
          preventDefaultSwipeX: !0,
          preventDefaultSwipeY: !1,
          pager: !0,
          pagerType: "full",
          pagerShortSeparator: " / ",
          pagerSelector: null,
          buildPager: null,
          pagerCustom: null,
          controls: !0,
          nextText: "Next",
          prevText: "Prev",
          nextSelector: null,
          prevSelector: null,
          autoControls: !1,
          startText: "Start",
          stopText: "Stop",
          autoControlsCombine: !1,
          autoControlsSelector: null,
          auto: !1,
          pause: 4e3,
          autoStart: !0,
          autoDirection: "next",
          autoHover: !1,
          autoDelay: 0,
          autoSlideForOnePage: !1,
          minSlides: 1,
          maxSlides: 1,
          moveSlides: 0,
          slideWidth: 0,
          onSliderLoad: function() {},
          onSlideBefore: function() {},
          onSlideAfter: function() {},
          onSlideNext: function() {},
          onSlidePrev: function() {},
          onSliderResize: function() {}
        };
      t.fn.bxSlider = function(s) {
        if (0 == this.length) return this;
        if (this.length > 1)
          return (
            this.each(function() {
              t(this).bxSlider(s);
            }),
            this
          );
        var o = {},
          r = this;
        e.el = this;
        var a = t(window).width(),
          l = t(window).height(),
          d = function() {
            (o.settings = t.extend({}, n, s)),
              (o.settings.slideWidth = parseInt(o.settings.slideWidth)),
              (o.children = r.children(o.settings.slideSelector)),
              o.children.length < o.settings.minSlides &&
                (o.settings.minSlides = o.children.length),
              o.children.length < o.settings.maxSlides &&
                (o.settings.maxSlides = o.children.length),
              o.settings.randomStart &&
                (o.settings.startSlide = Math.floor(
                  Math.random() * o.children.length
                )),
              (o.active = { index: o.settings.startSlide }),
              (o.carousel =
                o.settings.minSlides > 1 || o.settings.maxSlides > 1),
              o.carousel && (o.settings.preloadImages = "all"),
              (o.minThreshold =
                o.settings.minSlides * o.settings.slideWidth +
                (o.settings.minSlides - 1) * o.settings.slideMargin),
              (o.maxThreshold =
                o.settings.maxSlides * o.settings.slideWidth +
                (o.settings.maxSlides - 1) * o.settings.slideMargin),
              (o.working = !1),
              (o.controls = {}),
              (o.interval = null),
              (o.animProp = "vertical" == o.settings.mode ? "top" : "left"),
              (o.usingCSS =
                o.settings.useCSS &&
                "fade" != o.settings.mode &&
                (function() {
                  var t = document.createElement("div"),
                    e = [
                      "WebkitPerspective",
                      "MozPerspective",
                      "OPerspective",
                      "msPerspective"
                    ];
                  for (var i in e)
                    if (void 0 !== t.style[e[i]])
                      return (
                        (o.cssPrefix = e[i]
                          .replace("Perspective", "")
                          .toLowerCase()),
                        (o.animProp = "-" + o.cssPrefix + "-transform"),
                        !0
                      );
                  return !1;
                })()),
              "vertical" == o.settings.mode &&
                (o.settings.maxSlides = o.settings.minSlides),
              r.data("origStyle", r.attr("style")),
              r.children(o.settings.slideSelector).each(function() {
                t(this).data("origStyle", t(this).attr("style"));
              }),
              c();
          },
          c = function() {
            r.wrap(
              '<div class="' +
                o.settings.wrapperClass +
                '"><div class="bx-viewport"></div></div>'
            ),
              (o.viewport = r.parent()),
              (o.loader = t('<div class="bx-loading" />')),
              o.viewport.prepend(o.loader),
              r.css({
                width:
                  "horizontal" == o.settings.mode
                    ? 100 * o.children.length + 215 + "%"
                    : "auto",
                position: "relative"
              }),
              o.usingCSS && o.settings.easing
                ? r.css(
                    "-" + o.cssPrefix + "-transition-timing-function",
                    o.settings.easing
                  )
                : o.settings.easing || (o.settings.easing = "swing");
            f();
            o.viewport.css({
              width: "100%",
              overflow: "hidden",
              position: "relative"
            }),
              o.viewport.parent().css({ maxWidth: h() }),
              o.settings.pager ||
                o.viewport.parent().css({ margin: "0 auto 0px" }),
              o.children.css({
                float: "horizontal" == o.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
              }),
              o.children.css("width", v()),
              "horizontal" == o.settings.mode &&
                o.settings.slideMargin > 0 &&
                o.children.css("marginRight", o.settings.slideMargin),
              "vertical" == o.settings.mode &&
                o.settings.slideMargin > 0 &&
                o.children.css("marginBottom", o.settings.slideMargin),
              "fade" == o.settings.mode &&
                (o.children.css({
                  position: "absolute",
                  zIndex: 0,
                  display: "none"
                }),
                o.children
                  .eq(o.settings.startSlide)
                  .css({ zIndex: o.settings.slideZIndex, display: "block" })),
              (o.controls.el = t('<div class="bx-controls" />')),
              o.settings.captions && P(),
              (o.active.last = o.settings.startSlide == x() - 1),
              o.settings.video && r.fitVids();
            var e = o.children.eq(o.settings.startSlide);
            "all" == o.settings.preloadImages && (e = o.children),
              o.settings.ticker
                ? (o.settings.pager = !1)
                : (o.settings.pager && T(),
                  o.settings.controls && C(),
                  o.settings.auto && o.settings.autoControls && E(),
                  (o.settings.controls ||
                    o.settings.autoControls ||
                    o.settings.pager) &&
                    o.viewport.after(o.controls.el)),
              g(e, p);
          },
          g = function(e, i) {
            var n = e.find("img, iframe").length;
            if (0 == n) return void i();
            var s = 0;
            e.find("img, iframe").each(function() {
              t(this)
                .one("load", function() {
                  ++s == n && i();
                })
                .each(function() {
                  this.complete && t(this).load();
                });
            });
          },
          p = function() {
            if (
              o.settings.infiniteLoop &&
              "fade" != o.settings.mode &&
              !o.settings.ticker
            ) {
              var e =
                  "vertical" == o.settings.mode
                    ? o.settings.minSlides
                    : o.settings.maxSlides,
                i = o.children
                  .slice(0, e)
                  .clone()
                  .addClass("bx-clone"),
                n = o.children
                  .slice(-e)
                  .clone()
                  .addClass("bx-clone");
              r.append(i).prepend(n);
            }
            o.loader.remove(),
              S(),
              "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0),
              o.viewport.height(u()),
              r.redrawSlider(),
              o.settings.onSliderLoad(o.active.index),
              (o.initialized = !0),
              o.settings.responsive && t(window).bind("resize", X),
              o.settings.auto &&
                o.settings.autoStart &&
                (x() > 1 || o.settings.autoSlideForOnePage) &&
                H(),
              o.settings.ticker && L(),
              o.settings.pager && q(o.settings.startSlide),
              o.settings.controls && W(),
              o.settings.touchEnabled && !o.settings.ticker && F();
          },
          u = function() {
            var e = 0,
              n = t();
            if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)
              if (o.carousel) {
                var s =
                  1 == o.settings.moveSlides
                    ? o.active.index
                    : o.active.index * m();
                for (
                  n = o.children.eq(s), i = 1;
                  i <= o.settings.maxSlides - 1;
                  i++
                )
                  n =
                    s + i >= o.children.length
                      ? n.add(o.children.eq(i - 1))
                      : n.add(o.children.eq(s + i));
              } else n = o.children.eq(o.active.index);
            else n = o.children;
            return (
              "vertical" == o.settings.mode
                ? (n.each(function(i) {
                    e += t(this).outerHeight();
                  }),
                  o.settings.slideMargin > 0 &&
                    (e += o.settings.slideMargin * (o.settings.minSlides - 1)))
                : (e = Math.max.apply(
                    Math,
                    n
                      .map(function() {
                        return t(this).outerHeight(!1);
                      })
                      .get()
                  )),
              "border-box" == o.viewport.css("box-sizing")
                ? (e +=
                    parseFloat(o.viewport.css("padding-top")) +
                    parseFloat(o.viewport.css("padding-bottom")) +
                    parseFloat(o.viewport.css("border-top-width")) +
                    parseFloat(o.viewport.css("border-bottom-width")))
                : "padding-box" == o.viewport.css("box-sizing") &&
                  (e +=
                    parseFloat(o.viewport.css("padding-top")) +
                    parseFloat(o.viewport.css("padding-bottom"))),
              e
            );
          },
          h = function() {
            var t = "100%";
            return (
              o.settings.slideWidth > 0 &&
                (t =
                  "horizontal" == o.settings.mode
                    ? o.settings.maxSlides * o.settings.slideWidth +
                      (o.settings.maxSlides - 1) * o.settings.slideMargin
                    : o.settings.slideWidth),
              t
            );
          },
          v = function() {
            var t = o.settings.slideWidth,
              e = o.viewport.width();
            return (
              0 == o.settings.slideWidth ||
              (o.settings.slideWidth > e && !o.carousel) ||
              "vertical" == o.settings.mode
                ? (t = e)
                : o.settings.maxSlides > 1 &&
                  "horizontal" == o.settings.mode &&
                  (e > o.maxThreshold ||
                    (e < o.minThreshold &&
                      (t =
                        (e -
                          o.settings.slideMargin * (o.settings.minSlides - 1)) /
                        o.settings.minSlides))),
              t
            );
          },
          f = function() {
            var t = 1;
            if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)
              if (o.viewport.width() < o.minThreshold) t = o.settings.minSlides;
              else if (o.viewport.width() > o.maxThreshold)
                t = o.settings.maxSlides;
              else {
                var e = o.children.first().width() + o.settings.slideMargin;
                t = Math.floor(
                  (o.viewport.width() + o.settings.slideMargin) / e
                );
              }
            else "vertical" == o.settings.mode && (t = o.settings.minSlides);
            return t;
          },
          x = function() {
            var t = 0;
            if (o.settings.moveSlides > 0)
              if (o.settings.infiniteLoop)
                t = Math.ceil(o.children.length / m());
              else
                for (var e = 0, i = 0; e < o.children.length; )
                  ++t,
                    (e = i + f()),
                    (i +=
                      o.settings.moveSlides <= f()
                        ? o.settings.moveSlides
                        : f());
            else t = Math.ceil(o.children.length / f());
            return t;
          },
          m = function() {
            return o.settings.moveSlides > 0 && o.settings.moveSlides <= f()
              ? o.settings.moveSlides
              : f();
          },
          S = function() {
            if (
              o.children.length > o.settings.maxSlides &&
              o.active.last &&
              !o.settings.infiniteLoop
            ) {
              if ("horizontal" == o.settings.mode) {
                var t = o.children.last(),
                  e = t.position();
                b(
                  -(e.left - (o.viewport.width() - t.outerWidth())),
                  "reset",
                  0
                );
              } else if ("vertical" == o.settings.mode) {
                var i = o.children.length - o.settings.minSlides,
                  e = o.children.eq(i).position();
                b(-e.top, "reset", 0);
              }
            } else {
              var e = o.children.eq(o.active.index * m()).position();
              o.active.index == x() - 1 && (o.active.last = !0),
                void 0 != e &&
                  ("horizontal" == o.settings.mode
                    ? b(-e.left, "reset", 0)
                    : "vertical" == o.settings.mode && b(-e.top, "reset", 0));
            }
          },
          b = function t(e, i, n, s) {
            if (o.usingCSS) {
              var a =
                "vertical" == o.settings.mode
                  ? "translate3d(0, " + e + "px, 0)"
                  : "translate3d(" + e + "px, 0, 0)";
              r.css("-" + o.cssPrefix + "-transition-duration", n / 1e3 + "s"),
                "slide" == i
                  ? (r.css(o.animProp, a),
                    r.bind(
                      "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                      function() {
                        r.unbind(
                          "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                        ),
                          D();
                      }
                    ))
                  : "reset" == i
                    ? r.css(o.animProp, a)
                    : "ticker" == i &&
                      (r.css(
                        "-" + o.cssPrefix + "-transition-timing-function",
                        "linear"
                      ),
                      r.css(o.animProp, a),
                      r.bind(
                        "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                        function() {
                          r.unbind(
                            "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                          ),
                            t(s.resetValue, "reset", 0),
                            O();
                        }
                      ));
            } else {
              var l = {};
              (l[o.animProp] = e),
                "slide" == i
                  ? r.animate(l, n, o.settings.easing, function() {
                      D();
                    })
                  : "reset" == i
                    ? r.css(o.animProp, e)
                    : "ticker" == i &&
                      r.animate(l, speed, "linear", function() {
                        t(s.resetValue, "reset", 0), O();
                      });
            }
          },
          w = function() {
            for (var e = "", i = x(), n = 0; n < i; n++) {
              var s = "";
              o.settings.buildPager && t.isFunction(o.settings.buildPager)
                ? ((s = o.settings.buildPager(n)),
                  o.pagerEl.addClass("bx-custom-pager"))
                : ((s = n + 1), o.pagerEl.addClass("bx-default-pager")),
                (e +=
                  '<div class="bx-pager-item"><a href="" data-slide-index="' +
                  n +
                  '" class="bx-pager-link">' +
                  s +
                  "</a></div>");
            }
            o.pagerEl.html(e);
          },
          T = function() {
            o.settings.pagerCustom
              ? (o.pagerEl = t(o.settings.pagerCustom))
              : ((o.pagerEl = t('<div class="bx-pager" />')),
                o.settings.pagerSelector
                  ? t(o.settings.pagerSelector).html(o.pagerEl)
                  : o.controls.el.addClass("bx-has-pager").append(o.pagerEl),
                w()),
              o.pagerEl.on("click", "a", I);
          },
          C = function() {
            (o.controls.next = t(
              '<a class="bx-next" href="">' + o.settings.nextText + "</a>"
            )),
              (o.controls.prev = t(
                '<a class="bx-prev" href="">' + o.settings.prevText + "</a>"
              )),
              o.controls.next.bind("click", y),
              o.controls.prev.bind("click", z),
              o.settings.nextSelector &&
                t(o.settings.nextSelector).append(o.controls.next),
              o.settings.prevSelector &&
                t(o.settings.prevSelector).append(o.controls.prev),
              o.settings.nextSelector ||
                o.settings.prevSelector ||
                ((o.controls.directionEl = t(
                  '<div class="bx-controls-direction" />'
                )),
                o.controls.directionEl
                  .append(o.controls.prev)
                  .append(o.controls.next),
                o.controls.el
                  .addClass("bx-has-controls-direction")
                  .append(o.controls.directionEl));
          },
          E = function() {
            (o.controls.start = t(
              '<div class="bx-controls-auto-item"><a class="bx-start" href="">' +
                o.settings.startText +
                "</a></div>"
            )),
              (o.controls.stop = t(
                '<div class="bx-controls-auto-item"><a class="bx-stop" href="">' +
                  o.settings.stopText +
                  "</a></div>"
              )),
              (o.controls.autoEl = t('<div class="bx-controls-auto" />')),
              o.controls.autoEl.on("click", ".bx-start", M),
              o.controls.autoEl.on("click", ".bx-stop", k),
              o.settings.autoControlsCombine
                ? o.controls.autoEl.append(o.controls.start)
                : o.controls.autoEl
                    .append(o.controls.start)
                    .append(o.controls.stop),
              o.settings.autoControlsSelector
                ? t(o.settings.autoControlsSelector).html(o.controls.autoEl)
                : o.controls.el
                    .addClass("bx-has-controls-auto")
                    .append(o.controls.autoEl),
              A(o.settings.autoStart ? "stop" : "start");
          },
          P = function() {
            o.children.each(function(e) {
              var i = t(this)
                .find("img:first")
                .attr("title");
              void 0 != i &&
                ("" + i).length &&
                t(this).append(
                  '<div class="bx-caption"><span>' + i + "</span></div>"
                );
            });
          },
          y = function(t) {
            o.settings.auto && r.stopAuto(),
              r.goToNextSlide(),
              t.preventDefault();
          },
          z = function(t) {
            o.settings.auto && r.stopAuto(),
              r.goToPrevSlide(),
              t.preventDefault();
          },
          M = function(t) {
            r.startAuto(), t.preventDefault();
          },
          k = function(t) {
            r.stopAuto(), t.preventDefault();
          },
          I = function(e) {
            o.settings.auto && r.stopAuto();
            var i = t(e.currentTarget);
            if (void 0 !== i.attr("data-slide-index")) {
              var n = parseInt(i.attr("data-slide-index"));
              n != o.active.index && r.goToSlide(n), e.preventDefault();
            }
          },
          q = function(e) {
            var i = o.children.length;
            if ("short" == o.settings.pagerType)
              return (
                o.settings.maxSlides > 1 &&
                  (i = Math.ceil(o.children.length / o.settings.maxSlides)),
                void o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i)
              );
            o.pagerEl.find("a").removeClass("active"),
              o.pagerEl.each(function(i, n) {
                t(n)
                  .find("a")
                  .eq(e)
                  .addClass("active");
              });
          },
          D = function() {
            if (o.settings.infiniteLoop) {
              var t = "";
              0 == o.active.index
                ? (t = o.children.eq(0).position())
                : o.active.index == x() - 1 && o.carousel
                  ? (t = o.children.eq((x() - 1) * m()).position())
                  : o.active.index == o.children.length - 1 &&
                    (t = o.children.eq(o.children.length - 1).position()),
                t &&
                  ("horizontal" == o.settings.mode
                    ? b(-t.left, "reset", 0)
                    : "vertical" == o.settings.mode && b(-t.top, "reset", 0));
            }
            (o.working = !1),
              o.settings.onSlideAfter(
                o.children.eq(o.active.index),
                o.oldIndex,
                o.active.index
              );
          },
          A = function(t) {
            o.settings.autoControlsCombine
              ? o.controls.autoEl.html(o.controls[t])
              : (o.controls.autoEl.find("a").removeClass("active"),
                o.controls.autoEl
                  .find("a:not(.bx-" + t + ")")
                  .addClass("active"));
          },
          W = function() {
            1 == x()
              ? (o.controls.prev.addClass("disabled"),
                o.controls.next.addClass("disabled"))
              : !o.settings.infiniteLoop &&
                o.settings.hideControlOnEnd &&
                (0 == o.active.index
                  ? (o.controls.prev.addClass("disabled"),
                    o.controls.next.removeClass("disabled"))
                  : o.active.index == x() - 1
                    ? (o.controls.next.addClass("disabled"),
                      o.controls.prev.removeClass("disabled"))
                    : (o.controls.prev.removeClass("disabled"),
                      o.controls.next.removeClass("disabled")));
          },
          H = function() {
            if (o.settings.autoDelay > 0) {
              setTimeout(r.startAuto, o.settings.autoDelay);
            } else r.startAuto();
            o.settings.autoHover &&
              r.hover(
                function() {
                  o.interval && (r.stopAuto(!0), (o.autoPaused = !0));
                },
                function() {
                  o.autoPaused && (r.startAuto(!0), (o.autoPaused = null));
                }
              );
          },
          L = function() {
            var e = 0;
            if ("next" == o.settings.autoDirection)
              r.append(o.children.clone().addClass("bx-clone"));
            else {
              r.prepend(o.children.clone().addClass("bx-clone"));
              var i = o.children.first().position();
              e = "horizontal" == o.settings.mode ? -i.left : -i.top;
            }
            b(e, "reset", 0),
              (o.settings.pager = !1),
              (o.settings.controls = !1),
              (o.settings.autoControls = !1),
              o.settings.tickerHover &&
                !o.usingCSS &&
                o.viewport.hover(
                  function() {
                    r.stop();
                  },
                  function() {
                    var e = 0;
                    o.children.each(function(i) {
                      e +=
                        "horizontal" == o.settings.mode
                          ? t(this).outerWidth(!0)
                          : t(this).outerHeight(!0);
                    });
                    var i = o.settings.speed / e,
                      n = "horizontal" == o.settings.mode ? "left" : "top",
                      s = i * (e - Math.abs(parseInt(r.css(n))));
                    O(s);
                  }
                ),
              O();
          },
          O = function(t) {
            speed = t || o.settings.speed;
            var e = { left: 0, top: 0 },
              i = { left: 0, top: 0 };
            "next" == o.settings.autoDirection
              ? (e = r
                  .find(".bx-clone")
                  .first()
                  .position())
              : (i = o.children.first().position());
            var n = "horizontal" == o.settings.mode ? -e.left : -e.top,
              s = "horizontal" == o.settings.mode ? -i.left : -i.top,
              a = { resetValue: s };
            b(n, "ticker", speed, a);
          },
          F = function() {
            (o.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }),
              o.viewport.bind("touchstart", N);
          },
          N = function(t) {
            if (o.working) t.preventDefault();
            else {
              o.touch.originalPos = r.position();
              var e = t.originalEvent;
              (o.touch.start.x = e.changedTouches[0].pageX),
                (o.touch.start.y = e.changedTouches[0].pageY),
                o.viewport.bind("touchmove", $),
                o.viewport.bind("touchend", j);
            }
          },
          $ = function(t) {
            var e = t.originalEvent,
              i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x),
              n = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
            if (
              (3 * i > n && o.settings.preventDefaultSwipeX
                ? t.preventDefault()
                : 3 * n > i &&
                  o.settings.preventDefaultSwipeY &&
                  t.preventDefault(),
              "fade" != o.settings.mode && o.settings.oneToOneTouch)
            ) {
              var s = 0;
              if ("horizontal" == o.settings.mode) {
                var r = e.changedTouches[0].pageX - o.touch.start.x;
                s = o.touch.originalPos.left + r;
              } else {
                var r = e.changedTouches[0].pageY - o.touch.start.y;
                s = o.touch.originalPos.top + r;
              }
              b(s, "reset", 0);
            }
          },
          j = function t(e) {
            o.viewport.unbind("touchmove", $);
            var i = e.originalEvent,
              n = 0;
            if (
              ((o.touch.end.x = i.changedTouches[0].pageX),
              (o.touch.end.y = i.changedTouches[0].pageY),
              "fade" == o.settings.mode)
            ) {
              var s = Math.abs(o.touch.start.x - o.touch.end.x);
              s >= o.settings.swipeThreshold &&
                (o.touch.start.x > o.touch.end.x
                  ? r.goToNextSlide()
                  : r.goToPrevSlide(),
                r.stopAuto());
            } else {
              var s = 0;
              "horizontal" == o.settings.mode
                ? ((s = o.touch.end.x - o.touch.start.x),
                  (n = o.touch.originalPos.left))
                : ((s = o.touch.end.y - o.touch.start.y),
                  (n = o.touch.originalPos.top)),
                !o.settings.infiniteLoop &&
                ((0 == o.active.index && s > 0) || (o.active.last && s < 0))
                  ? b(n, "reset", 200)
                  : Math.abs(s) >= o.settings.swipeThreshold
                    ? (s < 0 ? r.goToNextSlide() : r.goToPrevSlide(),
                      r.stopAuto())
                    : b(n, "reset", 200);
            }
            o.viewport.unbind("touchend", t);
          },
          X = function(e) {
            if (o.initialized) {
              var i = t(window).width(),
                n = t(window).height();
              (a == i && l == n) ||
                ((a = i),
                (l = n),
                r.redrawSlider(),
                o.settings.onSliderResize.call(r, o.active.index));
            }
          };
        return (
          (r.goToSlide = function(e, i) {
            if (!o.working && o.active.index != e)
              if (
                ((o.working = !0),
                (o.oldIndex = o.active.index),
                e < 0
                  ? (o.active.index = x() - 1)
                  : e >= x() ? (o.active.index = 0) : (o.active.index = e),
                o.settings.onSlideBefore(
                  o.children.eq(o.active.index),
                  o.oldIndex,
                  o.active.index
                ),
                "next" == i
                  ? o.settings.onSlideNext(
                      o.children.eq(o.active.index),
                      o.oldIndex,
                      o.active.index
                    )
                  : "prev" == i &&
                    o.settings.onSlidePrev(
                      o.children.eq(o.active.index),
                      o.oldIndex,
                      o.active.index
                    ),
                (o.active.last = o.active.index >= x() - 1),
                o.settings.pager && q(o.active.index),
                o.settings.controls && W(),
                "fade" == o.settings.mode)
              )
                o.settings.adaptiveHeight &&
                  o.viewport.height() != u() &&
                  o.viewport.animate(
                    { height: u() },
                    o.settings.adaptiveHeightSpeed
                  ),
                  o.children
                    .filter(":visible")
                    .fadeOut(o.settings.speed)
                    .css({ zIndex: 0 }),
                  o.children
                    .eq(o.active.index)
                    .css("zIndex", o.settings.slideZIndex + 1)
                    .fadeIn(o.settings.speed, function() {
                      t(this).css("zIndex", o.settings.slideZIndex), D();
                    });
              else {
                o.settings.adaptiveHeight &&
                  o.viewport.height() != u() &&
                  o.viewport.animate(
                    { height: u() },
                    o.settings.adaptiveHeightSpeed
                  );
                var n = 0,
                  s = { left: 0, top: 0 };
                if (!o.settings.infiniteLoop && o.carousel && o.active.last)
                  if ("horizontal" == o.settings.mode) {
                    var a = o.children.eq(o.children.length - 1);
                    (s = a.position()),
                      (n = o.viewport.width() - a.outerWidth());
                  } else {
                    var l = o.children.length - o.settings.minSlides;
                    s = o.children.eq(l).position();
                  }
                else if (o.carousel && o.active.last && "prev" == i) {
                  var d =
                      1 == o.settings.moveSlides
                        ? o.settings.maxSlides - m()
                        : (x() - 1) * m() -
                          (o.children.length - o.settings.maxSlides),
                    a = r.children(".bx-clone").eq(d);
                  s = a.position();
                } else if ("next" == i && 0 == o.active.index)
                  (s = r
                    .find("> .bx-clone")
                    .eq(o.settings.maxSlides)
                    .position()),
                    (o.active.last = !1);
                else if (e >= 0) {
                  var c = e * m();
                  s = o.children.eq(c).position();
                }
                if (void 0 !== s) {
                  var g =
                    "horizontal" == o.settings.mode ? -(s.left - n) : -s.top;
                  b(g, "slide", o.settings.speed);
                }
              }
          }),
          (r.goToNextSlide = function() {
            if (o.settings.infiniteLoop || !o.active.last) {
              var t = parseInt(o.active.index) + 1;
              r.goToSlide(t, "next");
            }
          }),
          (r.goToPrevSlide = function() {
            if (o.settings.infiniteLoop || 0 != o.active.index) {
              var t = parseInt(o.active.index) - 1;
              r.goToSlide(t, "prev");
            }
          }),
          (r.startAuto = function(t) {
            o.interval ||
              ((o.interval = setInterval(function() {
                "next" == o.settings.autoDirection
                  ? r.goToNextSlide()
                  : r.goToPrevSlide();
              }, o.settings.pause)),
              o.settings.autoControls && 1 != t && A("stop"));
          }),
          (r.stopAuto = function(t) {
            o.interval &&
              (clearInterval(o.interval),
              (o.interval = null),
              o.settings.autoControls && 1 != t && A("start"));
          }),
          (r.getCurrentSlide = function() {
            return o.active.index;
          }),
          (r.getCurrentSlideElement = function() {
            return o.children.eq(o.active.index);
          }),
          (r.getSlideCount = function() {
            return o.children.length;
          }),
          (r.redrawSlider = function() {
            o.children.add(r.find(".bx-clone")).width(v()),
              o.viewport.css("height", u()),
              o.settings.ticker || S(),
              o.active.last && (o.active.index = x() - 1),
              o.active.index >= x() && (o.active.last = !0),
              o.settings.pager &&
                !o.settings.pagerCustom &&
                (w(), q(o.active.index));
          }),
          (r.destroySlider = function() {
            o.initialized &&
              ((o.initialized = !1),
              t(".bx-clone", this).remove(),
              o.children.each(function() {
                void 0 != t(this).data("origStyle")
                  ? t(this).attr("style", t(this).data("origStyle"))
                  : t(this).removeAttr("style");
              }),
              void 0 != t(this).data("origStyle")
                ? this.attr("style", t(this).data("origStyle"))
                : t(this).removeAttr("style"),
              t(this)
                .unwrap()
                .unwrap(),
              o.controls.el && o.controls.el.remove(),
              o.controls.next && o.controls.next.remove(),
              o.controls.prev && o.controls.prev.remove(),
              o.pagerEl && o.settings.controls && o.pagerEl.remove(),
              t(".bx-caption", this).remove(),
              o.controls.autoEl && o.controls.autoEl.remove(),
              clearInterval(o.interval),
              o.settings.responsive && t(window).unbind("resize", X));
          }),
          (r.reloadSlider = function(t) {
            void 0 != t && (s = t), r.destroySlider(), d();
          }),
          d(),
          this
        );
      };
    })(jQuery);
  },
  function(t, e) {},
  function(t, e) {},
  function(t, e) {
    function i() {
      alert(123);
    }
    t.exports = i;
  }
]);
