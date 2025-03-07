define([
  'exports',
  './Matrix2-9aa31791',
  './when-4bbc8319',
  './RuntimeError-346a3079',
  './Transforms-d13cc04e',
  './ComponentDatatype-93750d1a'
], function (t, n, a, r, e, o) {
  'use strict'
  var s = Math.cos,
    i = Math.sin,
    g = Math.sqrt,
    u = {
      computePosition: function (t, n, r, e, o, u, h) {
        var c = n.radiiSquared,
          C = t.nwCorner,
          l = t.boundingRectangle,
          S = C.latitude - t.granYCos * e + o * t.granXSin,
          d = s(S),
          w = i(S),
          M = c.z * w,
          m = C.longitude + e * t.granYSin + o * t.granXCos,
          X = d * s(m),
          Y = d * i(m),
          p = c.x * X,
          v = c.y * Y,
          f = g(p * X + v * Y + M * w)
        if (((u.x = p / f), (u.y = v / f), (u.z = M / f), r)) {
          var x = t.stNwCorner
          a.defined(x)
            ? ((S = x.latitude - t.stGranYCos * e + o * t.stGranXSin),
              (m = x.longitude + e * t.stGranYSin + o * t.stGranXCos),
              (h.x = (m - t.stWest) * t.lonScalar),
              (h.y = (S - t.stSouth) * t.latScalar))
            : ((h.x = (m - l.west) * t.lonScalar), (h.y = (S - l.south) * t.latScalar))
        }
      }
    },
    h = new n.Matrix2(),
    c = new n.Cartesian3(),
    C = new n.Cartographic(),
    l = new n.Cartesian3(),
    S = new e.GeographicProjection()
  function d(t, a, r, e, o, s, i) {
    var g = Math.cos(a),
      u = e * g,
      C = r * g,
      d = Math.sin(a),
      w = e * d,
      M = r * d
    ;(c = S.project(t, c)), (c = n.Cartesian3.subtract(c, l, c))
    var m = n.Matrix2.fromRotation(a, h)
    ;(c = n.Matrix2.multiplyByVector(m, c, c)), (c = n.Cartesian3.add(c, l, c)), (s -= 1), (i -= 1)
    var X = (t = S.unproject(c, t)).latitude,
      Y = X + s * M,
      p = X - u * i,
      v = X - u * i + s * M,
      f = Math.max(X, Y, p, v),
      x = Math.min(X, Y, p, v),
      R = t.longitude,
      G = R + s * C,
      y = R + i * w,
      O = R + i * w + s * C
    return {
      north: f,
      south: x,
      east: Math.max(R, G, y, O),
      west: Math.min(R, G, y, O),
      granYCos: u,
      granYSin: w,
      granXCos: C,
      granXSin: M,
      nwCorner: t
    }
  }
  ;(u.computeOptions = function (t, a, r, e, s, i, g) {
    var u,
      h,
      c,
      w,
      M,
      m = t.east,
      X = t.west,
      Y = t.north,
      p = t.south,
      v = !1,
      f = !1
    Y === o.CesiumMath.PI_OVER_TWO && (v = !0), p === -o.CesiumMath.PI_OVER_TWO && (f = !0)
    var x = Y - p
    ;(c = (M = X > m ? o.CesiumMath.TWO_PI - X + m : m - X) / ((u = Math.ceil(M / a) + 1) - 1)), (w = x / ((h = Math.ceil(x / a) + 1) - 1))
    var R = n.Rectangle.northwest(t, i),
      G = n.Rectangle.center(t, C)
    ;(0 === r && 0 === e) || (G.longitude < R.longitude && (G.longitude += o.CesiumMath.TWO_PI), (l = S.project(G, l)))
    var y = w,
      O = c,
      b = n.Rectangle.clone(t, s),
      P = { granYCos: y, granYSin: 0, granXCos: O, granXSin: 0, nwCorner: R, boundingRectangle: b, width: u, height: h, northCap: v, southCap: f }
    if (0 !== r) {
      var W = d(R, r, c, w, 0, u, h)
      ;(Y = W.north),
        (p = W.south),
        (m = W.east),
        (X = W.west),
        (P.granYCos = W.granYCos),
        (P.granYSin = W.granYSin),
        (P.granXCos = W.granXCos),
        (P.granXSin = W.granXSin),
        (b.north = Y),
        (b.south = p),
        (b.east = m),
        (b.west = X)
    }
    if (0 !== e) {
      r -= e
      var _ = n.Rectangle.northwest(b, g),
        T = d(_, r, c, w, 0, u, h)
      ;(P.stGranYCos = T.granYCos),
        (P.stGranXCos = T.granXCos),
        (P.stGranYSin = T.granYSin),
        (P.stGranXSin = T.granXSin),
        (P.stNwCorner = _),
        (P.stWest = T.west),
        (P.stSouth = T.south)
    }
    return P
  }),
    (t.RectangleGeometryLibrary = u)
})
