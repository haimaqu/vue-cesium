define([
  './when-4bbc8319',
  './EllipsoidOutlineGeometry-44f0c12f',
  './GeometryOffsetAttribute-1772960d',
  './RuntimeError-346a3079',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './combine-83860057',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6'
], function (e, t, r, n, i, o, a, c, u, d, f, m) {
  'use strict'
  return function (r, n) {
    return e.defined(r.buffer) && (r = t.EllipsoidOutlineGeometry.unpack(r, n)), t.EllipsoidOutlineGeometry.createGeometry(r)
  }
})
