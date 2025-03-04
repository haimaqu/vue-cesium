define([
  'exports',
  './Matrix2-9aa31791',
  './EllipsoidTangentPlane-eecce7e8',
  './ComponentDatatype-93750d1a',
  './PolylinePipeline-64021a2e',
  './Transforms-d13cc04e',
  './when-4bbc8319',
  './RuntimeError-346a3079'
], function (e, a, r, n, t, i, s, o) {
  'use strict'
  var l = Object.freeze({ ROUNDED: 0, MITERED: 1, BEVELED: 2 }),
    C = {}
  function c(e, a) {
    s.defined(C[e]) || ((C[e] = !0), console.warn(s.defaultValue(a, e)))
  }
  ;(c.geometryOutlines =
    'Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.'),
    (c.geometryZIndex = 'Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored'),
    (c.geometryHeightReference =
      'Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored'),
    (c.geometryExtrudedHeightReference =
      'Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored')
  var u = [new a.Cartesian3(), new a.Cartesian3()],
    d = new a.Cartesian3(),
    g = new a.Cartesian3(),
    y = new a.Cartesian3(),
    m = new a.Cartesian3(),
    h = new a.Cartesian3(),
    f = new a.Cartesian3(),
    p = new a.Cartesian3(),
    w = new a.Cartesian3(),
    v = new a.Cartesian3(),
    x = new a.Cartesian3(),
    E = new a.Cartesian3(),
    P = {},
    M = new a.Cartographic()
  function b(e, r, n, t) {
    var i,
      s = e[0],
      o = e[1],
      l = a.Cartesian3.angleBetween(s, o),
      C = Math.ceil(l / t),
      c = new Array(C)
    if (r === n) {
      for (i = 0; i < C; i++) c[i] = r
      return c.push(n), c
    }
    var u = (n - r) / C
    for (i = 1; i < C; i++) {
      var d = r + i * u
      c[i] = d
    }
    return (c[0] = r), c.push(n), c
  }
  var T = new a.Cartesian3(),
    B = new a.Cartesian3()
  var z = new a.Cartesian3(-1, 0, 0),
    S = new a.Matrix4(),
    A = new a.Matrix4(),
    D = new a.Matrix3(),
    R = a.Matrix3.IDENTITY.clone(),
    O = new a.Cartesian3(),
    I = new a.Cartesian4(),
    V = new a.Cartesian3()
  function N(e, n, t, s, o, l, C, c) {
    var u = O,
      d = I
    ;(S = i.Transforms.eastNorthUpToFixedFrame(e, o, S)), (u = a.Matrix4.multiplyByPointAsVector(S, z, u))
    var g = (function (e, n, t, i) {
      var s = new r.EllipsoidTangentPlane(t, i),
        o = s.projectPointOntoPlane(a.Cartesian3.add(t, e, T), T),
        l = s.projectPointOntoPlane(a.Cartesian3.add(t, n, B), B),
        C = a.Cartesian2.angleBetween(o, l)
      return l.x * o.y - l.y * o.x >= 0 ? -C : C
    })((u = a.Cartesian3.normalize(u, u)), n, e, o)
    ;(D = a.Matrix3.fromRotationZ(g, D)), (V.z = l), (S = a.Matrix4.multiplyTransformation(S, a.Matrix4.fromRotationTranslation(D, V, A), S))
    var y = R
    y[0] = C
    for (var m = 0; m < c; m++)
      for (var h = 0; h < t.length; h += 3)
        (d = a.Cartesian3.fromArray(t, h, d)),
          (d = a.Matrix3.multiplyByVector(y, d, d)),
          (d = a.Matrix4.multiplyByPoint(S, d, d)),
          s.push(d.x, d.y, d.z)
    return s
  }
  var G = new a.Cartesian3()
  function H(e, r, n, t, i, s, o) {
    for (var l = 0; l < e.length; l += 3) {
      t = N(a.Cartesian3.fromArray(e, l, G), r, n, t, i, s[l / 3], o, 1)
    }
    return t
  }
  function L(e, a) {
    for (var r = e.length, n = new Array(3 * r), t = 0, i = a.x + a.width / 2, s = a.y + a.height / 2, o = 0; o < r; o++)
      (n[t++] = e[o].x - i), (n[t++] = 0), (n[t++] = e[o].y - s)
    return n
  }
  var j = new i.Quaternion(),
    Q = new a.Cartesian3(),
    q = new a.Matrix3()
  function F(e, r, t, s, o, C, c, u, d, g) {
    var y,
      m,
      h = a.Cartesian3.angleBetween(a.Cartesian3.subtract(r, e, x), a.Cartesian3.subtract(t, e, E)),
      f = s === l.BEVELED ? 0 : Math.ceil(h / n.CesiumMath.toRadians(5))
    if (
      ((y = o
        ? a.Matrix3.fromQuaternion(i.Quaternion.fromAxisAngle(a.Cartesian3.negate(e, x), h / (f + 1), j), q)
        : a.Matrix3.fromQuaternion(i.Quaternion.fromAxisAngle(e, h / (f + 1), j), q)),
      (r = a.Cartesian3.clone(r, Q)),
      f > 0)
    )
      for (var p = g ? 2 : 1, w = 0; w < f; w++)
        (r = a.Matrix3.multiplyByVector(y, r, r)),
          (m = a.Cartesian3.subtract(r, e, x)),
          (m = a.Cartesian3.normalize(m, m)),
          o || (m = a.Cartesian3.negate(m, m)),
          (c = N(C.scaleToGeodeticSurface(r, E), m, u, c, C, d, 1, p))
    else
      (m = a.Cartesian3.subtract(r, e, x)),
        (m = a.Cartesian3.normalize(m, m)),
        o || (m = a.Cartesian3.negate(m, m)),
        (c = N(C.scaleToGeodeticSurface(r, E), m, u, c, C, d, 1, 1)),
        (t = a.Cartesian3.clone(t, Q)),
        (m = a.Cartesian3.subtract(t, e, x)),
        (m = a.Cartesian3.normalize(m, m)),
        o || (m = a.Cartesian3.negate(m, m)),
        (c = N(C.scaleToGeodeticSurface(t, E), m, u, c, C, d, 1, 1))
    return c
  }
  ;(P.removeDuplicatesFromShape = function (e) {
    for (var r = e.length, n = [], t = r - 1, i = 0; i < r; t = i++) {
      var s = e[t],
        o = e[i]
      a.Cartesian2.equals(s, o) || n.push(o)
    }
    return n
  }),
    (P.angleIsGreaterThanPi = function (e, n, t, i) {
      var s = new r.EllipsoidTangentPlane(t, i),
        o = s.projectPointOntoPlane(a.Cartesian3.add(t, e, T), T),
        l = s.projectPointOntoPlane(a.Cartesian3.add(t, n, B), B)
      return l.x * o.y - l.y * o.x >= 0
    })
  var U = new a.Cartesian3(),
    _ = new a.Cartesian3()
  ;(P.computePositions = function (e, r, i, s, o) {
    var C = s._ellipsoid,
      E = (function (e, a) {
        for (var r = new Array(e.length), n = 0; n < e.length; n++) {
          var t = e[n]
          ;(M = a.cartesianToCartographic(t, M)), (r[n] = M.height), (e[n] = a.scaleToGeodeticSurface(t, t))
        }
        return r
      })(e, C),
      T = s._granularity,
      B = s._cornerType,
      z = o
        ? (function (e, a) {
            var r = e.length,
              n = new Array(6 * r),
              t = 0,
              i = a.x + a.width / 2,
              s = a.y + a.height / 2,
              o = e[0]
            ;(n[t++] = o.x - i), (n[t++] = 0), (n[t++] = o.y - s)
            for (var l = 1; l < r; l++) {
              var C = (o = e[l]).x - i,
                c = o.y - s
              ;(n[t++] = C), (n[t++] = 0), (n[t++] = c), (n[t++] = C), (n[t++] = 0), (n[t++] = c)
            }
            return (o = e[0]), (n[t++] = o.x - i), (n[t++] = 0), (n[t++] = o.y - s), n
          })(r, i)
        : L(r, i),
      S = o ? L(r, i) : void 0,
      A = i.height / 2,
      D = i.width / 2,
      R = e.length,
      O = [],
      I = o ? [] : void 0,
      V = d,
      G = g,
      j = y,
      Q = m,
      q = h,
      Z = f,
      W = p,
      Y = w,
      k = v,
      J = e[0],
      K = e[1]
    ;(Q = C.geodeticSurfaceNormal(J, Q)),
      (V = a.Cartesian3.subtract(K, J, V)),
      (V = a.Cartesian3.normalize(V, V)),
      (Y = a.Cartesian3.cross(Q, V, Y)),
      (Y = a.Cartesian3.normalize(Y, Y))
    var X,
      $ = E[0],
      ee = E[1]
    o && (I = N(J, Y, S, I, C, $ + A, 1, 1)), (k = a.Cartesian3.clone(J, k)), (J = K), (G = a.Cartesian3.negate(V, G))
    for (var ae = 1; ae < R - 1; ae++) {
      var re = o ? 2 : 1
      if (((K = e[ae + 1]), J.equals(K))) c('Positions are too close and are considered equivalent with rounding error.')
      else {
        ;(V = a.Cartesian3.subtract(K, J, V)),
          (V = a.Cartesian3.normalize(V, V)),
          (j = a.Cartesian3.add(V, G, j)),
          (j = a.Cartesian3.normalize(j, j)),
          (Q = C.geodeticSurfaceNormal(J, Q))
        var ne = a.Cartesian3.multiplyByScalar(Q, a.Cartesian3.dot(V, Q), U)
        a.Cartesian3.subtract(V, ne, ne), a.Cartesian3.normalize(ne, ne)
        var te = a.Cartesian3.multiplyByScalar(Q, a.Cartesian3.dot(G, Q), _)
        if (
          (a.Cartesian3.subtract(G, te, te),
          a.Cartesian3.normalize(te, te),
          !n.CesiumMath.equalsEpsilon(Math.abs(a.Cartesian3.dot(ne, te)), 1, n.CesiumMath.EPSILON7))
        ) {
          ;(j = a.Cartesian3.cross(j, Q, j)), (j = a.Cartesian3.cross(Q, j, j)), (j = a.Cartesian3.normalize(j, j))
          var ie = 1 / Math.max(0.25, a.Cartesian3.magnitude(a.Cartesian3.cross(j, G, x))),
            se = P.angleIsGreaterThanPi(V, G, J, C)
          se
            ? ((q = a.Cartesian3.add(J, a.Cartesian3.multiplyByScalar(j, ie * D, j), q)),
              (Z = a.Cartesian3.add(q, a.Cartesian3.multiplyByScalar(Y, D, Z), Z)),
              (u[0] = a.Cartesian3.clone(k, u[0])),
              (u[1] = a.Cartesian3.clone(Z, u[1])),
              (X = b(u, $ + A, ee + A, T)),
              (O = H(t.PolylinePipeline.generateArc({ positions: u, granularity: T, ellipsoid: C }), Y, z, O, C, X, 1)),
              (Y = a.Cartesian3.cross(Q, V, Y)),
              (Y = a.Cartesian3.normalize(Y, Y)),
              (W = a.Cartesian3.add(q, a.Cartesian3.multiplyByScalar(Y, D, W), W)),
              B === l.ROUNDED || B === l.BEVELED
                ? F(q, Z, W, B, se, C, O, z, ee + A, o)
                : (O = N(J, (j = a.Cartesian3.negate(j, j)), z, O, C, ee + A, ie, re)),
              (k = a.Cartesian3.clone(W, k)))
            : ((q = a.Cartesian3.add(J, a.Cartesian3.multiplyByScalar(j, ie * D, j), q)),
              (Z = a.Cartesian3.add(q, a.Cartesian3.multiplyByScalar(Y, -D, Z), Z)),
              (u[0] = a.Cartesian3.clone(k, u[0])),
              (u[1] = a.Cartesian3.clone(Z, u[1])),
              (X = b(u, $ + A, ee + A, T)),
              (O = H(t.PolylinePipeline.generateArc({ positions: u, granularity: T, ellipsoid: C }), Y, z, O, C, X, 1)),
              (Y = a.Cartesian3.cross(Q, V, Y)),
              (Y = a.Cartesian3.normalize(Y, Y)),
              (W = a.Cartesian3.add(q, a.Cartesian3.multiplyByScalar(Y, -D, W), W)),
              B === l.ROUNDED || B === l.BEVELED ? F(q, Z, W, B, se, C, O, z, ee + A, o) : (O = N(J, j, z, O, C, ee + A, ie, re)),
              (k = a.Cartesian3.clone(W, k))),
            (G = a.Cartesian3.negate(V, G))
        } else (O = N(k, Y, z, O, C, $ + A, 1, 1)), (k = J)
        ;($ = ee), (ee = E[ae + 1]), (J = K)
      }
    }
    ;(u[0] = a.Cartesian3.clone(k, u[0])),
      (u[1] = a.Cartesian3.clone(J, u[1])),
      (X = b(u, $ + A, ee + A, T)),
      (O = H(t.PolylinePipeline.generateArc({ positions: u, granularity: T, ellipsoid: C }), Y, z, O, C, X, 1)),
      o && (I = N(J, Y, S, I, C, ee + A, 1, 1)),
      (R = O.length)
    var oe = o ? R + I.length : R,
      le = new Float64Array(oe)
    return le.set(O), o && le.set(I, R), le
  }),
    (e.CornerType = l),
    (e.PolylineVolumeGeometryLibrary = P),
    (e.oneTimeWarning = c)
})
