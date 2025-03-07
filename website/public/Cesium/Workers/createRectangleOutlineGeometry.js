define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './ComponentDatatype-93750d1a',
  './RuntimeError-346a3079',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './PolygonPipeline-da7fc5ca',
  './RectangleGeometryLibrary-d589ac1e',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './EllipsoidRhumbLine-30c47ff4'
], function (e, t, i, a, r, n, o, l, u, s, c, p, d, f) {
  'use strict'
  var g = new a.BoundingSphere(),
    h = new a.BoundingSphere(),
    y = new t.Cartesian3(),
    m = new t.Rectangle()
  function b(e, t) {
    var i = e._ellipsoid,
      a = t.height,
      n = t.width,
      s = t.northCap,
      p = t.southCap,
      d = a,
      f = 2,
      g = 0,
      h = 4
    s && ((f -= 1), (d -= 1), (g += 1), (h -= 2)), p && ((f -= 1), (d -= 1), (g += 1), (h -= 2)), (g += f * n + 2 * d - h)
    var m,
      b = new Float64Array(3 * g),
      _ = 0,
      v = 0,
      E = y
    if (s) c.RectangleGeometryLibrary.computePosition(t, i, !1, v, 0, E), (b[_++] = E.x), (b[_++] = E.y), (b[_++] = E.z)
    else for (m = 0; m < n; m++) c.RectangleGeometryLibrary.computePosition(t, i, !1, v, m, E), (b[_++] = E.x), (b[_++] = E.y), (b[_++] = E.z)
    for (m = n - 1, v = 1; v < a; v++) c.RectangleGeometryLibrary.computePosition(t, i, !1, v, m, E), (b[_++] = E.x), (b[_++] = E.y), (b[_++] = E.z)
    if (((v = a - 1), !p))
      for (m = n - 2; m >= 0; m--) c.RectangleGeometryLibrary.computePosition(t, i, !1, v, m, E), (b[_++] = E.x), (b[_++] = E.y), (b[_++] = E.z)
    for (m = 0, v = a - 2; v > 0; v--) c.RectangleGeometryLibrary.computePosition(t, i, !1, v, m, E), (b[_++] = E.x), (b[_++] = E.y), (b[_++] = E.z)
    for (var A = (b.length / 3) * 2, G = u.IndexDatatype.createTypedArray(b.length / 3, A), R = 0, P = 0; P < b.length / 3 - 1; P++)
      (G[R++] = P), (G[R++] = P + 1)
    ;(G[R++] = b.length / 3 - 1), (G[R++] = 0)
    var w = new o.Geometry({ attributes: new l.GeometryAttributes(), primitiveType: o.PrimitiveType.LINES })
    return (
      (w.attributes.position = new o.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: b })),
      (w.indices = G),
      w
    )
  }
  function _(i) {
    var a = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).rectangle,
      n = e.defaultValue(i.granularity, r.CesiumMath.RADIANS_PER_DEGREE),
      o = e.defaultValue(i.ellipsoid, t.Ellipsoid.WGS84),
      l = e.defaultValue(i.rotation, 0),
      u = e.defaultValue(i.height, 0),
      s = e.defaultValue(i.extrudedHeight, u)
    ;(this._rectangle = t.Rectangle.clone(a)),
      (this._granularity = n),
      (this._ellipsoid = o),
      (this._surfaceHeight = Math.max(u, s)),
      (this._rotation = l),
      (this._extrudedHeight = Math.min(u, s)),
      (this._offsetAttribute = i.offsetAttribute),
      (this._workerName = 'createRectangleOutlineGeometry')
  }
  ;(_.packedLength = t.Rectangle.packedLength + t.Ellipsoid.packedLength + 5),
    (_.pack = function (i, a, r) {
      return (
        (r = e.defaultValue(r, 0)),
        t.Rectangle.pack(i._rectangle, a, r),
        (r += t.Rectangle.packedLength),
        t.Ellipsoid.pack(i._ellipsoid, a, r),
        (r += t.Ellipsoid.packedLength),
        (a[r++] = i._granularity),
        (a[r++] = i._surfaceHeight),
        (a[r++] = i._rotation),
        (a[r++] = i._extrudedHeight),
        (a[r] = e.defaultValue(i._offsetAttribute, -1)),
        a
      )
    })
  var v = new t.Rectangle(),
    E = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    A = { rectangle: v, ellipsoid: E, granularity: void 0, height: void 0, rotation: void 0, extrudedHeight: void 0, offsetAttribute: void 0 }
  _.unpack = function (i, a, r) {
    a = e.defaultValue(a, 0)
    var n = t.Rectangle.unpack(i, a, v)
    a += t.Rectangle.packedLength
    var o = t.Ellipsoid.unpack(i, a, E)
    a += t.Ellipsoid.packedLength
    var l = i[a++],
      u = i[a++],
      s = i[a++],
      c = i[a++],
      p = i[a]
    return e.defined(r)
      ? ((r._rectangle = t.Rectangle.clone(n, r._rectangle)),
        (r._ellipsoid = t.Ellipsoid.clone(o, r._ellipsoid)),
        (r._surfaceHeight = u),
        (r._rotation = s),
        (r._extrudedHeight = c),
        (r._offsetAttribute = -1 === p ? void 0 : p),
        r)
      : ((A.granularity = l), (A.height = u), (A.rotation = s), (A.extrudedHeight = c), (A.offsetAttribute = -1 === p ? void 0 : p), new _(A))
  }
  var G = new t.Cartographic()
  return (
    (_.createGeometry = function (t) {
      var n,
        l,
        p = t._rectangle,
        d = t._ellipsoid,
        f = c.RectangleGeometryLibrary.computeOptions(p, t._granularity, t._rotation, 0, m, G)
      if (
        !r.CesiumMath.equalsEpsilon(p.north, p.south, r.CesiumMath.EPSILON10) &&
        !r.CesiumMath.equalsEpsilon(p.east, p.west, r.CesiumMath.EPSILON10)
      ) {
        var y,
          _ = t._surfaceHeight,
          v = t._extrudedHeight
        if (!r.CesiumMath.equalsEpsilon(_, v, 0, r.CesiumMath.EPSILON2)) {
          if (
            ((n = (function (e, t) {
              var i = e._surfaceHeight,
                a = e._extrudedHeight,
                r = e._ellipsoid,
                n = a,
                o = i,
                l = b(e, t),
                c = t.height,
                p = t.width,
                d = s.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values, o, r, !1),
                f = d.length,
                g = new Float64Array(2 * f)
              g.set(d)
              var h = s.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values, n, r)
              g.set(h, f), (l.attributes.position.values = g)
              var y = t.northCap,
                m = t.southCap,
                _ = 4
              y && (_ -= 1), m && (_ -= 1)
              var v = 2 * (g.length / 3 + _),
                E = u.IndexDatatype.createTypedArray(g.length / 3, v)
              f = g.length / 6
              for (var A, G = 0, R = 0; R < f - 1; R++) (E[G++] = R), (E[G++] = R + 1), (E[G++] = R + f), (E[G++] = R + f + 1)
              if (((E[G++] = f - 1), (E[G++] = 0), (E[G++] = f + f - 1), (E[G++] = f), (E[G++] = 0), (E[G++] = f), y)) A = c - 1
              else {
                var P = p - 1
                ;(E[G++] = P), (E[G++] = P + f), (A = p + c - 2)
              }
              if (((E[G++] = A), (E[G++] = A + f), !m)) {
                var w = p + A - 1
                ;(E[G++] = w), (E[G] = w + f)
              }
              return (l.indices = E), l
            })(t, f)),
            e.defined(t._offsetAttribute))
          ) {
            var E = n.attributes.position.values.length / 3,
              A = new Uint8Array(E)
            t._offsetAttribute === i.GeometryOffsetAttribute.TOP
              ? (A = i.arrayFill(A, 1, 0, E / 2))
              : ((y = t._offsetAttribute === i.GeometryOffsetAttribute.NONE ? 0 : 1), (A = i.arrayFill(A, y))),
              (n.attributes.applyOffset = new o.GeometryAttribute({
                componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: A
              }))
          }
          var R = a.BoundingSphere.fromRectangle3D(p, d, _, h),
            P = a.BoundingSphere.fromRectangle3D(p, d, v, g)
          l = a.BoundingSphere.union(R, P)
        } else {
          if (
            (((n = b(t, f)).attributes.position.values = s.PolygonPipeline.scaleToGeodeticHeight(n.attributes.position.values, _, d, !1)),
            e.defined(t._offsetAttribute))
          ) {
            var w = n.attributes.position.values.length,
              L = new Uint8Array(w / 3)
            ;(y = t._offsetAttribute === i.GeometryOffsetAttribute.NONE ? 0 : 1),
              i.arrayFill(L, y),
              (n.attributes.applyOffset = new o.GeometryAttribute({
                componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: L
              }))
          }
          l = a.BoundingSphere.fromRectangle3D(p, d, _)
        }
        return new o.Geometry({
          attributes: n.attributes,
          indices: n.indices,
          primitiveType: o.PrimitiveType.LINES,
          boundingSphere: l,
          offsetAttribute: t._offsetAttribute
        })
      }
    }),
    function (i, a) {
      return (
        e.defined(a) && (i = _.unpack(i, a)),
        (i._ellipsoid = t.Ellipsoid.clone(i._ellipsoid)),
        (i._rectangle = t.Rectangle.clone(i._rectangle)),
        _.createGeometry(i)
      )
    }
  )
})
