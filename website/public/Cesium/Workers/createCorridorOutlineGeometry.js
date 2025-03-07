define([
  './GeometryOffsetAttribute-1772960d',
  './arrayRemoveDuplicates-18786327',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './PolylineVolumeGeometryLibrary-06826ae8',
  './CorridorGeometryLibrary-c1e6611d',
  './when-4bbc8319',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './PolygonPipeline-da7fc5ca',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './EllipsoidTangentPlane-eecce7e8',
  './AxisAlignedBoundingBox-07c6b7f2',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './PolylinePipeline-64021a2e',
  './EllipsoidGeodesic-dd8f2afb',
  './EllipsoidRhumbLine-30c47ff4'
], function (e, t, i, r, o, a, n, s, l, d, u, p, f, h, y, c, g, b, m, v, A, _) {
  'use strict'
  var E = new r.Cartesian3(),
    C = new r.Cartesian3(),
    G = new r.Cartesian3()
  function T(e, t) {
    var i,
      o,
      f,
      h = [],
      y = e.positions,
      c = e.corners,
      g = e.endPositions,
      b = new u.GeometryAttributes(),
      m = 0,
      v = 0,
      A = 0
    for (o = 0; o < y.length; o += 2) (m += f = y[o].length - 3), (A += (f / 3) * 4), (v += y[o + 1].length - 3)
    for (m += 3, v += 3, o = 0; o < c.length; o++) {
      i = c[o]
      var _ = c[o].leftPositions
      l.defined(_) ? ((m += f = _.length), (A += (f / 3) * 2)) : ((v += f = c[o].rightPositions.length), (A += (f / 3) * 2))
    }
    var T,
      P = l.defined(g)
    P && ((m += T = g[0].length - 3), (v += T), (A += 4 * (T /= 3)))
    var w,
      L,
      D,
      x,
      k,
      N,
      O = m + v,
      V = new Float64Array(O),
      H = 0,
      I = O - 1,
      S = T / 2,
      B = p.IndexDatatype.createTypedArray(O / 3, A + 4),
      M = 0
    if (((B[M++] = H / 3), (B[M++] = (I - 2) / 3), P)) {
      h.push(H / 3), (N = E), (k = C)
      var R = g[0]
      for (o = 0; o < S; o++)
        (N = r.Cartesian3.fromArray(R, 3 * (S - 1 - o), N)),
          (k = r.Cartesian3.fromArray(R, 3 * (S + o), k)),
          s.CorridorGeometryLibrary.addAttribute(V, k, H),
          s.CorridorGeometryLibrary.addAttribute(V, N, void 0, I),
          (x = (L = H / 3) + 1),
          (D = (w = (I - 2) / 3) - 1),
          (B[M++] = w),
          (B[M++] = D),
          (B[M++] = L),
          (B[M++] = x),
          (H += 3),
          (I -= 3)
    }
    var U = 0,
      F = y[U++],
      Y = y[U++]
    for (V.set(F, H), V.set(Y, I - Y.length + 1), f = Y.length - 3, h.push(H / 3, (I - 2) / 3), o = 0; o < f; o += 3)
      (x = (L = H / 3) + 1), (D = (w = (I - 2) / 3) - 1), (B[M++] = w), (B[M++] = D), (B[M++] = L), (B[M++] = x), (H += 3), (I -= 3)
    for (o = 0; o < c.length; o++) {
      var q,
        W,
        J = (i = c[o]).leftPositions,
        j = i.rightPositions,
        z = G
      if (l.defined(J)) {
        for (I -= 3, W = D, h.push(x), q = 0; q < J.length / 3; q++)
          (z = r.Cartesian3.fromArray(J, 3 * q, z)),
            (B[M++] = W - q - 1),
            (B[M++] = W - q),
            s.CorridorGeometryLibrary.addAttribute(V, z, void 0, I),
            (I -= 3)
        h.push(W - Math.floor(J.length / 6)), t === n.CornerType.BEVELED && h.push((I - 2) / 3 + 1), (H += 3)
      } else {
        for (H += 3, W = x, h.push(D), q = 0; q < j.length / 3; q++)
          (z = r.Cartesian3.fromArray(j, 3 * q, z)), (B[M++] = W + q), (B[M++] = W + q + 1), s.CorridorGeometryLibrary.addAttribute(V, z, H), (H += 3)
        h.push(W + Math.floor(j.length / 6)), t === n.CornerType.BEVELED && h.push(H / 3 - 1), (I -= 3)
      }
      for (
        F = y[U++], Y = y[U++], F.splice(0, 3), Y.splice(Y.length - 3, 3), V.set(F, H), V.set(Y, I - Y.length + 1), f = Y.length - 3, q = 0;
        q < Y.length;
        q += 3
      )
        (L = (x = H / 3) - 1), (w = (D = (I - 2) / 3) + 1), (B[M++] = w), (B[M++] = D), (B[M++] = L), (B[M++] = x), (H += 3), (I -= 3)
      ;(H -= 3), (I += 3), h.push(H / 3, (I - 2) / 3)
    }
    if (P) {
      ;(H += 3), (I -= 3), (N = E), (k = C)
      var K = g[1]
      for (o = 0; o < S; o++)
        (N = r.Cartesian3.fromArray(K, 3 * (T - o - 1), N)),
          (k = r.Cartesian3.fromArray(K, 3 * o, k)),
          s.CorridorGeometryLibrary.addAttribute(V, N, void 0, I),
          s.CorridorGeometryLibrary.addAttribute(V, k, H),
          (L = (x = H / 3) - 1),
          (w = (D = (I - 2) / 3) + 1),
          (B[M++] = w),
          (B[M++] = D),
          (B[M++] = L),
          (B[M++] = x),
          (H += 3),
          (I -= 3)
      h.push(H / 3)
    } else h.push(H / 3, (I - 2) / 3)
    return (
      (B[M++] = H / 3),
      (B[M++] = (I - 2) / 3),
      (b.position = new d.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: V })),
      { attributes: b, indices: B, wallIndices: h }
    )
  }
  function P(e) {
    var t = (e = l.defaultValue(e, l.defaultValue.EMPTY_OBJECT)).positions,
      i = e.width,
      o = l.defaultValue(e.height, 0),
      s = l.defaultValue(e.extrudedHeight, o)
    ;(this._positions = t),
      (this._ellipsoid = r.Ellipsoid.clone(l.defaultValue(e.ellipsoid, r.Ellipsoid.WGS84))),
      (this._width = i),
      (this._height = Math.max(o, s)),
      (this._extrudedHeight = Math.min(o, s)),
      (this._cornerType = l.defaultValue(e.cornerType, n.CornerType.ROUNDED)),
      (this._granularity = l.defaultValue(e.granularity, a.CesiumMath.RADIANS_PER_DEGREE)),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createCorridorOutlineGeometry'),
      (this.packedLength = 1 + t.length * r.Cartesian3.packedLength + r.Ellipsoid.packedLength + 6)
  }
  P.pack = function (e, t, i) {
    i = l.defaultValue(i, 0)
    var o = e._positions,
      a = o.length
    t[i++] = a
    for (var n = 0; n < a; ++n, i += r.Cartesian3.packedLength) r.Cartesian3.pack(o[n], t, i)
    return (
      r.Ellipsoid.pack(e._ellipsoid, t, i),
      (i += r.Ellipsoid.packedLength),
      (t[i++] = e._width),
      (t[i++] = e._height),
      (t[i++] = e._extrudedHeight),
      (t[i++] = e._cornerType),
      (t[i++] = e._granularity),
      (t[i] = l.defaultValue(e._offsetAttribute, -1)),
      t
    )
  }
  var w = r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),
    L = {
      positions: void 0,
      ellipsoid: w,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      offsetAttribute: void 0
    }
  return (
    (P.unpack = function (e, t, i) {
      t = l.defaultValue(t, 0)
      for (var o = e[t++], a = new Array(o), n = 0; n < o; ++n, t += r.Cartesian3.packedLength) a[n] = r.Cartesian3.unpack(e, t)
      var s = r.Ellipsoid.unpack(e, t, w)
      t += r.Ellipsoid.packedLength
      var d = e[t++],
        u = e[t++],
        p = e[t++],
        f = e[t++],
        h = e[t++],
        y = e[t]
      return l.defined(i)
        ? ((i._positions = a),
          (i._ellipsoid = r.Ellipsoid.clone(s, i._ellipsoid)),
          (i._width = d),
          (i._height = u),
          (i._extrudedHeight = p),
          (i._cornerType = f),
          (i._granularity = h),
          (i._offsetAttribute = -1 === y ? void 0 : y),
          i)
        : ((L.positions = a),
          (L.width = d),
          (L.height = u),
          (L.extrudedHeight = p),
          (L.cornerType = f),
          (L.granularity = h),
          (L.offsetAttribute = -1 === y ? void 0 : y),
          new P(L))
    }),
    (P.createGeometry = function (o) {
      var n = o._positions,
        u = o._width,
        h = o._ellipsoid
      n = (function (e, t) {
        for (var i = 0; i < e.length; i++) e[i] = t.scaleToGeodeticSurface(e[i], e[i])
        return e
      })(n, h)
      var y = t.arrayRemoveDuplicates(n, r.Cartesian3.equalsEpsilon)
      if (!(y.length < 2 || u <= 0)) {
        var c,
          g = o._height,
          b = o._extrudedHeight,
          m = !a.CesiumMath.equalsEpsilon(g, b, 0, a.CesiumMath.EPSILON2),
          v = { ellipsoid: h, positions: y, width: u, cornerType: o._cornerType, granularity: o._granularity, saveAttributes: !1 }
        if (m)
          (v.height = g),
            (v.extrudedHeight = b),
            (v.offsetAttribute = o._offsetAttribute),
            (c = (function (t) {
              var i = t.ellipsoid,
                r = T(s.CorridorGeometryLibrary.computePositions(t), t.cornerType),
                o = r.wallIndices,
                n = t.height,
                u = t.extrudedHeight,
                h = r.attributes,
                y = r.indices,
                c = h.position.values,
                g = c.length,
                b = new Float64Array(g)
              b.set(c)
              var m,
                v = new Float64Array(2 * g)
              if (
                ((c = f.PolygonPipeline.scaleToGeodeticHeight(c, n, i)),
                (b = f.PolygonPipeline.scaleToGeodeticHeight(b, u, i)),
                v.set(c),
                v.set(b, g),
                (h.position.values = v),
                (g /= 3),
                l.defined(t.offsetAttribute))
              ) {
                var A = new Uint8Array(2 * g)
                if (t.offsetAttribute === e.GeometryOffsetAttribute.TOP) A = e.arrayFill(A, 1, 0, g)
                else {
                  var _ = t.offsetAttribute === e.GeometryOffsetAttribute.NONE ? 0 : 1
                  A = e.arrayFill(A, _)
                }
                h.applyOffset = new d.GeometryAttribute({
                  componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: A
                })
              }
              var E = y.length,
                C = p.IndexDatatype.createTypedArray(v.length / 3, 2 * (E + o.length))
              C.set(y)
              var G,
                P,
                w = E
              for (m = 0; m < E; m += 2) {
                var L = y[m],
                  D = y[m + 1]
                ;(C[w++] = L + g), (C[w++] = D + g)
              }
              for (m = 0; m < o.length; m++) (P = (G = o[m]) + g), (C[w++] = G), (C[w++] = P)
              return { attributes: h, indices: C }
            })(v))
        else if (
          (((c = T(s.CorridorGeometryLibrary.computePositions(v), v.cornerType)).attributes.position.values = f.PolygonPipeline.scaleToGeodeticHeight(
            c.attributes.position.values,
            g,
            h
          )),
          l.defined(o._offsetAttribute))
        ) {
          var A = c.attributes.position.values.length,
            _ = new Uint8Array(A / 3),
            E = o._offsetAttribute === e.GeometryOffsetAttribute.NONE ? 0 : 1
          e.arrayFill(_, E),
            (c.attributes.applyOffset = new d.GeometryAttribute({
              componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: _
            }))
        }
        var C = c.attributes,
          G = i.BoundingSphere.fromVertices(C.position.values, void 0, 3)
        return new d.Geometry({
          attributes: C,
          indices: c.indices,
          primitiveType: d.PrimitiveType.LINES,
          boundingSphere: G,
          offsetAttribute: o._offsetAttribute
        })
      }
    }),
    function (e, t) {
      return l.defined(t) && (e = P.unpack(e, t)), (e._ellipsoid = r.Ellipsoid.clone(e._ellipsoid)), P.createGeometry(e)
    }
  )
})
