define(['exports', './Matrix2-9aa31791', './RuntimeError-346a3079', './when-4bbc8319', './Transforms-d13cc04e'], function (t, e, n, i, h) {
  'use strict'
  function r(t, e, n, h) {
    ;(this.x = i.defaultValue(t, 0)), (this.y = i.defaultValue(e, 0)), (this.width = i.defaultValue(n, 0)), (this.height = i.defaultValue(h, 0))
  }
  ;(r.packedLength = 4),
    (r.pack = function (t, e, n) {
      return (n = i.defaultValue(n, 0)), (e[n++] = t.x), (e[n++] = t.y), (e[n++] = t.width), (e[n] = t.height), e
    }),
    (r.unpack = function (t, e, n) {
      return (e = i.defaultValue(e, 0)), i.defined(n) || (n = new r()), (n.x = t[e++]), (n.y = t[e++]), (n.width = t[e++]), (n.height = t[e]), n
    }),
    (r.fromPoints = function (t, e) {
      if ((i.defined(e) || (e = new r()), !i.defined(t) || 0 === t.length)) return (e.x = 0), (e.y = 0), (e.width = 0), (e.height = 0), e
      for (var n = t.length, h = t[0].x, a = t[0].y, d = t[0].x, u = t[0].y, o = 1; o < n; o++) {
        var c = t[o],
          f = c.x,
          x = c.y
        ;(h = Math.min(f, h)), (d = Math.max(f, d)), (a = Math.min(x, a)), (u = Math.max(x, u))
      }
      return (e.x = h), (e.y = a), (e.width = d - h), (e.height = u - a), e
    })
  var a = new h.GeographicProjection(),
    d = new e.Cartographic(),
    u = new e.Cartographic()
  ;(r.fromRectangle = function (t, n, h) {
    if ((i.defined(h) || (h = new r()), !i.defined(t))) return (h.x = 0), (h.y = 0), (h.width = 0), (h.height = 0), h
    var o = (n = i.defaultValue(n, a)).project(e.Rectangle.southwest(t, d)),
      c = n.project(e.Rectangle.northeast(t, u))
    return e.Cartesian2.subtract(c, o, c), (h.x = o.x), (h.y = o.y), (h.width = c.x), (h.height = c.y), h
  }),
    (r.clone = function (t, e) {
      if (i.defined(t))
        return i.defined(e) ? ((e.x = t.x), (e.y = t.y), (e.width = t.width), (e.height = t.height), e) : new r(t.x, t.y, t.width, t.height)
    }),
    (r.union = function (t, e, n) {
      i.defined(n) || (n = new r())
      var h = Math.min(t.x, e.x),
        a = Math.min(t.y, e.y),
        d = Math.max(t.x + t.width, e.x + e.width),
        u = Math.max(t.y + t.height, e.y + e.height)
      return (n.x = h), (n.y = a), (n.width = d - h), (n.height = u - a), n
    }),
    (r.expand = function (t, e, n) {
      n = r.clone(t, n)
      var i = e.x - n.x,
        h = e.y - n.y
      return (
        i > n.width ? (n.width = i) : i < 0 && ((n.width -= i), (n.x = e.x)),
        h > n.height ? (n.height = h) : h < 0 && ((n.height -= h), (n.y = e.y)),
        n
      )
    }),
    (r.intersect = function (t, e) {
      var n = t.x,
        i = t.y,
        r = e.x,
        a = e.y
      return n > r + e.width || n + t.width < r || i + t.height < a || i > a + e.height ? h.Intersect.OUTSIDE : h.Intersect.INTERSECTING
    }),
    (r.equals = function (t, e) {
      return t === e || (i.defined(t) && i.defined(e) && t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height)
    }),
    (r.prototype.clone = function (t) {
      return r.clone(this, t)
    }),
    (r.prototype.intersect = function (t) {
      return r.intersect(this, t)
    }),
    (r.prototype.equals = function (t) {
      return r.equals(this, t)
    }),
    (t.BoundingRectangle = r)
})
