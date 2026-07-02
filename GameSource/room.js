/*No changes*/
_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
    [15],
    {
        "+qE3": function (t, e, n) {
            "use strict";
            var a,
                i = "object" === typeof Reflect ? Reflect : null,
                o =
                    i && "function" === typeof i.apply
                        ? i.apply
                        : function (t, e, n) {
                              return Function.prototype.apply.call(t, e, n);
                          };
            a =
                i && "function" === typeof i.ownKeys
                    ? i.ownKeys
                    : Object.getOwnPropertySymbols
                    ? function (t) {
                          return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
                      }
                    : function (t) {
                          return Object.getOwnPropertyNames(t);
                      };
            var s =
                Number.isNaN ||
                function (t) {
                    return t !== t;
                };
            function r() {
                r.init.call(this);
            }
            (t.exports = r), (r.EventEmitter = r), (r.prototype._events = void 0), (r.prototype._eventsCount = 0), (r.prototype._maxListeners = void 0);
            var c = 10;
            function l(t) {
                if ("function" !== typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
            }
            function u(t) {
                return void 0 === t._maxListeners ? r.defaultMaxListeners : t._maxListeners;
            }
            function h(t, e, n, a) {
                var i, o, s, r;
                if (
                    (l(n),
                    void 0 === (o = t._events) ? ((o = t._events = Object.create(null)), (t._eventsCount = 0)) : (void 0 !== o.newListener && (t.emit("newListener", e, n.listener ? n.listener : n), (o = t._events)), (s = o[e])),
                    void 0 === s)
                )
                    (s = o[e] = n), ++t._eventsCount;
                else if (("function" === typeof s ? (s = o[e] = a ? [n, s] : [s, n]) : a ? s.unshift(n) : s.push(n), (i = u(t)) > 0 && s.length > i && !s.warned)) {
                    s.warned = !0;
                    var c = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    (c.name = "MaxListenersExceededWarning"), (c.emitter = t), (c.type = e), (c.count = s.length), (r = c), console && console.warn && console.warn(r);
                }
                return t;
            }
            function f() {
                if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), (this.fired = !0), 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
            }
            function d(t, e, n) {
                var a = { fired: !1, wrapFn: void 0, target: t, type: e, listener: n },
                    i = f.bind(a);
                return (i.listener = n), (a.wrapFn = i), i;
            }
            function _(t, e, n) {
                var a = t._events;
                if (void 0 === a) return [];
                var i = a[e];
                return void 0 === i
                    ? []
                    : "function" === typeof i
                    ? n
                        ? [i.listener || i]
                        : [i]
                    : n
                    ? (function (t) {
                          for (var e = new Array(t.length), n = 0; n < e.length; ++n) e[n] = t[n].listener || t[n];
                          return e;
                      })(i)
                    : v(i, i.length);
            }
            function p(t) {
                var e = this._events;
                if (void 0 !== e) {
                    var n = e[t];
                    if ("function" === typeof n) return 1;
                    if (void 0 !== n) return n.length;
                }
                return 0;
            }
            function v(t, e) {
                for (var n = new Array(e), a = 0; a < e; ++a) n[a] = t[a];
                return n;
            }
            Object.defineProperty(r, "defaultMaxListeners", {
                enumerable: !0,
                get: function () {
                    return c;
                },
                set: function (t) {
                    if ("number" !== typeof t || t < 0 || s(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
                    c = t;
                },
            }),
                (r.init = function () {
                    (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) || ((this._events = Object.create(null)), (this._eventsCount = 0)), (this._maxListeners = this._maxListeners || void 0);
                }),
                (r.prototype.setMaxListeners = function (t) {
                    if ("number" !== typeof t || t < 0 || s(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
                    return (this._maxListeners = t), this;
                }),
                (r.prototype.getMaxListeners = function () {
                    return u(this);
                }),
                (r.prototype.emit = function (t) {
                    for (var e = [], n = 1; n < arguments.length; n++) e.push(arguments[n]);
                    var a = "error" === t,
                        i = this._events;
                    if (void 0 !== i) a = a && void 0 === i.error;
                    else if (!a) return !1;
                    if (a) {
                        var s;
                        if ((e.length > 0 && (s = e[0]), s instanceof Error)) throw s;
                        var r = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                        throw ((r.context = s), r);
                    }
                    var c = i[t];
                    if (void 0 === c) return !1;
                    if ("function" === typeof c) o(c, this, e);
                    else {
                        var l = c.length,
                            u = v(c, l);
                        for (n = 0; n < l; ++n) o(u[n], this, e);
                    }
                    return !0;
                }),
                (r.prototype.addListener = function (t, e) {
                    return h(this, t, e, !1);
                }),
                (r.prototype.on = r.prototype.addListener),
                (r.prototype.prependListener = function (t, e) {
                    return h(this, t, e, !0);
                }),
                (r.prototype.once = function (t, e) {
                    return l(e), this.on(t, d(this, t, e)), this;
                }),
                (r.prototype.prependOnceListener = function (t, e) {
                    return l(e), this.prependListener(t, d(this, t, e)), this;
                }),
                (r.prototype.removeListener = function (t, e) {
                    var n, a, i, o, s;
                    if ((l(e), void 0 === (a = this._events))) return this;
                    if (void 0 === (n = a[t])) return this;
                    if (n === e || n.listener === e) 0 === --this._eventsCount ? (this._events = Object.create(null)) : (delete a[t], a.removeListener && this.emit("removeListener", t, n.listener || e));
                    else if ("function" !== typeof n) {
                        for (i = -1, o = n.length - 1; o >= 0; o--)
                            if (n[o] === e || n[o].listener === e) {
                                (s = n[o].listener), (i = o);
                                break;
                            }
                        if (i < 0) return this;
                        0 === i
                            ? n.shift()
                            : (function (t, e) {
                                  for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                                  t.pop();
                              })(n, i),
                            1 === n.length && (a[t] = n[0]),
                            void 0 !== a.removeListener && this.emit("removeListener", t, s || e);
                    }
                    return this;
                }),
                (r.prototype.off = r.prototype.removeListener),
                (r.prototype.removeAllListeners = function (t) {
                    var e, n, a;
                    if (void 0 === (n = this._events)) return this;
                    if (void 0 === n.removeListener)
                        return 0 === arguments.length ? ((this._events = Object.create(null)), (this._eventsCount = 0)) : void 0 !== n[t] && (0 === --this._eventsCount ? (this._events = Object.create(null)) : delete n[t]), this;
                    if (0 === arguments.length) {
                        var i,
                            o = Object.keys(n);
                        for (a = 0; a < o.length; ++a) "removeListener" !== (i = o[a]) && this.removeAllListeners(i);
                        return this.removeAllListeners("removeListener"), (this._events = Object.create(null)), (this._eventsCount = 0), this;
                    }
                    if ("function" === typeof (e = n[t])) this.removeListener(t, e);
                    else if (void 0 !== e) for (a = e.length - 1; a >= 0; a--) this.removeListener(t, e[a]);
                    return this;
                }),
                (r.prototype.listeners = function (t) {
                    return _(this, t, !0);
                }),
                (r.prototype.rawListeners = function (t) {
                    return _(this, t, !1);
                }),
                (r.listenerCount = function (t, e) {
                    return "function" === typeof t.listenerCount ? t.listenerCount(e) : p.call(t, e);
                }),
                (r.prototype.listenerCount = p),
                (r.prototype.eventNames = function () {
                    return this._eventsCount > 0 ? a(this._events) : [];
                });
        },
        "1B+e": function (t, e, n) {
            "use strict";
            n.r(e);
            var a = n("s4An");
            function i() {
                if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" === typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                } catch (t) {
                    return !1;
                }
            }
            function o(t, e, n) {
                return (o = i()
                    ? Reflect.construct
                    : function (t, e, n) {
                          var i = [null];
                          i.push.apply(i, e);
                          var o = new (Function.bind.apply(t, i))();
                          return n && Object(a.a)(o, n.prototype), o;
                      }).apply(null, arguments);
            }
            var s = n("KQm4"),
                r = n("1OyB"),
                c = n("vuIU"),
                l = n("JX7q"),
                u = n("Ji7U"),
                h = n("md7G"),
                f = n("foSv"),
                d = n("rePB"),
                _ = n("q1tI"),
                p = n.n(_),
                v = n("g4pe"),
                m = n.n(v),
                y = n("20a2"),
                g = n.n(y),
                b = n("pvp9");
            function O(t, e, n) {
                return (O =
                    "undefined" !== typeof Reflect && Reflect.get
                        ? Reflect.get
                        : function (t, e, n) {
                              var a = (function (t, e) {
                                  for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = Object(f.a)(t)); );
                                  return t;
                              })(t, e);
                              if (a) {
                                  var i = Object.getOwnPropertyDescriptor(a, e);
                                  return i.get ? i.get.call(n) : i.value;
                              }
                          })(t, e, n || t);
            }
            var k = n("+qE3"),
                w = n.n(k);
            function j(t, e) {
                var n;
                if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
                    if (
                        Array.isArray(t) ||
                        (n = (function (t, e) {
                            if (!t) return;
                            if ("string" === typeof t) return R(t, e);
                            var n = Object.prototype.toString.call(t).slice(8, -1);
                            "Object" === n && t.constructor && (n = t.constructor.name);
                            if ("Map" === n || "Set" === n) return Array.from(t);
                            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return R(t, e);
                        })(t)) ||
                        (e && t && "number" === typeof t.length)
                    ) {
                        n && (t = n);
                        var a = 0,
                            i = function () {};
                        return {
                            s: i,
                            n: function () {
                                return a >= t.length ? { done: !0 } : { done: !1, value: t[a++] };
                            },
                            e: function (t) {
                                throw t;
                            },
                            f: i,
                        };
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                var o,
                    s = !0,
                    r = !1;
                return {
                    s: function () {
                        n = t[Symbol.iterator]();
                    },
                    n: function () {
                        var t = n.next();
                        return (s = t.done), t;
                    },
                    e: function (t) {
                        (r = !0), (o = t);
                    },
                    f: function () {
                        try {
                            s || null == n.return || n.return();
                        } finally {
                            if (r) throw o;
                        }
                    },
                };
            }
            function R(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
                return a;
            }
            function E(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var N = (function (t) {
                Object(u.a)(n, t);
                var e = E(n);
                function n(t, a, i, o, c, u, h, f) {
                    var _;
                    return (
                        Object(r.a)(this, n),
                        (_ = e.call(this)),
                        Object(d.a)(Object(l.a)(_), "reportWord", function (t) {
                            _._socket.emit(44, _._codigo, t);
                        }),
                        (_._socket = t),
                        (_._id = a),
                        (_._codigo = i),
                        (_._salaId = o),
                        (_._dadosSala = c),
                        (_._usuarios = Object(s.a)(u)),
                        (_._dono = h),
                        (_._visitante = f),
                        _
                    );
                }
                return (
                    Object(c.a)(n, [
                        {
                            key: "init",
                            value: function (t) {
                                var e = this;
                                (this._player = t),
                                    (this._desenho = t.desenho),
                                    (this._ativo = Date.now()),
                                    (this._proprio = null),
                                    (this._vez = !1),
                                    (this._palavra = ""),
                                    (this._dicasNum = 0),
                                    (this._palavrasSorteio = [
                                        { palavra: "", dicas: 0 },
                                        { palavra: "", dicas: 0 },
                                    ]),
                                    (this._inicioVez = !1),
                                    (this._desenhistaVez = null),
                                    (this._acertaram = !1),
                                    (this._listaUsuarios = []),
                                    (this._dadosDesenho = ""),
                                    (this._seqDesenho = ""),
                                    (this._floodMsg = ["", ""]),
                                    (this._floodResp = ["", ""]),
                                    (this._numConversaPend = 0),
                                    (this._jogadoresOrdem = 0),
                                    (this._inicioJogo = !1),
                                    (this._denunciaLista = []),
                                    (this._historico = !0),
                                    (this._tempoInicio = 0),
                                    (this._tempoDesconto = 0),
                                    (this._tempoVotekick = 0),
                                    (this._estado = n.WAITING),
                                    this._desenho.on("codigo", function (t) {
                                        e._vez && e._socket.emit(10, e._codigo, t);
                                    }),
                                    (this._timerAtivo = setInterval(function () {
                                        Date.now() - e._ativo > 15e4 && e.active();
                                    }, 1e3));
                                var a,
                                    i = j(this._usuarios);
                                try {
                                    for (i.s(); !(a = i.n()).done; ) {
                                        var o = a.value;
                                        (o.pontos -= o.pontosRodada), o.id == this._id && (this._proprio = o);
                                    }
                                } catch (s) {
                                    i.e(s);
                                } finally {
                                    i.f();
                                }
                                this._ordenarUsuarios(), O(Object(f.a)(n.prototype), "emit", this).call(this, "iniciado", this._usuarios), this._news();
                            },
                        },
                        {
                            key: "active",
                            value: function () {
                                (this._ativo = Date.now()), this._socket.emit(42, this._codigo);
                            },
                        },
                        {
                            key: "start",
                            value: function () {
                                (this._ativo = Date.now()), this._socket.emit(41, this._codigo);
                            },
                        },
                        {
                            key: "message",
                            value: function (t) {
                                return (
                                    (t != this._floodMsg[0] || t != this._floodMsg[1]) &&
                                    ((this._ativo = Date.now()),
                                    this._floodMsg.shift(),
                                    this._floodMsg.push(t),
                                    this._socket.emit(11, this._codigo, window.kawaiiHelper && window.kawaiiHelper.elements.chatBypassCensorship.checked ? t.split("").join("​​​") : t),
                                    !0)
                                );
                            },
                        },
                        {
                            key: "answer",
                            value: function (t) {
                                return (t != this._floodResp[0] || t != this._floodResp[1]) && ((this._ativo = Date.now()), this._floodResp.shift(), this._floodResp.push(t), this._socket.emit(13, this._codigo, t), !0);
                            },
                        },
                        {
                            key: "undo",
                            value: function () {
                                return !(!this._vez || !this._desenho.desfazer()) && ((this._ativo = Date.now()), this._socket.emit(36, this._codigo), O(Object(f.a)(n.prototype), "emit", this).call(this, "undo"), !0);
                            },
                        },
                        {
                            key: "redo",
                            value: function () {
                                return !(!this._vez || !this._desenho.refazer()) && ((this._ativo = Date.now()), this._socket.emit(37, this._codigo), O(Object(f.a)(n.prototype), "emit", this).call(this, "redo"), !0);
                            },
                        },
                        {
                            key: "report",
                            value: function () {
                                return !this._vez && ((this._ativo = Date.now()), this._socket.emit(35, this._codigo), !0);
                            },
                        },
                        {
                            key: "cancel",
                            value: function () {
                                this._opcoes.admin && this._socket.emit(38, this._codigo);
                            },
                        },
                        {
                            key: "draw",
                            value: function (t) {
                                return !!this._vez && ((this._ativo = Date.now()), this._socket.emit(34, this._codigo, t), !0);
                            },
                        },
                        {
                            key: "hint",
                            value: function () {
                                return !(!this._vez || this._acertaram) && ((this._ativo = Date.now()), this._socket.emit(30, this._codigo), !0);
                            },
                        },
                        {
                            key: "skip",
                            value: function () {
                                return !(!this._vez || this._acertaram) && ((this._ativo = Date.now()), this._socket.emit(25, this._codigo), !0);
                            },
                        },
                        {
                            key: "kick",
                            value: function (t) {
                                return !(!this._dono && !this._opcoes.admin) && ((this._ativo = Date.now()), this._socket.emit(39, this._codigo, t), !0);
                            },
                        },
                        {
                            key: "votekick",
                            value: function (t, e) {
                                var a = this._getUser(t);
                                if (a) {
                                    if (e && Date.now() - this._tempoVotekick < 6e4 && (!window.kawaiiHelper || !window.kawaiiHelper.elements.noKickCooldownCheckbox || !window.kawaiiHelper.elements.noKickCooldownCheckbox.checked))
                                        return !1;
                                    a.votekick = e;
                                    this._socket.emit(45, this._codigo, [t, e]);
                                    O(Object(f.a)(n.prototype), "emit", this).call(this, "votar", a, e);
                                    if (!window.kawaiiHelper || !window.kawaiiHelper.elements.noKickCooldownCheckbox || !window.kawaiiHelper.elements.noKickCooldownCheckbox.checked) {
                                        this._tempoVotekick = Date.now();
                                    }
                                    return !0;
                                }
                                return !1;
                            },
                        },
                        {
                            key: "ignore",
                            value: function (t, e) {
                                var a = this._getUser(t);
                                a && ((a.ignorado = e), O(Object(f.a)(n.prototype), "emit", this).call(this, "ignorar", a, e));
                            },
                        },
                        {
                            key: "exit",
                            value: function () {
                                this._socket.emit(24, this._codigo);
                            },
                        },
                        {
                            key: "unlock",
                            value: function () {
                                this._socket.emit(46, this._codigo);
                            },
                        },
                        {
                            key: "_confPadrao",
                            value: function () {
                                this._desenho.mudaOpcao(0), this._desenho.mudaCor("x000000"), this._desenho.mudaBorda(4), this._desenho.mudaAlpha(1);
                            },
                        },
                        {
                            key: "_getUser",
                            value: function (t) {
                                return this._usuarios.find(function (e) {
                                    return e.id == t;
                                });
                            },
                        },
                        {
                            key: "_ordenarUsuarios",
                            value: function () {
                                this._usuarios.sort(function (t, e) {
                                    return t.pontos != e.pontos ? e.pontos - t.pontos : t.entrada - e.entrada;
                                });
                            },
                        },
                        {
                            key: "_removerProximos",
                            value: function () {
                                var t,
                                    e = j(this._usuarios);
                                try {
                                    for (e.s(); !(t = e.n()).done; ) {
                                        delete t.value.proximo;
                                    }
                                } catch (n) {
                                    e.e(n);
                                } finally {
                                    e.f();
                                }
                            },
                        },
                        {
                            key: "_calcularProximos",
                            value: function () {
                                this._removerProximos();
                                var t = this._usuarios.slice();
                                t.sort(function (t, e) {
                                    return t.turno - e.turno;
                                }),
                                    (t = t.slice(0, 3));
                                for (var e = 0; e < t.length; e++) t[e].proximo = e;
                                return t;
                            },
                        },
                        {
                            key: "_zerarPontos",
                            value: function () {
                                if (this._estado == n.END) {
                                    var t,
                                        e = j(this._usuarios);
                                    try {
                                        for (e.s(); !(t = e.n()).done; ) {
                                            t.value.pontos = 0;
                                        }
                                    } catch (a) {
                                        e.e(a);
                                    } finally {
                                        e.f();
                                    }
                                    O(Object(f.a)(n.prototype), "emit", this).call(this, "zerarPontos");
                                }
                            },
                        },
                        {
                            key: "_news",
                            value: function () {
                                var t = this;
                                this._socket.on("reconnect", function () {
                                    O(Object(f.a)(n.prototype), "emit", t).call(t, "reset");
                                    window.game = e;
                                }),
                                    this._socket.on(43, function (e) {
                                        (t._tempoInicio = Date.now() - e), (t._historico = !1), (t._proprio = t._getUser(t._id)), t._player.terminar(), O(Object(f.a)(n.prototype), "emit", t).call(t, "fimHistorico");
                                    }),
                                    this._socket.on(10, function (e) {
                                        t._player.registrar(e);
                                    }),
                                    this._socket.on(36, function () {
                                        t._player.registrar([31, 0]);
                                    }),
                                    this._socket.on(37, function () {
                                        t._player.registrar([31, 1]);
                                    }),
                                    this._socket.on(11, function (e, a) {
                                        var i = t._getUser(e);
                                        i.ignorado || O(Object(f.a)(n.prototype), "emit", t).call(t, "chat", a, i);
                                    }),
                                    this._socket.on(13, function (e, a) {
                                        var i = t._getUser(e);
                                        i.ignorado || O(Object(f.a)(n.prototype), "emit", t).call(t, "resposta", a, i);
                                    }),
                                    this._socket.on(15, function (e) {
                                        O(Object(f.a)(n.prototype), "emit", t).call(t, "perto", e);
                                    }),
                                    this._socket.on(16, function (e, a, i, o) {
                                        t._zerarPontos(),
                                            (t._estado = n.DRAWING),
                                            (t._tempoInicio = Date.now()),
                                            t._removerProximos(),
                                            (t._vez = !0),
                                            t._desenho.limparTela(!0, !0),
                                            t._confPadrao(),
                                            (t._inicioVez = !1),
                                            (t._desenhistaVez = t._proprio),
                                            (t._dadosDesenho = ""),
                                            (t._palavrasSorteio = [
                                                { palavra: e, dicas: a },
                                                { palavra: i, dicas: o },
                                            ]),
                                            (t._dicas = 0),
                                            O(Object(f.a)(n.prototype), "emit", t).call(t, "vez", e, a, i, o);
                                    }),
                                    this._socket.on(17, function (e) {
                                        t._zerarPontos(),
                                            (t._estado = n.DRAWING),
                                            (t._tempoInicio = Date.now()),
                                            t._removerProximos(),
                                            t._player.iniciar(),
                                            t._confPadrao(),
                                            t._desenho.salvarEstado(!0),
                                            (t._inicioVez = !1),
                                            (t._desenhistaVez = t._getUser(e)),
                                            (t._dadosDesenho = ""),
                                            (t._palavra = ""),
                                            O(Object(f.a)(n.prototype), "emit", t).call(t, "vezOutro", t._desenhistaVez);
                                    }),
                                    this._socket.on(19, function (e, a) {
                                        if (((t._tempoInicio = Date.now()), (t._tempoDesconto = 0), t._desenhistaVez && (t._desenhistaVez.turno = e), a)) t._estado = n.END;
                                        else {
                                            t._estado = n.INTERVAL;
                                            var i,
                                                o = j(t._usuarios);
                                            try {
                                                for (o.s(); !(i = o.n()).done; ) i.value.pontosRodada = 0;
                                            } catch (r) {
                                                o.e(r);
                                            } finally {
                                                o.f();
                                            }
                                        }
                                        var s = t._calcularProximos();
                                        t._desenho.liberar(!1),
                                            t._player.zerar(),
                                            (t._acertaram = !1),
                                            O(Object(f.a)(n.prototype), "emit", t).call(t, "fimRodada", a),
                                            O(Object(f.a)(n.prototype), "emit", t).call(t, "proximos", s),
                                            (t._vez = !1);
                                        if (window.kawaiiHelper) {
                                            window.kawaiiHelper.elements.guessPattern.value = "";
                                            window.kawaiiHelper.stopAutoGuess();
                                            window.kawaiiHelper.updateHitList("");
                                            if (window.kawaiiHelper.isDrawingActive) {
                                                window.kawaiiHelper.isDrawingActive = false;
                                                window.kawaiiHelper.elements.sendDraw.disabled = false;
                                            }
                                        }
                                    }),
                                    this._socket.on(18, function (e) {
                                        t._vez, O(Object(f.a)(n.prototype), "emit", t).call(t, "intervalo", e);
                                    }),
                                    this._socket.on(22, function (e, a) {
                                        t._vez;
                                        var i,
                                            o = [],
                                            s = j(e);
                                        try {
                                            for (s.s(); !(i = s.n()).done; ) {
                                                var r = i.value;
                                                o.push(t._getUser(r));
                                            }
                                        } catch (_) {
                                            s.e(_);
                                        } finally {
                                            s.f();
                                        }
                                        t._historico || o[0].vitorias++;
                                        var c = o[0].pontos;
                                        t._ordenarUsuarios();
                                        var l,
                                            u = 0,
                                            h = j(t._usuarios);
                                        try {
                                            for (h.s(); !(l = h.n()).done; ) {
                                                var d = l.value;
                                                (d.entrada = ++u), (d.pontosRodada = 0);
                                            }
                                        } catch (_) {
                                            h.e(_);
                                        } finally {
                                            h.f();
                                        }
                                        O(Object(f.a)(n.prototype), "emit", t).call(t, "intervalo", a), O(Object(f.a)(n.prototype), "emit", t).call(t, "fimJogo", o, c);
                                    }),
                                    this._socket.on(23, function (e) {
                                        t._usuarios.push(e), t._id == e && (t._proprio = e), O(Object(f.a)(n.prototype), "emit", t).call(t, "entrada", e);
                                    }),
                                    this._socket.on(24, function (e) {
                                        var a = t._getUser(e);
                                        a &&
                                            (t._usuarios.splice(t._usuarios.indexOf(a), 1),
                                            O(Object(f.a)(n.prototype), "emit", t).call(t, "saida", a),
                                            (t._estado != n.INTERVAL && t._estado != n.END) || O(Object(f.a)(n.prototype), "emit", t).call(t, "proximos", t._calcularProximos()));
                                    }),
                                    this._socket.on(25, function () {
                                        O(Object(f.a)(n.prototype), "emit", t).call(t, "pular", t._desenhistaVez);
                                    }),
                                    this._socket.on(26, function (e, a, i, o) {
                                        (t._proprio.pontos += a),
                                            (t._proprio.pontosRodada += a),
                                            (t._desenhistaVez.pontos += i),
                                            (t._desenhistaVez.pontosRodada += i),
                                            (t._tempoDesconto += o),
                                            t._ordenarUsuarios(),
                                            O(Object(f.a)(n.prototype), "emit", t).call(t, "acerto", e, a, i, o);
                                        if (window.kawaiiHelper) {
                                            window.kawaiiHelper.elements.guessPattern.value = "";
                                            window.kawaiiHelper.stopAutoGuess();
                                            window.kawaiiHelper.updateHitList("");
                                        }
                                    }),
                                    this._socket.on(27, function (e, a, i, o) {
                                        var s = t._getUser(e);
                                        (s.pontos += a),
                                            (s.pontosRodada += a),
                                            (t._desenhistaVez.pontos += i),
                                            (t._desenhistaVez.pontosRodada += i),
                                            (t._tempoDesconto += o),
                                            t._ordenarUsuarios(),
                                            O(Object(f.a)(n.prototype), "emit", t).call(t, "acertoOutro", s, a, i, o);
                                    }),
                                    this._socket.on(28, function (e) {
                                        O(Object(f.a)(n.prototype), "emit", t).call(t, "todosAcertaram", e);
                                    }),
                                    this._socket.on(29, function () {
                                        (t._acertaram = !0), O(Object(f.a)(n.prototype), "emit", t).call(t, "primeiroAcerto");
                                    }),
                                    this._socket.on(30, function (e, a) {
                                        (t._dicasNum = a), O(Object(f.a)(n.prototype), "emit", t).call(t, "dica", e, a);
                                        if (window.kawaiiHelper) {
                                            e = String(e).replace(/,/g, "");
                                            window.kawaiiHelper.elements.guessPattern.value = e;
                                            window.kawaiiHelper.updateHitList(e);
                                            if (window.kawaiiHelper.elements.autoGuessCheckbox.checked) window.kawaiiHelper.startAutoGuess();
                                        }
                                    }),
                                    this._socket.on(35, function (e) {
                                        O(Object(f.a)(n.prototype), "emit", t).call(t, "denuncia", t._getUser(e));
                                    }),
                                    this._socket.on(45, function (e, a, i) {
                                        var o = t._getUser(e),
                                            s = t._getUser(a);
                                        o && s && O(Object(f.a)(n.prototype), "emit", t).call(t, "votekick", o, s, i);
                                    }),
                                    this._socket.on(38, function () {
                                        var e,
                                            a = j(t._usuarios);
                                        try {
                                            for (a.s(); !(e = a.n()).done; ) {
                                                var i = e.value;
                                                i.pontos -= i.pontosRodada;
                                            }
                                        } catch (o) {
                                            a.e(o);
                                        } finally {
                                            a.f();
                                        }
                                        t._ordenarUsuarios(), O(Object(f.a)(n.prototype), "emit", t).call(t, "cancelar");
                                    }),
                                    this._socket.on(32, function () {
                                        O(Object(f.a)(n.prototype), "emit", t).call(t, "inativo");
                                    }),
                                    this._socket.on(33, function (e) {
                                        (t._estado = e ? n.LOBBY : n.WAITING), t._removerProximos(), (t._vez = !1), t._desenho.liberar(!1), t._player.zerar();
                                        var a,
                                            i = j(t._usuarios);
                                        try {
                                            for (i.s(); !(a = i.n()).done; ) {
                                                var o = a.value;
                                                (o.pontos = 0), (o.pontosRodada = 0);
                                            }
                                        } catch (s) {
                                            i.e(s);
                                        } finally {
                                            i.f();
                                        }
                                        t._ordenarUsuarios(), O(Object(f.a)(n.prototype), "emit", t).call(t, "aguardando", e);
                                    }),
                                    this._socket.on(34, function (e, a) {
                                        t._inicioVez || ((t._inicioVez = !0), (t._palavra = e), (t._dicasNum = a), t._desenho.liberar(!0), O(Object(f.a)(n.prototype), "emit", t).call(t, "inicioVez", e, a));
                                    }),
                                    this._socket.on(47, function () {
                                        t._inicioVez || ((t._inicioVez = !0), O(Object(f.a)(n.prototype), "emit", t).call(t, "inicioVezOutro"));
                                    }),
                                    this._socket.on(40, function (e) {
                                        switch (e) {
                                            case 1:
                                                O(Object(f.a)(n.prototype), "emit", t).call(t, "ofensaChat");
                                                break;
                                            case 2:
                                                O(Object(f.a)(n.prototype), "emit", t).call(t, "respostaChat");
                                                break;
                                            case 3:
                                                O(Object(f.a)(n.prototype), "emit", t).call(t, "ofensaResposta");
                                                break;
                                            case 4:
                                                O(Object(f.a)(n.prototype), "emit", t).call(t, "avisoAdmin");
                                        }
                                    });
                            },
                        },
                        {
                            key: "destroy",
                            value: function () {
                                this._socket.removeAllListeners(43),
                                    this._socket.removeAllListeners(10),
                                    this._socket.removeAllListeners(36),
                                    this._socket.removeAllListeners(37),
                                    this._socket.removeAllListeners(11),
                                    this._socket.removeAllListeners(13),
                                    this._socket.removeAllListeners(15),
                                    this._socket.removeAllListeners(16),
                                    this._socket.removeAllListeners(17),
                                    this._socket.removeAllListeners(19),
                                    this._socket.removeAllListeners(18),
                                    this._socket.removeAllListeners(22),
                                    this._socket.removeAllListeners(23),
                                    this._socket.removeAllListeners(24),
                                    this._socket.removeAllListeners(25),
                                    this._socket.removeAllListeners(26),
                                    this._socket.removeAllListeners(27),
                                    this._socket.removeAllListeners(28),
                                    this._socket.removeAllListeners(29),
                                    this._socket.removeAllListeners(30),
                                    this._socket.removeAllListeners(35),
                                    this._socket.removeAllListeners(45),
                                    this._socket.removeAllListeners(38),
                                    this._socket.removeAllListeners(32),
                                    this._socket.removeAllListeners(33),
                                    this._socket.removeAllListeners(34),
                                    this._socket.removeAllListeners(40),
                                    clearInterval(this._timerAtivo);
                            },
                        },
                        {
                            key: "hits",
                            get: function () {
                                return this._acertaram;
                            },
                        },
                        {
                            key: "history",
                            get: function () {
                                return this._historico;
                            },
                        },
                        {
                            key: "userTurn",
                            get: function () {
                                return this._desenhistaVez;
                            },
                        },
                        {
                            key: "owner",
                            get: function () {
                                return this._dono;
                            },
                        },
                        {
                            key: "started",
                            get: function () {
                                return this._inicioVez;
                            },
                        },
                        {
                            key: "limit",
                            get: function () {
                                return this._dadosSala.limite;
                            },
                        },
                        {
                            key: "word",
                            get: function () {
                                return this._palavra;
                            },
                        },
                        {
                            key: "room",
                            get: function () {
                                return this._dadosSala.id;
                            },
                        },
                        {
                            key: "interval",
                            get: function () {
                                return this._estado == n.INTERVAL || this._estado == n.END;
                            },
                        },
                        {
                            key: "lobby",
                            get: function () {
                                return this._estado == n.LOBBY;
                            },
                        },
                        {
                            key: "me",
                            get: function () {
                                return this._proprio;
                            },
                        },
                        {
                            key: "goal",
                            get: function () {
                                return this._dadosSala.meta;
                            },
                        },
                        {
                            key: "subject",
                            get: function () {
                                return this._dadosSala.tipo;
                            },
                        },
                        {
                            key: "language",
                            get: function () {
                                return this._dadosSala.idioma;
                            },
                        },
                        {
                            key: "time",
                            get: function () {
                                var t = 0;
                                switch (this._estado) {
                                    case n.DRAWING:
                                        t = this._dadosSala.tempoRodada;
                                        break;
                                    case n.INTERVAL:
                                        t = this._dadosSala.tempoIntervalo;
                                        break;
                                    case n.END:
                                        t = 2 * this._dadosSala.tempoIntervalo;
                                }
                                return t;
                            },
                        },
                        {
                            key: "timeWasted",
                            get: function () {
                                return Date.now() + this._tempoDesconto - this._tempoInicio;
                            },
                        },
                        {
                            key: "timeInterval",
                            get: function () {
                                return this._dadosSala.tempoIntervalo;
                            },
                        },
                        {
                            key: "timeTurn",
                            get: function () {
                                return this._dadosSala.tempoRodada;
                            },
                        },
                        {
                            key: "users",
                            get: function () {
                                return this._usuarios;
                            },
                        },
                        {
                            key: "turn",
                            get: function () {
                                return this._vez;
                            },
                        },
                        {
                            key: "drawing",
                            get: function () {
                                return this._desenho;
                            },
                        },
                        {
                            key: "state",
                            get: function () {
                                return this._estado;
                            },
                        },
                        {
                            key: "created",
                            get: function () {
                                return this._dadosSala && this._dadosSala.codigo;
                            },
                        },
                        {
                            key: "official",
                            get: function () {
                                return this._dadosSala && this._dadosSala.oficial;
                            },
                        },
                        {
                            key: "photo",
                            get: function () {
                                return this._dadosSala && this._dadosSala.foto;
                            },
                        },
                        {
                            key: "viewer",
                            get: function () {
                                return this._visitante;
                            },
                        },
                        {
                            key: "roomId",
                            get: function () {
                                return this._salaId;
                            },
                        },
                    ]),
                    n
                );
            })(w.a);
            Object(d.a)(N, "DRAWING", 0), Object(d.a)(N, "INTERVAL", 1), Object(d.a)(N, "END", 2), Object(d.a)(N, "WAITING", 3), Object(d.a)(N, "LOBBY", 4);
            var S = N;
            function A(t, e) {
                var n;
                if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
                    if (
                        Array.isArray(t) ||
                        (n = (function (t, e) {
                            if (!t) return;
                            if ("string" === typeof t) return C(t, e);
                            var n = Object.prototype.toString.call(t).slice(8, -1);
                            "Object" === n && t.constructor && (n = t.constructor.name);
                            if ("Map" === n || "Set" === n) return Array.from(t);
                            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return C(t, e);
                        })(t)) ||
                        (e && t && "number" === typeof t.length)
                    ) {
                        n && (t = n);
                        var a = 0,
                            i = function () {};
                        return {
                            s: i,
                            n: function () {
                                return a >= t.length ? { done: !0 } : { done: !1, value: t[a++] };
                            },
                            e: function (t) {
                                throw t;
                            },
                            f: i,
                        };
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                var o,
                    s = !0,
                    r = !1;
                return {
                    s: function () {
                        n = t[Symbol.iterator]();
                    },
                    n: function () {
                        var t = n.next();
                        return (s = t.done), t;
                    },
                    e: function (t) {
                        (r = !0), (o = t);
                    },
                    f: function () {
                        try {
                            s || null == n.return || n.return();
                        } finally {
                            if (r) throw o;
                        }
                    },
                };
            }
            function C(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
                return a;
            }
            function T(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var I = (function (t) {
                Object(u.a)(n, t);
                var e = T(n);
                function n(t, a) {
                    var i;
                    return (
                        Object(r.a)(this, n),
                        ((i = e.call(this))._opcoes = Object.assign({ baldeFragmentado: !0 }, a)),
                        (i._desenho = t),
                        (i._fracao = 9),
                        (i._ativo = !1),
                        (i._partesDesenho = []),
                        (i._animacao = !1),
                        (i._contagem = 0),
                        (i._pendente = !1),
                        (i._cacheBalde = ""),
                        (i._direto = !1),
                        (i._removerDireto = !1),
                        i._ultimoTempo,
                        (i._dif = 0),
                        (i._posicao = 0),
                        i
                    );
                }
                return (
                    Object(c.a)(n, [
                        {
                            key: "registrar",
                            value: function (t) {
                                var e = this;
                                if ("string" != typeof t) this._partesDesenho.push(t);
                                else {
                                    var n,
                                        a = A(t.split("|"));
                                    try {
                                        for (a.s(); !(n = a.n()).done; ) {
                                            var i = n.value.split("@");
                                            if (2 == i.length) {
                                                var o = i[1].split("#");
                                                o.unshift(i[0]), this._partesDesenho.push(o);
                                            }
                                        }
                                    } catch (s) {
                                        a.e(s);
                                    } finally {
                                        a.f();
                                    }
                                }
                                this._ativo &&
                                    !this._animacao &&
                                    ((this._ultimoTempo = Date.now()),
                                    (this._animacao = requestAnimationFrame(function () {
                                        e._rotina();
                                    })));
                            },
                        },
                        {
                            key: "removerDireto",
                            value: function () {
                                this._removerDireto = !0;
                            },
                        },
                        {
                            key: "zerar",
                            value: function () {
                                this.parar(), (this._partesDesenho = []);
                            },
                        },
                        {
                            key: "iniciar",
                            value: function () {
                                var t = this;
                                O(Object(f.a)(n.prototype), "emit", this).call(this, "iniciar"),
                                    (this._ativo = !0),
                                    (this._ultimoTempo = Date.now()),
                                    (this._animacao = requestAnimationFrame(function () {
                                        t._rotina();
                                    }));
                            },
                        },
                        {
                            key: "pausar",
                            value: function () {
                                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                this._cancelarAnimacao(), (this._ativo = !1), t || O(Object(f.a)(n.prototype), "emit", this).call(this, "pausar");
                            },
                        },
                        {
                            key: "parar",
                            value: function () {
                                this.pausar(!0),
                                    this._desenho.limparTela(!1, !0),
                                    (this._posicao = 0),
                                    (this._contagem = 0),
                                    (this._dif = 0),
                                    (this._cacheBalde = ""),
                                    (this._pendente = !1),
                                    O(Object(f.a)(n.prototype), "emit", this).call(this, "parar");
                            },
                        },
                        {
                            key: "flush",
                            value: function () {
                                this._desenhar(this._pendente, 0, !0), (this._pendente = !1);
                            },
                        },
                        {
                            key: "terminar",
                            value: function () {
                                for (; this._passo(); );
                                this.flush();
                            },
                        },
                        {
                            key: "_cancelarAnimacao",
                            value: function () {
                                this._animacao && (cancelAnimationFrame(this._animacao), (this._animacao = !1));
                            },
                        },
                        {
                            key: "_rotina",
                            value: function () {
                                var t = this;
                                if (this._ativo) {
                                    for (this._dif += Date.now() - this._ultimoTempo; this._dif >= this._fracao; ) {
                                        if (!this._passo()) {
                                            (this._dif = this._dif % this._fracao), O(Object(f.a)(n.prototype), "emit", this).call(this, "fim");
                                            break;
                                        }
                                        this._dif -= this._fracao;
                                    }
                                    this._removerDireto && ((this._direto = !1), (this._removerDireto = !1)),
                                        this._ativo &&
                                            this._animacao &&
                                            ((this._ultimoTempo = Date.now()),
                                            (this._animacao = requestAnimationFrame(function () {
                                                t._rotina();
                                            })));
                                }
                            },
                        },
                        {
                            key: "_passo",
                            value: function () {
                                if (this._posicao < this._partesDesenho.length) {
                                    var t = this._partesDesenho[this._posicao];
                                    return (
                                        0 == this._contagem &&
                                        this._pendente &&
                                        t.length > 3 &&
                                        this._pendente.length > 3 &&
                                        2 == t[0] &&
                                        t[1] == this._pendente[this._pendente.length - 2] &&
                                        t[2] == this._pendente[this._pendente.length - 1]
                                            ? ((this._contagem = (this._pendente.length - 1) / 2 + 1),
                                              (t = this._pendente.concat(t.slice(3))),
                                              this._partesDesenho.splice(this._posicao--, 1),
                                              (this._partesDesenho[this._posicao] = t),
                                              (this._pendente = !1))
                                            : this._pendente && this.flush(),
                                        this._desenhar(t, this._contagem) ? (2 == t[0] ? (this._pendente = this._partesDesenho[this._posicao]) : (this._pendente = !1), this._posicao++, (this._contagem = 0)) : this._contagem++,
                                        (this._direto || 4 == t[0] || 5 == t[0] || 6 == t[0] || 27 == t[0] || (3 == t[0] && this._partesDesenho.length && 3 == this._partesDesenho[0][0])) && this._passo(),
                                        !0
                                    );
                                }
                                return this._cancelarAnimacao(), !1;
                            },
                        },
                        {
                            key: "_desenhar",
                            value: function (t, e, n) {
                                switch (parseInt(t[0])) {
                                    case 1:
                                        this._desenho.desenhar(parseInt(t[2]), parseInt(t[3]), parseInt(t[4]), parseInt(t[5]), parseInt(t[1]), 0, !1), this._desenho.salvarEstado(!1);
                                        break;
                                    case 2:
                                        var a = parseInt(t[1]),
                                            i = parseInt(t[2]),
                                            o = [[a, i]],
                                            s = [a, i, a, i],
                                            r = 3 + 2 * (e + 1);
                                        (r > t.length || n) && (r = t.length);
                                        for (var c = 3; c < r; c += 2) {
                                            var l = parseInt(t[c]),
                                                u = parseInt(t[c + 1]);
                                            l < s[0] ? (s[0] = l) : l > s[2] && (s[2] = l), u < s[1] ? (s[1] = u) : u > s[3] && (s[3] = u), o.push([l, u]);
                                        }
                                        if (e) {
                                            var h = this._desenho.borda,
                                                f = s[0] - h / 2,
                                                d = s[1] - h / 2,
                                                _ = s[2] - s[0] + h,
                                                p = s[3] - s[1] + h;
                                            this._desenho.limparTelaPrev(f, d, _, p);
                                        } else this._desenho.limparTelaPrev();
                                        if ((r += 2) <= t.length) return this._desenho.linhaSeq(o, 1), !1;
                                        n ? (this._desenho.linhaSeq(o, 0), this._desenho.salvarEstado(!1)) : this._desenho.linhaSeq(o, 1);
                                        break;
                                    case 3:
                                        if (this._opcoes.baldeFragmentado)
                                            if ("0" == t[1]) this._cacheBalde += t.slice(2).join("$");
                                            else if ("1" == t[1]) (this._cacheBalde = ""), (this._cacheBalde += t.slice(2).join("$"));
                                            else {
                                                "3" == t[1] && (this._cacheBalde = ""), (this._cacheBalde += t.slice(2).join("$"));
                                                var v = this._cacheBalde.split("$").map(function (t) {
                                                    return parseInt(t);
                                                });
                                                this._desenho.baldeF(v), this._desenho.salvarEstado(!1);
                                            }
                                        else
                                            this._desenho.baldeF(
                                                t.slice(1).map(function (t) {
                                                    return parseInt(t);
                                                })
                                            ),
                                                this._desenho.salvarEstado(!1);
                                        break;
                                    case 4:
                                        this._desenho.limparTela(!0, !0);
                                        break;
                                    case 5:
                                        this._desenho.mudaCor(t[1], !1);
                                        break;
                                    case 6:
                                        this._desenho.mudaBorda(t[1], !1);
                                        break;
                                    case 27:
                                        this._desenho.mudaAlpha(t[1], !1);
                                        break;
                                    case 21:
                                        for (var m = 1; m < t.length; m += 2) this._desenho.borracha(parseInt(t[m]), parseInt(t[m + 1]), 0, !1);
                                        break;
                                    case 31:
                                        1 == t[1] ? this._desenho.refazer() : this._desenho.desfazer();
                                }
                                return !0;
                            },
                        },
                        {
                            key: "direto",
                            set: function (t) {
                                this._direto = t;
                            },
                        },
                        {
                            key: "fracao",
                            set: function (t) {
                                this._fracao = t;
                            },
                        },
                        {
                            key: "desenho",
                            get: function () {
                                return this._desenho;
                            },
                        },
                    ]),
                    n
                );
            })(w.a);
            function P(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var x = (function (t) {
                    Object(u.a)(n, t);
                    var e = P(n);
                    function n(t, a) {
                        var i, o, s;
                        Object(r.a)(this, n),
                            ((i = e.call(this))._opcoes = Object.assign({ largura: 510, altura: 304, elems: 1, prev: !0, usoDesfazer: 1, usoRefazer: 1, retina: 1, quebra: 230 }, a)),
                            (i._elemBase = t),
                            i._opcoes.larguraIni || (i._opcoes.larguraIni = i._opcoes.largura),
                            i._opcoes.alturaIni || (i._opcoes.alturaIni = i._opcoes.altura),
                            i._opcoes.usoDesfazer && i._opcoes.usoDesfazer instanceof Boolean && (i._opcoes.usoDesfazer = 1),
                            i._opcoes.usoRefazer && i._opcoes.usoRefazer instanceof Boolean && (i._opcoes.usoRefazer = 1),
                            i._opcoes.retina || (i._opcoes.retina = 1),
                            (i._liberado = !1),
                            (i._draw = !1),
                            (i._stack = []),
                            (i._stackArr = []),
                            (i._des_cod = []),
                            (i._des_cod_hist = []),
                            (i._codigoQuebra = !0),
                            (i._cor = 0),
                            (i._corValor = "x000000"),
                            (i._borda = 4),
                            (i._tipo = 0),
                            (i._alpha = 1),
                            (i._bordaTemp = i._borda),
                            (i._alphaTemp = i._alpha),
                            (i._tolerancia = 20),
                            (i._camada = 0),
                            (i._histCamada = []),
                            (i._canvasHist = []),
                            (i._canvasHistElem = []),
                            (i._histPos = 0),
                            (i._undoQuant = 0),
                            (i._redoQuant = 0),
                            (i._histQuant = i._opcoes.usoDesfazer > i._opcoes.usoRefazer ? i._opcoes.usoDesfazer + 1 : i._opcoes.usoRefazer + 1),
                            (i._zoom = 1),
                            (i._zoomOrig = 1),
                            (i._zoomTela = i._opcoes.larguraIni / i._opcoes.largura),
                            (i._zoomPos = 1),
                            (i._fator = 1),
                            (i._cores = [
                                "rgba(0,0,0,0)",
                                "#000",
                                "#666",
                                "#8b0000",
                                "#008b00",
                                "#00008b",
                                "#008b8b",
                                "#8b8b00",
                                "#8b4500",
                                "#8b0a50",
                                "#551a8b",
                                "#548b54",
                                "#8b6969",
                                "#8b7b8b",
                                "#fff",
                                "#ccc",
                                "#ff0000",
                                "#00ff00",
                                "#0000ff",
                                "#00ffff",
                                "#ffff00",
                                "#ff7f00",
                                "#ff1493",
                                "#9b30ff",
                                "#9aff9a",
                                "#ffc1c1",
                                "#ffe1ff",
                            ]),
                            i._xFirst,
                            i._yFirst,
                            i._xCoord,
                            i._yCoord,
                            (i._canvasArr = []),
                            (i._canvasElemsArr = []);
                        for (var c = 0; c < i._opcoes.elems; c++) {
                            var l = document.createElement("canvas");
                            (l.width = i._opcoes.largura * i._opcoes.retina), (l.height = i._opcoes.altura * i._opcoes.retina);
                            var u = l.getContext("2d");
                            (u.lineCap = "round"),
                                (u.lineJoin = "round"),
                                (u.fillStyle = "#000000"),
                                (u.strokeStyle = "#000000"),
                                (u.lineWidth = i._borda * i._opcoes.retina),
                                i._canvasArr.push(u),
                                i._canvasElemsArr.push(l),
                                t.appendChild(l);
                        }
                        if (
                            ((i._canvasElem = i._canvasElemsArr[0]),
                            (i._canvas = i._canvasArr[0]),
                            (i._canvasLargura = i._canvasElem.width),
                            (i._canvasAltura = i._canvasElem.height),
                            (i._local = [i._canvas]),
                            i._opcoes.prev &&
                                ((i._canvasPrevElem = document.createElement("canvas")),
                                (i._canvasPrevElem.width = i._opcoes.largura * i._opcoes.retina),
                                (i._canvasPrevElem.height = i._opcoes.altura * i._opcoes.retina),
                                (i._canvasPrevElem.style.position = "absolute"),
                                (i._canvasPrevElem.style.zIndex = 1),
                                (i._canvasPrevElem.style.top = 0),
                                (i._canvasPrevElem.style.left = 0),
                                (i._canvasPrev = i._canvasPrevElem.getContext("2d")),
                                i._local.push(i._canvasPrev),
                                (i._canvasPrev.lineCap = "round"),
                                (i._canvasPrev.lineJoin = "round"),
                                (i._canvasPrev.fillStyle = "#000000"),
                                (i._canvasPrev.strokeStyle = "#000000"),
                                (i._canvasPrev.lineWidth = i._borda * i._opcoes.retina),
                                t.appendChild(i._canvasPrevElem),
                                (i._eventElem = i._opcoes.eventElem || i._canvasPrevElem),
                                (i._eventTouchStart = function (t) {
                                    i._startDraw(t), i._liberado && t.preventDefault();
                                }),
                                (i._eventTouchMove = function (t) {
                                    i._coordenada(t), i._liberado && t.preventDefault();
                                }),
                                (i._eventTouchEnd = function (t) {
                                    i._endDraw(t), i._liberado && t.preventDefault();
                                }),
                                i._eventElem.addEventListener("touchstart", i._eventTouchStart, !1),
                                i._eventElem.addEventListener("touchmove", i._eventTouchMove, !1),
                                i._eventElem.addEventListener("touchend", i._eventTouchEnd, !1),
                                i._eventElem.addEventListener("touchcancel", i._eventTouchEnd, !1),
                                i._opcoes.mobile ||
                                    ((i._eventMouseDown = function (t) {
                                        i._startDraw(t);
                                    }),
                                    (i._eventMouseMove = function (t) {
                                        i._coordenada(t), !i._draw || (0 !== t.which && 0 !== t.buttons) || i._endDraw(t);
                                    }),
                                    (i._eventMouseUp = function (t) {
                                        i._endDraw(t);
                                    }),
                                    i._eventElem.addEventListener("mousedown", i._eventMouseDown, !1),
                                    document.addEventListener("mousemove", i._eventMouseMove, !1),
                                    document.addEventListener("mouseup", i._eventMouseUp, !1))),
                            i._opcoes.usoDesfazer || i._opcoes.usoRefazer)
                        )
                            for (var h = 0; h < i._histQuant; h++)
                                ((o = document.createElement("canvas")).width = i._canvasLargura),
                                    (o.height = i._canvasAltura),
                                    (o.style.display = "none"),
                                    i._canvasHistElem.push(o),
                                    (s = o.getContext("2d")),
                                    i._local.push(s),
                                    (s.lineCap = "round"),
                                    (s.lineJoin = "round"),
                                    (s.fillStyle = "#000000"),
                                    (s.strokeStyle = "#000000"),
                                    (s.lineWidth = i._borda * i._opcoes.retina),
                                    i._canvasHist.push(s);
                        return (i.zoom = 1), i;
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "borracha",
                                value: function (t, e, n) {
                                    (t -= 3 * this._borda), (e -= 3 * this._borda), (t *= this._opcoes.retina), (e *= this._opcoes.retina);
                                    var a = (6 * this._borda + 1) * this._opcoes.retina;
                                    this._local[n].clearRect(t, e, a, a);
                                },
                            },
                            {
                                key: "linha",
                                value: function (t, e, n, a, i) {
                                    (t *= this._opcoes.retina),
                                        (e *= this._opcoes.retina),
                                        (n *= this._opcoes.retina),
                                        (a *= this._opcoes.retina),
                                        this._local[i].beginPath(),
                                        (this._local[i].lineWidth = this._borda * this._opcoes.retina),
                                        this._local[i].moveTo(t, e),
                                        this._local[i].lineTo(n, a),
                                        this._local[i].stroke(),
                                        this._local[i].closePath();
                                },
                            },
                            {
                                key: "linhaSeq",
                                value: function (t, e) {
                                    var n;
                                    for (this._local[e].beginPath(), this._local[e].moveTo(t[0][0] * this._opcoes.retina, t[0][1] * this._opcoes.retina), n = 1; n < t.length; n++)
                                        this._local[e].quadraticCurveTo(
                                            t[n - 1][0] * this._opcoes.retina,
                                            t[n - 1][1] * this._opcoes.retina,
                                            (t[n - 1][0] + (t[n][0] - t[n - 1][0]) / 2) * this._opcoes.retina,
                                            (t[n - 1][1] + (t[n][1] - t[n - 1][1]) / 2) * this._opcoes.retina
                                        );
                                    this._local[e].lineTo(t[n - 1][0] * this._opcoes.retina, t[n - 1][1] * this._opcoes.retina), this._local[e].stroke();
                                },
                            },
                            {
                                key: "retanguloF",
                                value: function (t, e, n, a, i) {
                                    (t *= this._opcoes.retina), (e *= this._opcoes.retina), (n *= this._opcoes.retina), (a *= this._opcoes.retina), this._local[i].fillRect(t, e, n, a);
                                },
                            },
                            {
                                key: "retanguloB",
                                value: function (t, e, n, a, i) {
                                    (t *= this._opcoes.retina), (e *= this._opcoes.retina), (n *= this._opcoes.retina), (a *= this._opcoes.retina), this._local[i].strokeRect(t, e, n, a);
                                },
                            },
                            {
                                key: "elipseF",
                                value: function (t, e, n, a, i) {
                                    (t *= this._opcoes.retina), (e *= this._opcoes.retina), (n *= this._opcoes.retina), (a *= this._opcoes.retina);
                                    var o = ((Math.sqrt(2) - 1) / 3) * 4;
                                    this._local[i].beginPath(),
                                        this._local[i].moveTo(t, e - a),
                                        this._local[i].bezierCurveTo(t + o * n, e - a, t + n, e - o * a, t + n, e),
                                        this._local[i].bezierCurveTo(t + n, e + o * a, t + o * n, e + a, t, e + a),
                                        this._local[i].bezierCurveTo(t - o * n, e + a, t - n, e + o * a, t - n, e),
                                        this._local[i].bezierCurveTo(t - n, e - o * a, t - o * n, e - a, t, e - a),
                                        this._local[i].fill();
                                },
                            },
                            {
                                key: "elipseB",
                                value: function (t, e, n, a, i) {
                                    (t *= this._opcoes.retina), (e *= this._opcoes.retina), (n *= this._opcoes.retina), (a *= this._opcoes.retina);
                                    var o = ((Math.sqrt(2) - 1) / 3) * 4;
                                    this._local[i].beginPath(),
                                        this._local[i].moveTo(t, e - a),
                                        this._local[i].bezierCurveTo(t + o * n, e - a, t + n, e - o * a, t + n, e),
                                        this._local[i].bezierCurveTo(t + n, e + o * a, t + o * n, e + a, t, e + a),
                                        this._local[i].bezierCurveTo(t - o * n, e + a, t - n, e + o * a, t - n, e),
                                        this._local[i].bezierCurveTo(t - n, e - o * a, t - o * n, e - a, t, e - a),
                                        this._local[i].stroke();
                                },
                            },
                            {
                                key: "contaGotas",
                                value: function (t) {
                                    for (var e = this.getPixel(Math.round(t[0]), Math.round(t[1])), n = (e.b + 256 * e.g + 65536 * e.r).toString(16).toUpperCase(); n.length < 6; ) n = "0" + n;
                                    return "x" + n;
                                },
                            },
                            {
                                key: "baldeF",
                                value: function (t) {
                                    var e, n, a, i;
                                    this._canvas.beginPath();
                                    for (var o = 0; o < t.length; o += 4)
                                        (e = parseInt(t[o]) * this._opcoes.retina),
                                            (n = parseInt(t[o + 1]) * this._opcoes.retina),
                                            (a = parseInt(t[o + 2]) * this._opcoes.retina),
                                            (i = parseInt(t[o + 3]) * this._opcoes.retina),
                                            this._canvas.rect(e, n, a, i);
                                    this._canvas.fill();
                                },
                            },
                            {
                                key: "balde",
                                value: function (t, e) {
                                    var a = this,
                                        i = function (t, e, n) {
                                            var a = e,
                                                i = n;
                                            if (c(e, n, t)) {
                                                for (; c(a + 1, i, t); ) a++;
                                                var o = a;
                                                do {
                                                    for (a = e - 1, i++; c(a + 1, i, t) && a + 1 <= o; ) a++;
                                                } while (a == o);
                                                return { x: e, y: n, w: o - e, h: --i - n };
                                            }
                                            return { w: -1, h: -1 };
                                        },
                                        o = function (t, e, n) {
                                            var a = e,
                                                i = n;
                                            if (c(e, n, t)) {
                                                for (; c(a - 1, i, t); ) a--;
                                                var o = a;
                                                do {
                                                    for (a = e + 1, i--; c(a - 1, i, t) && a - 1 >= o; ) a--;
                                                } while (a == o);
                                                return { x: o, y: ++i, w: e - o, h: n - i };
                                            }
                                            return { w: -1, h: -1 };
                                        },
                                        s = function (t, e, n) {
                                            var a = e,
                                                i = n;
                                            if (c(e, n, t)) {
                                                for (; c(a, i + 1, t); ) i++;
                                                var o = i;
                                                do {
                                                    for (i = n - 1, a--; c(a, i + 1, t) && i + 1 <= o; ) i++;
                                                } while (i == o);
                                                return { x: ++a, y: n, w: e - a, h: o - n };
                                            }
                                            return { w: -1, h: -1 };
                                        },
                                        r = function (t, e, n) {
                                            var a = e,
                                                i = n;
                                            if (c(e, n, t)) {
                                                for (; c(a, i - 1, t); ) i--;
                                                var o = i;
                                                do {
                                                    for (i = n + 1, a++; c(a, i - 1, t) && i - 1 >= o; ) i--;
                                                } while (i == o);
                                                return { x: e, y: o, w: --a - e, h: n - o };
                                            }
                                            return { w: -1, h: -1 };
                                        },
                                        c = function (t, e, n) {
                                            if (u[t][e]) return !1;
                                            var i = 4 * (t + e * a._canvasLargura),
                                                o = Math.abs(n[0] - v[i]),
                                                s = Math.abs(n[1] - v[i + 1]),
                                                r = Math.abs(n[2] - v[i + 2]),
                                                c = Math.abs(n[3] - v[i + 3]);
                                            return o < a._tolerancia && s < a._tolerancia && r < a._tolerancia && c < a._tolerancia;
                                        },
                                        l = function (t) {
                                            for (var e = t[0], n = t[1], i = e + t[2], o = n + t[3], s = e; s < i; s++) for (var r = n; r < o; r++) u[s][r] = !0;
                                            return (t[0] = Math.round(t[0] / a._opcoes.retina)), (t[1] = Math.round(t[1] / a._opcoes.retina)), (t[2] = Math.round(t[2] / a._opcoes.retina)), (t[3] = Math.round(t[3] / a._opcoes.retina)), t;
                                        };
                                    (t = Math.round(t) * this._opcoes.retina), (e = Math.round(e) * this._opcoes.retina);
                                    var u,
                                        h = this._cor,
                                        d = h % 256,
                                        _ = (h = Math.floor(h / 256)) % 256,
                                        p = (h = Math.floor(h / 256));
                                    !(function () {
                                        u = [];
                                        for (var t = -1; t <= a._canvasLargura; t++) u[t] = [];
                                        (u[-1] = []), (u[a._canvasLargura] = []);
                                        for (var e = -1; e <= a._canvasAltura; e++) (u[-1][e] = 1), (u[a._canvasLargura][e] = 1);
                                        for (var n = 0; n < a._canvasLargura; n++) (u[n][-1] = 1), (u[n][a._canvasAltura] = 1);
                                    })();
                                    for (
                                        var v = this._canvas.getImageData(0, 0, this._canvasLargura, this._canvasAltura).data, m = 4 * (t + e * this._canvasLargura), y = [v[m], v[m + 1], v[m + 2], v[m + 3]], g = [], b = 0;
                                        b <= this._canvasLargura;
                                        b++
                                    )
                                        g[b] = [];
                                    if (!c(t, e, [p, _, d, 255])) {
                                        for (; c(t - 1, e, y); ) t--;
                                        for (; c(t, e - 1, y); ) e--;
                                        var k,
                                            w,
                                            j = i(y, t, e),
                                            R = { x: t, y: e, w: j.w, h: j.h, ref: 0, andada: 0 },
                                            E = j.w;
                                        this._canvas.fillRect(j.x, j.y, j.w + 1, j.h + 1);
                                        var N = [3].concat(l([j.x, j.y, j.w + 1, j.h + 1]));
                                        do {
                                            for (k = 0, 2 == R.ref && (k += R.andada); k <= R.h; )
                                                -1 != (w = (j = r(y, R.x + R.w + 1, R.y + R.h - k)).h)
                                                    ? (g[w].push({ x: j.x, y: j.y, w: j.w, h: j.h, ref: 1, andada: R.h + 1 - k }),
                                                      this._canvas.fillRect(j.x, j.y, j.w + 1, j.h + 1),
                                                      (N = N.concat(l([j.x, j.y, j.w + 1, j.h + 1]))),
                                                      w > E && (E = w),
                                                      (k += w))
                                                    : k++;
                                            for (k = 0, 1 == R.ref && (k += R.andada); k <= R.h; )
                                                -1 != (w = (j = s(y, R.x - 1, R.y + k)).h)
                                                    ? (g[w].push({ x: j.x, y: j.y, w: j.w, h: j.h, ref: 2, andada: R.h + 1 - k }),
                                                      this._canvas.fillRect(j.x, j.y, j.w + 1, j.h + 1),
                                                      (N = N.concat(l([j.x, j.y, j.w + 1, j.h + 1]))),
                                                      w > E && (E = w),
                                                      (k += w))
                                                    : k++;
                                            for (k = 0, 4 == R.ref && (k += R.andada); k <= R.w; )
                                                -1 != (w = (j = i(y, R.x + k, R.y + R.h + 1)).w)
                                                    ? (g[w].push({ x: j.x, y: j.y, w: j.w, h: j.h, ref: 3, andada: R.w + 1 - k }),
                                                      this._canvas.fillRect(j.x, j.y, j.w + 1, j.h + 1),
                                                      (N = N.concat(l([j.x, j.y, j.w + 1, j.h + 1]))),
                                                      w > E && (E = w),
                                                      (k += w))
                                                    : k++;
                                            for (k = 0, 3 == R.ref && (k += R.andada); k <= R.w; )
                                                -1 != (w = (j = o(y, R.x + R.w - k, R.y - 1)).w)
                                                    ? (g[w].push({ x: j.x, y: j.y, w: j.w, h: j.h, ref: 4, andada: R.w + 1 - k }),
                                                      this._canvas.fillRect(j.x, j.y, j.w + 1, j.h + 1),
                                                      (N = N.concat(l([j.x, j.y, j.w + 1, j.h + 1]))),
                                                      w > E && (E = w),
                                                      (k += w))
                                                    : k++;
                                            for (R = g[E].pop(); null == R && E > 0; ) R = g[--E].pop();
                                        } while (null != R);
                                        this._des_cod.push(N), O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", N);
                                    }
                                },
                            },
                            {
                                key: "_startDraw",
                                value: function (t) {
                                    if (!this._draw && this._liberado) {
                                        switch (
                                            (this._coordenada(t),
                                            O(Object(f.a)(n.prototype), "emit", this).call(this, "coord", this._xCoord, this._yCoord, !1),
                                            (this._draw = !0),
                                            (this._xFirst = this._xCoord),
                                            (this._yFirst = this._yCoord),
                                            this._tipo)
                                        ) {
                                            case 0:
                                                (this._stack = [2, this._xFirst, this._yFirst]), (this._stackArr = [[this._xFirst, this._yFirst]]);
                                                break;
                                            case 7:
                                                this.balde(this._xFirst, this._yFirst), (this._draw = !1), this.salvarEstado(!1);
                                                break;
                                            case 8:
                                                this.mudaCor(this.contaGotas([this._xFirst, this._yFirst]), !0), O(Object(f.a)(n.prototype), "emit", this).call(this, "selCor"), (this._draw = !1);
                                                break;
                                            case 1:
                                                (this._stack = [21, this._xFirst, this._yFirst]), this.borracha(this._xCoord, this._yCoord, 0, !0);
                                        }
                                        8 != this._tipo && O(Object(f.a)(n.prototype), "emit", this).call(this, "startDraw"), 7 == this._tipo && O(Object(f.a)(n.prototype), "emit", this).call(this, "endDraw");
                                    }
                                },
                            },
                            {
                                key: "_coordenada",
                                value: function (t) {
                                    if (this._liberado) {
                                        var e = this._canvasPrevElem.getBoundingClientRect(),
                                            a = { x: e.left, y: e.top };
                                        if (
                                            ((a.x *= this._zoomPos),
                                            (a.y *= this._zoomPos),
                                            t && t.touches
                                                ? ((this._xCoord = t.touches[0].clientX + document.body.scrollLeft - a.x), (this._yCoord = t.touches[0].clientY + document.body.scrollTop - a.y))
                                                : window.event
                                                ? ((this._xCoord = event.clientX + document.body.scrollLeft - a.x), (this._yCoord = event.clientY + document.body.scrollTop - a.y))
                                                : document.layers
                                                ? ((this._xCoord = t.x + document.body.scrollLeft - a.x), (this._yCoord = t.y + document.body.scrollTop - a.y))
                                                : ((this._xCoord = t.clientX + document.body.scrollLeft - a.x), (this._yCoord = t.clientY + document.body.scrollTop - a.y)),
                                            (this._xCoord = Math.round(this._xCoord / this._zoom / this._fator / this._zoomTela)),
                                            (this._yCoord = Math.round(this._yCoord / this._zoom / this._fator / this._zoomTela)),
                                            this._draw ||
                                                (this._xCoord >= 0 && this._xCoord < this._canvasLargura && this._yCoord >= 0 && this._yCoord < this._canvasAltura
                                                    ? O(Object(f.a)(n.prototype), "emit", this).call(this, "coord", this._xCoord, this._yCoord, !0)
                                                    : O(Object(f.a)(n.prototype), "emit", this).call(this, "coord", this._xCoord, this._yCoord, !1)),
                                            this._canvasPrevElem && 1 == this._tipo)
                                        ) {
                                            var i = this._xCoord - 3 * this._borda,
                                                o = this._yCoord - 3 * this._borda,
                                                s = 6 * this._borda + 1;
                                            this._canvasPrev.clearRect(0, 0, this._canvasLargura, this._canvasAltura), this.desenhar(i, o, i + s, o + s, 2, 1, !1), this.desenhar(i, o, i + s, o + s, 3, 1, !1);
                                        }
                                        this._draw &&
                                            this._liberado &&
                                            (0 == this._tipo
                                                ? (this._codigoQuebra &&
                                                      this._stack.length > this._opcoes.quebra &&
                                                      (this._des_cod.push(this._stack),
                                                      O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", this._stack),
                                                      O(Object(f.a)(n.prototype), "emit", this).call(this, "quebra"),
                                                      (this._stack = [2, this._xFirst, this._yFirst]),
                                                      this.salvarEstado(!1)),
                                                  (this._stack = this._stack.concat(this._xCoord, this._yCoord)),
                                                  this._stackArr.push([this._xCoord, this._yCoord]),
                                                  this._canvasPrev.clearRect(0, 0, this._canvasLargura, this._canvasAltura),
                                                  this.linhaSeq(this._stackArr, 1),
                                                  (this._xFirst = this._xCoord),
                                                  (this._yFirst = this._yCoord))
                                                : 1 == this._tipo
                                                ? (this._stack.length > this._opcoes.quebra &&
                                                      (this._des_cod.push(this._stack), O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", this._stack), (this._stack = [21, this._xCoord, this._yCoord])),
                                                  this.borracha(this._xCoord, this._yCoord, 0, !0),
                                                  (this._stack = this._stack.concat(this._xCoord, this._yCoord)))
                                                : (this._canvasPrev.clearRect(0, 0, this._canvasLargura, this._canvasAltura), this.desenhar(this._xFirst, this._yFirst, this._xCoord, this._yCoord, this._tipo, 1, !1)));
                                    }
                                },
                            },
                            {
                                key: "desenhar",
                                value: function (t, e, a, i, o, s, r) {
                                    if (t != a || e != i) {
                                        var c, l, u, h;
                                        switch ((t >= a ? ((c = a), (l = t)) : ((c = t), (l = a)), e >= i ? ((u = i), (h = e)) : ((u = e), (h = i)), o)) {
                                            case 6:
                                                this.linha(t, e, a, i, s);
                                                break;
                                            case 2:
                                                if (c == l || u == h) {
                                                    r = !1;
                                                    break;
                                                }
                                                this.retanguloF(c, u, l - c, h - u, s);
                                                break;
                                            case 3:
                                                this.retanguloB(c, u, l - c, h - u, s);
                                                break;
                                            case 4:
                                                if (c == l || u == h) {
                                                    r = !1;
                                                    break;
                                                }
                                                var d = Math.floor((l - c) / 2),
                                                    _ = Math.floor((h - u) / 2),
                                                    p = Math.round(c + d),
                                                    v = Math.round(u + _);
                                                this.elipseF(p, v, d, _, s);
                                                break;
                                            case 5:
                                                var m = Math.floor((l - c) / 2),
                                                    y = Math.floor((h - u) / 2),
                                                    g = Math.round(c + m),
                                                    b = Math.round(u + y);
                                                this.elipseB(g, b, m, y, s);
                                        }
                                        if (r) {
                                            var k = [1, o, t, e, a, i];
                                            this._des_cod.push(k), O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", k);
                                        }
                                    }
                                },
                            },
                            {
                                key: "_endDraw",
                                value: function () {
                                    if (this._draw && this._liberado) {
                                        if (0 == this._tipo)
                                            if (2 == this._stack.length) {
                                                var t = Math.round(this._bordaTemp / 2),
                                                    e = 2 * t;
                                                (this._stack[0] -= t),
                                                    (this._stack[1] -= t),
                                                    (this._stack[2] = this._stack[0] + e),
                                                    (this._stack[3] = this._stack[1] + e),
                                                    this.desenhar(this._stack[0], this._stack[1], this._stack[2], this._stack[3], 4, 0, !0);
                                            } else
                                                this._des_cod.push(this._stack),
                                                    this.linhaSeq(this._stackArr, 0),
                                                    this._canvasPrev.clearRect(0, 0, this._canvasLargura, this._canvasAltura),
                                                    O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", this._stack);
                                        else
                                            1 == this._tipo
                                                ? (this._des_cod.push(this._stack), O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", this._stack))
                                                : (this.desenhar(this._xFirst, this._yFirst, this._xCoord, this._yCoord, this._tipo, 0, !0), this._canvasPrev.clearRect(0, 0, this._canvasLargura, this._canvasAltura));
                                        this.salvarEstado(!1),
                                            (this._draw = !1),
                                            this._borda != this._bordaTemp && this.mudaBorda(this._bordaTemp, !0),
                                            this._alpha != this._alphaTemp && this.mudaAlpha(this._alphaTemp, !0),
                                            O(Object(f.a)(n.prototype), "emit", this).call(this, "endDraw");
                                    }
                                },
                            },
                            {
                                key: "mudaOpcao",
                                value: function (t) {
                                    1 == t
                                        ? ((this._canvas.fillStyle = "#FFFFFF"),
                                          this._canvasPrevElem &&
                                              this._liberado &&
                                              ((this._canvasPrev.lineWidth = 2 * this._opcoes.retina), (this._canvasPrev.globalAlpha = 1), (this._canvasPrev.strokeStyle = "#000000"), (this._canvasPrev.fillStyle = "rgba(255,255,255,0.8)")))
                                        : 1 == this._tipo &&
                                          ((this._canvas.fillStyle = this._converterCor(this._cor, !0)),
                                          this._canvasPrevElem &&
                                              (this._canvasPrev.clearRect(0, 0, this._canvasLargura, this._canvasAltura),
                                              (this._canvasPrev.lineWidth = this._borda * this._opcoes.retina),
                                              (this._canvasPrev.globalAlpha = this._alpha),
                                              (this._canvasPrev.fillStyle = this._canvas.fillStyle),
                                              (this._canvasPrev.strokeStyle = this._canvas.fillStyle))),
                                        (this._tipo = t);
                                },
                            },
                            {
                                key: "mudaBorda",
                                value: function (t, e) {
                                    if (this._draw) this._bordaTemp = t;
                                    else if (
                                        ((this._canvas.lineWidth = t * this._opcoes.retina),
                                        null != this._canvasPrevElem && 1 != this._tipo && (this._canvasPrev.lineWidth = t * this._opcoes.retina),
                                        (this._borda = t),
                                        (this._bordaTemp = t),
                                        e)
                                    ) {
                                        var a = [6, t];
                                        this._des_cod.push(a), O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", a);
                                    }
                                },
                            },
                            {
                                key: "mudaAlpha",
                                value: function (t, e) {
                                    if (this._draw) this._alphaTemp = t;
                                    else if (((this._canvas.globalAlpha = t), null != this._canvasPrevElem && 1 != this._tipo && (this._canvasPrev.globalAlpha = t), (this._alpha = t), (this._alphaTemp = t), e)) {
                                        var a = [27, t];
                                        this._des_cod.push(a), O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", a);
                                    }
                                },
                            },
                            {
                                key: "mudaCor",
                                value: function (t, e) {
                                    var a,
                                        i = parseInt(t);
                                    if (isNaN(i)) {
                                        if (-1 == t.search(/^x[0-9A-F]{6}$/)) return;
                                        (i = parseInt(t.replace("x", ""), 16)), (a = this._converterCor(i, !0));
                                    } else a = this._cores[i];
                                    if (
                                        ((this._canvas.strokeStyle = a),
                                        null != this._canvasPrevElem && 1 != this._tipo && ((this._canvasPrev.strokeStyle = a), (this._canvasPrev.fillStyle = a)),
                                        1 != this._tipo && (this._canvas.fillStyle = a),
                                        (this._cor = i),
                                        (this._corValor = t),
                                        e)
                                    ) {
                                        var o = [5, t];
                                        this._des_cod.push(o), O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", o);
                                    }
                                },
                            },
                            {
                                key: "limparTela",
                                value: function (t, e) {
                                    if (
                                        ((this._canvas.globalAlpha = 1),
                                        this.transparencia(),
                                        (this._canvas.fillStyle = this._converterCor(this._cor, !0)),
                                        t &&
                                            ((this._des_cod = [
                                                [5, this._converterCor(this._cor, !0).replace("#", "x")],
                                                [6, this._borda],
                                                [27, this._alpha],
                                            ]),
                                            e || O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", [4])),
                                        (this._draw = !1),
                                        t)
                                    ) {
                                        for (var a = 0; a < this._histQuant; a++) this._des_cod_hist[a] = "";
                                        this.salvarEstado(!0);
                                    }
                                    this._canvas.globalAlpha = this._alpha;
                                },
                            },
                            {
                                key: "limparTelaPrev",
                                value: function (t, e, n, a) {
                                    this._canvasPrevElem &&
                                        (void 0 === t
                                            ? ((t = 0), (e = 0), (n = this._canvasLargura), (a = this._canvasAltura))
                                            : ((t *= this._opcoes.retina), (e *= this._opcoes.retina), (n *= this._opcoes.retina), (a *= this._opcoes.retina)),
                                        this._canvasPrev.clearRect(t, e, n, a));
                                },
                            },
                            {
                                key: "transparencia",
                                value: function () {
                                    this._canvas.clearRect(0, 0, this._canvasLargura, this._canvasAltura), this._canvasPrevElem && this._canvasPrev.clearRect(0, 0, this._canvasLargura, this._canvasAltura);
                                },
                            },
                            {
                                key: "desfazer",
                                value: function (t) {
                                    return (
                                        !(!this._opcoes.usoDesfazer || !this._undoQuant) &&
                                        (this._draw && this._endDraw(),
                                        this._opcoes.usoRefazer && this._redoQuant++,
                                        --this._histPos < 0 && (this._histPos = this._histQuant - 1),
                                        this.transparencia(),
                                        (this._canvas.globalAlpha = 1),
                                        this._canvas.drawImage(this._canvasHistElem[this._histPos], 0, 0),
                                        (this._canvas.globalAlpha = this._alpha),
                                        (this._des_cod = this._des_cod_hist[this._histPos].split("|")),
                                        t && O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", [31, 0]),
                                        this.mudaBorda(this._borda, !0),
                                        this.mudaAlpha(this._alpha, !0),
                                        this.mudaCor(this._corValor, !0),
                                        this._undoQuant--,
                                        !0)
                                    );
                                },
                            },
                            {
                                key: "refazer",
                                value: function (t) {
                                    return (
                                        !(!this._opcoes.usoRefazer || !this._redoQuant) &&
                                        (this._draw && this._endDraw(),
                                        this._opcoes.usoDesfazer && this._undoQuant++,
                                        (this._histPos = (this._histPos + 1) % this._histQuant),
                                        this._baseDiferente
                                            ? this.transparencia()
                                            : (this.transparencia(), (this._canvas.globalAlpha = 1), this._canvas.drawImage(this._canvasHistElem[this._histPos], 0, 0), (this._canvas.globalAlpha = this._alpha)),
                                        (this._des_cod = this._des_cod_hist[this._histPos].split("|")),
                                        t && O(Object(f.a)(n.prototype), "emit", this).call(this, "codigo", [31, 1]),
                                        this.mudaBorda(this._borda, !0),
                                        this.mudaAlpha(this._alpha, !0),
                                        this.mudaCor(this._corValor, !0),
                                        this._redoQuant--,
                                        !0)
                                    );
                                },
                            },
                            {
                                key: "salvarEstado",
                                value: function (t) {
                                    this._opcoes.usoDesfazer &&
                                        (t ? ((this._histPos = 0), (this._undoQuant = 0)) : (this._histPos = (this._histPos + 1) % this._histQuant),
                                        (this._redoQuant = 0),
                                        this._canvasHist[this._histPos].clearRect(0, 0, this._canvasLargura, this._canvasAltura),
                                        this._canvasHist[this._histPos].drawImage(this._canvasElem, 0, 0),
                                        (this._histCamada[this._histPos] = this._camada),
                                        (this._des_cod_hist[this._histPos] = this._des_cod.join("|")),
                                        !t && ++this._undoQuant > this._opcoes.usoDesfazer && (this._undoQuant = this._opcoes.usoDesfazer));
                                },
                            },
                            {
                                key: "_converterCor",
                                value: function (t, e) {
                                    for (var n = t.toString(16).toUpperCase(); n.length < 6; ) n = "0" + n;
                                    return e ? "#" + n : "x" + n;
                                },
                            },
                            {
                                key: "getPixel",
                                value: function (t, e) {
                                    var n = this._local[0].getImageData(t * this._opcoes.retina, e * this._opcoes.retina, 1, 1).data,
                                        a = n[3] / 255;
                                    return { r: Math.ceil(n[0] * a + 255 * (1 - a)), g: Math.ceil(n[1] * a + 255 * (1 - a)), b: Math.ceil(n[2] * a + 255 * (1 - a)) };
                                },
                            },
                            {
                                key: "salvar",
                                value: function (t) {
                                    return !!this._canvasElem.toDataURL && this._canvasElem.toDataURL(t);
                                },
                            },
                            {
                                key: "comprimir",
                                value: function () {
                                    for (var t, e = -1, n = 0; n < this._des_cod.length; n++) e != (t = parseInt(this._des_cod[n])) || (5 != t && 6 != t && 27 != t) ? (e = t) : (this._des_cod.splice(n - 1, 1), n--);
                                },
                            },
                            {
                                key: "hasCanvasPrev",
                                value: function () {
                                    return !!this._canvasPrevElem;
                                },
                            },
                            {
                                key: "liberar",
                                value: function (t) {
                                    t != this._liberado && ((this._liberado = t), this._eventElem && (this._eventElem.style.cursor = t ? "crosshair" : "default"));
                                },
                            },
                            {
                                key: "remover",
                                value: function () {
                                    for (var t = 0; t < this._canvasElemsArr.length; t++) this._elemBase.removeChild(this._canvasElemsArr[t]);
                                    this._canvasPrevElem && this._elemBase.removeChild(this._canvasPrevElem),
                                        this._eventTouchStart &&
                                            (this._eventElem.removeEventListener("touchstart", this._eventTouchStart, !1),
                                            this._eventElem.removeEventListener("touchmove", this._eventTouchMove, !1),
                                            this._eventElem.removeEventListener("touchend", this._eventTouchEnd, !1),
                                            this._eventElem.removeEventListener("touchcancel", this._eventTouchEnd, !1)),
                                        this._eventMouseDown &&
                                            (this._eventElem.removeEventListener("mousedown", this._eventMouseDown, !1),
                                            document.removeEventListener("mousemove", this._eventMouseMove, !1),
                                            document.removeEventListener("mouseup", this._eventMouseUp, !1));
                                },
                            },
                            {
                                key: "sequencia",
                                get: function () {
                                    return this._des_cod.join("|");
                                },
                                set: function (t) {
                                    this._des_cod = t.split("|");
                                },
                            },
                            {
                                key: "zoom",
                                get: function () {
                                    return this._zoomOrig;
                                },
                                set: function (t) {
                                    (this._canvasElem.style.width = Math.round(this._opcoes.larguraIni * t * this._fator) + "px"),
                                        (this._canvasElem.style.height = Math.round(this._opcoes.alturaIni * t * this._fator) + "px"),
                                        this._canvasPrevElem &&
                                            ((this._canvasPrevElem.style.width = Math.round(this._opcoes.larguraIni * t * this._fator) + "px"),
                                            (this._canvasPrevElem.style.height = Math.round(this._opcoes.alturaIni * t * this._fator) + "px")),
                                        (this._zoomOrig = t),
                                        (this._zoom = t);
                                },
                            },
                            {
                                key: "liberado",
                                get: function () {
                                    return this._liberado;
                                },
                            },
                            {
                                key: "opcao",
                                get: function () {
                                    return this._tipo;
                                },
                            },
                            {
                                key: "cor",
                                get: function () {
                                    return this._converterCor(this._cor, !1);
                                },
                            },
                            {
                                key: "corReal",
                                get: function () {
                                    return this._converterCor(this._cor, !0);
                                },
                            },
                            {
                                key: "corValor",
                                get: function () {
                                    return this._corValor;
                                },
                            },
                            {
                                key: "borda",
                                get: function () {
                                    return this._bordaTemp;
                                },
                            },
                            {
                                key: "alpha",
                                get: function () {
                                    return this._alphaTemp;
                                },
                            },
                            {
                                key: "largura",
                                get: function () {
                                    return this._canvasLargura;
                                },
                            },
                            {
                                key: "undoQuant",
                                get: function () {
                                    return this._undoQuant;
                                },
                            },
                            {
                                key: "redoQuant",
                                get: function () {
                                    return this._redoQuant;
                                },
                            },
                            {
                                key: "altura",
                                get: function () {
                                    return this._canvasAltura;
                                },
                            },
                            {
                                key: "canvas",
                                get: function () {
                                    return this._canvasElem;
                                },
                            },
                            {
                                key: "canvasPrev",
                                get: function () {
                                    return this._canvasPrevElem;
                                },
                            },
                            {
                                key: "ultimaAcao",
                                get: function () {
                                    return this._des_cod.length > 0 ? this._des_cod[this._des_cod.length - 1] : null;
                                },
                            },
                            {
                                key: "codigoQuebra",
                                set: function (t) {
                                    this._codigoQuebra = t;
                                },
                            },
                            {
                                key: "zoomTela",
                                set: function (t) {
                                    this._zoomTela = t;
                                },
                            },
                            {
                                key: "zoomPos",
                                set: function (t) {
                                    this._zoomPos = t;
                                },
                            },
                            {
                                key: "fator",
                                set: function (t) {
                                    (this._fator = t), this.setZoom(this._zoom);
                                },
                            },
                        ]),
                        n
                    );
                })(w.a),
                D = n("RGR+"),
                L = new ((function () {
                    function t() {
                        Object(r.a)(this, t), (this._baseURL = ""), (this._active = !Object(D.a)("soundOff")), (this._cache = {}), (this._list = {}), this._audioTag, this._extension;
                        try {
                            new Audio().canPlayType("audio/mpeg") && (this._extension = ".mp3"), (this._audioTag = !0);
                        } catch (e) {
                            (this._audioTag = !1), (this._active = !1);
                        }
                    }
                    return (
                        Object(c.a)(t, [
                            {
                                key: "_pauseAll",
                                value: function () {
                                    for (var t in this._list) this._list[t] && this.pause(t);
                                },
                            },
                            {
                                key: "activate",
                                value: function (t) {
                                    if (t) {
                                        if (this._audioTag) {
                                            this._active = !0;
                                            var e,
                                                n = [];
                                            for (e in this._list) this._list[e] && n.push(e);
                                            this._pauseAll();
                                            for (var a = 0; a < n.length; a++) this.play(n[a], !1, !0);
                                        }
                                        Object(D.b)("soundOff");
                                    } else this._pauseAll(), (this._active = !1), Object(D.c)("soundOff", "1");
                                },
                            },
                            {
                                key: "load",
                                value: function (t) {
                                    if (this._audioTag)
                                        for (var e in t) {
                                            var n = t[e];
                                            if (!this._cache[n]) {
                                                var a = new Audio();
                                                (a.src = this._baseURL + n + this._extension), a.load(), (this._cache[n] = a);
                                            }
                                        }
                                },
                            },
                            {
                                key: "pause",
                                value: function (t) {
                                    var e = this._cache[t];
                                    e && (e.pause(), (this._list[t] = !1));
                                },
                            },
                            {
                                key: "play",
                                value: function (t) {
                                    var e = this,
                                        n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                        a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                                        i = this._cache[t];
                                    if (i && this._active) {
                                        (i.currentTime = 0),
                                            (i.loop = n),
                                            (i.volume = a),
                                            (this._list[t] = !0),
                                            i.setAttribute("som", t),
                                            (i.onpause = function () {
                                                o(this.getAttribute("som"));
                                            });
                                        var o = function (t) {
                                            e._list[t] = !1;
                                        };
                                        i.play();
                                    }
                                },
                            },
                            {
                                key: "active",
                                get: function () {
                                    return this._active;
                                },
                            },
                            {
                                key: "baseURL",
                                set: function (t) {
                                    this._baseURL = t;
                                },
                            },
                        ]),
                        t
                    );
                })())(),
                M = n("TSYQ"),
                z = n.n(M),
                U = n("rFDI"),
                V = n("RnYt"),
                W = (n("imBb"), n("r3VO")),
                F = p.a.createElement;
            function G(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var B = (function (t) {
                    Object(u.a)(n, t);
                    var e = G(n);
                    function n(t) {
                        var a;
                        return (
                            Object(r.a)(this, n),
                            (a = e.call(this, t)),
                            Object(d.a)(Object(l.a)(a), "sound", function () {
                                L.activate(!L.active), a.setState({ sound: L.active });
                            }),
                            Object(d.a)(Object(l.a)(a), "exit", function () {
                                var t = a.props,
                                    e = t.setPopup,
                                    n = t.game;
                                e(U.a.CONFIRM, {
                                    title: a._lang.exit,
                                    text: a._lang.exitGame,
                                    lottie: "exit",
                                    cb: function () {
                                        n.exit(), e(U.a.LOADING);
                                    },
                                });
                            }),
                            Object(d.a)(Object(l.a)(a), "info", function () {
                                var t = a.props,
                                    e = t.setPopup,
                                    n = t.data,
                                    i = t.game,
                                    o = t.lang;
                                e(U.a.INFO, { goal: i.goal, photo: i.photo, subject: o.subjects[i.subject], language: Object(V.a)(n.languages, i.language) });
                            }),
                            Object(d.a)(Object(l.a)(a), "share", function () {
                                a.props.setPopup(U.a.SHARE, a.props.data);
                            }),
                            (a.state = { sound: L.active }),
                            (a._lang = t.lang.roomHeader),
                            a
                        );
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "shouldComponentUpdate",
                                value: function (t, e) {
                                    return e !== this.state || t.size != this.props.size;
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    var t = this,
                                        e = this.props.game;
                                    return F(
                                        "div",
                                        null,
                                        F(
                                            "div",
                                            null,
                                            F(
                                                "button",
                                                {
                                                    id: "sounds",
                                                    className: z()({ off: !this.state.sound }),
                                                    onClick: function () {
                                                        return t.sound();
                                                    },
                                                },
                                                F("span", { className: "tooltip" }, this._lang.sound)
                                            ),
                                            e.created && F("button", { id: "share", onClick: this.share }, F("span", { className: "tooltip" }, this._lang.shareStream))
                                        ),
                                        F(
                                            "div",
                                            null,
                                            F("button", { id: "info", onClick: this.info }, F("span", { className: "tooltip" }, this._lang.info)),
                                            F("button", { id: "exit", onClick: this.exit }, F("span", { className: "tooltip" }, this._lang.exit))
                                        )
                                    );
                                },
                            },
                        ]),
                        n
                    );
                })(p.a.Component),
                H = Object(W.a)(B),
                q = n("wx14"),
                Y = n("ynsN"),
                K = p.a.createElement;
            function Q(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var J = function (t) {
                    return (function (e) {
                        Object(u.a)(a, e);
                        var n = Q(a);
                        function a() {
                            return Object(r.a)(this, a), n.apply(this, arguments);
                        }
                        return (
                            Object(c.a)(a, [
                                {
                                    key: "render",
                                    value: function () {
                                        var e = this;
                                        return K(Y.a.Consumer, null, function (n) {
                                            var a = n.setPopup;
                                            return K(t, Object(q.a)({}, e.props, { setPopup: a }));
                                        });
                                    },
                                },
                            ]),
                            a
                        );
                    })(p.a.Component);
                },
                X = n("Hvvf"),
                $ = n("5cDc"),
                Z = n("i2FJ"),
                tt = p.a.createElement;
            function et(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(t);
                    e &&
                        (a = a.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, a);
                }
                return n;
            }
            function nt(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? et(Object(n), !0).forEach(function (e) {
                              Object(d.a)(t, e, n[e]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                        : et(Object(n)).forEach(function (e) {
                              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                          });
                }
                return t;
            }
            function at(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var it = (function (t) {
                    Object(u.a)(n, t);
                    var e = at(n);
                    function n(t) {
                        var a;
                        return (
                            Object(r.a)(this, n),
                            (a = e.call(this, t)),
                            Object(d.a)(Object(l.a)(a), "setUser", function (t, e, n) {
                                var a = (t = t.slice()).find(function (t) {
                                    return t.id == e.id;
                                });
                                return a && Object.assign(a, n), t;
                            }),
                            (a.state = { list: [], limit: 10 }),
                            (a._game = a.props.game),
                            (a._pointId = 0),
                            (a._lang = t.lang.users),
                            a.events(),
                            a
                        );
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "shouldComponentUpdate",
                                value: function (t, e) {
                                    return e !== this.state || t.size != this.props.size;
                                },
                            },
                            {
                                key: "events",
                                value: function () {
                                    var t = this,
                                        e = this.props.game,
                                        n = this.setUser,
                                        a = function (e) {
                                            return t.setState(e);
                                        };
                                    e.on("iniciado", function (t) {
                                        var n = e.limit;
                                        a({
                                            list: t.map(function (t) {
                                                return nt(nt({}, t), {}, { pontosRodada: 0 });
                                            }),
                                            limit: n,
                                        });
                                    }),
                                        e.on("fimHistorico", function () {
                                            e.viewer ||
                                                a(function (t) {
                                                    return { list: n(t.list, e.me, { voce: !0 }) };
                                                });
                                        }),
                                        e.on("entrada", function (t) {
                                            a(function (e) {
                                                return { list: [].concat(Object(s.a)(e.list), [nt({}, t)]) };
                                            });
                                        }),
                                        e.on("saida", function (t) {
                                            a(function (e) {
                                                return {
                                                    list: e.list.filter(function (e) {
                                                        return e.id != t.id;
                                                    }),
                                                };
                                            });
                                        }),
                                        e.on("acerto", function (t, i, o) {
                                            a(function (t) {
                                                var a = t.list;
                                                return (a = n(a, e.me, { pontos: e.me.pontos, pontosRodada: i, acertou: !0 })), { list: (a = n(a, e.userTurn, { pontos: e.userTurn.pontos, pontosRodada: o })) };
                                            });
                                        }),
                                        e.on("acertoOutro", function (t, i, o) {
                                            a(function (a) {
                                                var s = a.list;
                                                return (s = n(s, t, { pontos: t.pontos, pontosRodada: i, acertou: !0 })), { list: (s = n(s, e.userTurn, { pontos: e.userTurn.pontos, pontosRodada: o })) };
                                            });
                                        }),
                                        e.on("vez", function () {
                                            a(function (t) {
                                                var a = t.list.map(function (t) {
                                                    return nt(nt({}, t), {}, { pontosRodada: 0, proximo: null });
                                                });
                                                return { list: (a = n(a, e.me, { desenhando: !0 })) };
                                            });
                                        }),
                                        e.on("vezOutro", function (t) {
                                            a(function (e) {
                                                var a = e.list.map(function (t) {
                                                    return nt(nt({}, t), {}, { pontosRodada: 0, proximo: null });
                                                });
                                                return { list: (a = n(a, t, { desenhando: !0 })) };
                                            });
                                        }),
                                        e.on("cancelar", function () {
                                            a(function (t) {
                                                return {
                                                    list: t.list.map(function (t) {
                                                        return nt(nt({}, t), {}, { pontos: t.pontos - t.pontosRodada, pontosRodada: -t.pontosRodada });
                                                    }),
                                                };
                                            });
                                        }),
                                        e.on("fimRodada", function () {
                                            a(function (t) {
                                                return {
                                                    list: t.list.map(function (t) {
                                                        return nt(nt({}, t), {}, { acertou: !1, desenhando: !1 });
                                                    }),
                                                };
                                            });
                                        }),
                                        e.on("proximos", function (t) {
                                            a(function (e) {
                                                var a = e.list.slice();
                                                return (
                                                    t.forEach(function (t, e) {
                                                        a = n(a, t, { proximo: e });
                                                    }),
                                                    { list: a }
                                                );
                                            });
                                        }),
                                        e.on("fimJogo", function (e) {
                                            a(function (n) {
                                                var a = t.order(n.list);
                                                return {
                                                    list: n.list.map(function (t) {
                                                        return t.id != e[0].id
                                                            ? nt(
                                                                  nt({}, t),
                                                                  {},
                                                                  {
                                                                      entrada:
                                                                          a.findIndex(function (e) {
                                                                              return e.id == t.id;
                                                                          }) + 1,
                                                                  }
                                                              )
                                                            : nt(
                                                                  nt({}, t),
                                                                  {},
                                                                  {
                                                                      entrada:
                                                                          a.findIndex(function (e) {
                                                                              return e.id == t.id;
                                                                          }) + 1,
                                                                      vitorias: t.vitorias + 1,
                                                                  }
                                                              );
                                                    }),
                                                };
                                            });
                                        }),
                                        e.on("aguardando", function (t) {
                                            a(function (t) {
                                                return {
                                                    list: t.list.map(function (t) {
                                                        return nt(nt({}, t), {}, { pontos: 0, proximo: null });
                                                    }),
                                                };
                                            });
                                        }),
                                        e.on("votar", function (e, n) {
                                            a(function (a) {
                                                return { list: t.setUser(a.list, e, { votekick: n }) };
                                            });
                                        }),
                                        e.on("ignorar", function (e, n) {
                                            a(function (a) {
                                                return { list: t.setUser(a.list, e, { ignorado: n }) };
                                            });
                                        }),
                                        e.on("zerarPontos", function (t, e) {
                                            a(function (t) {
                                                return {
                                                    list: t.list.map(function (t) {
                                                        return nt(nt({}, t), {}, { pontos: 0 });
                                                    }),
                                                };
                                            });
                                        });
                                },
                            },
                            {
                                key: "order",
                                value: function (t) {
                                    var e = t.slice();
                                    return (
                                        e.sort(function (t, e) {
                                            return t.pontos != e.pontos ? e.pontos - t.pontos : t.entrada - e.entrada;
                                        }),
                                        e
                                    );
                                },
                            },
                            {
                                key: "profile",
                                value: function (t) {
                                    var e = this.props.setPopup,
                                        n = this._game;
                                    e(U.a.PROFILE, { user: t, game: n });
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    var t = this,
                                        e = this.props,
                                        n = e.size,
                                        a = e.game,
                                        i = this.state,
                                        o = i.list,
                                        s = i.limit;
                                    n = [95, 70, 79, 95, 51][n];
                                    for (var r = [], c = 0; c < s; c++) r.push(tt("li", { key: "limit" + c }));
                                    for (var l = [], u = o.length; u < s; u++)
                                        l.push(
                                            tt(
                                                "div",
                                                { className: "user empty", style: { transform: "translate3d(0, " + n * u + "px, 0)" }, key: "empty" + u },
                                                tt("div", { className: "avatar" }),
                                                tt("div", { className: "infosPlayer" }, tt("span", { className: "nick" }, this._lang.empty))
                                            )
                                        );
                                    var h = this.order(o);
                                    return tt(
                                        "div",
                                        { id: "users" },
                                        tt(
                                            $.a,
                                            null,
                                            tt("ul", null, r),
                                            o.map(function (e, i) {
                                                var s = h.findIndex(function (t) {
                                                        return t.id == e.id;
                                                    }),
                                                    r = t._lang.pts.split("###");
                                                return tt(
                                                    "div",
                                                    {
                                                        className: z()("user", { first: 0 === s, second: 1 === s && o.length >= 3, third: 2 === s && o.length >= 3, you: e.voce, hit: e.acertou, turn: e.desenhando }),
                                                        style: { transform: "translate3d(0, " + n * s + "px, 0)" },
                                                        onClick: function () {
                                                            return !a.viewer && t.profile(e);
                                                        },
                                                        key: e.id,
                                                    },
                                                    tt(Z.a, { type: e.avatar, url: e.foto }, e.ignorado && tt("span", { className: "ignored" }), e.vitorias > 0 && tt("span", { className: "win" }, e.vitorias <= 9 ? e.vitorias : "9+")),
                                                    tt(
                                                        "div",
                                                        { className: "infosPlayer" },
                                                        tt("span", { className: "nick" }, e.nick),
                                                        tt("span", { className: "points" }, r[0].length > 0 && tt("i", null, r[0]), e.pontos, r[1].length > 0 && tt("i", null, r[1])),
                                                        tt(
                                                            "div",
                                                            { className: "nextDrawOwner" },
                                                            null != e.proximo
                                                                ? tt("span", { className: "nextDraw" }, 0 == e.proximo ? t._lang.nextDraw : t._lang[e.proximo + "turn"])
                                                                : e.dono && tt("span", { className: "owner" }, t._lang.host)
                                                        )
                                                    ),
                                                    0 != e.pontosRodada &&
                                                        (e.pontosRodada > 0
                                                            ? tt("div", { className: "pointsTurn", key: e.id + "point" + e.pontosRodada }, "+", e.pontosRodada)
                                                            : tt("div", { className: "pointsTurn removePts", key: e.id + "point" + e.pontosRodada }, e.pontosRodada))
                                                );
                                            }),
                                            l
                                        )
                                    );
                                },
                            },
                        ]),
                        n
                    );
                })(p.a.Component),
                ot = J(Object(X.a)(it)),
                st = p.a.createElement;
            function rt(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var ct = (function (t) {
                    Object(u.a)(n, t);
                    var e = rt(n);
                    function n(t) {
                        var a;
                        return (
                            Object(r.a)(this, n),
                            (a = e.call(this, t)),
                            Object(d.a)(Object(l.a)(a), "clean", function () {
                                var t = a.props.setPopup;
                                t(U.a.CONFIRM_GAME, {
                                    title: a._lang.clean,
                                    text: a._lang.cleanDrawing,
                                    icon: "iconClean",
                                    cb: function () {
                                        t(null), a._drawing.limparTela(!0), a.setState({ undo: !1, redo: !1, toolsMobile: !1 });
                                    },
                                });
                            }),
                            Object(d.a)(Object(l.a)(a), "undo", function () {
                                a._game.undo(), a.setState({ toolsMobile: !1 });
                            }),
                            Object(d.a)(Object(l.a)(a), "redo", function () {
                                a._game.redo(), a.setState({ toolsMobile: !1 });
                            }),
                            Object(d.a)(Object(l.a)(a), "handleColor", function (t) {
                                var e = t.target.value;
                                a.selectColor(e);
                            }),
                            Object(d.a)(Object(l.a)(a), "handleSize", function (t) {
                                var e = t.target.value;
                                a._drawing.mudaBorda(e, !0), a.setState({ size: e });
                            }),
                            Object(d.a)(Object(l.a)(a), "handleOpacity", function (t) {
                                var e = t.target.value;
                                a._drawing.mudaAlpha(e, !0), a.setState({ opacity: e });
                            }),
                            Object(d.a)(Object(l.a)(a), "openToolsMobile", function () {
                                a.setState(function (t) {
                                    return t.toolsMobile ? { toolsMobile: !1 } : { toolsMobile: !0, opacityMobile: !1 };
                                });
                            }),
                            Object(d.a)(Object(l.a)(a), "openOpacityMobile", function () {
                                a.setState(function (t) {
                                    return t.opacityMobile ? { opacityMobile: !1 } : { opacityMobile: !0, toolsMobile: !1 };
                                });
                            }),
                            Object(d.a)(Object(l.a)(a), "skipMobile", function () {
                                var t = a.state,
                                    e = t.turn,
                                    n = t.hit;
                                if ((a.setState({ opacityMobile: !1, toolsMobile: !1 }), e && !n)) {
                                    var i = a.props,
                                        o = i.setPopup,
                                        s = i.game;
                                    o(U.a.CONFIRM_GAME, {
                                        title: a._lang.skip,
                                        text: a._lang.skipTurn,
                                        lottie: "skipped",
                                        cb: function () {
                                            o(null), s.skip();
                                        },
                                    });
                                }
                            }),
                            Object(d.a)(Object(l.a)(a), "hint", function () {
                                var t = a.state,
                                    e = t.turn,
                                    n = t.hit,
                                    i = t.hintNum;
                                a.setState({ opacityMobile: !1, toolsMobile: !1 }), e && !n && i && a.props.game.hint();
                            }),
                            (a.state = { tool: 0, color: "#000000", opacity: 1, size: 4, undo: !1, redo: !1, toolsMobile: !1, opacityMobile: !1, turn: !0, hintNum: 0, hit: !1 }),
                            (a._game = a.props.game),
                            (a._drawing = {}),
                            (a._lang = t.lang.tools),
                            a.events(),
                            a
                        );
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "shouldComponentUpdate",
                                value: function (t, e) {
                                    return e !== this.state;
                                },
                            },
                            {
                                key: "events",
                                value: function () {
                                    var t = this,
                                        e = this.props.game;
                                    e.on("iniciado", function () {
                                        (t._drawing = e.drawing),
                                            t._drawing.on("selCor", function () {
                                                e.turn && t.selectColor(t._drawing.corReal);
                                            }),
                                            t._drawing.on("startDraw", function () {
                                                t.setState({ opacityMobile: !1, toolsMobile: !1 });
                                            }),
                                            t._drawing.on("endDraw", function () {
                                                t.setState({ undo: !!t._drawing.undoQuant, redo: !!t._drawing.redoQuant });
                                            });
                                    }),
                                        e.on("vez", function () {
                                            t.setState({ tool: 0, color: "#000000", opacity: 1, size: 4, undo: !1, redo: !1, hit: !1 });
                                        }),
                                        e.on("inicioVez", function (e, n) {
                                            t.setState({ hintNum: n });
                                        }),
                                        e.on("dica", function (e, n) {
                                            t.setState({ hintNum: n });
                                        }),
                                        e.on("primeiroAcerto", function () {
                                            e.turn && t.setState({ hit: !0 });
                                        }),
                                        e.on("undo", function () {
                                            t.setState({ undo: !1, redo: !0 });
                                        }),
                                        e.on("redo", function () {
                                            t.setState({ undo: !0, redo: !1 });
                                        });
                                },
                            },
                            {
                                key: "selectTool",
                                value: function (t) {
                                    this._drawing.mudaOpcao(t, !0), this.setState({ tool: t, toolsMobile: !1 });
                                },
                            },
                            {
                                key: "selectColor",
                                value: function (t) {
                                    this._drawing.mudaCor(t.toUpperCase().replace("#", "x"), !0), this.setState({ color: t, toolsMobile: !1, opacityMobile: !1 });
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    var t,
                                        e,
                                        n = this,
                                        a = this.state,
                                        i = a.tool,
                                        o = a.color,
                                        s = a.size,
                                        r = a.opacity,
                                        c = a.undo,
                                        l = a.redo,
                                        u = a.toolsMobile,
                                        h = a.hit,
                                        f = a.hintNum,
                                        d = a.opacityMobile;
                                    !h && f && (t = st("button", { className: "hint", onClick: this.hint }, st("span", null, f))), h || (e = st("button", { className: "skip", onClick: this.skipMobile }));
                                    return st(
                                        "div",
                                        { id: "tools", className: z()({ rmOne: !f, rmTwo: h }) },
                                        st(
                                            "div",
                                            null,
                                            st(
                                                "div",
                                                { className: "buttonsMobile" },
                                                st("button", {
                                                    className: "op" + i,
                                                    onClick: function () {
                                                        return n.openToolsMobile();
                                                    },
                                                }),
                                                st("button", {
                                                    className: "opacity",
                                                    onClick: function () {
                                                        return n.openOpacityMobile();
                                                    },
                                                }),
                                                t,
                                                e
                                            ),
                                            st(
                                                "ul",
                                                { className: z()({ active: u }) },
                                                [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (t) {
                                                    return st("li", {
                                                        id: "op" + t,
                                                        className: z()("tool", { active: t == i }),
                                                        onClick: function () {
                                                            return n.selectTool(t);
                                                        },
                                                        key: "tool" + t,
                                                    });
                                                }),
                                                st("li", { id: "clean", className: "tool", onClick: this.clean }),
                                                st("li", { id: "undo", className: z()({ inactive: !c }), onClick: this.undo }),
                                                st("li", { id: "repeat", className: z()({ inactive: !l }), onClick: this.redo })
                                            ),
                                            st(
                                                "div",
                                                { className: "colors" },
                                                st(
                                                    "div",
                                                    null,
                                                    [
                                                        "#000000",
                                                        "#666666",
                                                        "#0017f6",
                                                        "#ffffff",
                                                        "#aaaaaa",
                                                        "#26c9ff",
                                                        "#008d26",
                                                        "#a9230c",
                                                        "#964112",
                                                        "#00ff4d",
                                                        "#ff0013",
                                                        "#ff7829",
                                                        "#b0701c",
                                                        "#99004e",
                                                        "#936867",
                                                        "#ffc926",
                                                        "#ff008f",
                                                        "#feafa8",
                                                        "#00d9a3",
                                                        "#85b200",
                                                        "#8000ff",
                                                        "#052c6c",
                                                        "#b973ff",
                                                        "#fff73f",
                                                    ].map(function (t) {
                                                        return st("div", {
                                                            className: z()("color", { active: t == o }),
                                                            style: { backgroundColor: t },
                                                            onClick: function () {
                                                                return n.selectColor(t);
                                                            },
                                                            key: "color" + t,
                                                        });
                                                    })
                                                ),
                                                st(
                                                    "div",
                                                    null,
                                                    st("div", { id: "colorSelected", style: { backgroundColor: o } }),
                                                    st("label", { id: "colorsRange", htmlFor: "colorRangeInput" }, st("input", { id: "colorRangeInput", type: "color", name: "color", value: o, onChange: this.handleColor }))
                                                )
                                            ),
                                            st(
                                                "div",
                                                { className: z()("opacity-size", { active: d }) },
                                                st("div", { className: "size" }, st("input", { name: "size", type: "range", min: "1", max: "50", step: "1", value: s, onChange: this.handleSize })),
                                                st("div", { className: "opacity" }, st("input", { name: "opacity", type: "range", min: "0.1", max: "1", step: "0.1", value: r, onChange: this.handleOpacity }))
                                            )
                                        )
                                    );
                                },
                            },
                        ]),
                        n
                    );
                })(p.a.Component),
                lt = J(Object(X.a)(ct));
            function ut(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(t);
                    e &&
                        (a = a.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, a);
                }
                return n;
            }
            function ht(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? ut(Object(n), !0).forEach(function (e) {
                              Object(d.a)(t, e, n[e]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                        : ut(Object(n)).forEach(function (e) {
                              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                          });
                }
                return t;
            }
            function ft(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var dt = (function (t) {
                Object(u.a)(n, t);
                var e = ft(n);
                function n(t) {
                    var a;
                    return (
                        Object(r.a)(this, n),
                        (a = e.call(this, t)),
                        Object(d.a)(Object(l.a)(a), "message", function (t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                i = arguments.length > 2 ? arguments[2] : void 0,
                                o = ht({ id: ++a._id, type: t }, e);
                            a.setState(function (t) {
                                var e;
                                return (
                                    (e = [].concat(
                                        i
                                            ? Object(s.a)(
                                                  t.history.filter(function (t) {
                                                      return t.type != n.SENDING;
                                                  })
                                              )
                                            : Object(s.a)(t.history),
                                        [o]
                                    )).length > 30 && e.shift(),
                                    { history: e }
                                );
                            });
                        }),
                        Object(d.a)(Object(l.a)(a), "handleText", function (t) {
                            var e = t.target.value;
                            a.setState({ text: e });
                        }),
                        Object(d.a)(Object(l.a)(a), "focus", function () {
                            a._game.viewer || a._ref.current.focus();
                        }),
                        (a._game = a.props.game),
                        (a._time = 0),
                        (a._id = 0),
                        (a._ref = p.a.createRef()),
                        t.getElem && t.getElem(Object(l.a)(a)),
                        a
                    );
                }
                return (
                    Object(c.a)(n, [
                        {
                            key: "shouldComponentUpdate",
                            value: function (t, e) {
                                return e !== this.state || t.size != this.props.size || t.openChat != this.props.openChat;
                            },
                        },
                        {
                            key: "focused",
                            get: function () {
                                return document.activeElement === this._ref.current;
                            },
                        },
                        {
                            key: "blocked",
                            get: function () {
                                return this._ref.current.disabled;
                            },
                        },
                    ]),
                    n
                );
            })(p.a.Component);
            Object(d.a)(dt, "SENDING", 2);
            var _t = dt,
                pt = p.a.createElement;
            function vt(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var mt = (function (t) {
                    Object(u.a)(n, t);
                    var e = vt(n);
                    function n(t) {
                        var a;
                        return (
                            Object(r.a)(this, n),
                            (a = e.call(this, t)),
                            Object(d.a)(Object(l.a)(a), "open", function () {
                                var t = a.props,
                                    e = t.setPopup,
                                    n = t.game,
                                    i = t.data;
                                if (!n.viewer) {
                                    var o = n.users.find(function (t) {
                                        return t.id == i.id;
                                    });
                                    o ? e(U.a.PROFILE, { user: o, game: n }) : e(U.a.ALERT, { title: a._lang.profile, text: a._lang.userOut, icon: "iconSameNickname" });
                                }
                            }),
                            (a._lang = t.lang.user),
                            a
                        );
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "shouldComponentUpdate",
                                value: function () {
                                    return !1;
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    return pt("strong", { style: { cursor: "pointer" }, onClick: this.open }, this.props.data.nick);
                                },
                            },
                        ]),
                        n
                    );
                })(p.a.Component),
                yt = J(Object(X.a)(mt)),
                gt = n("lPHp"),
                bt = n.n(gt),
                Ot = p.a.createElement;
            function kt(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var wt = (function (t) {
                Object(u.a)(n, t);
                var e = kt(n);
                function n(t) {
                    var a;
                    return (
                        Object(r.a)(this, n),
                        (a = e.call(this, t)),
                        Object(d.a)(Object(l.a)(a), "send", function (t) {
                            if ((t.preventDefault(), Date.now() - a._time > 500)) {
                                var e = a.state.text.trim();
                                if (e.length) {
                                    var i = a.props.game;
                                    a.message(n.SENDING, { user: i.me, msg: e }),
                                        i.answer(e),
                                        (a._time = Date.now()),
                                        a.setState(function (t) {
                                            return { text: "", update: t.update + 1 };
                                        });
                                }
                            }
                        }),
                        (a._lang = t.lang.answers),
                        (a.state = { history: [], text: "", textBloq: a._lang.waiting, hit: !1, update: 0 }),
                        (a._lottieRef = p.a.createRef()),
                        a.events(),
                        a
                    );
                }
                return (
                    Object(c.a)(n, [
                        {
                            key: "componentDidUpdate",
                            value: function (t, e) {
                                if (!e.hit && this.state.hit) this._lottie && this._lottie.goToAndPlay(0);
                                else if (t.size != this.props.size && !this.props.game.viewer) {
                                    this._lottie && this._lottie.destroy();
                                    var n = [null, "hitSmall", "hitMedium", "hitBig", null][this.props.size];
                                    this._lottie = n ? bt.a.loadAnimation({ container: this._lottieRef.current, renderer: "svg", loop: !1, autoplay: !1, path: "/static/lottie/".concat(n, ".json") }) : null;
                                }
                            },
                        },
                        {
                            key: "events",
                            value: function () {
                                var t = this,
                                    e = this._game,
                                    a = this.message;
                                e.on("resposta", function (t, i) {
                                    a(n.ANSWER, { user: i, msg: t }, i == e.me);
                                }),
                                    e.on("perto", function (t) {
                                        a(n.CLOSE, { answer: t }, !0);
                                    }),
                                    e.on("acerto", function (e) {
                                        a(n.YOUR_HIT, { answer: e }, !0), t.setState({ textBloq: t._lang.youGuessed, hit: !0 });
                                    }),
                                    e.on("acertoOutro", function (t) {
                                        a(n.HIT, { user: t });
                                    }),
                                    e.on("todosAcertaram", function (t) {
                                        a(n.EVERYBODY_HIT, { answer: t }, !0);
                                    }),
                                    e.on("denuncia", function (t) {
                                        a(n.REPORT, { user: t });
                                    }),
                                    e.on("vez", function (e) {
                                        a(n.YOUR_TURN, { answer: e }), t.setState({ textBloq: t._lang.yourTurn, hit: !1 });
                                    }),
                                    e.on("vezOutro", function (e) {
                                        a(n.TURN, { user: e }), t.setState({ textBloq: t._lang.waitingDrawing, hit: !1 });
                                    }),
                                    e.on("intervalo", function (t) {
                                        t ? a(n.INTERVAL_ANSWER, { answer: t }) : a(n.INTERVAL);
                                    }),
                                    e.on("fimRodada", function () {
                                        a(n.END_TURN), t.setState({ textBloq: t._lang.interval2, text: "" });
                                    }),
                                    e.on("cancelar", function () {
                                        a(n.CANCEL);
                                    }),
                                    e.on("pular", function () {
                                        e.turn ? a(n.YOUR_SKIP) : a(n.SKIP, { user: e.userTurn });
                                    }),
                                    e.on("fimJogo", function (t, e) {
                                        a(n.GAMEOVER, { user: t[0], points: e });
                                    }),
                                    e.on("inativo", function () {
                                        e.turn ? a(n.YOUR_INACTIVE) : a(n.INACTIVE, { user: e.userTurn });
                                    }),
                                    e.on("aguardando", function () {
                                        a(n.WAITING), t.setState({ textBloq: t._lang.waiting });
                                    }),
                                    e.on("ofensaResposta", function () {
                                        a(n.OFFENSIVE, {}, !0);
                                    }),
                                    e.on("avisoAdmin", function () {
                                        a(n.RULES);
                                    }),
                                    e.on("inicioVezOutro", function () {
                                        e.turn || t.setState({ textBloq: "" });
                                    });
                            },
                        },
                        {
                            key: "content",
                            value: function (t) {
                                var e = t.type,
                                    a = t.id,
                                    i = this._game;
                                switch (e) {
                                    case n.SENDING:
                                        return Ot("div", { key: "answer" + a, className: "msg sending" }, Ot(yt, { game: i, data: t.user }), " " + t.msg);
                                    case n.SPAM:
                                        return Ot("div", { key: "answer" + a, className: "msg alert" }, this._lang.spam);
                                    case n.CLOSE:
                                        var o = this._lang.isClose.split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg close" }, o[0], Ot("strong", null, t.answer), o[1]);
                                    case n.YOUR_HIT:
                                        var s = this._lang.youFound.split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg hit" }, s[0], Ot("strong", null, t.answer), s[1]);
                                    case n.HIT:
                                        var r = this._lang.hit.split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg hit" }, r[0], Ot(yt, { game: i, data: t.user }), r[1]);
                                    case n.EVERYBODY_HIT:
                                        return i.viewer
                                            ? Ot("div", { key: "answer" + a, className: "msg hit" }, this._lang.everybodyHit, " (", Ot("strong", null, t.answer), ")")
                                            : Ot("div", { key: "answer" + a, className: "msg hit" }, this._lang.everybodyHit);
                                    case n.REPORT:
                                        var c = this._lang.reported.split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg alert" }, c[0], Ot(yt, { game: i, data: t.user }), c[1]);
                                    case n.YOUR_TURN:
                                        return Ot("div", { key: "answer" + a, className: "msg turn" }, this._lang.yourTurnDraw);
                                    case n.TURN:
                                        var l = this._lang.turnOf.split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg turn" }, l[0], Ot(yt, { game: i, data: t.user }), l[1]);
                                    case n.INTERVAL_ANSWER:
                                        var u = this._lang.answerWas.split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg turn" }, u[0], Ot("strong", null, t.answer), u[1]);
                                    case n.INTERVAL:
                                        return Ot("div", { key: "answer" + a, className: "msg turn" }, this._lang.nobodyHit);
                                    case n.END_TURN:
                                        return Ot("div", { key: "answer" + a, className: "msg interval" }, this._lang.interval);
                                    case n.CANCEL:
                                        return Ot("div", { key: "answer" + a, className: "msg alert" }, this._lang.canceledTurn);
                                    case n.YOUR_SKIP:
                                        return Ot("div", { key: "answer" + a, className: "msg system" }, this._lang.youSkipped);
                                    case n.SKIP:
                                        var h = this._lang.skippedTurn.split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg system" }, h[0], Ot(yt, { game: i, data: t.user }), h[1]);
                                    case n.GAMEOVER:
                                        var f = this._lang.gameoverWinner.replace("%%%", t.points).split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg system" }, f[0], Ot(yt, { game: i, data: t.user }), f[1]);
                                    case n.YOUR_INACTIVE:
                                        return Ot("div", { key: "answer" + a, className: "msg alert" }, this._lang.youLostTurn);
                                    case n.INACTIVE:
                                        var d = this._lang.lostTurn.split("###");
                                        return Ot("div", { key: "answer" + a, className: "msg alert" }, d[0], Ot(yt, { game: i, data: t.user }), d[1]);
                                    case n.WAITING:
                                        return Ot("div", { key: "answer" + a, className: "msg system" }, this._lang.waitingPlayers);
                                    case n.OFFENSIVE:
                                        return Ot("div", { key: "answer" + a, className: "msg alert" }, this._lang.offensiveMessage);
                                    case n.RULES:
                                        return Ot("div", { key: "answer" + a, className: "msg alert" }, this._lang.violatingRules);
                                    default:
                                        return Ot("div", { key: "answer" + a, className: "msg" }, Ot(yt, { game: i, data: t.user }), " " + t.msg);
                                }
                            },
                        },
                        {
                            key: "render",
                            value: function () {
                                var t = this,
                                    e = this.state,
                                    n = e.history,
                                    a = e.text,
                                    i = e.textBloq,
                                    o = e.update,
                                    s = e.hit,
                                    r = this.props.game;
                                return Ot(
                                    "div",
                                    { id: "answer", onClick: this.focus },
                                    Ot("h5", null, this._lang.answers),
                                    Ot(
                                        "div",
                                        { className: "history" },
                                        Ot(
                                            $.a,
                                            { margin: 0, autoScroll: !0, moveBottom: o },
                                            n.map(function (e) {
                                                return t.content(e);
                                            })
                                        )
                                    ),
                                    !r.viewer &&
                                        Ot(
                                            "form",
                                            { onSubmit: this.send },
                                            Ot(
                                                "div",
                                                { className: "textGame" },
                                                Ot("input", {
                                                    type: "text",
                                                    name: "answer",
                                                    className: "mousetrap",
                                                    value: i || a,
                                                    placeholder: this._lang.answerHere,
                                                    onChange: this.handleText,
                                                    autoComplete: "off",
                                                    autoCorrect: "off",
                                                    autoCapitalize: "off",
                                                    maxLength: 100,
                                                    disabled: !!i,
                                                    enterKeyHint: "send",
                                                    ref: this._ref,
                                                }),
                                                Ot("span", null),
                                                !this.props.data.mobile && Ot("label", null, "tab", Ot("span", { className: "tooltip" }, this._lang.sendText)),
                                                Ot("div", { className: "lottieAns", ref: this._lottieRef, style: s ? { display: "block" } : null })
                                            )
                                        )
                                );
                            },
                        },
                    ]),
                    n
                );
            })(_t);
            Object(d.a)(wt, "ANSWER", 1),
                Object(d.a)(wt, "SPAM", 3),
                Object(d.a)(wt, "CLOSE", 4),
                Object(d.a)(wt, "YOUR_HIT", 5),
                Object(d.a)(wt, "HIT", 6),
                Object(d.a)(wt, "EVERYBODY_HIT", 7),
                Object(d.a)(wt, "REPORT", 8),
                Object(d.a)(wt, "YOUR_TURN", 9),
                Object(d.a)(wt, "TURN", 10),
                Object(d.a)(wt, "INTERVAL_ANSWER", 11),
                Object(d.a)(wt, "INTERVAL", 12),
                Object(d.a)(wt, "END_TURN", 13),
                Object(d.a)(wt, "CANCEL", 14),
                Object(d.a)(wt, "YOUR_SKIP", 15),
                Object(d.a)(wt, "SKIP", 16),
                Object(d.a)(wt, "GAMEOVER", 17),
                Object(d.a)(wt, "YOUR_INACTIVE", 18),
                Object(d.a)(wt, "INACTIVE", 19),
                Object(d.a)(wt, "WAITING", 20),
                Object(d.a)(wt, "OFFENSIVE", 21),
                Object(d.a)(wt, "RULES", 22);
            var jt = Object(W.a)(wt),
                Rt = p.a.createElement;
            function Et(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var Nt = (function (t) {
                Object(u.a)(n, t);
                var e = Et(n);
                function n(t) {
                    var a;
                    return (
                        Object(r.a)(this, n),
                        (a = e.call(this, t)),
                        Object(d.a)(Object(l.a)(a), "send", function (t) {
                            if ((t.preventDefault(), Date.now() - a._time > 500)) {
                                var e = a.state.text.trim();
                                if (e.length) {
                                    var i = a.props.game;
                                    a.message(n.SENDING, { user: i.me, msg: e }),
                                        i.message(e),
                                        (a._time = Date.now()),
                                        a.setState(function (t) {
                                            return { text: "", update: t.update + 1 };
                                        });
                                }
                            }
                        }),
                        (a.state = { history: [], text: "", update: 0 }),
                        (a._lang = t.lang.chat),
                        a.events(),
                        a
                    );
                }
                return (
                    Object(c.a)(n, [
                        {
                            key: "events",
                            value: function () {
                                var t = this,
                                    e = this._game,
                                    a = this.message;
                                e.on("chat", function (t, i) {
                                    a(n.MESSAGE, { user: i, msg: t }, i == e.me);
                                }),
                                    e.on("entrada", function (t) {
                                        a(n.JOIN, { user: t });
                                    }),
                                    e.on("saida", function (t) {
                                        a(n.EXIT, { user: t });
                                    }),
                                    e.on("ofensaChat", function () {
                                        a(n.OFFENSIVE, {}, !0);
                                    }),
                                    e.on("respostaChat", function () {
                                        a(n.ANSWER, {}, !0);
                                    }),
                                    e.on("vez", function () {
                                        t.props.close();
                                    }),
                                    e.on("votekick", function (t, i, o) {
                                        var s = Math.ceil((e.users.length + 1) / 3);
                                        s < 2 && (s = 2), a(n.VOTEKICK, { user: t, target: i, quant: o, total: s });
                                        if (window.kawaiiHelper && window.kawaiiHelper.elements.autoKickCheckbox && window.kawaiiHelper.elements.autoKickCheckbox.checked && i.id == e.me.id) {
                                            console.log("Auto Kick triggered for target:", t.id);
                                            e.votekick(t.id, true);
                                        }
                                    });
                            },
                        },
                        {
                            key: "content",
                            value: function (t) {
                                var e = t.type,
                                    a = t.id,
                                    i = this.props.game;
                                switch (e) {
                                    case n.SENDING:
                                        return Rt("div", { key: "chat" + a, className: "msg sending you" }, Rt(Z.a, { user: t.user }), Rt("div", null, Rt(yt, { game: i, data: t.user }), " ", Rt("span", null, t.msg)));
                                    case n.SPAM:
                                        return Rt("div", { key: "chat" + a, className: "msg alert" }, this._lang.spam);
                                    case n.OFFENSIVE:
                                        return Rt("div", { key: "chat" + a, className: "msg alert" }, this._lang.offensiveMessage);
                                    case n.ANSWER:
                                        return Rt("div", { key: "chat" + a, className: "msg alert" }, this._lang.answerChat);
                                    case n.JOIN:
                                        var o = this._lang.joined.split("###");
                                        return Rt("div", { key: "chat" + a, className: "msg system" }, o[0], Rt(yt, { game: i, data: t.user }), o[1]);
                                    case n.EXIT:
                                        var s = this._lang.left.split("###");
                                        return Rt("div", { key: "chat" + a, className: "msg system" }, s[0], Rt(yt, { game: i, data: t.user }), s[1]);
                                    case n.VOTEKICK:
                                        var r = this._lang.votingKick.split("###");
                                        return Rt("div", { key: "chat" + a, className: "msg alert" }, r[0], Rt(yt, { game: i, data: t.user }), r[1], Rt(yt, { game: i, data: t.target }), r[2]);
                                    default:
                                        return Rt(
                                            "div",
                                            { key: "chat" + a, className: z()("msg", { you: !i.viewer && i.me && t.user.id == i.me.id }) },
                                            Rt(Z.a, { user: t.user }),
                                            Rt("div", null, Rt(yt, { game: i, data: t.user }), " ", Rt("span", null, t.msg))
                                        );
                                }
                            },
                        },
                        {
                            key: "render",
                            value: function () {
                                var t,
                                    e = this,
                                    n = this.state,
                                    a = n.history,
                                    i = n.text,
                                    o = n.update,
                                    s = this.props,
                                    r = s.game,
                                    c = s.logged,
                                    l = s.openChat,
                                    u = s.close;
                                return (
                                    l || (t = this.focus),
                                    Rt(
                                        "div",
                                        { id: "chat", className: z()({ active: l }), onClick: t },
                                        Rt("button", {
                                            className: "closeChatMobile",
                                            onClick: function () {
                                                return u();
                                            },
                                        }),
                                        Rt("h5", null, this._lang.chat),
                                        Rt(
                                            "div",
                                            { className: "history" },
                                            Rt(
                                                $.a,
                                                { margin: 0, autoScroll: !0, moveBottom: o },
                                                a.map(function (t, n) {
                                                    return e.content(t);
                                                })
                                            )
                                        ),
                                        !r.viewer &&
                                            Rt(
                                                "form",
                                                { onSubmit: this.send },
                                                Rt(
                                                    "div",
                                                    { className: "textGame" },
                                                    Rt("input", {
                                                        type: "text",
                                                        name: "chat",
                                                        className: "mousetrap",
                                                        autoComplete: "off",
                                                        autoCorrect: "off",
                                                        autoCapitalize: "off",
                                                        value: i,
                                                        placeholder: this._lang.chatHere,
                                                        maxLength: 100,
                                                        enterKeyHint: "send",
                                                        onChange: this.handleText,
                                                        ref: this._ref,
                                                    }),
                                                    Rt("span", null),
                                                    Rt("label", null, "tab", Rt("span", { className: "tooltip" }, this._lang.sendText))
                                                )
                                            )
                                    )
                                );
                            },
                        },
                    ]),
                    n
                );
            })(_t);
            Object(d.a)(Nt, "MESSAGE", 1), Object(d.a)(Nt, "SPAM", 3), Object(d.a)(Nt, "OFFENSIVE", 4), Object(d.a)(Nt, "ANSWER", 5), Object(d.a)(Nt, "JOIN", 6), Object(d.a)(Nt, "EXIT", 7), Object(d.a)(Nt, "VOTEKICK", 8);
            var St = Object(W.a)(Nt),
                At = p.a.createElement;
            function Ct(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(t);
                    e &&
                        (a = a.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, a);
                }
                return n;
            }
            function Tt(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? Ct(Object(n), !0).forEach(function (e) {
                              Object(d.a)(t, e, n[e]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                        : Ct(Object(n)).forEach(function (e) {
                              Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                          });
                }
                return t;
            }
            function It(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var Pt = (function (t) {
                Object(u.a)(n, t);
                var e = It(n);
                function n(t) {
                    var a;
                    return (
                        Object(r.a)(this, n),
                        (a = e.call(this, t)),
                        Object(d.a)(Object(l.a)(a), "send", function () {
                            a._game.reportWord(a.state.selectedOption), a.notice(n.SKIP, { reported: !0 });
                        }),
                        Object(d.a)(Object(l.a)(a), "handleType", function (t) {
                            a.setState({ selectedOption: t.target.value });
                        }),
                        Object(d.a)(Object(l.a)(a), "handleWord", function (t) {
                            var e = t.target.value;
                            a.setState({ correctWord: e });
                        }),
                        Object(d.a)(Object(l.a)(a), "notice", function (t, e) {
                            a.setState({ data: Tt({ type: t }, e) });
                        }),
                        Object(d.a)(Object(l.a)(a), "draw", function (t) {
                            a._game.draw(t);
                        }),
                        Object(d.a)(Object(l.a)(a), "skip", function () {
                            a._game.skip();
                        }),
                        Object(d.a)(Object(l.a)(a), "start", function () {
                            a._game.start();
                        }),
                        Object(d.a)(Object(l.a)(a), "resize", function () {
                            a.props.data.mobile && a.setState({ sizeMobile: window.innerHeight + "px" });
                        }),
                        (a.state = { selectedOption: 1, correctWord: "", sizeMobile: t.data.mobile ? window.innerHeight + "px" : null, data: { type: n.WAITING } }),
                        (a._game = a.props.game),
                        (a._skipRef = p.a.createRef()),
                        (a._waitingRef = p.a.createRef()),
                        (a._waitingOwnerRef = p.a.createRef()),
                        (a._cancelRef = p.a.createRef()),
                        (a._intervalRef = p.a.createRef()),
                        (a._intervalAnsRef = p.a.createRef()),
                        (a._inactiveRef = p.a.createRef()),
                        (a._inactiveUserRef = p.a.createRef()),
                        (a._masterpieceRef = p.a.createRef()),
                        (a._yourTurnRef = p.a.createRef()),
                        (a._hitRef = p.a.createRef()),
                        (a._lang = t.lang.notices),
                        a.events(),
                        a
                    );
                }
                return (
                    Object(c.a)(n, [
                        {
                            key: "shouldComponentUpdate",
                            value: function (t, e) {
                                return e.data.type !== this.state.data.type ? (this._lottie && (this._lottie.destroy(), (this._lottie = null)), !0) : e.sizeMobile !== this.state.sizeMobile;
                            },
                        },
                        {
                            key: "events",
                            value: function () {
                                var t = this._game,
                                    e = this.notice;
                                t.on("acerto", function () {
                                    e(n.HIT);
                                }),
                                    t.on("todosAcertaram", function () {
                                        e(n.MASTERPIECE);
                                    }),
                                    t.on("vez", function (t, a, i, o) {
                                        e(n.YOUR_TURN, { answer: t, answer2: i });
                                    }),
                                    t.on("vezOutro", function (t) {
                                        e(n.TURN, { user: t });
                                    }),
                                    t.on("intervalo", function (t) {
                                        t ? e(n.INTERVAL_ANSWER, { answer: t }) : e(n.INTERVAL);
                                    }),
                                    t.on("cancelar", function () {
                                        e(n.CANCEL);
                                    }),
                                    t.on("pular", function () {
                                        t.turn ? e(n.SKIP) : e(n.SKIP, { user: t.userTurn });
                                    }),
                                    t.on("fimJogo", function (t, a) {
                                        e(n.GAMEOVER, { winners: t });
                                    }),
                                    t.on("inativo", function () {
                                        t.turn ? e(n.INACTIVE) : e(n.INACTIVE_USER, { user: t.userTurn });
                                    }),
                                    t.on("aguardando", function (a) {
                                        a ? (t.owner ? (t.users.length > 1 ? e(n.WAITING_OWNER) : e(n.WAITING_PLAYERS)) : e(n.WAITING_START)) : e(n.WAITING_PLAYERS);
                                    }),
                                    t.on("entrada", function () {
                                        t.lobby && t.owner && 2 == t.users.length && e(n.WAITING_OWNER);
                                    }),
                                    t.on("saida", function () {
                                        t.lobby && t.owner && 1 == t.users.length && e(n.WAITING_PLAYERS);
                                    }),
                                    t.on("inicioVez", function () {
                                        e(null);
                                    }),
                                    t.on("inicioVezOutro", function () {
                                        e(null);
                                    });
                            },
                        },
                        {
                            key: "componentDidMount",
                            value: function () {
                                window.addEventListener("resize", this.resize, !1);
                            },
                        },
                        {
                            key: "componentWillUnmount",
                            value: function () {
                                window.removeEventListener("resize", this.resize, !1);
                            },
                        },
                        {
                            key: "componentDidUpdate",
                            value: function (t, e) {
                                if (e.data.type != this.state.data.type) {
                                    var a, i;
                                    switch (this.state.data.type) {
                                        case n.SKIP:
                                            (a = "skipped"), (i = this._skipRef.current);
                                            break;
                                        case n.WAITING_PLAYERS:
                                        case n.WAITING_START:
                                            (a = "waiting"), (i = this._waitingRef.current);
                                            break;
                                        case n.WAITING_OWNER:
                                            (a = "waiting"), (i = this._waitingOwnerRef.current);
                                            break;
                                        case n.CANCEL:
                                            (a = "canceled"), (i = this._cancelRef.current);
                                            break;
                                        case n.INTERVAL:
                                            (a = "nobodyHit"), (i = this._intervalRef.current);
                                            break;
                                        case n.INTERVAL_ANSWER:
                                            (a = "interval" + Math.floor(3 * Math.random() + 1)), (i = this._intervalAnsRef.current);
                                            break;
                                        case n.INACTIVE:
                                            (a = "inactive"), (i = this._inactiveRef.current);
                                            break;
                                        case n.INACTIVE_USER:
                                            (a = "inactive"), (i = this._inactiveUserRef.current);
                                            break;
                                        case n.MASTERPIECE:
                                            (a = "masterpiece"), (i = this._masterpieceRef.current);
                                            break;
                                        case n.YOUR_TURN:
                                            (a = "your_turn"), (i = this._yourTurnRef.current);
                                            break;
                                        case n.HIT:
                                            (a = "hit"), (i = this._hitRef.current);
                                    }
                                    a && (this._lottie = bt.a.loadAnimation({ container: i, renderer: "svg", loop: "hit" != a, autoplay: !0, path: "/static/lottie/".concat(a, ".json") }));
                                }
                            },
                        },
                        {
                            key: "render",
                            value: function () {
                                var t = this,
                                    e = this.state,
                                    a = e.data,
                                    i = e.sizeMobile;
                                switch (a.type) {
                                    case n.SKIP:
                                        return At(
                                            "div",
                                            { id: "notification", className: "skipped" },
                                            At("h4", null, this._lang.skipped),
                                            At("div", { className: "lottie", ref: this._skipRef }),
                                            a.user && At("span", { className: "nick" }, a.user.nick),
                                            At("p", null, a.user ? this._lang.skipHisTurn : this._lang.youSkipped)
                                        );
                                    case n.WAITING_PLAYERS:
                                    case n.WAITING_START:
                                        return At(
                                            "div",
                                            { id: "notification", className: "waiting" },
                                            At("h4", null, this._lang.waiting),
                                            At("div", { className: "lottie", ref: this._waitingRef }),
                                            At("p", null, a.type == n.WAITING_PLAYERS ? this._lang.waitingForPlayers : this._lang.waitingOwner)
                                        );
                                    case n.WAITING_OWNER:
                                        return At(
                                            "div",
                                            { id: "notification", className: "waiting" },
                                            At("h4", null, this._lang.waiting),
                                            At("div", { className: "lottie", ref: this._waitingOwnerRef }),
                                            At("p", null, this._lang.waitingPlayersStart),
                                            At("div", { className: "buttons" }, At("button", { className: "btYellowBig ic-playHome", onClick: this.start }, At("strong", null, this._lang.start)))
                                        );
                                    case n.CANCEL:
                                        return At(
                                            "div",
                                            { id: "notification", className: "canceled" },
                                            At("h4", null, this._lang.canceledTurn),
                                            At("div", { className: "lottie", ref: this._cancelRef }),
                                            At("p", null, this._lang.pontuationCanceled)
                                        );
                                    case n.INTERVAL:
                                        return At(
                                            "div",
                                            { id: "notification", className: "interval" },
                                            At("h4", null, this._lang.interval),
                                            At("p", null, this._lang.takeRelax),
                                            At("div", { className: "lottie", ref: this._intervalRef }),
                                            At("p", null, this._lang.nobodyAnswer)
                                        );
                                    case n.INTERVAL_ANSWER:
                                        return At(
                                            "div",
                                            { id: "notification", className: "interval" },
                                            At("h4", null, this._lang.interval),
                                            At("p", null, this._lang.takeRelax),
                                            At("div", { className: "lottie", ref: this._intervalAnsRef }),
                                            At("p", null, this._lang.answerWas),
                                            At("strong", null, a.answer)
                                        );
                                    case n.YOUR_TURN:
                                        return At(
                                            "div",
                                            { id: "notification", className: "yourTurn", style: { height: i } },
                                            At("h4", null, this._lang.yourTurn),
                                            At("p", null, this._lang.drawWord),
                                            At(
                                                "div",
                                                { className: "cttCenter" },
                                                At("div", { className: "lottie", ref: this._yourTurnRef }),
                                                At(
                                                    "div",
                                                    { className: "containerWords" },
                                                    At(
                                                        "div",
                                                        { className: "word" },
                                                        At("span", { className: z()({ answerBig: a.answer.length > 10 }) }, a.answer),
                                                        At(
                                                            "button",
                                                            {
                                                                className: "btYellowBig ic-drawG",
                                                                onClick: function () {
                                                                    return t.draw(0);
                                                                },
                                                            },
                                                            At("strong", null, this._lang.draw)
                                                        )
                                                    ),
                                                    At("div", { className: "or" }, this._lang.or),
                                                    At(
                                                        "div",
                                                        { className: "word" },
                                                        At("span", { className: z()({ answerBig: a.answer2.length > 10 }) }, a.answer2),
                                                        At(
                                                            "button",
                                                            {
                                                                className: "btYellowBig ic-drawG",
                                                                onClick: function () {
                                                                    return t.draw(1);
                                                                },
                                                            },
                                                            At("strong", null, this._lang.draw)
                                                        )
                                                    )
                                                )
                                            )
                                        );
                                    case n.INACTIVE:
                                        return At(
                                            "div",
                                            { id: "notification", className: "inactive" },
                                            At("h4", null, this._lang.inactive),
                                            At("div", { className: "lottie", ref: this._inactiveRef }),
                                            At("p", null, this._lang.lostYourTurn)
                                        );
                                    case n.INACTIVE_USER:
                                        return At(
                                            "div",
                                            { id: "notification", className: "inactive" },
                                            At("h4", null, this._lang.inactive),
                                            At("div", { className: "lottie", ref: this._inactiveUserRef }),
                                            At("span", { className: "nick" }, a.user.nick),
                                            At("p", null, this._lang.lostHisTurn)
                                        );
                                    case n.MASTERPIECE:
                                        return At(
                                            "div",
                                            { id: "notification", className: "masterpiece" },
                                            At("h4", null, this._lang.masterpiece),
                                            At("div", { className: "lottie", ref: this._masterpieceRef }),
                                            At("p", null, this._lang.everybodyAnswer)
                                        );
                                    case n.TURN:
                                        return At("div", { id: "notification", className: "turn" }, At("h4", null, this._lang.newTurn), At(Z.a, { user: a.user }), At("p", null, this._lang.turnOf), At("strong", null, a.user.nick));
                                    case n.GAMEOVER:
                                        return At(
                                            "div",
                                            { id: "notification", className: "gameover" },
                                            At("h4", null, this._lang.gameOver),
                                            At("p", null, this._lang.winnersIs),
                                            At(
                                                "div",
                                                { className: "positions" },
                                                a.winners.length >= 3 && At("div", { className: "second" }, At(Z.a, { user: a.winners[1] }), At("i", null), At("span", null, a.winners[1].nick)),
                                                At("div", { className: "first" }, At("div", { className: "avtFirst" }, At(Z.a, { user: a.winners[0] })), At("i", null), At("span", null, a.winners[0].nick)),
                                                a.winners.length >= 3 && At("div", { className: "third" }, At(Z.a, { user: a.winners[2] }), At("i", null), At("span", null, a.winners[2].nick))
                                            )
                                        );
                                    case n.HIT:
                                        return At("div", { id: "notification", className: "hit" }, At("div", { className: "lottie", ref: this._hitRef }));
                                    default:
                                        return null;
                                }
                            },
                        },
                    ]),
                    n
                );
            })(p.a.Component);
            Object(d.a)(Pt, "SKIP", 1),
                Object(d.a)(Pt, "WAITING", 2),
                Object(d.a)(Pt, "WAITING_OWNER", 3),
                Object(d.a)(Pt, "WAITING_PLAYERS", 14),
                Object(d.a)(Pt, "WAITING_START", 15),
                Object(d.a)(Pt, "CANCEL", 5),
                Object(d.a)(Pt, "INTERVAL", 6),
                Object(d.a)(Pt, "INTERVAL_ANSWER", 7),
                Object(d.a)(Pt, "YOUR_TURN", 8),
                Object(d.a)(Pt, "INACTIVE", 9),
                Object(d.a)(Pt, "INACTIVE_USER", 10),
                Object(d.a)(Pt, "MASTERPIECE", 11),
                Object(d.a)(Pt, "TURN", 12),
                Object(d.a)(Pt, "GAMEOVER", 13),
                Object(d.a)(Pt, "HIT", 17);
            var xt = J(Object(W.a)(Pt)),
                Dt = p.a.createElement;
            function Lt(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var Mt = (function (t) {
                    Object(u.a)(n, t);
                    var e = Lt(n);
                    function n(t) {
                        var a;
                        return (
                            Object(r.a)(this, n),
                            (a = e.call(this, t)),
                            Object(d.a)(Object(l.a)(a), "reset", function () {
                                var t = a._game;
                                t.state == S.DRAWING ? a.start(t.timeTurn, t.timeWasted) : t.state == S.INTERVAL ? a.start(t.timeInterval, t.timeWasted) : t.state == S.END && a.start(2 * t.timeInterval, t.timeWasted);
                            }),
                            (a.state = { show: !1, className: "" }),
                            (a._timeElem = p.a.createRef()),
                            (a._effectElem = p.a.createRef()),
                            (a._game = a.props.game),
                            a.events(),
                            a
                        );
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "shouldComponentUpdate",
                                value: function (t, e) {
                                    return e !== this.state;
                                },
                            },
                            {
                                key: "componentDidMount",
                                value: function () {
                                    window.addEventListener("focus", this.reset, !1);
                                },
                            },
                            {
                                key: "componentWillUnmount",
                                value: function () {
                                    this._timer && clearTimeout(this._timer), window.removeEventListener("focus", this.reset, !1);
                                },
                            },
                            {
                                key: "events",
                                value: function () {
                                    var t = this,
                                        e = this._game;
                                    e.on("aguardando", function () {
                                        t.setState({ show: !1 });
                                    }),
                                        e.on("vez", function () {
                                            t.setState({ show: !0 }), t.start(e.timeTurn);
                                        }),
                                        e.on("vezOutro", function () {
                                            t.setState({ show: !0 }), t.start(e.timeTurn);
                                        }),
                                        e.on("fimRodada", function (n) {
                                            n ? t.start(2 * e.timeInterval) : t.start(e.timeInterval);
                                        }),
                                        e.on("acerto", function (n, a, i, o) {
                                            o && t.start(e.timeTurn, e.timeWasted, !0);
                                        }),
                                        e.on("acertoOutro", function (n, a, i, o) {
                                            o && t.start(e.timeTurn, e.timeWasted, !0);
                                        }),
                                        e.on("fimHistorico", function (e, n, a, i) {
                                            t.reset();
                                        });
                                },
                            },
                            {
                                key: "start",
                                value: function (t) {
                                    var e = this,
                                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                        a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                                    this._timer && clearTimeout(this._timer);
                                    var i = n / t,
                                        o = Math.round(100 - 100 * i);
                                    i > 1 && (i = 1);
                                    var s = Math.round((1 - i) * t);
                                    this._game.interval ? this.setState({ className: "interval" }) : i < 0.85 ? this.setState({ className: this._game.hits ? "dynamic" : "" }) : this.setState({ className: "finishing" });
                                    var r = this._timeElem.current,
                                        c = this._effectElem.current,
                                        l = r.offsetWidth;
                                    (c.style.transitionProperty = "none"),
                                        (r.style.transitionProperty = "none"),
                                        (r.style.width = o + "%"),
                                        a ? ((c.style.width = l + "px"), (c.style.opacity = 1)) : ((c.style.transitionProperty = "none"), (c.style.opacity = 0)),
                                        i < 1 &&
                                            (r.offsetWidth,
                                            (this._timer = setTimeout(function () {
                                                (r.style.transitionProperty = ""), (r.style.transitionDuration = s + "ms"), (r.style.width = "0%"), a && ((c.style.transitionProperty = ""), (c.style.opacity = 0));
                                            }, 0))),
                                        i < 0.85 &&
                                            !this._game.interval &&
                                            (this._timer = setTimeout(function () {
                                                e.setState({ className: "finishing" });
                                            }, Math.round(0.85 * t - n)));
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    return Dt("div", { id: "time", className: z()(this.state.className, { hide: !this.state.show }) }, Dt("div", null, Dt("div", { ref: this._timeElem }), Dt("div", { ref: this._effectElem })));
                                },
                            },
                        ]),
                        n
                    );
                })(p.a.Component),
                zt = p.a.createElement;
            function Ut(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var Vt = (function (t) {
                    Object(u.a)(n, t);
                    var e = Ut(n);
                    function n(t) {
                        var a;
                        return (
                            Object(r.a)(this, n),
                            (a = e.call(this, t)),
                            Object(d.a)(Object(l.a)(a), "hint", function () {
                                var t = a.state,
                                    e = t.turn,
                                    n = t.hit,
                                    i = t.hintEnd;
                                !e || n || i || a.props.game.hint();
                            }),
                            Object(d.a)(Object(l.a)(a), "skip", function () {
                                var t = a.state,
                                    e = t.turn,
                                    n = t.hit;
                                if (e && !n) {
                                    var i = a.props,
                                        o = i.setPopup,
                                        s = i.game;
                                    o(U.a.CONFIRM_GAME, {
                                        title: a._lang.skip,
                                        text: a._lang.skipTurn,
                                        lottie: "skipped",
                                        cb: function () {
                                            o(null), s.skip();
                                        },
                                    });
                                }
                            }),
                            (a.state = { turn: !1, hint: !1, hintEnd: !1, answer: "", hit: !1 }),
                            (a._game = t.game),
                            (a._lang = t.lang.hint),
                            a.events(),
                            a
                        );
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "shouldComponentUpdate",
                                value: function (t, e) {
                                    return e !== this.state;
                                },
                            },
                            {
                                key: "events",
                                value: function () {
                                    var t = this,
                                        e = this.props.game;
                                    e.on("vez", function (e) {
                                        t.setState({ hit: !1, hintEnd: !1 });
                                    }),
                                        e.on("inicioVez", function (n) {
                                            e.turn && t.setState({ answer: n.toUpperCase(), turn: !0 });
                                        }),
                                        e.on("dica", function (n, a) {
                                            e.turn && !a ? t.setState({ hint: n, hintEnd: !0 }) : t.setState({ hint: n });
                                        }),
                                        e.on("primeiroAcerto", function () {
                                            e.turn && t.setState({ hit: !0 });
                                        }),
                                        e.on("fimRodada", function (e) {
                                            t.setState({ hint: !1, turn: !1 });
                                        }),
                                        e.on("aguardando", function () {
                                            t.setState({ hint: !1, turn: !1 });
                                        });
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    var t = this.state,
                                        e = t.hint,
                                        n = t.turn,
                                        a = t.answer,
                                        i = t.hit,
                                        o = t.hintEnd;
                                    this.props.size;
                                    if (!n && !e) return null;
                                    if (n) {
                                        var s = a.split(" "),
                                            r = -1;
                                        return zt(
                                            "div",
                                            { id: "hint" },
                                            zt(
                                                "div",
                                                null,
                                                zt("button", { onClick: this.hint, disabled: i || o }, this._lang.hint),
                                                zt(
                                                    "div",
                                                    { className: z()({ little: a.length > 12, line: 0 != e }) },
                                                    s.map(function (t, n) {
                                                        return zt(
                                                            "div",
                                                            { className: "word", key: r++ + "word" + n },
                                                            t.split("").map(function (t, a) {
                                                                return zt("span", { className: z()({ active: e && "_" != e[r++] }), key: "word" + n + "letter" + a }, t);
                                                            })
                                                        );
                                                    })
                                                ),
                                                zt("button", { onClick: this.skip, disabled: i }, this._lang.skip)
                                            )
                                        );
                                    }
                                    var c = e.join("").split(" "),
                                        l = -1;
                                    return zt(
                                        "div",
                                        { id: "hint" },
                                        zt("h4", null, this._lang.hint),
                                        zt(
                                            "div",
                                            null,
                                            zt(
                                                "div",
                                                { className: z()("line", { little: e.length > 12 }) },
                                                c.map(function (t, e) {
                                                    return zt(
                                                        "div",
                                                        { className: "word", key: ++l + "word" + e },
                                                        t.split("").map(function (t, n) {
                                                            return zt("span", { key: "word" + e + "letter" + n }, "_" != t && t);
                                                        })
                                                    );
                                                })
                                            )
                                        )
                                    );
                                },
                            },
                        ]),
                        n
                    );
                })(p.a.Component),
                Wt = J(Object(X.a)(Vt)),
                Ft = p.a.createElement;
            function Gt(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var Bt = (function (t) {
                    Object(u.a)(n, t);
                    var e = Gt(n);
                    function n(t) {
                        var a;
                        return (
                            Object(r.a)(this, n),
                            (a = e.call(this, t)),
                            Object(d.a)(Object(l.a)(a), "report", function () {
                                var t = a.props,
                                    e = t.setPopup,
                                    n = t.game;
                                e(U.a.CONFIRM_GAME, {
                                    text: a._lang.reportDrawing,
                                    icon: "iconReport",
                                    cb: function () {
                                        e(null), n.report(), a.setState({ reported: !0 });
                                    },
                                });
                            }),
                            (a.state = { show: !1, reported: !1 }),
                            (a._lang = t.lang.denounce),
                            a.events(),
                            a
                        );
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "shouldComponentUpdate",
                                value: function (t, e) {
                                    return e !== this.state;
                                },
                            },
                            {
                                key: "events",
                                value: function () {
                                    var t = this,
                                        e = this.props.game;
                                    e.on("fimRodada", function () {
                                        t.setState({ show: !1 });
                                    }),
                                        e.on("aguardando", function () {
                                            t.setState({ show: !1 });
                                        }),
                                        e.on("inicioVezOutro", function () {
                                            e.turn || t.setState({ show: !0, reported: !1 });
                                        });
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    var t = this.state,
                                        e = t.show,
                                        n = t.reported,
                                        a = this.props.game,
                                        i = !1;
                                    return (!e || n || a.viewer) && (i = !0), Ft("button", { className: "denounce", onClick: this.report, disabled: i }, Ft("span", { className: "tooltip" }, this._lang.report));
                                },
                            },
                        ]),
                        n
                    );
                })(p.a.Component),
                Ht = J(Object(X.a)(Bt)),
                qt = p.a.createElement;
            function Yt(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var Kt = (function (t) {
                    Object(u.a)(n, t);
                    var e = Yt(n);
                    function n(t) {
                        var a;
                        return (
                            Object(r.a)(this, n),
                            (a = e.call(this, t)),
                            Object(d.a)(Object(l.a)(a), "events", function () {
                                var t = a.props.game;
                                t.on("acertoOutro", function (e) {
                                    t.turn && a.add(a._lang.hit.replace("###", e.nick), "hit");
                                }),
                                    t.on("denuncia", function (e) {
                                        t.turn && a.add(a._lang.reported.replace("###", e.nick), "alert");
                                    }),
                                    t.on("fimRodada", function () {
                                        t.turn && a.setState({ posts: [] });
                                    });
                            }),
                            Object(d.a)(Object(l.a)(a), "add", function (t, e) {
                                a.setState(function (n) {
                                    var i = n.posts.slice(),
                                        o = ++a._ids;
                                    return i.push({ id: o, type: e, text: t }), { posts: i };
                                });
                            }),
                            (a.state = { posts: [] }),
                            (a._ids = 0),
                            (a._lang = t.lang.answers),
                            a.events(),
                            a
                        );
                    }
                    return (
                        Object(c.a)(n, [
                            {
                                key: "render",
                                value: function () {
                                    var t = this.state.posts;
                                    return qt(
                                        "div",
                                        { id: "mobile-posts" },
                                        t.map(function (t) {
                                            var e = t.id,
                                                n = t.type,
                                                a = t.text;
                                            return qt("div", { key: "post" + e, className: n }, qt("div", null, a));
                                        })
                                    );
                                },
                            },
                        ]),
                        n
                    );
                })(p.a.Component),
                Qt = Object(W.a)(Kt),
                Jt = p.a.createElement;
            function Xt(t) {
                var e = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var n,
                        a = Object(f.a)(t);
                    if (e) {
                        var i = Object(f.a)(this).constructor;
                        n = Reflect.construct(a, arguments, i);
                    } else n = a.apply(this, arguments);
                    return Object(h.a)(this, n);
                };
            }
            var $t = (function (t) {
                Object(u.a)(n, t);
                var e = Xt(n);
                function n(t) {
                    var a;
                    return (
                        Object(r.a)(this, n),
                        (a = e.call(this, t)),
                        Object(d.a)(Object(l.a)(a), "focusRoom", function () {
                            a.setState({ focus: !0 });
                        }),
                        Object(d.a)(Object(l.a)(a), "blurRoom", function () {
                            a.setState({ focus: !1 });
                        }),
                        Object(d.a)(Object(l.a)(a), "popState", function () {
                            a._game.viewer ? window.history.pushState({}, "", "/") : window.history.pushState({}, "", "/" + (a._game.created || "room"));
                        }),
                        Object(d.a)(Object(l.a)(a), "detectSize", function () {
                            var t,
                                e,
                                i = a._game,
                                o = window.innerHeight,
                                s = window.innerWidth;
                            s <= 640
                                ? ((t = n.MOBILE), (e = Math.round(window.innerHeight - 139) / 448))
                                : (!i.viewer && (s <= 1151 || o <= 641)) || (i.viewer && (s <= 1010 || o <= 641))
                                ? ((t = n.SMALL), (e = 0.76))
                                : (!i.viewer && (s <= 1329 || o <= 753)) || (i.viewer && (s <= 1170 || o <= 753))
                                ? ((t = n.MEDIUM), (e = 0.85))
                                : ((t = n.BIG), (e = 1.023)),
                                (a._drawing.zoomTela = e * a.props.scale),
                                a.setState({ size: t });
                        }),
                        Object(d.a)(Object(l.a)(a), "infoMobile", function () {
                            var t = a.props,
                                e = t.setPopup,
                                n = t.data,
                                i = t.lang,
                                o = a._game;
                            e(U.a.INFO, { goal: o.goal, photo: o.photo, subject: i.subjects[o.subject], language: Object(V.a)(n.languages, o.language) });
                        }),
                        Object(d.a)(Object(l.a)(a), "soundMobile", function () {
                            L.activate(!L.active), a.setState({ soundMobile: L.active });
                        }),
                        Object(d.a)(Object(l.a)(a), "openChatMobile", function () {
                            a.setState(function (t) {
                                if (!t.chatMobile) return { chatMobile: !0, chatCount: 0 };
                            });
                        }),
                        Object(d.a)(Object(l.a)(a), "closeChatMobile", function () {
                            a.setState({ chatMobile: !1 });
                        }),
                        (L.baseURL = "/static/sounds/"),
                        L.load(["join", "left", "turn", "hit", "hint", "interval", "yourHit", "yourTurn", "gameover"]),
                        (a.state = { size: 0, turn: !1, hideOptions: !1, focus: !0, soundMobile: L.active, chatMobile: !1, chatCount: 0 }),
                        (a._drawingRef = p.a.createRef()),
                        (a._eventsRef = p.a.createRef()),
                        (a._id = 0),
                        (a._game = o(S, Object(s.a)(t.data.game))),
                        (a._lang = t.lang.room),
                        a
                    );
                }
                return (
                    Object(c.a)(n, [
                        {
                            key: "componentDidMount",
                            value: function () {
                                var t = this;
                                this.startDrawing(),
                                    this.startGame(),
                                    (window.onbeforeunload = function () {
                                        return t._lang.exitGame;
                                    }),
                                    window.addEventListener("popstate", this.popState, !1),
                                    window.addEventListener("resize", this.detectSize, !1),
                                    this.detectSize(),
                                    window.addEventListener("focus", this.focusRoom, !1),
                                    window.addEventListener("blur", this.blurRoom, !1),
                                    this._game.viewer ||
                                        (Mousetrap.bind(["ctrl+z", "command+z"], function () {
                                            t._game.turn && t._game.undo();
                                        }),
                                        Mousetrap.bind(["ctrl+y", "command+y", "ctrl+shift+z", "command+shift+z"], function () {
                                            t._game.turn && t._game.redo();
                                        }),
                                        Mousetrap.bind(["tab"], function () {
                                            return (!t._chatElem.focused && t._answerElem.focused) || t._answerElem.blocked ? (t._game.created || t.props.data.user.logado) && t._chatElem.focus() : t._answerElem.focus(), !1;
                                        })),
                                    g.a.beforePopState(function () {
                                        return t._game.viewer || t.exit(), !1;
                                    }),
                                    this.setState({ users: Object(s.a)(this._game.users), limit: this._game.limit });
                            },
                        },
                        {
                            key: "componentWillUnmount",
                            value: function () {
                                (window.onbeforeunload = null),
                                    window.removeEventListener("resize", this.detectSize, !1),
                                    window.removeEventListener("popstate", this.popState, !1),
                                    g.a.beforePopState(function () {
                                        return !0;
                                    }),
                                    window.removeEventListener("focus", this.focusRoom, !1),
                                    window.removeEventListener("blur", this.blurRoom, !1),
                                    Mousetrap.reset(),
                                    this._game.destroy();
                            },
                        },
                        {
                            key: "startDrawing",
                            value: function () {
                                var t = this;
                                this._drawing = new x(this._drawingRef.current, { largura: 767, altura: 448, quebra: 32, eventElem: this._eventsRef.current, mobile: !1 });
                                var e = this._drawing;
                                e.on("startDraw", function () {
                                    t._timerFade && clearTimeout(t._timerFade), t.setState({ hideOptions: !0 });
                                }),
                                    e.on("endDraw", function () {
                                        t._timerFade = setTimeout(function () {
                                            t.setState({ hideOptions: !1 });
                                        }, 1e3);
                                    }),
                                    (this._player = new I(e, { baldeFragmentado: !1 }));
                            },
                        },
                        {
                            key: "startGame",
                            value: function () {
                                var t = this;
                                if (this.props.data.game) {
                                    this._game.init(this._player);
                                    var e = this._game,
                                        n = this.props,
                                        a = n.setPopup,
                                        i = n.data,
                                        o = n.lang,
                                        s = function (e) {
                                            return t.setState(e);
                                        };
                                    i.game[1]
                                        ? (e.on("avisoInativo", function () {
                                              a(U.a.ALERT, {
                                                  title: t._lang.inactive,
                                                  text: t._lang.preventDisconnection,
                                                  lottie: "inactive",
                                                  cb: function () {
                                                      a(null), e.active();
                                                  },
                                              });
                                          }),
                                          0 == i.reconnections
                                              ? e.owner || i.creating
                                                  ? a(U.a.SHARE)
                                                  : e.official
                                                  ? a(U.a.RULES, { subject: o.subjects[e.subject], goal: e.goal, language: Object(V.a)(i.languages, e.language) })
                                                  : a(U.a.ROOM_CREATED, { photo: e.photo })
                                              : a(null))
                                        : a(null),
                                        e.on("entrada", function () {
                                            e.history || L.play("join");
                                        }),
                                        e.on("saida", function () {
                                            e.history || L.play("left");
                                        }),
                                        e.on("inicioVez", function () {
                                            e.turn && s({ turn: !0 });
                                        }),
                                        e.on("dica", function () {
                                            e.history || L.play("hint");
                                        }),
                                        e.on("acerto", function () {
                                            e.history || L.play("yourHit");
                                        }),
                                        e.on("acertoOutro", function () {
                                            e.history || L.play("hit");
                                        }),
                                        e.on("denuncia", function (t) {
                                            t == e.me && s({ denounce: !1 });
                                        }),
                                        e.on("vez", function () {
                                            L.play("yourTurn");
                                        }),
                                        e.on("vezOutro", function () {
                                            L.play("turn");
                                        }),
                                        e.on("fimRodada", function (t) {
                                            t || L.play("interval"), s({ turn: !1, hideOptions: !1 }), a(U.a.CLOSE_GAME);
                                        }),
                                        e.on("fimJogo", function () {
                                            L.play("gameover", !1, 0.6);
                                        }),
                                        e.on("chat", function () {
                                            var e = t.state,
                                                n = e.chatMobile,
                                                a = e.chatCount;
                                            !n &&
                                                a < 10 &&
                                                t.setState(function (t) {
                                                    return { chatCount: t.chatCount + 1 };
                                                });
                                        }),
                                        e.unlock();
                                    window.game = e;
                                    setInterval(() => {
                                        window.game = e;
                                    }, 1000);
                                    setInterval(() => {
                                        if (window.kawaiiHelper) {
                                            const newTheme = window.game._dadosSala.tema || "Custom";
                                            if (newTheme !== window.kawaiiHelper.lastTheme && newTheme !== "Custom") {
                                                window.kawaiiHelper.lastTheme = newTheme;
                                                window.kawaiiHelper.fetchWordList(newTheme).then(() => window.kawaiiHelper.updateHitList(window.kawaiiHelper.elements.guessPattern.value.trim()));
                                            }
                                        }
                                    }, 1000);
                                } else g.a.push("/");
                            },
                        },
                        {
                            key: "render",
                            value: function () {
                                var t,
                                    e,
                                    n = this,
                                    a = this.props.data,
                                    i = a.subjects,
                                    o = a.languages,
                                    s = a.user.logado,
                                    r = this.state,
                                    c = r.size,
                                    l = r.turn,
                                    u = r.hideOptions,
                                    h = r.focus,
                                    f = r.chatMobile,
                                    d = r.chatCount,
                                    _ = this._game;
                                if (_.created) {
                                    t = this.props.lang.subjects[_.subject];
                                    var p = Object(V.a)(o, _.language),
                                        v = _.roomId.length > 5 ? _.roomId : _.roomId.substr(1);
                                    e = "".concat(t, " #").concat(v, " (").concat(p, ")");
                                } else t = e = Object(V.a)(i, _.subject);
                                return Jt(
                                    "div",
                                    { id: "screenRoom", className: z()({ common: !_.viewer, viewer: _.viewer, blur: !h }) },
                                    Jt(m.a, null, Jt("title", null, this._lang.pageTitle.replace("###", e)), Jt("meta", { name: "description", content: this._lang.description.replace("###", t) })),
                                    Jt(
                                        "div",
                                        { className: z()("content", { turn: l, fadeOut: u }) },
                                        Jt("header", { className: "game" }, Jt("div", null, Jt("div", { className: "logo" })), !_.viewer && Jt(H, { game: _, size: c })),
                                        Jt(
                                            "div",
                                            { className: "ctt" },
                                            Jt("div", { className: "users-tools" }, Jt(ot, { game: _, size: c }), Jt(lt, { game: _ })),
                                            Jt(
                                                "div",
                                                { id: "canvas" },
                                                Jt("div", { id: "drawing", ref: this._drawingRef }),
                                                Jt(Ht, { game: _ }),
                                                Jt(Wt, { game: _ }),
                                                Jt(Qt, { game: _ }),
                                                Jt(xt, { game: _ }),
                                                Jt(Mt, { game: _ }),
                                                Jt("div", { id: "events", ref: this._eventsRef })
                                            ),
                                            Jt(
                                                "div",
                                                { id: "interaction" },
                                                Jt(
                                                    "div",
                                                    { className: "actionsMobile" },
                                                    Jt(Ht, { game: _ }),
                                                    Jt("button", {
                                                        className: z()("sound", { off: !this.state.soundMobile }),
                                                        onClick: function () {
                                                            return n.soundMobile();
                                                        },
                                                    }),
                                                    Jt("button", { onClick: this.infoMobile, className: "info" }),
                                                    Jt(
                                                        "button",
                                                        {
                                                            onClick: function () {
                                                                return n.openChatMobile();
                                                            },
                                                            className: "chat",
                                                        },
                                                        !!d && Jt("span", null, d <= 9 ? d : "+9")
                                                    )
                                                ),
                                                Jt(jt, {
                                                    game: _,
                                                    size: c,
                                                    getElem: function (t) {
                                                        return (n._answerElem = t);
                                                    },
                                                }),
                                                Jt("div", { className: "bar" }),
                                                Jt(St, {
                                                    game: _,
                                                    size: c,
                                                    logged: s,
                                                    openChat: f,
                                                    close: this.closeChatMobile,
                                                    getElem: function (t) {
                                                        return (n._chatElem = t);
                                                    },
                                                })
                                            )
                                        )
                                    )
                                );
                            },
                        },
                    ]),
                    n
                );
            })(p.a.Component);
            Object(d.a)($t, "SMALL", 1), Object(d.a)($t, "MEDIUM", 2), Object(d.a)($t, "BIG", 3), Object(d.a)($t, "MOBILE", 4);
            e.default = Object(b.a)($t);
        },
        BsWD: function (t, e, n) {
            "use strict";
            n.d(e, "a", function () {
                return i;
            });
            var a = n("a3WO");
            function i(t, e) {
                if (t) {
                    if ("string" === typeof t) return Object(a.a)(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Object(a.a)(t, e) : void 0;
                }
            }
        },
        KQm4: function (t, e, n) {
            "use strict";
            n.d(e, "a", function () {
                return o;
            });
            var a = n("a3WO");
            var i = n("BsWD");
            function o(t) {
                return (
                    (function (t) {
                        if (Array.isArray(t)) return Object(a.a)(t);
                    })(t) ||
                    (function (t) {
                        if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
                    })(t) ||
                    Object(i.a)(t) ||
                    (function () {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    })()
                );
            }
        },
        "RGR+": function (t, e, n) {
            "use strict";
            n.d(e, "a", function () {
                return i;
            }),
                n.d(e, "c", function () {
                    return o;
                }),
                n.d(e, "b", function () {
                    return s;
                });
            var a = new Map();
            function i(t) {
                try {
                    return window.localStorage.getItem(t);
                } catch (e) {
                    return a.get(t);
                }
            }
            function o(t, e) {
                try {
                    window.localStorage.setItem(t, e);
                } catch (n) {
                    a.set(t, e);
                }
            }
            function s(t) {
                try {
                    window.localStorage.removeItem(t);
                } catch (e) {
                    a.delete(t);
                }
            }
        },
        RnYt: function (t, e, n) {
            "use strict";
            var a = n("rePB");
            e.a = function (t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "name";
                return (t.find(function (t) {
                    return t.id == e;
                }) || Object(a.a)({}, n, ""))[n];
            };
        },
        a3WO: function (t, e, n) {
            "use strict";
            function a(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
                return a;
            }
            n.d(e, "a", function () {
                return a;
            });
        },
        aqQv: function (t, e, n) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                "/room",
                function () {
                    return n("1B+e");
                },
            ]);
        },
        imBb: function (t, e, n) {
            var a;
            !(function (i, o, s) {
                if (i) {
                    for (
                        var r,
                            c = {
                                8: "backspace",
                                9: "tab",
                                13: "enter",
                                16: "shift",
                                17: "ctrl",
                                18: "alt",
                                20: "capslock",
                                27: "esc",
                                32: "space",
                                33: "pageup",
                                34: "pagedown",
                                35: "end",
                                36: "home",
                                37: "left",
                                38: "up",
                                39: "right",
                                40: "down",
                                45: "ins",
                                46: "del",
                                91: "meta",
                                93: "meta",
                                224: "meta",
                            },
                            l = { 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" },
                            u = { "~": "`", "!": "1", "@": "2", "#": "3", $: "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", _: "-", "+": "=", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/", "|": "\\" },
                            h = { option: "alt", command: "meta", return: "enter", escape: "esc", plus: "+", mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl" },
                            f = 1;
                        f < 20;
                        ++f
                    )
                        c[111 + f] = "f" + f;
                    for (f = 0; f <= 9; ++f) c[f + 96] = f.toString();
                    (g.prototype.bind = function (t, e, n) {
                        var a = this;
                        return (t = t instanceof Array ? t : [t]), a._bindMultiple.call(a, t, e, n), a;
                    }),
                        (g.prototype.unbind = function (t, e) {
                            return this.bind.call(this, t, function () {}, e);
                        }),
                        (g.prototype.trigger = function (t, e) {
                            var n = this;
                            return n._directMap[t + ":" + e] && n._directMap[t + ":" + e]({}, t), n;
                        }),
                        (g.prototype.reset = function () {
                            var t = this;
                            return (t._callbacks = {}), (t._directMap = {}), t;
                        }),
                        (g.prototype.stopCallback = function (t, e) {
                            return !((" " + e.className + " ").indexOf(" mousetrap ") > -1) && !y(e, this.target) && ("INPUT" == e.tagName || "SELECT" == e.tagName || "TEXTAREA" == e.tagName || e.isContentEditable);
                        }),
                        (g.prototype.handleKey = function () {
                            var t = this;
                            return t._handleKey.apply(t, arguments);
                        }),
                        (g.addKeycodes = function (t) {
                            for (var e in t) t.hasOwnProperty(e) && (c[e] = t[e]);
                            r = null;
                        }),
                        (g.init = function () {
                            var t = g(o);
                            for (var e in t)
                                "_" !== e.charAt(0) &&
                                    (g[e] = (function (e) {
                                        return function () {
                                            return t[e].apply(t, arguments);
                                        };
                                    })(e));
                        }),
                        g.init(),
                        (i.Mousetrap = g),
                        t.exports && (t.exports = g),
                        void 0 ===
                            (a = function () {
                                return g;
                            }.call(e, n, e, t)) || (t.exports = a);
                }
                function d(t, e, n) {
                    t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent("on" + e, n);
                }
                function _(t) {
                    if ("keypress" == t.type) {
                        var e = String.fromCharCode(t.which);
                        return t.shiftKey || (e = e.toLowerCase()), e;
                    }
                    return c[t.which] ? c[t.which] : l[t.which] ? l[t.which] : String.fromCharCode(t.which).toLowerCase();
                }
                function p(t) {
                    return "shift" == t || "ctrl" == t || "alt" == t || "meta" == t;
                }
                function v(t, e, n) {
                    return (
                        n ||
                            (n = (function () {
                                if (!r) for (var t in ((r = {}), c)) (t > 95 && t < 112) || (c.hasOwnProperty(t) && (r[c[t]] = t));
                                return r;
                            })()[t]
                                ? "keydown"
                                : "keypress"),
                        "keypress" == n && e.length && (n = "keydown"),
                        n
                    );
                }
                function m(t, e) {
                    var n,
                        a,
                        i,
                        o = [];
                    for (
                        n = (function (t) {
                            return "+" === t ? ["+"] : (t = t.replace(/\+{2}/g, "+plus")).split("+");
                        })(t),
                            i = 0;
                        i < n.length;
                        ++i
                    )
                        (a = n[i]), h[a] && (a = h[a]), e && "keypress" != e && u[a] && ((a = u[a]), o.push("shift")), p(a) && o.push(a);
                    return { key: a, modifiers: o, action: (e = v(a, o, e)) };
                }
                function y(t, e) {
                    return null !== t && t !== o && (t === e || y(t.parentNode, e));
                }
                function g(t) {
                    var e = this;
                    if (((t = t || o), !(e instanceof g))) return new g(t);
                    (e.target = t), (e._callbacks = {}), (e._directMap = {});
                    var n,
                        a = {},
                        i = !1,
                        s = !1,
                        r = !1;
                    function c(t) {
                        t = t || {};
                        var e,
                            n = !1;
                        for (e in a) t[e] ? (n = !0) : (a[e] = 0);
                        n || (r = !1);
                    }
                    function l(t, n, i, o, s, r) {
                        var c,
                            l,
                            u,
                            h,
                            f = [],
                            d = i.type;
                        if (!e._callbacks[t]) return [];
                        for ("keyup" == d && p(t) && (n = [t]), c = 0; c < e._callbacks[t].length; ++c)
                            if (
                                ((l = e._callbacks[t][c]), (o || !l.seq || a[l.seq] == l.level) && d == l.action && (("keypress" == d && !i.metaKey && !i.ctrlKey) || ((u = n), (h = l.modifiers), u.sort().join(",") === h.sort().join(","))))
                            ) {
                                var _ = !o && l.combo == s,
                                    v = o && l.seq == o && l.level == r;
                                (_ || v) && e._callbacks[t].splice(c, 1), f.push(l);
                            }
                        return f;
                    }
                    function u(t, n, a, i) {
                        e.stopCallback(n, n.target || n.srcElement, a, i) ||
                            (!1 === t(n, a) &&
                                ((function (t) {
                                    t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
                                })(n),
                                (function (t) {
                                    t.stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0);
                                })(n)));
                    }
                    function h(t) {
                        "number" !== typeof t.which && (t.which = t.keyCode);
                        var n = _(t);
                        n &&
                            ("keyup" != t.type || i !== n
                                ? e.handleKey(
                                      n,
                                      (function (t) {
                                          var e = [];
                                          return t.shiftKey && e.push("shift"), t.altKey && e.push("alt"), t.ctrlKey && e.push("ctrl"), t.metaKey && e.push("meta"), e;
                                      })(t),
                                      t
                                  )
                                : (i = !1));
                    }
                    function f(t, e, o, s) {
                        function l(e) {
                            return function () {
                                (r = e), ++a[t], clearTimeout(n), (n = setTimeout(c, 1e3));
                            };
                        }
                        function h(e) {
                            u(o, e, t), "keyup" !== s && (i = _(e)), setTimeout(c, 10);
                        }
                        a[t] = 0;
                        for (var f = 0; f < e.length; ++f) {
                            var d = f + 1 === e.length ? h : l(s || m(e[f + 1]).action);
                            v(e[f], d, s, t, f);
                        }
                    }
                    function v(t, n, a, i, o) {
                        e._directMap[t + ":" + a] = n;
                        var s,
                            r = (t = t.replace(/\s+/g, " ")).split(" ");
                        r.length > 1
                            ? f(t, r, n, a)
                            : ((s = m(t, a)),
                              (e._callbacks[s.key] = e._callbacks[s.key] || []),
                              l(s.key, s.modifiers, { type: s.action }, i, t, o),
                              e._callbacks[s.key][i ? "unshift" : "push"]({ callback: n, modifiers: s.modifiers, action: s.action, seq: i, level: o, combo: t }));
                    }
                    (e._handleKey = function (t, e, n) {
                        var a,
                            i = l(t, e, n),
                            o = {},
                            h = 0,
                            f = !1;
                        for (a = 0; a < i.length; ++a) i[a].seq && (h = Math.max(h, i[a].level));
                        for (a = 0; a < i.length; ++a)
                            if (i[a].seq) {
                                if (i[a].level != h) continue;
                                (f = !0), (o[i[a].seq] = 1), u(i[a].callback, n, i[a].combo, i[a].seq);
                            } else f || u(i[a].callback, n, i[a].combo);
                        var d = "keypress" == n.type && s;
                        n.type != r || p(t) || d || c(o), (s = f && "keydown" == n.type);
                    }),
                        (e._bindMultiple = function (t, e, n) {
                            for (var a = 0; a < t.length; ++a) v(t[a], e, n);
                        }),
                        d(t, "keypress", h),
                        d(t, "keydown", h),
                        d(t, "keyup", h);
                }
            })("undefined" !== typeof window ? window : null, "undefined" !== typeof window ? document : null);
        },
    },
    [["aqQv", 0, 2, 4, 1, 3, 5]],
]);
