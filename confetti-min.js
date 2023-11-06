/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/canvas-confetti@1.9.0/dist/confetti.browser.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function (t, e) {
  !(function t(e, a, n, o) {
    var r = !!(
        e.Worker &&
        e.Blob &&
        e.Promise &&
        e.OffscreenCanvas &&
        e.OffscreenCanvasRenderingContext2D &&
        e.HTMLCanvasElement &&
        e.HTMLCanvasElement.prototype.transferControlToOffscreen &&
        e.URL &&
        e.URL.createObjectURL
      ),
      i = "function" == typeof Path2D && "function" == typeof DOMMatrix;
    function l() {}
    function s(t) {
      var n = a.exports.Promise,
        o = void 0 !== n ? n : e.Promise;
      return "function" == typeof o ? new o(t) : (t(l, l), null);
    }
    var c,
      h,
      f,
      u,
      d,
      m,
      p,
      g,
      b,
      M =
        ((f = Math.floor(1e3 / 60)),
        (u = {}),
        (d = 0),
        "function" == typeof requestAnimationFrame &&
        "function" == typeof cancelAnimationFrame
          ? ((c = function (t) {
              var e = Math.random();
              return (
                (u[e] = requestAnimationFrame(function a(n) {
                  d === n || d + f - 1 < n
                    ? ((d = n), delete u[e], t())
                    : (u[e] = requestAnimationFrame(a));
                })),
                e
              );
            }),
            (h = function (t) {
              u[t] && cancelAnimationFrame(u[t]);
            }))
          : ((c = function (t) {
              return setTimeout(t, f);
            }),
            (h = function (t) {
              return clearTimeout(t);
            })),
        {frame: c, cancel: h}),
      v =
        ((g = {}),
        function () {
          if (m) return m;
          if (!n && r) {
            var e = [
              "var CONFETTI, SIZE = {}, module = {};",
              "(" + t.toString() + ")(this, module, true, SIZE);",
              "onmessage = function(msg) {",
              "  if (msg.data.options) {",
              "    CONFETTI(msg.data.options).then(function () {",
              "      if (msg.data.callback) {",
              "        postMessage({ callback: msg.data.callback });",
              "      }",
              "    });",
              "  } else if (msg.data.reset) {",
              "    CONFETTI && CONFETTI.reset();",
              "  } else if (msg.data.resize) {",
              "    SIZE.width = msg.data.resize.width;",
              "    SIZE.height = msg.data.resize.height;",
              "  } else if (msg.data.canvas) {",
              "    SIZE.width = msg.data.canvas.width;",
              "    SIZE.height = msg.data.canvas.height;",
              "    CONFETTI = module.exports.create(msg.data.canvas);",
              "  }",
              "}",
            ].join("\n");
            try {
              m = new Worker(URL.createObjectURL(new Blob([e])));
            } catch (t) {
              return (
                void 0 !== typeof console &&
                  "function" == typeof console.warn &&
                  console.warn("🎊 Could not load worker", t),
                null
              );
            }
            !(function (t) {
              function e(e, a) {
                t.postMessage({options: e || {}, callback: a});
              }
              (t.init = function (e) {
                var a = e.transferControlToOffscreen();
                t.postMessage({canvas: a}, [a]);
              }),
                (t.fire = function (a, n, o) {
                  if (p) return e(a, null), p;
                  var r = Math.random().toString(36).slice(2);
                  return (p = s(function (n) {
                    function i(e) {
                      e.data.callback === r &&
                        (delete g[r],
                        t.removeEventListener("message", i),
                        (p = null),
                        o(),
                        n());
                    }
                    t.addEventListener("message", i),
                      e(a, r),
                      (g[r] = i.bind(null, {data: {callback: r}}));
                  }));
                }),
                (t.reset = function () {
                  for (var e in (t.postMessage({reset: !0}), g))
                    g[e](), delete g[e];
                });
            })(m);
          }
          return m;
        }),
      y = {
        particleCount: 50,
        angle: 90,
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        gravity: 1,
        drift: 0,
        ticks: 200,
        x: 0.5,
        y: 0.5,
        shapes: ["square", "circle"],
        zIndex: 100,
        colors: [
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff",
        ],
        disableForReducedMotion: !1,
        scalar: 1,
      };
    function w(t, e, a) {
      return (function (t, e) {
        return e ? e(t) : t;
      })(t && null != t[e] ? t[e] : y[e], a);
    }
    function x(t) {
      return t < 0 ? 0 : Math.floor(t);
    }
    function C(t) {
      return parseInt(t, 16);
    }
    function T(t) {
      return t.map(I);
    }
    function I(t) {
      var e = String(t).replace(/[^0-9a-f]/gi, "");
      return (
        e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
        {
          r: C(e.substring(0, 2)),
          g: C(e.substring(2, 4)),
          b: C(e.substring(4, 6)),
        }
      );
    }
    function E(t) {
      (t.width = document.documentElement.clientWidth),
        (t.height = document.documentElement.clientHeight);
    }
    function S(t) {
      var e = t.getBoundingClientRect();
      (t.width = e.width), (t.height = e.height);
    }
    function P(t, e) {
      (e.x += Math.cos(e.angle2D) * e.velocity + e.drift),
        (e.y += Math.sin(e.angle2D) * e.velocity + e.gravity),
        (e.velocity *= e.decay),
        e.flat
          ? ((e.wobble = 0),
            (e.wobbleX = e.x + 10 * e.scalar),
            (e.wobbleY = e.y + 10 * e.scalar),
            (e.tiltSin = 0),
            (e.tiltCos = 0),
            (e.random = 1))
          : ((e.wobble += e.wobbleSpeed),
            (e.wobbleX = e.x + 10 * e.scalar * Math.cos(e.wobble)),
            (e.wobbleY = e.y + 10 * e.scalar * Math.sin(e.wobble)),
            (e.tiltAngle += 0.1),
            (e.tiltSin = Math.sin(e.tiltAngle)),
            (e.tiltCos = Math.cos(e.tiltAngle)),
            (e.random = Math.random() + 2));
      var a = e.tick++ / e.totalTicks,
        n = e.x + e.random * e.tiltCos,
        o = e.y + e.random * e.tiltSin,
        r = e.wobbleX + e.random * e.tiltCos,
        l = e.wobbleY + e.random * e.tiltSin;
      if (
        ((t.fillStyle =
          "rgba(" +
          e.color.r +
          ", " +
          e.color.g +
          ", " +
          e.color.b +
          ", " +
          (1 - a) +
          ")"),
        t.beginPath(),
        i &&
          "path" === e.shape.type &&
          "string" == typeof e.shape.path &&
          Array.isArray(e.shape.matrix))
      )
        t.fill(
          (function (t, e, a, n, o, r, i) {
            var l = new Path2D(t),
              s = new Path2D();
            s.addPath(l, new DOMMatrix(e));
            var c = new Path2D();
            return (
              c.addPath(
                s,
                new DOMMatrix([
                  Math.cos(i) * o,
                  Math.sin(i) * o,
                  -Math.sin(i) * r,
                  Math.cos(i) * r,
                  a,
                  n,
                ])
              ),
              c
            );
          })(
            e.shape.path,
            e.shape.matrix,
            e.x,
            e.y,
            0.1 * Math.abs(r - n),
            0.1 * Math.abs(l - o),
            (Math.PI / 10) * e.wobble
          )
        );
      else if ("bitmap" === e.shape.type) {
        var s = (Math.PI / 10) * e.wobble,
          c = 0.1 * Math.abs(r - n),
          h = 0.1 * Math.abs(l - o),
          f = e.shape.bitmap.width * e.scalar,
          u = e.shape.bitmap.height * e.scalar,
          d = new DOMMatrix([
            Math.cos(s) * c,
            Math.sin(s) * c,
            -Math.sin(s) * h,
            Math.cos(s) * h,
            e.x,
            e.y,
          ]);
        d.multiplySelf(new DOMMatrix(e.shape.matrix));
        var m = t.createPattern(e.shape.bitmap, "no-repeat");
        m.setTransform(d),
          (t.globalAlpha = 1 - a),
          (t.fillStyle = m),
          t.fillRect(e.x - f / 2, e.y - u / 2, f, u),
          (t.globalAlpha = 1);
      } else if ("circle" === e.shape)
        t.ellipse
          ? t.ellipse(
              e.x,
              e.y,
              Math.abs(r - n) * e.ovalScalar,
              Math.abs(l - o) * e.ovalScalar,
              (Math.PI / 10) * e.wobble,
              0,
              2 * Math.PI
            )
          : (function (t, e, a, n, o, r, i, l, s) {
              t.save(),
                t.translate(e, a),
                t.rotate(r),
                t.scale(n, o),
                t.arc(0, 0, 1, i, l, s),
                t.restore();
            })(
              t,
              e.x,
              e.y,
              Math.abs(r - n) * e.ovalScalar,
              Math.abs(l - o) * e.ovalScalar,
              (Math.PI / 10) * e.wobble,
              0,
              2 * Math.PI
            );
      else if ("star" === e.shape)
        for (
          var p = (Math.PI / 2) * 3,
            g = 4 * e.scalar,
            b = 8 * e.scalar,
            M = e.x,
            v = e.y,
            y = 5,
            w = Math.PI / y;
          y--;

        )
          (M = e.x + Math.cos(p) * b),
            (v = e.y + Math.sin(p) * b),
            t.lineTo(M, v),
            (p += w),
            (M = e.x + Math.cos(p) * g),
            (v = e.y + Math.sin(p) * g),
            t.lineTo(M, v),
            (p += w);
      else
        t.moveTo(Math.floor(e.x), Math.floor(e.y)),
          t.lineTo(Math.floor(e.wobbleX), Math.floor(o)),
          t.lineTo(Math.floor(r), Math.floor(l)),
          t.lineTo(Math.floor(n), Math.floor(e.wobbleY));
      return t.closePath(), t.fill(), e.tick < e.totalTicks;
    }
    function k(t, a) {
      var i,
        l = !t,
        c = !!w(a || {}, "resize"),
        h = !1,
        f = w(a, "disableForReducedMotion", Boolean),
        u = r && !!w(a || {}, "useWorker") ? v() : null,
        d = l ? E : S,
        m = !(!t || !u) && !!t.__confetti_initialized,
        p =
          "function" == typeof matchMedia &&
          matchMedia("(prefers-reduced-motion)").matches;
      function g(e, a, r) {
        for (
          var l,
            c,
            h,
            f,
            u,
            m = w(e, "particleCount", x),
            p = w(e, "angle", Number),
            g = w(e, "spread", Number),
            b = w(e, "startVelocity", Number),
            v = w(e, "decay", Number),
            y = w(e, "gravity", Number),
            C = w(e, "drift", Number),
            I = w(e, "colors", T),
            E = w(e, "ticks", Number),
            S = w(e, "shapes"),
            k = w(e, "scalar"),
            O = !!w(e, "flat"),
            F = (function (t) {
              var e = w(t, "origin", Object);
              return (e.x = w(e, "x", Number)), (e.y = w(e, "y", Number)), e;
            })(e),
            A = m,
            N = [],
            z = t.width * F.x,
            D = t.height * F.y;
          A--;

        )
          N.push(
            ((l = {
              x: z,
              y: D,
              angle: p,
              spread: g,
              startVelocity: b,
              color: I[A % I.length],
              shape:
                S[
                  ((f = 0),
                  (u = S.length),
                  Math.floor(Math.random() * (u - f)) + f)
                ],
              ticks: E,
              decay: v,
              gravity: y,
              drift: C,
              scalar: k,
              flat: O,
            }),
            (c = void 0),
            (h = void 0),
            (c = l.angle * (Math.PI / 180)),
            (h = l.spread * (Math.PI / 180)),
            {
              x: l.x,
              y: l.y,
              wobble: 10 * Math.random(),
              wobbleSpeed: Math.min(0.11, 0.1 * Math.random() + 0.05),
              velocity: 0.5 * l.startVelocity + Math.random() * l.startVelocity,
              angle2D: -c + (0.5 * h - Math.random() * h),
              tiltAngle: (0.5 * Math.random() + 0.25) * Math.PI,
              color: l.color,
              shape: l.shape,
              tick: 0,
              totalTicks: l.ticks,
              decay: l.decay,
              drift: l.drift,
              random: Math.random() + 2,
              tiltSin: 0,
              tiltCos: 0,
              wobbleX: 0,
              wobbleY: 0,
              gravity: 3 * l.gravity,
              ovalScalar: 0.6,
              scalar: l.scalar,
              flat: l.flat,
            })
          );
        return i
          ? i.addFettis(N)
          : ((i = (function (t, e, a, r, i) {
              var l,
                c,
                h = e.slice(),
                f = t.getContext("2d"),
                u = s(function (e) {
                  function s() {
                    (l = c = null),
                      f.clearRect(0, 0, r.width, r.height),
                      i(),
                      e();
                  }
                  (l = M.frame(function e() {
                    !n ||
                      (r.width === o.width && r.height === o.height) ||
                      ((r.width = t.width = o.width),
                      (r.height = t.height = o.height)),
                      r.width ||
                        r.height ||
                        (a(t), (r.width = t.width), (r.height = t.height)),
                      f.clearRect(0, 0, r.width, r.height),
                      (h = h.filter(function (t) {
                        return P(f, t);
                      })).length
                        ? (l = M.frame(e))
                        : s();
                  })),
                    (c = s);
                });
              return {
                addFettis: function (t) {
                  return (h = h.concat(t)), u;
                },
                canvas: t,
                promise: u,
                reset: function () {
                  l && M.cancel(l), c && c();
                },
              };
            })(t, N, d, a, r)),
            i.promise);
      }
      function b(a) {
        var n = f || w(a, "disableForReducedMotion", Boolean),
          o = w(a, "zIndex", Number);
        if (n && p)
          return s(function (t) {
            t();
          });
        l && i
          ? (t = i.canvas)
          : l &&
            !t &&
            ((t = (function (t) {
              var e = document.createElement("canvas");
              return (
                (e.style.position = "fixed"),
                (e.style.top = "0px"),
                (e.style.left = "0px"),
                (e.style.pointerEvents = "none"),
                (e.style.zIndex = t),
                e
              );
            })(o)),
            document.body.appendChild(t)),
          c && !m && d(t);
        var r = {width: t.width, height: t.height};
        function b() {
          if (u) {
            var e = {
              getBoundingClientRect: function () {
                if (!l) return t.getBoundingClientRect();
              },
            };
            return (
              d(e),
              void u.postMessage({resize: {width: e.width, height: e.height}})
            );
          }
          r.width = r.height = null;
        }
        function M() {
          (i = null),
            c && ((h = !1), e.removeEventListener("resize", b)),
            l && t && (document.body.removeChild(t), (t = null), (m = !1));
        }
        return (
          u && !m && u.init(t),
          (m = !0),
          u && (t.__confetti_initialized = !0),
          c && !h && ((h = !0), e.addEventListener("resize", b, !1)),
          u ? u.fire(a, r, M) : g(a, r, M)
        );
      }
      return (
        (b.reset = function () {
          u && u.reset(), i && i.reset();
        }),
        b
      );
    }
    function O() {
      return b || (b = k(null, {useWorker: !0, resize: !0})), b;
    }
    (a.exports = function () {
      return O().apply(this, arguments);
    }),
      (a.exports.reset = function () {
        O().reset();
      }),
      (a.exports.create = k),
      (a.exports.shapeFromPath = function (t) {
        if (!i)
          throw new Error("path confetti are not supported in this browser");
        var e, a;
        "string" == typeof t ? (e = t) : ((e = t.path), (a = t.matrix));
        var n = new Path2D(e),
          o = document.createElement("canvas").getContext("2d");
        if (!a) {
          for (
            var r, l, s = 1e3, c = s, h = s, f = 0, u = 0, d = 0;
            d < s;
            d += 2
          )
            for (var m = 0; m < s; m += 2)
              o.isPointInPath(n, d, m, "nonzero") &&
                ((c = Math.min(c, d)),
                (h = Math.min(h, m)),
                (f = Math.max(f, d)),
                (u = Math.max(u, m)));
          (r = f - c), (l = u - h);
          var p = Math.min(10 / r, 10 / l);
          a = [
            p,
            0,
            0,
            p,
            -Math.round(r / 2 + c) * p,
            -Math.round(l / 2 + h) * p,
          ];
        }
        return {type: "path", path: e, matrix: a};
      }),
      (a.exports.shapeFromText = function (t) {
        var e,
          a = 1,
          n = "#000000",
          o =
            '"Twemoji Mozilla", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "system emoji", sans-serif';
        "string" == typeof t
          ? (e = t)
          : ((e = t.text),
            (a = "scalar" in t ? t.scalar : a),
            (o = "fontFamily" in t ? t.fontFamily : o),
            (n = "color" in t ? t.color : n));
        var r = 10 * a,
          i = r + "px " + o,
          l = new OffscreenCanvas(r, r),
          s = l.getContext("2d");
        s.font = i;
        var c = s.measureText(e),
          h = Math.floor(c.width),
          f = Math.floor(c.fontBoundingBoxAscent + c.fontBoundingBoxDescent);
        ((s = (l = new OffscreenCanvas(h, f)).getContext("2d")).font = i),
          (s.fillStyle = n),
          s.fillText(e, 0, r);
        var u = 1 / a;
        return {
          type: "bitmap",
          bitmap: l.transferToImageBitmap(),
          matrix: [u, 0, 0, u, (-h * u) / 2, (-f * u) / 2],
        };
      });
  })(
    (function () {
      return void 0 !== t ? t : "undefined" != typeof self ? self : this || {};
    })(),
    e,
    !1
  ),
    (t.confetti = e.exports);
})(window, {});
//# sourceMappingURL=/sm/3a50e5f9670f125a57b8206e6e80284535196995f323b85a4281a5cf4a027e57.map
