var BASIS = (function () {
  var r = 'undefined' != typeof document && document.currentScript ? document.currentScript.src : void 0
  return (
    'undefined' != typeof __filename && (r = r || __filename),
    function (t) {
      var e,
        n,
        o = void 0 !== (t = t || {}) ? t : {}
      o.ready = new Promise(function (r, t) {
        ;(e = r), (readyPromiseRejectza = t)
      })
      var i,
        a = {}
      for (i in o) o.hasOwnProperty(i) && (a[i] = o[i])
      var u = [],
        s = !1,
        c = !1,
        f = !1,
        l = !1
      ;(s = 'object' == typeof window),
        (c = 'function' == typeof importScripts),
        (f = 'object' == typeof process && 'object' == typeof process.versions && 'string' == typeof process.versions.node),
        (l = !s && !f && !c)
      var p,
        d,
        h,
        v,
        y,
        m = ''
      function g(r) {
        return o.locateFile ? o.locateFile(r, m) : m + r
      }
      f
        ? ((m = c ? require('path').dirname(m) + '/' : __dirname + '/'),
          (p = function (r, t) {
            return v || (v = require('fs')), y || (y = require('path')), (r = y.normalize(r)), v.readFileSync(r, t ? null : 'utf8')
          }),
          (h = function (r) {
            var t = p(r, !0)
            return t.buffer || (t = new Uint8Array(t)), A(t.buffer), t
          }),
          process.argv.length > 1 && process.argv[1].replace(/\\/g, '/'),
          (u = process.argv.slice(2)),
          process.on('uncaughtException', function (r) {
            if (!(r instanceof Qe)) throw r
          }),
          process.on('unhandledRejection', dr),
          function (r) {
            process.exit(r)
          },
          (o.inspect = function () {
            return '[Emscripten Module object]'
          }))
        : l
        ? ('undefined' != typeof read &&
            (p = function (r) {
              return read(r)
            }),
          (h = function (r) {
            var t
            return 'function' == typeof readbuffer ? new Uint8Array(readbuffer(r)) : (A('object' == typeof (t = read(r, 'binary'))), t)
          }),
          'undefined' != typeof scriptArgs ? (u = scriptArgs) : void 0 !== arguments && (u = arguments),
          'function' == typeof quit &&
            function (r) {
              quit(r)
            },
          'undefined' != typeof print &&
            ('undefined' == typeof console && (console = {}),
            (console.log = print),
            (console.warn = console.error = 'undefined' != typeof printErr ? printErr : print)))
        : (s || c) &&
          (c ? (m = self.location.href) : 'undefined' != typeof document && document.currentScript && (m = document.currentScript.src),
          r && (m = r),
          (m = 0 !== m.indexOf('blob:') ? m.substr(0, m.lastIndexOf('/') + 1) : ''),
          (p = function (r) {
            var t = new XMLHttpRequest()
            return t.open('GET', r, !1), t.send(null), t.responseText
          }),
          c &&
            (h = function (r) {
              var t = new XMLHttpRequest()
              return t.open('GET', r, !1), (t.responseType = 'arraybuffer'), t.send(null), new Uint8Array(t.response)
            }),
          (d = function (r, t, e) {
            var n = new XMLHttpRequest()
            n.open('GET', r, !0),
              (n.responseType = 'arraybuffer'),
              (n.onload = function () {
                200 == n.status || (0 == n.status && n.response) ? t(n.response) : e()
              }),
              (n.onerror = e),
              n.send(null)
          }))
      var w = o.print || console.log.bind(console),
        T = o.printErr || console.warn.bind(console)
      for (i in a) a.hasOwnProperty(i) && (o[i] = a[i])
      ;(a = null), o.arguments && (u = o.arguments), o.thisProgram && o.thisProgram, o.quit && o.quit
      var b,
        C = function (r) {
          r
        }
      o.wasmBinary && (b = o.wasmBinary)
      var $
      o.noExitRuntime
      'object' != typeof WebAssembly && dr('no native wasm support detected')
      var P = !1
      function A(r, t) {
        r || dr('Assertion failed: ' + t)
      }
      var _ = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0
      function S(r, t, e) {
        for (var n = t + e, o = t; r[o] && !(o >= n); ) ++o
        if (o - t > 16 && r.subarray && _) return _.decode(r.subarray(t, o))
        for (var i = ''; t < o; ) {
          var a = r[t++]
          if (128 & a) {
            var u = 63 & r[t++]
            if (192 != (224 & a)) {
              var s = 63 & r[t++]
              if ((a = 224 == (240 & a) ? ((15 & a) << 12) | (u << 6) | s : ((7 & a) << 18) | (u << 12) | (s << 6) | (63 & r[t++])) < 65536)
                i += String.fromCharCode(a)
              else {
                var c = a - 65536
                i += String.fromCharCode(55296 | (c >> 10), 56320 | (1023 & c))
              }
            } else i += String.fromCharCode(((31 & a) << 6) | u)
          } else i += String.fromCharCode(a)
        }
        return i
      }
      function W(r, t) {
        return r ? S(R, r, t) : ''
      }
      function E(r, t, e, n) {
        if (!(n > 0)) return 0
        for (var o = e, i = e + n - 1, a = 0; a < r.length; ++a) {
          var u = r.charCodeAt(a)
          if (u >= 55296 && u <= 57343) u = (65536 + ((1023 & u) << 10)) | (1023 & r.charCodeAt(++a))
          if (u <= 127) {
            if (e >= i) break
            t[e++] = u
          } else if (u <= 2047) {
            if (e + 1 >= i) break
            ;(t[e++] = 192 | (u >> 6)), (t[e++] = 128 | (63 & u))
          } else if (u <= 65535) {
            if (e + 2 >= i) break
            ;(t[e++] = 224 | (u >> 12)), (t[e++] = 128 | ((u >> 6) & 63)), (t[e++] = 128 | (63 & u))
          } else {
            if (e + 3 >= i) break
            ;(t[e++] = 240 | (u >> 18)), (t[e++] = 128 | ((u >> 12) & 63)), (t[e++] = 128 | ((u >> 6) & 63)), (t[e++] = 128 | (63 & u))
          }
        }
        return (t[e] = 0), e - o
      }
      function F(r, t, e) {
        return E(r, R, t, e)
      }
      function k(r) {
        for (var t = 0, e = 0; e < r.length; ++e) {
          var n = r.charCodeAt(e)
          n >= 55296 && n <= 57343 && (n = (65536 + ((1023 & n) << 10)) | (1023 & r.charCodeAt(++e))),
            n <= 127 ? ++t : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4)
        }
        return t
      }
      var O,
        j,
        R,
        x,
        I,
        D,
        U,
        B,
        M,
        V = 'undefined' != typeof TextDecoder ? new TextDecoder('utf-16le') : void 0
      function q(r, t) {
        for (var e = r, n = e >> 1, o = n + t / 2; !(n >= o) && I[n]; ) ++n
        if ((e = n << 1) - r > 32 && V) return V.decode(R.subarray(r, e))
        for (var i = '', a = 0; !(a >= t / 2); ++a) {
          var u = x[(r + 2 * a) >> 1]
          if (0 == u) break
          i += String.fromCharCode(u)
        }
        return i
      }
      function H(r, t, e) {
        if ((void 0 === e && (e = 2147483647), e < 2)) return 0
        for (var n = t, o = (e -= 2) < 2 * r.length ? e / 2 : r.length, i = 0; i < o; ++i) {
          var a = r.charCodeAt(i)
          ;(x[t >> 1] = a), (t += 2)
        }
        return (x[t >> 1] = 0), t - n
      }
      function z(r) {
        return 2 * r.length
      }
      function N(r, t) {
        for (var e = 0, n = ''; !(e >= t / 4); ) {
          var o = D[(r + 4 * e) >> 2]
          if (0 == o) break
          if ((++e, o >= 65536)) {
            var i = o - 65536
            n += String.fromCharCode(55296 | (i >> 10), 56320 | (1023 & i))
          } else n += String.fromCharCode(o)
        }
        return n
      }
      function G(r, t, e) {
        if ((void 0 === e && (e = 2147483647), e < 4)) return 0
        for (var n = t, o = n + e - 4, i = 0; i < r.length; ++i) {
          var a = r.charCodeAt(i)
          if (a >= 55296 && a <= 57343) a = (65536 + ((1023 & a) << 10)) | (1023 & r.charCodeAt(++i))
          if (((D[t >> 2] = a), (t += 4) + 4 > o)) break
        }
        return (D[t >> 2] = 0), t - n
      }
      function L(r) {
        for (var t = 0, e = 0; e < r.length; ++e) {
          var n = r.charCodeAt(e)
          n >= 55296 && n <= 57343 && ++e, (t += 4)
        }
        return t
      }
      function X(r, t) {
        return r % t > 0 && (r += t - (r % t)), r
      }
      function J(r) {
        ;(O = r),
          (o.HEAP8 = j = new Int8Array(r)),
          (o.HEAP16 = x = new Int16Array(r)),
          (o.HEAP32 = D = new Int32Array(r)),
          (o.HEAPU8 = R = new Uint8Array(r)),
          (o.HEAPU16 = I = new Uint16Array(r)),
          (o.HEAPU32 = U = new Uint32Array(r)),
          (o.HEAPF32 = B = new Float32Array(r)),
          (o.HEAPF64 = M = new Float64Array(r))
      }
      o.INITIAL_MEMORY
      var K,
        Q = [],
        Y = [],
        Z = [],
        rr = []
      function tr() {
        if (o.preRun) for ('function' == typeof o.preRun && (o.preRun = [o.preRun]); o.preRun.length; ) ir(o.preRun.shift())
        $r(Q)
      }
      function er() {
        !0, $r(Y)
      }
      function nr() {
        $r(Z)
      }
      function or() {
        if (o.postRun) for ('function' == typeof o.postRun && (o.postRun = [o.postRun]); o.postRun.length; ) ur(o.postRun.shift())
        $r(rr)
      }
      function ir(r) {
        Q.unshift(r)
      }
      function ar(r) {
        Y.unshift(r)
      }
      function ur(r) {
        rr.unshift(r)
      }
      var sr = 0,
        cr = null,
        fr = null
      function lr(r) {
        sr++, o.monitorRunDependencies && o.monitorRunDependencies(sr)
      }
      function pr(r) {
        if ((sr--, o.monitorRunDependencies && o.monitorRunDependencies(sr), 0 == sr && (null !== cr && (clearInterval(cr), (cr = null)), fr))) {
          var t = fr
          ;(fr = null), t()
        }
      }
      function dr(r) {
        o.onAbort && o.onAbort(r), T((r += '')), (P = !0), 1, (r = 'abort(' + r + '). Build with -s ASSERTIONS=1 for more info.')
        var t = new WebAssembly.RuntimeError(r)
        throw (n(t), t)
      }
      function hr(r, t) {
        return String.prototype.startsWith ? r.startsWith(t) : 0 === r.indexOf(t)
      }
      ;(o.preloadedImages = {}), (o.preloadedAudios = {})
      var vr = 'data:application/octet-stream;base64,'
      function yr(r) {
        return hr(r, vr)
      }
      var mr = 'file://'
      function gr(r) {
        return hr(r, mr)
      }
      var wr = 'basis_transcoder.wasm'
      function Tr(r) {
        try {
          if (r == wr && b) return new Uint8Array(b)
          if (h) return h(r)
          throw 'both async and sync fetching of the wasm failed'
        } catch (r) {
          dr(r)
        }
      }
      function br() {
        if (!b && (s || c)) {
          if ('function' == typeof fetch && !gr(wr))
            return fetch(wr, { credentials: 'same-origin' })
              .then(function (r) {
                if (!r.ok) throw "failed to load wasm binary file at '" + wr + "'"
                return r.arrayBuffer()
              })
              .catch(function () {
                return Tr(wr)
              })
          if (d)
            return new Promise(function (r, t) {
              d(
                wr,
                function (t) {
                  r(new Uint8Array(t))
                },
                t
              )
            })
        }
        return Promise.resolve().then(function () {
          return Tr(wr)
        })
      }
      function Cr() {
        var r = { a: Le }
        function t(r, t) {
          var e = r.exports
          ;(o.asm = e), J(($ = o.asm.K).buffer), (K = o.asm.O), ar(o.asm.L), pr()
        }
        function e(r) {
          t(r.instance)
        }
        function i(t) {
          return br()
            .then(function (t) {
              return WebAssembly.instantiate(t, r)
            })
            .then(t, function (r) {
              T('failed to asynchronously prepare wasm: ' + r), dr(r)
            })
        }
        if ((lr(), o.instantiateWasm))
          try {
            return o.instantiateWasm(r, t)
          } catch (r) {
            return T('Module.instantiateWasm callback failed with error: ' + r), !1
          }
        return (
          (b || 'function' != typeof WebAssembly.instantiateStreaming || yr(wr) || gr(wr) || 'function' != typeof fetch
            ? i(e)
            : fetch(wr, { credentials: 'same-origin' }).then(function (t) {
                return WebAssembly.instantiateStreaming(t, r).then(e, function (r) {
                  return T('wasm streaming compile failed: ' + r), T('falling back to ArrayBuffer instantiation'), i(e)
                })
              })
          ).catch(n),
          {}
        )
      }
      function $r(r) {
        for (; r.length > 0; ) {
          var t = r.shift()
          if ('function' != typeof t) {
            var e = t.func
            'number' == typeof e ? (void 0 === t.arg ? K.get(e)() : K.get(e)(t.arg)) : e(void 0 === t.arg ? null : t.arg)
          } else t(o)
        }
      }
      yr(wr) || (wr = g(wr))
      var Pr = {}
      function Ar(r) {
        for (; r.length; ) {
          var t = r.pop()
          r.pop()(t)
        }
      }
      function _r(r) {
        return this.fromWireType(U[r >> 2])
      }
      var Sr = {},
        Wr = {},
        Er = {},
        Fr = 48,
        kr = 57
      function Or(r) {
        if (void 0 === r) return '_unknown'
        var t = (r = r.replace(/[^a-zA-Z0-9_]/g, '$')).charCodeAt(0)
        return t >= Fr && t <= kr ? '_' + r : r
      }
      function jr(r, t) {
        return (r = Or(r)), new Function('body', 'return function ' + r + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(t)
      }
      function Rr(r, t) {
        var e = jr(t, function (r) {
          ;(this.name = t), (this.message = r)
          var e = new Error(r).stack
          void 0 !== e && (this.stack = this.toString() + '\n' + e.replace(/^Error(:[^\n]*)?\n/, ''))
        })
        return (
          (e.prototype = Object.create(r.prototype)),
          (e.prototype.constructor = e),
          (e.prototype.toString = function () {
            return void 0 === this.message ? this.name : this.name + ': ' + this.message
          }),
          e
        )
      }
      var xr = void 0
      function Ir(r) {
        throw new xr(r)
      }
      function Dr(r, t, e) {
        function n(t) {
          var n = e(t)
          n.length !== r.length && Ir('Mismatched type converter count')
          for (var o = 0; o < r.length; ++o) Nr(r[o], n[o])
        }
        r.forEach(function (r) {
          Er[r] = t
        })
        var o = new Array(t.length),
          i = [],
          a = 0
        t.forEach(function (r, t) {
          Wr.hasOwnProperty(r)
            ? (o[t] = Wr[r])
            : (i.push(r),
              Sr.hasOwnProperty(r) || (Sr[r] = []),
              Sr[r].push(function () {
                ;(o[t] = Wr[r]), ++a === i.length && n(o)
              }))
        }),
          0 === i.length && n(o)
      }
      function Ur(r) {
        var t = Pr[r]
        delete Pr[r]
        var e = t.rawConstructor,
          n = t.rawDestructor,
          o = t.fields
        Dr(
          [r],
          o
            .map(function (r) {
              return r.getterReturnType
            })
            .concat(
              o.map(function (r) {
                return r.setterArgumentType
              })
            ),
          function (r) {
            var i = {}
            return (
              o.forEach(function (t, e) {
                var n = t.fieldName,
                  a = r[e],
                  u = t.getter,
                  s = t.getterContext,
                  c = r[e + o.length],
                  f = t.setter,
                  l = t.setterContext
                i[n] = {
                  read: function (r) {
                    return a.fromWireType(u(s, r))
                  },
                  write: function (r, t) {
                    var e = []
                    f(l, r, c.toWireType(e, t)), Ar(e)
                  }
                }
              }),
              [
                {
                  name: t.name,
                  fromWireType: function (r) {
                    var t = {}
                    for (var e in i) t[e] = i[e].read(r)
                    return n(r), t
                  },
                  toWireType: function (r, t) {
                    for (var o in i) if (!(o in t)) throw new TypeError('Missing field:  "' + o + '"')
                    var a = e()
                    for (o in i) i[o].write(a, t[o])
                    return null !== r && r.push(n, a), a
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: _r,
                  destructorFunction: n
                }
              ]
            )
          }
        )
      }
      function Br(r) {
        switch (r) {
          case 1:
            return 0
          case 2:
            return 1
          case 4:
            return 2
          case 8:
            return 3
          default:
            throw new TypeError('Unknown type size: ' + r)
        }
      }
      function Mr() {
        for (var r = new Array(256), t = 0; t < 256; ++t) r[t] = String.fromCharCode(t)
        Vr = r
      }
      var Vr = void 0
      function qr(r) {
        for (var t = '', e = r; R[e]; ) t += Vr[R[e++]]
        return t
      }
      var Hr = void 0
      function zr(r) {
        throw new Hr(r)
      }
      function Nr(r, t, e) {
        if (((e = e || {}), !('argPackAdvance' in t))) throw new TypeError('registerType registeredInstance requires argPackAdvance')
        var n = t.name
        if ((r || zr('type "' + n + '" must have a positive integer typeid pointer'), Wr.hasOwnProperty(r))) {
          if (e.ignoreDuplicateRegistrations) return
          zr("Cannot register type '" + n + "' twice")
        }
        if (((Wr[r] = t), delete Er[r], Sr.hasOwnProperty(r))) {
          var o = Sr[r]
          delete Sr[r],
            o.forEach(function (r) {
              r()
            })
        }
      }
      function Gr(r, t, e, n, o) {
        var i = Br(e)
        Nr(r, {
          name: (t = qr(t)),
          fromWireType: function (r) {
            return !!r
          },
          toWireType: function (r, t) {
            return t ? n : o
          },
          argPackAdvance: 8,
          readValueFromPointer: function (r) {
            var n
            if (1 === e) n = j
            else if (2 === e) n = x
            else {
              if (4 !== e) throw new TypeError('Unknown boolean type size: ' + t)
              n = D
            }
            return this.fromWireType(n[r >> i])
          },
          destructorFunction: null
        })
      }
      function Lr(r) {
        if (!(this instanceof ct)) return !1
        if (!(r instanceof ct)) return !1
        for (var t = this.$$.ptrType.registeredClass, e = this.$$.ptr, n = r.$$.ptrType.registeredClass, o = r.$$.ptr; t.baseClass; )
          (e = t.upcast(e)), (t = t.baseClass)
        for (; n.baseClass; ) (o = n.upcast(o)), (n = n.baseClass)
        return t === n && e === o
      }
      function Xr(r) {
        return {
          count: r.count,
          deleteScheduled: r.deleteScheduled,
          preservePointerOnDelete: r.preservePointerOnDelete,
          ptr: r.ptr,
          ptrType: r.ptrType,
          smartPtr: r.smartPtr,
          smartPtrType: r.smartPtrType
        }
      }
      function Jr(r) {
        zr(r.$$.ptrType.registeredClass.name + ' instance already deleted')
      }
      var Kr = !1
      function Qr(r) {}
      function Yr(r) {
        r.smartPtr ? r.smartPtrType.rawDestructor(r.smartPtr) : r.ptrType.registeredClass.rawDestructor(r.ptr)
      }
      function Zr(r) {
        ;(r.count.value -= 1), 0 === r.count.value && Yr(r)
      }
      function rt(r) {
        return 'undefined' == typeof FinalizationGroup
          ? ((rt = function (r) {
              return r
            }),
            r)
          : ((Kr = new FinalizationGroup(function (r) {
              for (var t = r.next(); !t.done; t = r.next()) {
                var e = t.value
                e.ptr ? Zr(e) : console.warn('object already deleted: ' + e.ptr)
              }
            })),
            (rt = function (r) {
              return Kr.register(r, r.$$, r.$$), r
            }),
            (Qr = function (r) {
              Kr.unregister(r.$$)
            }),
            rt(r))
      }
      function tt() {
        if ((this.$$.ptr || Jr(this), this.$$.preservePointerOnDelete)) return (this.$$.count.value += 1), this
        var r = rt(Object.create(Object.getPrototypeOf(this), { $$: { value: Xr(this.$$) } }))
        return (r.$$.count.value += 1), (r.$$.deleteScheduled = !1), r
      }
      function et() {
        this.$$.ptr || Jr(this),
          this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && zr('Object already scheduled for deletion'),
          Qr(this),
          Zr(this.$$),
          this.$$.preservePointerOnDelete || ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0))
      }
      function nt() {
        return !this.$$.ptr
      }
      var ot = void 0,
        it = []
      function at() {
        for (; it.length; ) {
          var r = it.pop()
          ;(r.$$.deleteScheduled = !1), r.delete()
        }
      }
      function ut() {
        return (
          this.$$.ptr || Jr(this),
          this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && zr('Object already scheduled for deletion'),
          it.push(this),
          1 === it.length && ot && ot(at),
          (this.$$.deleteScheduled = !0),
          this
        )
      }
      function st() {
        ;(ct.prototype.isAliasOf = Lr),
          (ct.prototype.clone = tt),
          (ct.prototype.delete = et),
          (ct.prototype.isDeleted = nt),
          (ct.prototype.deleteLater = ut)
      }
      function ct() {}
      var ft = {}
      function lt(r, t, e) {
        if (void 0 === r[t].overloadTable) {
          var n = r[t]
          ;(r[t] = function () {
            return (
              r[t].overloadTable.hasOwnProperty(arguments.length) ||
                zr(
                  "Function '" +
                    e +
                    "' called with an invalid number of arguments (" +
                    arguments.length +
                    ') - expects one of (' +
                    r[t].overloadTable +
                    ')!'
                ),
              r[t].overloadTable[arguments.length].apply(this, arguments)
            )
          }),
            (r[t].overloadTable = []),
            (r[t].overloadTable[n.argCount] = n)
        }
      }
      function pt(r, t, e) {
        o.hasOwnProperty(r)
          ? ((void 0 === e || (void 0 !== o[r].overloadTable && void 0 !== o[r].overloadTable[e])) &&
              zr("Cannot register public name '" + r + "' twice"),
            lt(o, r, r),
            o.hasOwnProperty(e) && zr('Cannot register multiple overloads of a function with the same number of arguments (' + e + ')!'),
            (o[r].overloadTable[e] = t))
          : ((o[r] = t), void 0 !== e && (o[r].numArguments = e))
      }
      function dt(r, t, e, n, o, i, a, u) {
        ;(this.name = r),
          (this.constructor = t),
          (this.instancePrototype = e),
          (this.rawDestructor = n),
          (this.baseClass = o),
          (this.getActualType = i),
          (this.upcast = a),
          (this.downcast = u),
          (this.pureVirtualFunctions = [])
      }
      function ht(r, t, e) {
        for (; t !== e; )
          t.upcast || zr('Expected null or instance of ' + e.name + ', got an instance of ' + t.name), (r = t.upcast(r)), (t = t.baseClass)
        return r
      }
      function vt(r, t) {
        if (null === t) return this.isReference && zr('null is not a valid ' + this.name), 0
        t.$$ || zr('Cannot pass "' + ae(t) + '" as a ' + this.name), t.$$.ptr || zr('Cannot pass deleted object as a pointer of type ' + this.name)
        var e = t.$$.ptrType.registeredClass
        return ht(t.$$.ptr, e, this.registeredClass)
      }
      function yt(r, t) {
        var e
        if (null === t)
          return (
            this.isReference && zr('null is not a valid ' + this.name),
            this.isSmartPointer ? ((e = this.rawConstructor()), null !== r && r.push(this.rawDestructor, e), e) : 0
          )
        t.$$ || zr('Cannot pass "' + ae(t) + '" as a ' + this.name),
          t.$$.ptr || zr('Cannot pass deleted object as a pointer of type ' + this.name),
          !this.isConst &&
            t.$$.ptrType.isConst &&
            zr(
              'Cannot convert argument of type ' +
                (t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name) +
                ' to parameter type ' +
                this.name
            )
        var n = t.$$.ptrType.registeredClass
        if (((e = ht(t.$$.ptr, n, this.registeredClass)), this.isSmartPointer))
          switch ((void 0 === t.$$.smartPtr && zr('Passing raw pointer to smart pointer is illegal'), this.sharingPolicy)) {
            case 0:
              t.$$.smartPtrType === this
                ? (e = t.$$.smartPtr)
                : zr(
                    'Cannot convert argument of type ' +
                      (t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name) +
                      ' to parameter type ' +
                      this.name
                  )
              break
            case 1:
              e = t.$$.smartPtr
              break
            case 2:
              if (t.$$.smartPtrType === this) e = t.$$.smartPtr
              else {
                var o = t.clone()
                ;(e = this.rawShare(
                  e,
                  re(function () {
                    o.delete()
                  })
                )),
                  null !== r && r.push(this.rawDestructor, e)
              }
              break
            default:
              zr('Unsupporting sharing policy')
          }
        return e
      }
      function mt(r, t) {
        if (null === t) return this.isReference && zr('null is not a valid ' + this.name), 0
        t.$$ || zr('Cannot pass "' + ae(t) + '" as a ' + this.name),
          t.$$.ptr || zr('Cannot pass deleted object as a pointer of type ' + this.name),
          t.$$.ptrType.isConst && zr('Cannot convert argument of type ' + t.$$.ptrType.name + ' to parameter type ' + this.name)
        var e = t.$$.ptrType.registeredClass
        return ht(t.$$.ptr, e, this.registeredClass)
      }
      function gt(r) {
        return this.rawGetPointee && (r = this.rawGetPointee(r)), r
      }
      function wt(r) {
        this.rawDestructor && this.rawDestructor(r)
      }
      function Tt(r) {
        null !== r && r.delete()
      }
      function bt(r, t, e) {
        if (t === e) return r
        if (void 0 === e.baseClass) return null
        var n = bt(r, t, e.baseClass)
        return null === n ? null : e.downcast(n)
      }
      function Ct() {
        return Object.keys(_t).length
      }
      function $t() {
        var r = []
        for (var t in _t) _t.hasOwnProperty(t) && r.push(_t[t])
        return r
      }
      function Pt(r) {
        ;(ot = r), it.length && ot && ot(at)
      }
      function At() {
        ;(o.getInheritedInstanceCount = Ct), (o.getLiveInheritedInstances = $t), (o.flushPendingDeletes = at), (o.setDelayFunction = Pt)
      }
      var _t = {}
      function St(r, t) {
        for (void 0 === t && zr('ptr should not be undefined'); r.baseClass; ) (t = r.upcast(t)), (r = r.baseClass)
        return t
      }
      function Wt(r, t) {
        return (t = St(r, t)), _t[t]
      }
      function Et(r, t) {
        return (
          (t.ptrType && t.ptr) || Ir('makeClassHandle requires ptr and ptrType'),
          !!t.smartPtrType !== !!t.smartPtr && Ir('Both smartPtrType and smartPtr must be specified'),
          (t.count = { value: 1 }),
          rt(Object.create(r, { $$: { value: t } }))
        )
      }
      function Ft(r) {
        var t = this.getPointee(r)
        if (!t) return this.destructor(r), null
        var e = Wt(this.registeredClass, t)
        if (void 0 !== e) {
          if (0 === e.$$.count.value) return (e.$$.ptr = t), (e.$$.smartPtr = r), e.clone()
          var n = e.clone()
          return this.destructor(r), n
        }
        function o() {
          return this.isSmartPointer
            ? Et(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: t, smartPtrType: this, smartPtr: r })
            : Et(this.registeredClass.instancePrototype, { ptrType: this, ptr: r })
        }
        var i,
          a = this.registeredClass.getActualType(t),
          u = ft[a]
        if (!u) return o.call(this)
        i = this.isConst ? u.constPointerType : u.pointerType
        var s = bt(t, this.registeredClass, i.registeredClass)
        return null === s
          ? o.call(this)
          : this.isSmartPointer
          ? Et(i.registeredClass.instancePrototype, { ptrType: i, ptr: s, smartPtrType: this, smartPtr: r })
          : Et(i.registeredClass.instancePrototype, { ptrType: i, ptr: s })
      }
      function kt() {
        ;(Ot.prototype.getPointee = gt),
          (Ot.prototype.destructor = wt),
          (Ot.prototype.argPackAdvance = 8),
          (Ot.prototype.readValueFromPointer = _r),
          (Ot.prototype.deleteObject = Tt),
          (Ot.prototype.fromWireType = Ft)
      }
      function Ot(r, t, e, n, o, i, a, u, s, c, f) {
        ;(this.name = r),
          (this.registeredClass = t),
          (this.isReference = e),
          (this.isConst = n),
          (this.isSmartPointer = o),
          (this.pointeeType = i),
          (this.sharingPolicy = a),
          (this.rawGetPointee = u),
          (this.rawConstructor = s),
          (this.rawShare = c),
          (this.rawDestructor = f),
          o || void 0 !== t.baseClass
            ? (this.toWireType = yt)
            : n
            ? ((this.toWireType = vt), (this.destructorFunction = null))
            : ((this.toWireType = mt), (this.destructorFunction = null))
      }
      function jt(r, t, e) {
        o.hasOwnProperty(r) || Ir('Replacing nonexistant public symbol'),
          void 0 !== o[r].overloadTable && void 0 !== e ? (o[r].overloadTable[e] = t) : ((o[r] = t), (o[r].argCount = e))
      }
      function Rt(r, t, e) {
        var n = o['dynCall_' + r]
        return e && e.length ? n.apply(null, [t].concat(e)) : n.call(null, t)
      }
      function xt(r, t, e) {
        return -1 != r.indexOf('j') ? Rt(r, t, e) : K.get(t).apply(null, e)
      }
      function It(r, t) {
        var e = []
        return function () {
          e.length = arguments.length
          for (var n = 0; n < arguments.length; n++) e[n] = arguments[n]
          return xt(r, t, e)
        }
      }
      function Dt(r, t) {
        var e = -1 != (r = qr(r)).indexOf('j') ? It(r, t) : K.get(t)
        return 'function' != typeof e && zr('unknown function pointer with signature ' + r + ': ' + t), e
      }
      var Ut = void 0
      function Bt(r) {
        var t = Ke(r),
          e = qr(t)
        return Je(t), e
      }
      function Mt(r, t) {
        var e = [],
          n = {}
        throw (
          (t.forEach(function r(t) {
            n[t] || Wr[t] || (Er[t] ? Er[t].forEach(r) : (e.push(t), (n[t] = !0)))
          }),
          new Ut(r + ': ' + e.map(Bt).join([', '])))
        )
      }
      function Vt(r, t, e, n, o, i, a, u, s, c, f, l, p) {
        ;(f = qr(f)), (i = Dt(o, i)), u && (u = Dt(a, u)), c && (c = Dt(s, c)), (p = Dt(l, p))
        var d = Or(f)
        pt(d, function () {
          Mt('Cannot construct ' + f + ' due to unbound types', [n])
        }),
          Dr([r, t, e], n ? [n] : [], function (t) {
            var e, o
            ;(t = t[0]), (o = n ? (e = t.registeredClass).instancePrototype : ct.prototype)
            var a = jr(d, function () {
                if (Object.getPrototypeOf(this) !== s) throw new Hr("Use 'new' to construct " + f)
                if (void 0 === l.constructor_body) throw new Hr(f + ' has no accessible constructor')
                var r = l.constructor_body[arguments.length]
                if (void 0 === r)
                  throw new Hr(
                    'Tried to invoke ctor of ' +
                      f +
                      ' with invalid number of parameters (' +
                      arguments.length +
                      ') - expected (' +
                      Object.keys(l.constructor_body).toString() +
                      ') parameters instead!'
                  )
                return r.apply(this, arguments)
              }),
              s = Object.create(o, { constructor: { value: a } })
            a.prototype = s
            var l = new dt(f, a, s, p, e, i, u, c),
              h = new Ot(f, l, !0, !1, !1),
              v = new Ot(f + '*', l, !1, !1, !1),
              y = new Ot(f + ' const*', l, !1, !0, !1)
            return (ft[r] = { pointerType: v, constPointerType: y }), jt(d, a), [h, v, y]
          })
      }
      function qt(r, t) {
        for (var e = [], n = 0; n < r; n++) e.push(D[(t >> 2) + n])
        return e
      }
      function Ht(r, t, e, n, o, i) {
        A(t > 0)
        var a = qt(t, e)
        o = Dt(n, o)
        var u = [i],
          s = []
        Dr([], [r], function (r) {
          var e = 'constructor ' + (r = r[0]).name
          if (
            (void 0 === r.registeredClass.constructor_body && (r.registeredClass.constructor_body = []),
            void 0 !== r.registeredClass.constructor_body[t - 1])
          )
            throw new Hr(
              'Cannot register multiple constructors with identical number of parameters (' +
                (t - 1) +
                ") for class '" +
                r.name +
                "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
            )
          return (
            (r.registeredClass.constructor_body[t - 1] = function () {
              Mt('Cannot construct ' + r.name + ' due to unbound types', a)
            }),
            Dr([], a, function (n) {
              return (
                (r.registeredClass.constructor_body[t - 1] = function () {
                  arguments.length !== t - 1 && zr(e + ' called with ' + arguments.length + ' arguments, expected ' + (t - 1)),
                    (s.length = 0),
                    (u.length = t)
                  for (var r = 1; r < t; ++r) u[r] = n[r].toWireType(s, arguments[r - 1])
                  var i = o.apply(null, u)
                  return Ar(s), n[0].fromWireType(i)
                }),
                []
              )
            }),
            []
          )
        })
      }
      function zt(r, t) {
        if (!(r instanceof Function)) throw new TypeError('new_ called with constructor type ' + typeof r + ' which is not a function')
        var e = jr(r.name || 'unknownFunctionName', function () {})
        e.prototype = r.prototype
        var n = new e(),
          o = r.apply(n, t)
        return o instanceof Object ? o : n
      }
      function Nt(r, t, e, n, o) {
        var i = t.length
        i < 2 && zr("argTypes array size mismatch! Must at least get return value and 'this' types!")
        for (var a = null !== t[1] && null !== e, u = !1, s = 1; s < t.length; ++s)
          if (null !== t[s] && void 0 === t[s].destructorFunction) {
            u = !0
            break
          }
        var c = 'void' !== t[0].name,
          f = '',
          l = ''
        for (s = 0; s < i - 2; ++s) (f += (0 !== s ? ', ' : '') + 'arg' + s), (l += (0 !== s ? ', ' : '') + 'arg' + s + 'Wired')
        var p =
          'return function ' +
          Or(r) +
          '(' +
          f +
          ') {\nif (arguments.length !== ' +
          (i - 2) +
          ") {\nthrowBindingError('function " +
          r +
          " called with ' + arguments.length + ' arguments, expected " +
          (i - 2) +
          " args!');\n}\n"
        u && (p += 'var destructors = [];\n')
        var d = u ? 'destructors' : 'null',
          h = ['throwBindingError', 'invoker', 'fn', 'runDestructors', 'retType', 'classParam'],
          v = [zr, n, o, Ar, t[0], t[1]]
        a && (p += 'var thisWired = classParam.toWireType(' + d + ', this);\n')
        for (s = 0; s < i - 2; ++s)
          (p += 'var arg' + s + 'Wired = argType' + s + '.toWireType(' + d + ', arg' + s + '); // ' + t[s + 2].name + '\n'),
            h.push('argType' + s),
            v.push(t[s + 2])
        if (
          (a && (l = 'thisWired' + (l.length > 0 ? ', ' : '') + l),
          (p += (c ? 'var rv = ' : '') + 'invoker(fn' + (l.length > 0 ? ', ' : '') + l + ');\n'),
          u)
        )
          p += 'runDestructors(destructors);\n'
        else
          for (s = a ? 1 : 2; s < t.length; ++s) {
            var y = 1 === s ? 'thisWired' : 'arg' + (s - 2) + 'Wired'
            null !== t[s].destructorFunction &&
              ((p += y + '_dtor(' + y + '); // ' + t[s].name + '\n'), h.push(y + '_dtor'), v.push(t[s].destructorFunction))
          }
        return c && (p += 'var ret = retType.fromWireType(rv);\nreturn ret;\n'), (p += '}\n'), h.push(p), zt(Function, h).apply(null, v)
      }
      function Gt(r, t, e, n, o, i, a, u) {
        var s = qt(e, n)
        ;(t = qr(t)),
          (i = Dt(o, i)),
          Dr([], [r], function (r) {
            var n = (r = r[0]).name + '.' + t
            function o() {
              Mt('Cannot call ' + n + ' due to unbound types', s)
            }
            u && r.registeredClass.pureVirtualFunctions.push(t)
            var c = r.registeredClass.instancePrototype,
              f = c[t]
            return (
              void 0 === f || (void 0 === f.overloadTable && f.className !== r.name && f.argCount === e - 2)
                ? ((o.argCount = e - 2), (o.className = r.name), (c[t] = o))
                : (lt(c, t, n), (c[t].overloadTable[e - 2] = o)),
              Dr([], s, function (o) {
                var u = Nt(n, o, r, i, a)
                return void 0 === c[t].overloadTable ? ((u.argCount = e - 2), (c[t] = u)) : (c[t].overloadTable[e - 2] = u), []
              }),
              []
            )
          })
      }
      function Lt(r, t, e) {
        ;(r = qr(r)),
          Dr([], [t], function (t) {
            return (t = t[0]), (o[r] = t.fromWireType(e)), []
          })
      }
      var Xt = [],
        Jt = [{}, { value: void 0 }, { value: null }, { value: !0 }, { value: !1 }]
      function Kt(r) {
        r > 4 && 0 == --Jt[r].refcount && ((Jt[r] = void 0), Xt.push(r))
      }
      function Qt() {
        for (var r = 0, t = 5; t < Jt.length; ++t) void 0 !== Jt[t] && ++r
        return r
      }
      function Yt() {
        for (var r = 5; r < Jt.length; ++r) if (void 0 !== Jt[r]) return Jt[r]
        return null
      }
      function Zt() {
        ;(o.count_emval_handles = Qt), (o.get_first_emval = Yt)
      }
      function re(r) {
        switch (r) {
          case void 0:
            return 1
          case null:
            return 2
          case !0:
            return 3
          case !1:
            return 4
          default:
            var t = Xt.length ? Xt.pop() : Jt.length
            return (Jt[t] = { refcount: 1, value: r }), t
        }
      }
      function te(r, t) {
        Nr(r, {
          name: (t = qr(t)),
          fromWireType: function (r) {
            var t = Jt[r].value
            return Kt(r), t
          },
          toWireType: function (r, t) {
            return re(t)
          },
          argPackAdvance: 8,
          readValueFromPointer: _r,
          destructorFunction: null
        })
      }
      function ee(r, t, e) {
        switch (t) {
          case 0:
            return function (r) {
              var t = e ? j : R
              return this.fromWireType(t[r])
            }
          case 1:
            return function (r) {
              var t = e ? x : I
              return this.fromWireType(t[r >> 1])
            }
          case 2:
            return function (r) {
              var t = e ? D : U
              return this.fromWireType(t[r >> 2])
            }
          default:
            throw new TypeError('Unknown integer type: ' + r)
        }
      }
      function ne(r, t, e, n) {
        var o = Br(e)
        function i() {}
        ;(t = qr(t)),
          (i.values = {}),
          Nr(r, {
            name: t,
            constructor: i,
            fromWireType: function (r) {
              return this.constructor.values[r]
            },
            toWireType: function (r, t) {
              return t.value
            },
            argPackAdvance: 8,
            readValueFromPointer: ee(t, o, n),
            destructorFunction: null
          }),
          pt(t, i)
      }
      function oe(r, t) {
        var e = Wr[r]
        return void 0 === e && zr(t + ' has unknown type ' + Bt(r)), e
      }
      function ie(r, t, e) {
        var n = oe(r, 'enum')
        t = qr(t)
        var o = n.constructor,
          i = Object.create(n.constructor.prototype, { value: { value: e }, constructor: { value: jr(n.name + '_' + t, function () {}) } })
        ;(o.values[e] = i), (o[t] = i)
      }
      function ae(r) {
        if (null === r) return 'null'
        var t = typeof r
        return 'object' === t || 'array' === t || 'function' === t ? r.toString() : '' + r
      }
      function ue(r, t) {
        switch (t) {
          case 2:
            return function (r) {
              return this.fromWireType(B[r >> 2])
            }
          case 3:
            return function (r) {
              return this.fromWireType(M[r >> 3])
            }
          default:
            throw new TypeError('Unknown float type: ' + r)
        }
      }
      function se(r, t, e) {
        var n = Br(e)
        Nr(r, {
          name: (t = qr(t)),
          fromWireType: function (r) {
            return r
          },
          toWireType: function (r, t) {
            if ('number' != typeof t && 'boolean' != typeof t) throw new TypeError('Cannot convert "' + ae(t) + '" to ' + this.name)
            return t
          },
          argPackAdvance: 8,
          readValueFromPointer: ue(t, n),
          destructorFunction: null
        })
      }
      function ce(r, t, e, n, o, i) {
        var a = qt(t, e)
        ;(r = qr(r)),
          (o = Dt(n, o)),
          pt(
            r,
            function () {
              Mt('Cannot call ' + r + ' due to unbound types', a)
            },
            t - 1
          ),
          Dr([], a, function (e) {
            var n = [e[0], null].concat(e.slice(1))
            return jt(r, Nt(r, n, null, o, i), t - 1), []
          })
      }
      function fe(r, t, e) {
        switch (t) {
          case 0:
            return e
              ? function (r) {
                  return j[r]
                }
              : function (r) {
                  return R[r]
                }
          case 1:
            return e
              ? function (r) {
                  return x[r >> 1]
                }
              : function (r) {
                  return I[r >> 1]
                }
          case 2:
            return e
              ? function (r) {
                  return D[r >> 2]
                }
              : function (r) {
                  return U[r >> 2]
                }
          default:
            throw new TypeError('Unknown integer type: ' + r)
        }
      }
      function le(r, t, e, n, o) {
        ;(t = qr(t)), -1 === o && (o = 4294967295)
        var i = Br(e),
          a = function (r) {
            return r
          }
        if (0 === n) {
          var u = 32 - 8 * e
          a = function (r) {
            return (r << u) >>> u
          }
        }
        var s = -1 != t.indexOf('unsigned')
        Nr(r, {
          name: t,
          fromWireType: a,
          toWireType: function (r, e) {
            if ('number' != typeof e && 'boolean' != typeof e) throw new TypeError('Cannot convert "' + ae(e) + '" to ' + this.name)
            if (e < n || e > o)
              throw new TypeError(
                'Passing a number "' +
                  ae(e) +
                  '" from JS side to C/C++ side to an argument of type "' +
                  t +
                  '", which is outside the valid range [' +
                  n +
                  ', ' +
                  o +
                  ']!'
              )
            return s ? e >>> 0 : 0 | e
          },
          argPackAdvance: 8,
          readValueFromPointer: fe(t, i, 0 !== n),
          destructorFunction: null
        })
      }
      function pe(r, t, e) {
        var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][t]
        function o(r) {
          var t = U,
            e = t[(r >>= 2)],
            o = t[r + 1]
          return new n(O, o, e)
        }
        Nr(r, { name: (e = qr(e)), fromWireType: o, argPackAdvance: 8, readValueFromPointer: o }, { ignoreDuplicateRegistrations: !0 })
      }
      function de(r, t) {
        var e = 'std::string' === (t = qr(t))
        Nr(r, {
          name: t,
          fromWireType: function (r) {
            var t,
              n = U[r >> 2]
            if (e)
              for (var o = r + 4, i = 0; i <= n; ++i) {
                var a = r + 4 + i
                if (i == n || 0 == R[a]) {
                  var u = W(o, a - o)
                  void 0 === t ? (t = u) : ((t += String.fromCharCode(0)), (t += u)), (o = a + 1)
                }
              }
            else {
              var s = new Array(n)
              for (i = 0; i < n; ++i) s[i] = String.fromCharCode(R[r + 4 + i])
              t = s.join('')
            }
            return Je(r), t
          },
          toWireType: function (r, t) {
            t instanceof ArrayBuffer && (t = new Uint8Array(t))
            var n = 'string' == typeof t
            n || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int8Array || zr('Cannot pass non-string to std::string')
            var o = (
                e && n
                  ? function () {
                      return k(t)
                    }
                  : function () {
                      return t.length
                    }
              )(),
              i = Xe(4 + o + 1)
            if (((U[i >> 2] = o), e && n)) F(t, i + 4, o + 1)
            else if (n)
              for (var a = 0; a < o; ++a) {
                var u = t.charCodeAt(a)
                u > 255 && (Je(i), zr('String has UTF-16 code units that do not fit in 8 bits')), (R[i + 4 + a] = u)
              }
            else for (a = 0; a < o; ++a) R[i + 4 + a] = t[a]
            return null !== r && r.push(Je, i), i
          },
          argPackAdvance: 8,
          readValueFromPointer: _r,
          destructorFunction: function (r) {
            Je(r)
          }
        })
      }
      function he(r, t, e) {
        var n, o, i, a, u
        ;(e = qr(e)),
          2 === t
            ? ((n = q),
              (o = H),
              (a = z),
              (i = function () {
                return I
              }),
              (u = 1))
            : 4 === t &&
              ((n = N),
              (o = G),
              (a = L),
              (i = function () {
                return U
              }),
              (u = 2)),
          Nr(r, {
            name: e,
            fromWireType: function (r) {
              for (var e, o = U[r >> 2], a = i(), s = r + 4, c = 0; c <= o; ++c) {
                var f = r + 4 + c * t
                if (c == o || 0 == a[f >> u]) {
                  var l = n(s, f - s)
                  void 0 === e ? (e = l) : ((e += String.fromCharCode(0)), (e += l)), (s = f + t)
                }
              }
              return Je(r), e
            },
            toWireType: function (r, n) {
              'string' != typeof n && zr('Cannot pass non-string to C++ string type ' + e)
              var i = a(n),
                s = Xe(4 + i + t)
              return (U[s >> 2] = i >> u), o(n, s + 4, i + t), null !== r && r.push(Je, s), s
            },
            argPackAdvance: 8,
            readValueFromPointer: _r,
            destructorFunction: function (r) {
              Je(r)
            }
          })
      }
      function ve(r, t, e, n, o, i) {
        Pr[r] = { name: qr(t), rawConstructor: Dt(e, n), rawDestructor: Dt(o, i), fields: [] }
      }
      function ye(r, t, e, n, o, i, a, u, s, c) {
        Pr[r].fields.push({
          fieldName: qr(t),
          getterReturnType: e,
          getter: Dt(n, o),
          getterContext: i,
          setterArgumentType: a,
          setter: Dt(u, s),
          setterContext: c
        })
      }
      function me(r, t) {
        Nr(r, { isVoid: !0, name: (t = qr(t)), argPackAdvance: 0, fromWireType: function () {}, toWireType: function (r, t) {} })
      }
      function ge(r) {
        return r || zr('Cannot use deleted val. handle = ' + r), Jt[r].value
      }
      function we(r, t, e) {
        ;(r = ge(r)), (t = oe(t, 'emval::as'))
        var n = [],
          o = re(n)
        return (D[e >> 2] = o), t.toWireType(n, r)
      }
      var Te = {}
      function be(r) {
        var t = Te[r]
        return void 0 === t ? qr(r) : t
      }
      var Ce = []
      function $e(r, t, e, n) {
        ;(r = Ce[r])((t = ge(t)), (e = be(e)), null, n)
      }
      function Pe() {
        return 'object' == typeof globalThis ? globalThis : Function('return this')()
      }
      function Ae(r) {
        return 0 === r ? re(Pe()) : ((r = be(r)), re(Pe()[r]))
      }
      function _e(r) {
        var t = Ce.length
        return Ce.push(r), t
      }
      function Se(r, t) {
        for (var e = new Array(r), n = 0; n < r; ++n) e[n] = oe(D[(t >> 2) + n], 'parameter ' + n)
        return e
      }
      function We(r, t) {
        for (
          var e = Se(r, t),
            n = e[0],
            o =
              n.name +
              '_$' +
              e
                .slice(1)
                .map(function (r) {
                  return r.name
                })
                .join('_') +
              '$',
            i = ['retType'],
            a = [n],
            u = '',
            s = 0;
          s < r - 1;
          ++s
        )
          (u += (0 !== s ? ', ' : '') + 'arg' + s), i.push('argType' + s), a.push(e[1 + s])
        var c = 'return function ' + Or('methodCaller_' + o) + '(handle, name, destructors, args) {\n',
          f = 0
        for (s = 0; s < r - 1; ++s)
          (c += '    var arg' + s + ' = argType' + s + '.readValueFromPointer(args' + (f ? '+' + f : '') + ');\n'), (f += e[s + 1].argPackAdvance)
        c += '    var rv = handle[name](' + u + ');\n'
        for (s = 0; s < r - 1; ++s) e[s + 1].deleteObject && (c += '    argType' + s + '.deleteObject(arg' + s + ');\n')
        return n.isVoid || (c += '    return retType.toWireType(destructors, rv);\n'), (c += '};\n'), i.push(c), _e(zt(Function, i).apply(null, a))
      }
      function Ee(r) {
        return (r = be(r)), re(o[r])
      }
      function Fe(r, t) {
        return re((r = ge(r))[(t = ge(t))])
      }
      function ke(r) {
        r > 4 && (Jt[r].refcount += 1)
      }
      function Oe(r) {
        for (var t = '', e = 0; e < r; ++e) t += (0 !== e ? ', ' : '') + 'arg' + e
        var n = 'return function emval_allocator_' + r + '(constructor, argTypes, args) {\n'
        for (e = 0; e < r; ++e)
          n +=
            'var argType' +
            e +
            " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " +
            e +
            '], "parameter ' +
            e +
            '");\nvar arg' +
            e +
            ' = argType' +
            e +
            '.readValueFromPointer(args);\nargs += argType' +
            e +
            "['argPackAdvance'];\n"
        return (
          (n += 'var obj = new constructor(' + t + ');\nreturn __emval_register(obj);\n}\n'),
          new Function('requireRegisteredType', 'Module', '__emval_register', n)(oe, o, re)
        )
      }
      var je = {}
      function Re(r, t, e, n) {
        r = ge(r)
        var o = je[t]
        return o || ((o = Oe(t)), (je[t] = o)), o(r, e, n)
      }
      function xe(r) {
        return re(be(r))
      }
      function Ie(r) {
        Ar(Jt[r].value), Kt(r)
      }
      function De() {
        dr()
      }
      function Ue(r, t, e) {
        R.copyWithin(r, t, t + e)
      }
      function Be(r) {
        try {
          return $.grow((r - O.byteLength + 65535) >>> 16), J($.buffer), 1
        } catch (r) {}
      }
      function Me(r) {
        var t = R.length,
          e = 2147483648
        if ((r >>>= 0) > e) return !1
        for (var n = 1; n <= 4; n *= 2) {
          var o = t * (1 + 0.2 / n)
          if (((o = Math.min(o, r + 100663296)), Be(Math.min(e, X(Math.max(r, o), 65536))))) return !0
        }
        return !1
      }
      var Ve = {
        mappings: {},
        buffers: [null, [], []],
        printChar: function (r, t) {
          var e = Ve.buffers[r]
          0 === t || 10 === t ? ((1 === r ? w : T)(S(e, 0)), (e.length = 0)) : e.push(t)
        },
        varargs: void 0,
        get: function () {
          return (Ve.varargs += 4), D[(Ve.varargs - 4) >> 2]
        },
        getStr: function (r) {
          return W(r)
        },
        get64: function (r, t) {
          return r
        }
      }
      function qe(r) {
        return 0
      }
      function He(r, t, e, n, o) {}
      function ze(r, t, e, n) {
        for (var o = 0, i = 0; i < e; i++) {
          for (var a = D[(t + 8 * i) >> 2], u = D[(t + (8 * i + 4)) >> 2], s = 0; s < u; s++) Ve.printChar(r, R[a + s])
          o += u
        }
        return (D[n >> 2] = o), 0
      }
      function Ne(r) {
        C(0 | r)
      }
      ;(xr = o.InternalError = Rr(Error, 'InternalError')),
        Mr(),
        (Hr = o.BindingError = Rr(Error, 'BindingError')),
        st(),
        kt(),
        At(),
        (Ut = o.UnboundTypeError = Rr(Error, 'UnboundTypeError')),
        Zt()
      var Ge,
        Le = {
          t: Ur,
          I: Gr,
          x: Vt,
          w: Ht,
          d: Gt,
          k: Lt,
          H: te,
          n: ne,
          a: ie,
          A: se,
          i: ce,
          j: le,
          h: pe,
          B: de,
          v: he,
          u: ve,
          c: ye,
          J: me,
          m: we,
          s: $e,
          b: Kt,
          y: Ae,
          p: We,
          r: Ee,
          e: Fe,
          g: ke,
          q: Re,
          f: xe,
          l: Ie,
          o: De,
          E: Ue,
          F: Me,
          G: qe,
          C: He,
          z: ze,
          D: Ne
        },
        Xe =
          (Cr(),
          (o.___wasm_call_ctors = function () {
            return (o.___wasm_call_ctors = o.asm.L).apply(null, arguments)
          }),
          (o._malloc = function () {
            return (Xe = o._malloc = o.asm.M).apply(null, arguments)
          })),
        Je = (o._free = function () {
          return (Je = o._free = o.asm.N).apply(null, arguments)
        }),
        Ke = (o.___getTypeName = function () {
          return (Ke = o.___getTypeName = o.asm.P).apply(null, arguments)
        })
      ;(o.___embind_register_native_and_builtin_types = function () {
        return (o.___embind_register_native_and_builtin_types = o.asm.Q).apply(null, arguments)
      }),
        (o.dynCall_jiji = function () {
          return (o.dynCall_jiji = o.asm.R).apply(null, arguments)
        })
      function Qe(r) {
        ;(this.name = 'ExitStatus'), (this.message = 'Program terminated with exit(' + r + ')'), (this.status = r)
      }
      function Ye(r) {
        function t() {
          Ge || ((Ge = !0), (o.calledRun = !0), P || (er(), nr(), e(o), o.onRuntimeInitialized && o.onRuntimeInitialized(), or()))
        }
        ;(r = r || u),
          sr > 0 ||
            (tr(),
            sr > 0 ||
              (o.setStatus
                ? (o.setStatus('Running...'),
                  setTimeout(function () {
                    setTimeout(function () {
                      o.setStatus('')
                    }, 1),
                      t()
                  }, 1))
                : t()))
      }
      if (
        ((fr = function r() {
          Ge || Ye(), Ge || (fr = r)
        }),
        (o.run = Ye),
        o.preInit)
      )
        for ('function' == typeof o.preInit && (o.preInit = [o.preInit]); o.preInit.length > 0; ) o.preInit.pop()()
      return Ye(), t.ready
    }
  )
})()
'object' == typeof exports && 'object' == typeof module
  ? (module.exports = BASIS)
  : 'function' == typeof define && define.amd
  ? define([], function () {
      return BASIS
    })
  : 'object' == typeof exports && (exports.BASIS = BASIS)
