define([
  'exports',
  './ArcType-98ec98bf',
  './arrayRemoveDuplicates-18786327',
  './Matrix2-9aa31791',
  './ComponentDatatype-93750d1a',
  './when-4bbc8319',
  './EllipsoidRhumbLine-30c47ff4',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryPipeline-2356afec',
  './IndexDatatype-b7d979a6',
  './PolygonPipeline-da7fc5ca',
  './Transforms-d13cc04e'
], function (e, t, r, i, n, a, o, s, u, l, h, c, f) {
  'use strict'
  function p() {
    ;(this._array = []), (this._offset = 0), (this._length = 0)
  }
  Object.defineProperties(p.prototype, {
    length: {
      get: function () {
        return this._length
      }
    }
  }),
    (p.prototype.enqueue = function (e) {
      this._array.push(e), this._length++
    }),
    (p.prototype.dequeue = function () {
      if (0 !== this._length) {
        var e = this._array,
          t = this._offset,
          r = e[t]
        return (e[t] = void 0), ++t > 10 && 2 * t > e.length && ((this._array = e.slice(t)), (t = 0)), (this._offset = t), this._length--, r
      }
    }),
    (p.prototype.peek = function () {
      if (0 !== this._length) return this._array[this._offset]
    }),
    (p.prototype.contains = function (e) {
      return -1 !== this._array.indexOf(e)
    }),
    (p.prototype.clear = function () {
      this._array.length = this._offset = this._length = 0
    }),
    (p.prototype.sort = function (e) {
      this._offset > 0 && ((this._array = this._array.slice(this._offset)), (this._offset = 0)), this._array.sort(e)
    })
  var d = {
      computeHierarchyPackedLength: function (e) {
        for (var t = 0, r = [e]; r.length > 0; ) {
          var n = r.pop()
          if (a.defined(n)) {
            t += 2
            var o = n.positions,
              s = n.holes
            if ((a.defined(o) && (t += o.length * i.Cartesian3.packedLength), a.defined(s))) for (var u = s.length, l = 0; l < u; ++l) r.push(s[l])
          }
        }
        return t
      },
      packPolygonHierarchy: function (e, t, r) {
        for (var n = [e]; n.length > 0; ) {
          var o = n.pop()
          if (a.defined(o)) {
            var s = o.positions,
              u = o.holes
            if (((t[r++] = a.defined(s) ? s.length : 0), (t[r++] = a.defined(u) ? u.length : 0), a.defined(s)))
              for (var l = s.length, h = 0; h < l; ++h, r += 3) i.Cartesian3.pack(s[h], t, r)
            if (a.defined(u)) for (var c = u.length, f = 0; f < c; ++f) n.push(u[f])
          }
        }
        return r
      },
      unpackPolygonHierarchy: function (e, t) {
        for (var r = e[t++], n = e[t++], a = new Array(r), o = n > 0 ? new Array(n) : void 0, s = 0; s < r; ++s, t += i.Cartesian3.packedLength)
          a[s] = i.Cartesian3.unpack(e, t)
        for (var u = 0; u < n; ++u) (o[u] = d.unpackPolygonHierarchy(e, t)), (t = o[u].startingIndex), delete o[u].startingIndex
        return { positions: a, holes: o, startingIndex: t }
      }
    },
    y = new i.Cartesian3()
  function g(e, t, r, n) {
    return i.Cartesian3.subtract(t, e, y), i.Cartesian3.multiplyByScalar(y, r / n, y), i.Cartesian3.add(e, y, y), [y.x, y.y, y.z]
  }
  d.subdivideLineCount = function (e, t, r) {
    var a = i.Cartesian3.distance(e, t) / r,
      o = Math.max(0, Math.ceil(n.CesiumMath.log2(a)))
    return Math.pow(2, o)
  }
  var v = new i.Cartographic(),
    m = new i.Cartographic(),
    C = new i.Cartographic(),
    b = new i.Cartesian3()
  ;(d.subdivideRhumbLineCount = function (e, t, r, i) {
    var a = e.cartesianToCartographic(t, v),
      s = e.cartesianToCartographic(r, m),
      u = new o.EllipsoidRhumbLine(a, s, e).surfaceDistance / i,
      l = Math.max(0, Math.ceil(n.CesiumMath.log2(u)))
    return Math.pow(2, l)
  }),
    (d.subdivideLine = function (e, t, r, n) {
      var o = d.subdivideLineCount(e, t, r),
        s = i.Cartesian3.distance(e, t),
        u = s / o
      a.defined(n) || (n = [])
      var l = n
      l.length = 3 * o
      for (var h = 0, c = 0; c < o; c++) {
        var f = g(e, t, c * u, s)
        ;(l[h++] = f[0]), (l[h++] = f[1]), (l[h++] = f[2])
      }
      return l
    }),
    (d.subdivideRhumbLine = function (e, t, r, i, s) {
      var u = e.cartesianToCartographic(t, v),
        l = e.cartesianToCartographic(r, m),
        h = new o.EllipsoidRhumbLine(u, l, e),
        c = h.surfaceDistance / i,
        f = Math.max(0, Math.ceil(n.CesiumMath.log2(c))),
        p = Math.pow(2, f),
        d = h.surfaceDistance / p
      a.defined(s) || (s = [])
      var y = s
      y.length = 3 * p
      for (var g = 0, w = 0; w < p; w++) {
        var T = h.interpolateUsingSurfaceDistance(w * d, C),
          I = e.cartographicToCartesian(T, b)
        ;(y[g++] = I.x), (y[g++] = I.y), (y[g++] = I.z)
      }
      return y
    })
  var w = new i.Cartesian3(),
    T = new i.Cartesian3(),
    I = new i.Cartesian3(),
    x = new i.Cartesian3()
  ;(d.scaleToGeodeticHeightExtruded = function (e, t, r, n, o) {
    n = a.defaultValue(n, i.Ellipsoid.WGS84)
    var s = w,
      u = T,
      l = I,
      h = x
    if (a.defined(e) && a.defined(e.attributes) && a.defined(e.attributes.position))
      for (var c = e.attributes.position.values, f = c.length / 2, p = 0; p < f; p += 3)
        i.Cartesian3.fromArray(c, p, l),
          n.geodeticSurfaceNormal(l, s),
          (h = n.scaleToGeodeticSurface(l, h)),
          (u = i.Cartesian3.multiplyByScalar(s, r, u)),
          (u = i.Cartesian3.add(h, u, u)),
          (c[p + f] = u.x),
          (c[p + 1 + f] = u.y),
          (c[p + 2 + f] = u.z),
          o && (h = i.Cartesian3.clone(l, h)),
          (u = i.Cartesian3.multiplyByScalar(s, t, u)),
          (u = i.Cartesian3.add(h, u, u)),
          (c[p] = u.x),
          (c[p + 1] = u.y),
          (c[p + 2] = u.z)
    return e
  }),
    (d.polygonOutlinesFromHierarchy = function (e, t, n) {
      var o,
        s,
        u,
        l = [],
        h = new p()
      for (h.enqueue(e); 0 !== h.length; ) {
        var c = h.dequeue(),
          f = c.positions
        if (t) for (u = f.length, o = 0; o < u; o++) n.scaleToGeodeticSurface(f[o], f[o])
        if (!((f = r.arrayRemoveDuplicates(f, i.Cartesian3.equalsEpsilon, !0)).length < 3)) {
          var d = c.holes ? c.holes.length : 0
          for (o = 0; o < d; o++) {
            var y = c.holes[o],
              g = y.positions
            if (t) for (u = g.length, s = 0; s < u; ++s) n.scaleToGeodeticSurface(g[s], g[s])
            if (!((g = r.arrayRemoveDuplicates(g, i.Cartesian3.equalsEpsilon, !0)).length < 3)) {
              l.push(g)
              var v = 0
              for (a.defined(y.holes) && (v = y.holes.length), s = 0; s < v; s++) h.enqueue(y.holes[s])
            }
          }
          l.push(f)
        }
      }
      return l
    }),
    (d.polygonsFromHierarchy = function (e, t, n, o) {
      var s = [],
        u = [],
        l = new p()
      for (l.enqueue(e); 0 !== l.length; ) {
        var h,
          f,
          d = l.dequeue(),
          y = d.positions,
          g = d.holes
        if (n) for (f = y.length, h = 0; h < f; h++) o.scaleToGeodeticSurface(y[h], y[h])
        if (!((y = r.arrayRemoveDuplicates(y, i.Cartesian3.equalsEpsilon, !0)).length < 3)) {
          var v = t(y)
          if (a.defined(v)) {
            var m = [],
              C = c.PolygonPipeline.computeWindingOrder2D(v)
            C === c.WindingOrder.CLOCKWISE && (v.reverse(), (y = y.slice().reverse()))
            var b,
              w = y.slice(),
              T = a.defined(g) ? g.length : 0,
              I = []
            for (h = 0; h < T; h++) {
              var x = g[h],
                E = x.positions
              if (n) for (f = E.length, b = 0; b < f; ++b) o.scaleToGeodeticSurface(E[b], E[b])
              if (!((E = r.arrayRemoveDuplicates(E, i.Cartesian3.equalsEpsilon, !0)).length < 3)) {
                var A = t(E)
                if (a.defined(A)) {
                  ;(C = c.PolygonPipeline.computeWindingOrder2D(A)) === c.WindingOrder.CLOCKWISE && (A.reverse(), (E = E.slice().reverse())),
                    I.push(E),
                    m.push(w.length),
                    (w = w.concat(E)),
                    (v = v.concat(A))
                  var P = 0
                  for (a.defined(x.holes) && (P = x.holes.length), b = 0; b < P; b++) l.enqueue(x.holes[b])
                }
              }
            }
            s.push({ outerRing: y, holes: I }), u.push({ positions: w, positions2D: v, holes: m })
          }
        }
      }
      return { hierarchy: s, polygons: u }
    })
  var E = new i.Cartesian2(),
    A = new i.Cartesian3(),
    P = new f.Quaternion(),
    _ = new i.Matrix3()
  ;(d.computeBoundingRectangle = function (e, t, r, n, o) {
    for (
      var s = f.Quaternion.fromAxisAngle(e, n, P),
        u = i.Matrix3.fromQuaternion(s, _),
        l = Number.POSITIVE_INFINITY,
        h = Number.NEGATIVE_INFINITY,
        c = Number.POSITIVE_INFINITY,
        p = Number.NEGATIVE_INFINITY,
        d = r.length,
        y = 0;
      y < d;
      ++y
    ) {
      var g = i.Cartesian3.clone(r[y], A)
      i.Matrix3.multiplyByVector(u, g, g)
      var v = t(g, E)
      a.defined(v) && ((l = Math.min(l, v.x)), (h = Math.max(h, v.x)), (c = Math.min(c, v.y)), (p = Math.max(p, v.y)))
    }
    return (o.x = l), (o.y = c), (o.width = h - l), (o.height = p - c), o
  }),
    (d.createGeometryFromPositions = function (e, r, i, a, o, u) {
      var h = c.PolygonPipeline.triangulate(r.positions2D, r.holes)
      h.length < 3 && (h = [0, 1, 2])
      var f = r.positions
      if (a) {
        for (var p = f.length, d = new Array(3 * p), y = 0, g = 0; g < p; g++) {
          var v = f[g]
          ;(d[y++] = v.x), (d[y++] = v.y), (d[y++] = v.z)
        }
        var m = new s.Geometry({
          attributes: { position: new s.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: d }) },
          indices: h,
          primitiveType: s.PrimitiveType.TRIANGLES
        })
        return o.normal ? l.GeometryPipeline.computeNormal(m) : m
      }
      return u === t.ArcType.GEODESIC
        ? c.PolygonPipeline.computeSubdivision(e, f, h, i)
        : u === t.ArcType.RHUMB
        ? c.PolygonPipeline.computeRhumbLineSubdivision(e, f, h, i)
        : void 0
    })
  var G = [],
    L = new i.Cartesian3(),
    M = new i.Cartesian3()
  ;(d.computeWallGeometry = function (e, r, a, o, l) {
    var c,
      f,
      p,
      y,
      g,
      v = e.length,
      m = 0
    if (o)
      for (f = 3 * v * 2, c = new Array(2 * f), p = 0; p < v; p++)
        (y = e[p]),
          (g = e[(p + 1) % v]),
          (c[m] = c[m + f] = y.x),
          (c[++m] = c[m + f] = y.y),
          (c[++m] = c[m + f] = y.z),
          (c[++m] = c[m + f] = g.x),
          (c[++m] = c[m + f] = g.y),
          (c[++m] = c[m + f] = g.z),
          ++m
    else {
      var C = n.CesiumMath.chordLength(a, r.maximumRadius),
        b = 0
      if (l === t.ArcType.GEODESIC) for (p = 0; p < v; p++) b += d.subdivideLineCount(e[p], e[(p + 1) % v], C)
      else if (l === t.ArcType.RHUMB) for (p = 0; p < v; p++) b += d.subdivideRhumbLineCount(r, e[p], e[(p + 1) % v], C)
      for (f = 3 * (b + v), c = new Array(2 * f), p = 0; p < v; p++) {
        var w
        ;(y = e[p]),
          (g = e[(p + 1) % v]),
          l === t.ArcType.GEODESIC ? (w = d.subdivideLine(y, g, C, G)) : l === t.ArcType.RHUMB && (w = d.subdivideRhumbLine(r, y, g, C, G))
        for (var T = w.length, I = 0; I < T; ++I, ++m) (c[m] = w[I]), (c[m + f] = w[I])
        ;(c[m] = g.x), (c[m + f] = g.x), (c[++m] = g.y), (c[m + f] = g.y), (c[++m] = g.z), (c[m + f] = g.z), ++m
      }
    }
    v = c.length
    var x = h.IndexDatatype.createTypedArray(v / 3, v - 6 * e.length),
      E = 0
    for (v /= 6, p = 0; p < v; p++) {
      var A = p,
        P = A + 1,
        _ = A + v,
        D = _ + 1
      ;(y = i.Cartesian3.fromArray(c, 3 * A, L)),
        (g = i.Cartesian3.fromArray(c, 3 * P, M)),
        i.Cartesian3.equalsEpsilon(y, g, n.CesiumMath.EPSILON10, n.CesiumMath.EPSILON10) ||
          ((x[E++] = A), (x[E++] = _), (x[E++] = P), (x[E++] = P), (x[E++] = _), (x[E++] = D))
    }
    return new s.Geometry({
      attributes: new u.GeometryAttributes({
        position: new s.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: c })
      }),
      indices: x,
      primitiveType: s.PrimitiveType.TRIANGLES
    })
  }),
    (e.PolygonGeometryLibrary = d)
})
