define([
  './AttributeCompression-af389d04',
  './Matrix2-9aa31791',
  './combine-83860057',
  './IndexDatatype-b7d979a6',
  './ComponentDatatype-93750d1a',
  './createTaskProcessorWorker',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './WebGLConstants-1c8239cc'
], function (a, e, t, r, s, n, i, o, d) {
  'use strict'
  var f = 32767,
    l = Math.cos(s.CesiumMath.toRadians(150)),
    c = new e.Cartographic(),
    h = new e.Cartesian3()
  var u = new e.Cartographic(),
    C = new e.Cartographic()
  function p(a) {
    var e = 8 * a,
      t = 3 * e,
      s = 4 * e
    ;(this.startEllipsoidNormals = new Float32Array(t)),
      (this.endEllipsoidNormals = new Float32Array(t)),
      (this.startPositionAndHeights = new Float32Array(s)),
      (this.startFaceNormalAndVertexCornerIds = new Float32Array(s)),
      (this.endPositionAndHeights = new Float32Array(s)),
      (this.endFaceNormalAndHalfWidths = new Float32Array(s)),
      (this.vertexBatchIds = new Uint16Array(e)),
      (this.indices = r.IndexDatatype.createTypedArray(e, 36 * a)),
      (this.vec3Offset = 0),
      (this.vec4Offset = 0),
      (this.batchIdOffset = 0),
      (this.indexOffset = 0),
      (this.volumeStartIndex = 0)
  }
  var v = new e.Cartesian3(),
    m = new e.Cartesian3()
  function b(a, t, r, s, n) {
    var i = e.Cartesian3.subtract(r, t, m),
      o = e.Cartesian3.subtract(t, a, v)
    return (
      e.Cartesian3.normalize(i, i),
      e.Cartesian3.normalize(o, o),
      e.Cartesian3.dot(i, o) < l && (o = e.Cartesian3.multiplyByScalar(o, -1, v)),
      e.Cartesian3.add(i, o, n),
      e.Cartesian3.equals(n, e.Cartesian3.ZERO) && (n = e.Cartesian3.subtract(a, t)),
      e.Cartesian3.cross(n, s, n),
      e.Cartesian3.cross(s, n, n),
      e.Cartesian3.normalize(n, n),
      n
    )
  }
  var A = [0, 2, 6, 0, 6, 4, 0, 1, 3, 0, 3, 2, 0, 4, 5, 0, 5, 1, 5, 3, 1, 5, 7, 3, 7, 5, 4, 7, 4, 6, 7, 6, 2, 7, 2, 3],
    w = A.length,
    g = new e.Cartesian3(),
    y = new e.Cartesian3(),
    N = new e.Cartesian3(),
    k = new e.Cartesian3(),
    I = new e.Cartesian3()
  p.prototype.addVolume = function (a, t, r, s, n, i, o, d, f, l) {
    var c = e.Cartesian3.add(t, f, g),
      h = l.geodeticSurfaceNormal(c, y)
    c = e.Cartesian3.add(r, f, g)
    var u,
      C = l.geodeticSurfaceNormal(c, k),
      p = b(a, t, r, h, N),
      v = b(s, r, t, C, I),
      m = this.startEllipsoidNormals,
      x = this.endEllipsoidNormals,
      E = this.startPositionAndHeights,
      F = this.startFaceNormalAndVertexCornerIds,
      H = this.endPositionAndHeights,
      O = this.endFaceNormalAndHalfWidths,
      P = this.vertexBatchIds,
      D = this.batchIdOffset,
      S = this.vec3Offset,
      M = this.vec4Offset
    for (u = 0; u < 8; u++)
      e.Cartesian3.pack(h, m, S),
        e.Cartesian3.pack(C, x, S),
        e.Cartesian3.pack(t, E, M),
        (E[M + 3] = n),
        e.Cartesian3.pack(r, H, M),
        (H[M + 3] = i),
        e.Cartesian3.pack(p, F, M),
        (F[M + 3] = u),
        e.Cartesian3.pack(v, O, M),
        (O[M + 3] = o),
        (P[D++] = d),
        (S += 3),
        (M += 4)
    ;(this.batchIdOffset = D), (this.vec3Offset = S), (this.vec4Offset = M)
    var R = this.indices,
      U = this.volumeStartIndex,
      B = this.indexOffset
    for (u = 0; u < w; u++) R[B + u] = A[u] + U
    ;(this.volumeStartIndex += 8), (this.indexOffset += w)
  }
  var x = new e.Rectangle(),
    E = new e.Ellipsoid(),
    F = new e.Cartesian3(),
    H = new e.Cartesian3(),
    O = new e.Cartesian3(),
    P = new e.Cartesian3(),
    D = new e.Cartesian3()
  return n(function (n, i) {
    var o,
      d = new Uint16Array(n.positions),
      l = new Uint16Array(n.widths),
      v = new Uint32Array(n.counts),
      m = new Uint16Array(n.batchIds),
      b = x,
      A = E,
      w = F,
      g = new Float64Array(n.packedBuffer),
      y = 0,
      N = g[y++],
      k = g[y++]
    e.Rectangle.unpack(g, y, b),
      (y += e.Rectangle.packedLength),
      e.Ellipsoid.unpack(g, y, A),
      (y += e.Ellipsoid.packedLength),
      e.Cartesian3.unpack(g, y, w)
    var I = d.length / 3,
      S = d.subarray(0, I),
      M = d.subarray(I, 2 * I),
      R = d.subarray(2 * I, 3 * I)
    a.AttributeCompression.zigZagDeltaDecode(S, M, R),
      (function (a, t, r, s) {
        for (var n = s.length, i = a.length, o = new Uint8Array(i), d = u, f = C, l = 0, c = 0; c < n; c++) {
          for (var h = s[c], p = h, v = 1; v < h; v++) {
            var m = l + v,
              b = m - 1
            ;(f.longitude = a[m]), (f.latitude = t[m]), (d.longitude = a[b]), (d.latitude = t[b]), e.Cartographic.equals(f, d) && (p--, (o[b] = 1))
          }
          ;(s[c] = p), (l += h)
        }
        for (var A = 0, w = 0; w < i; w++) 1 !== o[w] && ((a[A] = a[w]), (t[A] = t[w]), (r[A] = r[w]), A++)
      })(S, M, R, v)
    var U = v.length,
      B = 0
    for (o = 0; o < U; o++) {
      B += v[o] - 1
    }
    var T = new p(B),
      V = (function (a, t, r, n, i, o, d) {
        for (var l = a.length, u = new Float64Array(3 * l), C = 0; C < l; ++C) {
          var p = a[C],
            v = t[C],
            m = r[C],
            b = s.CesiumMath.lerp(n.west, n.east, p / f),
            A = s.CesiumMath.lerp(n.south, n.north, v / f),
            w = s.CesiumMath.lerp(i, o, m / f),
            g = e.Cartographic.fromRadians(b, A, w, c),
            y = d.cartographicToCartesian(g, h)
          e.Cartesian3.pack(y, u, 3 * C)
        }
        return u
      })(S, M, R, b, N, k, A)
    I = S.length
    var W = new Float32Array(3 * I)
    for (o = 0; o < I; ++o) (W[3 * o] = V[3 * o] - w.x), (W[3 * o + 1] = V[3 * o + 1] - w.y), (W[3 * o + 2] = V[3 * o + 2] - w.z)
    var z = 0,
      q = 0
    for (o = 0; o < U; o++) {
      for (var L = v[o] - 1, _ = 0.5 * l[o], G = m[o], Z = z, Y = 0; Y < L; Y++) {
        var j = e.Cartesian3.unpack(W, z, O),
          J = e.Cartesian3.unpack(W, z + 3, P),
          K = R[q],
          Q = R[q + 1]
        ;(K = s.CesiumMath.lerp(N, k, K / f)), (Q = s.CesiumMath.lerp(N, k, Q / f)), q++
        var X = H,
          $ = D
        if (0 === Y) {
          var aa = Z + 3 * L,
            ea = e.Cartesian3.unpack(W, aa, H)
          if (e.Cartesian3.equals(ea, j)) e.Cartesian3.unpack(W, aa - 3, X)
          else {
            var ta = e.Cartesian3.subtract(j, J, H)
            X = e.Cartesian3.add(ta, j, H)
          }
        } else e.Cartesian3.unpack(W, z - 3, X)
        if (Y === L - 1) {
          var ra = e.Cartesian3.unpack(W, Z, D)
          if (e.Cartesian3.equals(ra, J)) e.Cartesian3.unpack(W, Z + 3, $)
          else {
            var sa = e.Cartesian3.subtract(J, j, D)
            $ = e.Cartesian3.add(sa, J, D)
          }
        } else e.Cartesian3.unpack(W, z + 6, $)
        T.addVolume(X, j, J, $, K, Q, _, G, w, A), (z += 3)
      }
      ;(z += 3), q++
    }
    var na = T.indices
    i.push(T.startEllipsoidNormals.buffer),
      i.push(T.endEllipsoidNormals.buffer),
      i.push(T.startPositionAndHeights.buffer),
      i.push(T.startFaceNormalAndVertexCornerIds.buffer),
      i.push(T.endPositionAndHeights.buffer),
      i.push(T.endFaceNormalAndHalfWidths.buffer),
      i.push(T.vertexBatchIds.buffer),
      i.push(na.buffer)
    var ia = {
      indexDatatype: 2 === na.BYTES_PER_ELEMENT ? r.IndexDatatype.UNSIGNED_SHORT : r.IndexDatatype.UNSIGNED_INT,
      startEllipsoidNormals: T.startEllipsoidNormals.buffer,
      endEllipsoidNormals: T.endEllipsoidNormals.buffer,
      startPositionAndHeights: T.startPositionAndHeights.buffer,
      startFaceNormalAndVertexCornerIds: T.startFaceNormalAndVertexCornerIds.buffer,
      endPositionAndHeights: T.endPositionAndHeights.buffer,
      endFaceNormalAndHalfWidths: T.endFaceNormalAndHalfWidths.buffer,
      vertexBatchIds: T.vertexBatchIds.buffer,
      indices: na.buffer
    }
    if (n.keepDecodedPositions) {
      var oa = (function (a) {
        for (var e = a.length, t = new Uint32Array(e + 1), r = 0, s = 0; s < e; ++s) (t[s] = r), (r += a[s])
        return (t[e] = r), t
      })(v)
      i.push(V.buffer, oa.buffer), (ia = t.combine(ia, { decodedPositions: V.buffer, decodedPositionOffsets: oa.buffer }))
    }
    return ia
  })
})
