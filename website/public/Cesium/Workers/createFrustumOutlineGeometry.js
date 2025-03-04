define([
  './when-4bbc8319',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './FrustumGeometry-eb154eb0',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './Plane-318d6937',
  './VertexFormat-71718faa'
], function (e, t, r, n, a, i, u, o, c, s, p, m) {
  'use strict'
  function h(n) {
    var a,
      u,
      o = n.frustum,
      c = n.orientation,
      s = n.origin,
      p = e.defaultValue(n._drawNearPlane, !0)
    o instanceof i.PerspectiveFrustum
      ? ((a = 0), (u = i.PerspectiveFrustum.packedLength))
      : o instanceof i.OrthographicFrustum && ((a = 1), (u = i.OrthographicFrustum.packedLength)),
      (this._frustumType = a),
      (this._frustum = o.clone()),
      (this._origin = r.Cartesian3.clone(s)),
      (this._orientation = t.Quaternion.clone(c)),
      (this._drawNearPlane = p),
      (this._workerName = 'createFrustumOutlineGeometry'),
      (this.packedLength = 2 + u + r.Cartesian3.packedLength + t.Quaternion.packedLength)
  }
  h.pack = function (n, a, u) {
    u = e.defaultValue(u, 0)
    var o = n._frustumType,
      c = n._frustum
    return (
      (a[u++] = o),
      0 === o
        ? (i.PerspectiveFrustum.pack(c, a, u), (u += i.PerspectiveFrustum.packedLength))
        : (i.OrthographicFrustum.pack(c, a, u), (u += i.OrthographicFrustum.packedLength)),
      r.Cartesian3.pack(n._origin, a, u),
      (u += r.Cartesian3.packedLength),
      t.Quaternion.pack(n._orientation, a, u),
      (a[(u += t.Quaternion.packedLength)] = n._drawNearPlane ? 1 : 0),
      a
    )
  }
  var d = new i.PerspectiveFrustum(),
    f = new i.OrthographicFrustum(),
    g = new t.Quaternion(),
    _ = new r.Cartesian3()
  return (
    (h.unpack = function (n, a, u) {
      a = e.defaultValue(a, 0)
      var o,
        c = n[a++]
      0 === c
        ? ((o = i.PerspectiveFrustum.unpack(n, a, d)), (a += i.PerspectiveFrustum.packedLength))
        : ((o = i.OrthographicFrustum.unpack(n, a, f)), (a += i.OrthographicFrustum.packedLength))
      var s = r.Cartesian3.unpack(n, a, _)
      a += r.Cartesian3.packedLength
      var p = t.Quaternion.unpack(n, a, g),
        m = 1 === n[(a += t.Quaternion.packedLength)]
      if (!e.defined(u)) return new h({ frustum: o, origin: s, orientation: p, _drawNearPlane: m })
      var k = c === u._frustumType ? u._frustum : void 0
      return (
        (u._frustum = o.clone(k)),
        (u._frustumType = c),
        (u._origin = r.Cartesian3.clone(s, u._origin)),
        (u._orientation = t.Quaternion.clone(p, u._orientation)),
        (u._drawNearPlane = m),
        u
      )
    }),
    (h.createGeometry = function (e) {
      var r = e._frustumType,
        n = e._frustum,
        c = e._origin,
        s = e._orientation,
        p = e._drawNearPlane,
        m = new Float64Array(24)
      i.FrustumGeometry._computeNearFarPlanes(c, s, r, n, m)
      for (
        var h,
          d,
          f = new o.GeometryAttributes({
            position: new u.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: m })
          }),
          g = p ? 2 : 1,
          _ = new Uint16Array(8 * (g + 1)),
          k = p ? 0 : 1;
        k < 2;
        ++k
      )
        (d = 4 * k),
          (_[(h = p ? 8 * k : 0)] = d),
          (_[h + 1] = d + 1),
          (_[h + 2] = d + 1),
          (_[h + 3] = d + 2),
          (_[h + 4] = d + 2),
          (_[h + 5] = d + 3),
          (_[h + 6] = d + 3),
          (_[h + 7] = d)
      for (k = 0; k < 2; ++k)
        (d = 4 * k),
          (_[(h = 8 * (g + k))] = d),
          (_[h + 1] = d + 4),
          (_[h + 2] = d + 1),
          (_[h + 3] = d + 5),
          (_[h + 4] = d + 2),
          (_[h + 5] = d + 6),
          (_[h + 6] = d + 3),
          (_[h + 7] = d + 7)
      return new u.Geometry({ attributes: f, indices: _, primitiveType: u.PrimitiveType.LINES, boundingSphere: t.BoundingSphere.fromVertices(m) })
    }),
    function (t, r) {
      return e.defined(r) && (t = h.unpack(t, r)), h.createGeometry(t)
    }
  )
})
