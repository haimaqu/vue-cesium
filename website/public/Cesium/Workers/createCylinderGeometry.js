define([
  './CylinderGeometry-34e307a4',
  './when-4bbc8319',
  './GeometryOffsetAttribute-1772960d',
  './RuntimeError-346a3079',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './combine-83860057',
  './CylinderGeometryLibrary-dc0b434b',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './VertexFormat-71718faa'
], function (e, t, r, n, a, o, i, c, y, d, m, b, u, G) {
  'use strict'
  return function (r, n) {
    return t.defined(n) && (r = e.CylinderGeometry.unpack(r, n)), e.CylinderGeometry.createGeometry(r)
  }
})
