/*! jQuery Mobile v1.4.2 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */
(function(e, t, n) {
    typeof define == "function" && define.amd ? define(["jquery"], function(r) {
        return n(r, e, t),
        r.mobile
    }) : n(e.jQuery, e, t)
}
)(this, document, function(e, t, n, r) {
    (function(e, t, n, r) {
        function T(e) {
            while (e && typeof e.originalEvent != "undefined")
                e = e.originalEvent;
            return e
        }
        function N(t, n) {
            var i = t.type, s, o, a, l, c, h, p, d, v;
            t = e.Event(t),
            t.type = n,
            s = t.originalEvent,
            o = e.event.props,
            i.search(/^(mouse|click)/) > -1 && (o = f);
            if (s)
                for (p = o.length,
                l; p; )
                    l = o[--p],
                    t[l] = s[l];
            i.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1);
            if (i.search(/^touch/) !== -1) {
                a = T(s),
                i = a.touches,
                c = a.changedTouches,
                h = i && i.length ? i[0] : c && c.length ? c[0] : r;
                if (h)
                    for (d = 0,
                    v = u.length; d < v; d++)
                        l = u[d],
                        t[l] = h[l]
            }
            return t
        }
        function C(t) {
            var n = {}, r, s;
            while (t) {
                r = e.data(t, i);
                for (s in r)
                    r[s] && (n[s] = n.hasVirtualBinding = !0);
                t = t.parentNode
            }
            return n
        }
        function k(t, n) {
            var r;
            while (t) {
                r = e.data(t, i);
                if (r && (!n || r[n]))
                    return t;
                t = t.parentNode
            }
            return null
        }
        function L() {
            g = !1
        }
        function A() {
            g = !0
        }
        function O() {
            E = 0,
            v.length = 0,
            m = !1,
            A()
        }
        function M() {
            L()
        }
        function _() {
            D(),
            c = setTimeout(function() {
                c = 0,
                O()
            }, e.vmouse.resetTimerDuration)
        }
        function D() {
            c && (clearTimeout(c),
            c = 0)
        }
        function P(t, n, r) {
            var i;
            if (r && r[t] || !r && k(n.target, t))
                i = N(n, t),
                e(n.target).trigger(i);
            return i
        }
        function H(t) {
            var n = e.data(t.target, s), r;
            !m && (!E || E !== n) && (r = P("v" + t.type, t),
            r && (r.isDefaultPrevented() && t.preventDefault(),
            r.isPropagationStopped() && t.stopPropagation(),
            r.isImmediatePropagationStopped() && t.stopImmediatePropagation()))
        }
        function B(t) {
            var n = T(t).touches, r, i, o;
            n && n.length === 1 && (r = t.target,
            i = C(r),
            i.hasVirtualBinding && (E = w++,
            e.data(r, s, E),
            D(),
            M(),
            d = !1,
            o = T(t).touches[0],
            h = o.pageX,
            p = o.pageY,
            P("vmouseover", t, i),
            P("vmousedown", t, i)))
        }
        function j(e) {
            if (g)
                return;
            d || P("vmousecancel", e, C(e.target)),
            d = !0,
            _()
        }
        function F(t) {
            if (g)
                return;
            var n = T(t).touches[0]
              , r = d
              , i = e.vmouse.moveDistanceThreshold
              , s = C(t.target);
            d = d || Math.abs(n.pageX - h) > i || Math.abs(n.pageY - p) > i,
            d && !r && P("vmousecancel", t, s),
            P("vmousemove", t, s),
            _()
        }
        function I(e) {
            if (g)
                return;
            A();
            var t = C(e.target), n, r;
            P("vmouseup", e, t),
            d || (n = P("vclick", e, t),
            n && n.isDefaultPrevented() && (r = T(e).changedTouches[0],
            v.push({
                touchID: E,
                x: r.clientX,
                y: r.clientY
            }),
            m = !0)),
            P("vmouseout", e, t),
            d = !1,
            _()
        }
        function q(t) {
            var n = e.data(t, i), r;
            if (n)
                for (r in n)
                    if (n[r])
                        return !0;
            return !1
        }
        function R() {}
        function U(t) {
            var n = t.substr(1);
            return {
                setup: function() {
                    q(this) || e.data(this, i, {});
                    var r = e.data(this, i);
                    r[t] = !0,
                    l[t] = (l[t] || 0) + 1,
                    l[t] === 1 && b.bind(n, H),
                    e(this).bind(n, R),
                    y && (l.touchstart = (l.touchstart || 0) + 1,
                    l.touchstart === 1 && b.bind("touchstart", B).bind("touchend", I).bind("touchmove", F).bind("scroll", j))
                },
                teardown: function() {
                    --l[t],
                    l[t] || b.unbind(n, H),
                    y && (--l.touchstart,
                    l.touchstart || b.unbind("touchstart", B).unbind("touchmove", F).unbind("touchend", I).unbind("scroll", j));
                    var r = e(this)
                      , s = e.data(this, i);
                    s && (s[t] = !1),
                    r.unbind(n, R),
                    q(this) || r.removeData(i)
                }
            }
        }
        var i = "virtualMouseBindings", s = "virtualTouchID", o = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "), u = "clientX clientY pageX pageY screenX screenY".split(" "), a = e.event.mouseHooks ? e.event.mouseHooks.props : [], f = e.event.props.concat(a), l = {}, c = 0, h = 0, p = 0, d = !1, v = [], m = !1, g = !1, y = "addEventListener"in n, b = e(n), w = 1, E = 0, S, x;
        e.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        };
        for (x = 0; x < o.length; x++)
            e.event.special[o[x]] = U(o[x]);
        y && n.addEventListener("click", function(t) {
            var n = v.length, r = t.target, i, o, u, a, f, l;
            if (n) {
                i = t.clientX,
                o = t.clientY,
                S = e.vmouse.clickDistanceThreshold,
                u = r;
                while (u) {
                    for (a = 0; a < n; a++) {
                        f = v[a],
                        l = 0;
                        if (u === r && Math.abs(f.x - i) < S && Math.abs(f.y - o) < S || e.data(u, s) === f.touchID) {
                            t.preventDefault(),
                            t.stopPropagation();
                            return
                        }
                    }
                    u = u.parentNode
                }
            }
        }, !0)
    }
    )(e, t, n),
    function(e) {
        e.mobile = {}
    }(e),
    function(e, t) {
        var r = {
            touch: "ontouchend"in n
        };
        e.mobile.support = e.mobile.support || {},
        e.extend(e.support, r),
        e.extend(e.mobile.support, r)
    }(e),
    function(e, t, r) {
        function l(t, n, i, s) {
            var o = i.type;
            i.type = n,
            s ? e.event.trigger(i, r, t) : e.event.dispatch.call(t, i),
            i.type = o
        }
        var i = e(n)
          , s = e.mobile.support.touch
          , o = "touchmove scroll"
          , u = s ? "touchstart" : "mousedown"
          , a = s ? "touchend" : "mouseup"
          , f = s ? "touchmove" : "mousemove";
        e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(t, n) {
            e.fn[n] = function(e) {
                return e ? this.bind(n, e) : this.trigger(n)
            }
            ,
            e.attrFn && (e.attrFn[n] = !0)
        }),
        e.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function s(e, n) {
                    r = n,
                    l(t, r ? "scrollstart" : "scrollstop", e)
                }
                var t = this, n = e(t), r, i;
                n.bind(o, function(t) {
                    if (!e.event.special.scrollstart.enabled)
                        return;
                    r || s(t, !0),
                    clearTimeout(i),
                    i = setTimeout(function() {
                        s(t, !1)
                    }, 50)
                })
            },
            teardown: function() {
                e(this).unbind(o)
            }
        },
        e.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function() {
                var t = this
                  , n = e(t)
                  , r = !1;
                n.bind("vmousedown", function(s) {
                    function a() {
                        clearTimeout(u)
                    }
                    function f() {
                        a(),
                        n.unbind("vclick", c).unbind("vmouseup", a),
                        i.unbind("vmousecancel", f)
                    }
                    function c(e) {
                        f(),
                        !r && o === e.target ? l(t, "tap", e) : r && e.stopPropagation()
                    }
                    r = !1;
                    if (s.which && s.which !== 1)
                        return !1;
                    var o = s.target, u;
                    n.bind("vmouseup", a).bind("vclick", c),
                    i.bind("vmousecancel", f),
                    u = setTimeout(function() {
                        e.event.special.tap.emitTapOnTaphold || (r = !0),
                        l(t, "taphold", e.Event("taphold", {
                            target: o
                        }))
                    }, e.event.special.tap.tapholdThreshold)
                })
            },
            teardown: function() {
                e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),
                i.unbind("vmousecancel")
            }
        },
        e.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function(e) {
                var n = t.pageXOffset
                  , r = t.pageYOffset
                  , i = e.clientX
                  , s = e.clientY;
                if (e.pageY === 0 && Math.floor(s) > Math.floor(e.pageY) || e.pageX === 0 && Math.floor(i) > Math.floor(e.pageX))
                    i -= n,
                    s -= r;
                else if (s < e.pageY - r || i < e.pageX - n)
                    i = e.pageX - n,
                    s = e.pageY - r;
                return {
                    x: i,
                    y: s
                }
            },
            start: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t
                  , r = e.event.special.swipe.getLocation(n);
                return {
                    time: (new Date).getTime(),
                    coords: [r.x, r.y],
                    origin: e(t.target)
                }
            },
            stop: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t
                  , r = e.event.special.swipe.getLocation(n);
                return {
                    time: (new Date).getTime(),
                    coords: [r.x, r.y]
                }
            },
            handleSwipe: function(t, n, r, i) {
                if (n.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - n.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - n.coords[1]) < e.event.special.swipe.verticalDistanceThreshold) {
                    var s = t.coords[0] > n.coords[0] ? "swipeleft" : "swiperight";
                    return l(r, "swipe", e.Event("swipe", {
                        target: i,
                        swipestart: t,
                        swipestop: n
                    }), !0),
                    l(r, s, e.Event(s, {
                        target: i,
                        swipestart: t,
                        swipestop: n
                    }), !0),
                    !0
                }
                return !1
            },
            eventInProgress: !1,
            setup: function() {
                var t, n = this, r = e(n), s = {};
                t = e.data(this, "mobile-events"),
                t || (t = {
                    length: 0
                },
                e.data(this, "mobile-events", t)),
                t.length++,
                t.swipe = s,
                s.start = function(t) {
                    if (e.event.special.swipe.eventInProgress)
                        return;
                    e.event.special.swipe.eventInProgress = !0;
                    var r, o = e.event.special.swipe.start(t), u = t.target, l = !1;
                    s.move = function(t) {
                        if (!o)
                            return;
                        r = e.event.special.swipe.stop(t),
                        l || (l = e.event.special.swipe.handleSwipe(o, r, n, u),
                        l && (e.event.special.swipe.eventInProgress = !1)),
                        Math.abs(o.coords[0] - r.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault()
                    }
                    ,
                    s.stop = function() {
                        l = !0,
                        e.event.special.swipe.eventInProgress = !1,
                        i.off(f, s.move),
                        s.move = null
                    }
                    ,
                    i.on(f, s.move).one(a, s.stop)
                }
                ,
                r.on(u, s.start)
            },
            teardown: function() {
                var t, n;
                t = e.data(this, "mobile-events"),
                t && (n = t.swipe,
                delete t.swipe,
                t.length--,
                t.length === 0 && e.removeData(this, "mobile-events")),
                n && (n.start && e(this).off(u, n.start),
                n.move && i.off(f, n.move),
                n.stop && i.off(a, n.stop))
            }
        },
        e.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe",
            swiperight: "swipe"
        }, function(t, n) {
            e.event.special[t] = {
                setup: function() {
                    e(this).bind(n, e.noop)
                },
                teardown: function() {
                    e(this).unbind(n)
                }
            }
        })
    }(e, this)
});

/**
 * jQuery.fn.sortElements
 * --------------
 */
jQuery.fn.sortElements = function() {
    var a = [].sort;
    return function(b, c) {
        c = c || function() {
            return this
        }
        ;
        var d = this.map(function() {
            var a = c.call(this)
              , b = a.parentNode
              , d = b.insertBefore(document.createTextNode(""), a.nextSibling);
            return function() {
                if (b === this)
                    throw new Error("You can't sort elements if any one is a descendant of another.");
                b.insertBefore(this, d),
                b.removeChild(d)
            }
        });
        return a.call(this, b).each(function(a) {
            d[a].call(c.call(this))
        })
    }
}();

/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}
              , n = i[t] = i[t] || {};
            return n[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0
              , o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
                var s = r && r[o];
                s && (this.off(t, o),
                delete r[o]),
                o.apply(this, e),
                n += s ? 0 : 1,
                o = i[n]
            }
            return this
        }
    }
    ,
    t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function(t, e) {
    function i(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    function n(t) {
        var e = [];
        if (Array.isArray(t))
            e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++)
                e.push(t[i]);
        else
            e.push(t);
        return e
    }
    function o(t, e, r) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)),
        this.elements = n(t),
        this.options = i({}, this.options),
        "function" == typeof e ? r = e : i(this.options, e),
        r && this.on("always", r),
        this.getImages(),
        h && (this.jqDeferred = new h.Deferred),
        void setTimeout(function() {
            this.check()
        }
        .bind(this))) : new o(t,e,r)
    }
    function r(t) {
        this.img = t
    }
    function s(t, e) {
        this.url = t,
        this.element = e,
        this.img = new Image
    }
    var h = t.jQuery
      , a = t.console;
    o.prototype = Object.create(e.prototype),
    o.prototype.options = {},
    o.prototype.getImages = function() {
        this.images = [],
        this.elements.forEach(this.addElementImages, this)
    }
    ,
    o.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t),
        this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    }
    ;
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n; ) {
                var o = n && n[2];
                o && this.addBackground(o, t),
                n = i.exec(e.backgroundImage)
            }
    }
    ,
    o.prototype.addImage = function(t) {
        var e = new r(t);
        this.images.push(e)
    }
    ,
    o.prototype.addBackground = function(t, e) {
        var i = new s(t,e);
        this.images.push(i)
    }
    ,
    o.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0,
        this.hasAnyBroken = !1,
        this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t),
            e.check()
        }) : void this.complete()
    }
    ,
    o.prototype.progress = function(t, e, i) {
        this.progressedCount++,
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
        this.emitEvent("progress", [this, t, e]),
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
        this.progressedCount == this.images.length && this.complete(),
        this.options.debug && a && a.log("progress: " + i, t, e)
    }
    ,
    o.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0,
        this.emitEvent(t, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }
    ,
    r.prototype = Object.create(e.prototype),
    r.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
        this.proxyImage.addEventListener("load", this),
        this.proxyImage.addEventListener("error", this),
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        void (this.proxyImage.src = this.img.src))
    }
    ,
    r.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }
    ,
    r.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.img, e])
    }
    ,
    r.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    r.prototype.onload = function() {
        this.confirm(!0, "onload"),
        this.unbindEvents()
    }
    ,
    r.prototype.onerror = function() {
        this.confirm(!1, "onerror"),
        this.unbindEvents()
    }
    ,
    r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    s.prototype = Object.create(r.prototype),
    s.prototype.check = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
        this.unbindEvents())
    }
    ,
    s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    s.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.element, e])
    }
    ,
    o.makeJQueryPlugin = function(e) {
        e = e || t.jQuery,
        e && (h = e,
        h.fn.imagesLoaded = function(t, e) {
            var i = new o(this,t,e);
            return i.jqDeferred.promise(h(this))
        }
        )
    }
    ,
    o.makeJQueryPlugin(),
    o
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e) {
    e.fn.hoverIntent = function(t, n, r) {
        var i = {
            interval: 30,
            sensitivity: 7,
            timeout: 0
        };
        if (typeof t === "object") {
            i = e.extend(i, t)
        } else if (e.isFunction(n)) {
            i = e.extend(i, {
                over: t,
                out: n,
                selector: r
            })
        } else {
            i = e.extend(i, {
                over: t,
                out: t,
                selector: n
            })
        }
        var s, o, u, a;
        var f = function(e) {
            s = e.pageX;
            o = e.pageY
        };
        var l = function(t, n) {
            n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
            if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
                e(n).off("mousemove.hoverIntent", f);
                n.hoverIntent_s = 1;
                return i.over.apply(n, [t])
            } else {
                u = s;
                a = o;
                n.hoverIntent_t = setTimeout(function() {
                    l(t, n)
                }, i.interval)
            }
        };
        var c = function(e, t) {
            t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
            t.hoverIntent_s = 0;
            return i.out.apply(t, [e])
        };
        var h = function(t) {
            var n = jQuery.extend({}, t);
            var r = this;
            if (r.hoverIntent_t) {
                r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
            }
            if (t.type == "mouseenter") {
                u = n.pageX;
                a = n.pageY;
                e(r).on("mousemove.hoverIntent", f);
                if (r.hoverIntent_s != 1) {
                    r.hoverIntent_t = setTimeout(function() {
                        l(n, r)
                    }, i.interval)
                }
            } else {
                e(r).off("mousemove.hoverIntent", f);
                if (r.hoverIntent_s == 1) {
                    r.hoverIntent_t = setTimeout(function() {
                        c(n, r)
                    }, i.timeout)
                }
            }
        };
        return this.on({
            "mouseenter.hoverIntent": h,
            "mouseleave.hoverIntent": h
        }, i.selector)
    }
}
)(jQuery);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        if (!p)
            p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2)
            return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * VelocityJS.org (1.0.0). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License 
 * VelocityJS.org jQuery Shim (1.0.0-rc1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License.
 */
!function(e) {
    function t(e) {
        var t = e.length
          , r = $.type(e);
        return "function" === r || $.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    if (!e.jQuery) {
        var $ = function(e, t) {
            return new $.fn.init(e,t)
        };
        $.isWindow = function(e) {
            return null != e && e == e.window
        }
        ,
        $.type = function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? a[o.call(e)] || "object" : typeof e
        }
        ,
        $.isArray = Array.isArray || function(e) {
            return "array" === $.type(e)
        }
        ,
        $.isPlainObject = function(e) {
            var t;
            if (!e || "object" !== $.type(e) || e.nodeType || $.isWindow(e))
                return !1;
            try {
                if (e.constructor && !n.call(e, "constructor") && !n.call(e.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (r) {
                return !1
            }
            for (t in e)
                ;
            return void 0 === t || n.call(e, t)
        }
        ,
        $.each = function(e, r, a) {
            var n, o = 0, i = e.length, s = t(e);
            if (a) {
                if (s)
                    for (; i > o && (n = r.apply(e[o], a),
                    n !== !1); o++)
                        ;
                else
                    for (o in e)
                        if (n = r.apply(e[o], a),
                        n === !1)
                            break
            } else if (s)
                for (; i > o && (n = r.call(e[o], o, e[o]),
                n !== !1); o++)
                    ;
            else
                for (o in e)
                    if (n = r.call(e[o], o, e[o]),
                    n === !1)
                        break;
            return e
        }
        ,
        $.data = function(e, t, a) {
            if (void 0 === a) {
                var n = e[$.expando]
                  , o = n && r[n];
                if (void 0 === t)
                    return o;
                if (o && t in o)
                    return o[t]
            } else if (void 0 !== t) {
                var n = e[$.expando] || (e[$.expando] = ++$.uuid);
                return r[n] = r[n] || {},
                r[n][t] = a,
                a
            }
        }
        ,
        $.removeData = function(e, t) {
            var a = e[$.expando]
              , n = a && r[a];
            n && $.each(t, function(e, t) {
                delete n[t]
            })
        }
        ,
        $.extend = function() {
            var e, t, r, a, n, o, i = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
            for ("boolean" == typeof i && (u = i,
            i = arguments[s] || {},
            s++),
            "object" != typeof i && "function" !== $.type(i) && (i = {}),
            s === l && (i = this,
            s--); l > s; s++)
                if (null != (n = arguments[s]))
                    for (a in n)
                        e = i[a],
                        r = n[a],
                        i !== r && (u && r && ($.isPlainObject(r) || (t = $.isArray(r))) ? (t ? (t = !1,
                        o = e && $.isArray(e) ? e : []) : o = e && $.isPlainObject(e) ? e : {},
                        i[a] = $.extend(u, o, r)) : void 0 !== r && (i[a] = r));
            return i
        }
        ,
        $.queue = function(e, r, a) {
            function n(e, r) {
                var a = r || [];
                return null != e && (t(Object(e)) ? !function(e, t) {
                    for (var r = +t.length, a = 0, n = e.length; r > a; )
                        e[n++] = t[a++];
                    if (r !== r)
                        for (; void 0 !== t[a]; )
                            e[n++] = t[a++];
                    return e.length = n,
                    e
                }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)),
                a
            }
            if (e) {
                r = (r || "fx") + "queue";
                var o = $.data(e, r);
                return a ? (!o || $.isArray(a) ? o = $.data(e, r, n(a)) : o.push(a),
                o) : o || []
            }
        }
        ,
        $.dequeue = function(e, t) {
            $.each(e.nodeType ? [e] : e, function(e, r) {
                t = t || "fx";
                var a = $.queue(r, t)
                  , n = a.shift();
                "inprogress" === n && (n = a.shift()),
                n && ("fx" === t && a.unshift("inprogress"),
                n.call(r, function() {
                    $.dequeue(r, t)
                }))
            })
        }
        ,
        $.fn = $.prototype = {
            init: function(e) {
                if (e.nodeType)
                    return this[0] = e,
                    this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var t = this[0].getBoundingClientRect();
                return {
                    top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position; )
                        e = e.offsetParent;
                    return e || document
                }
                var t = this[0]
                  , e = e.apply(t)
                  , r = this.offset()
                  , a = /^(?:body|html)$/i.test(e.nodeName) ? {
                    top: 0,
                    left: 0
                } : $(e).offset();
                return r.top -= parseFloat(t.style.marginTop) || 0,
                r.left -= parseFloat(t.style.marginLeft) || 0,
                e.style && (a.top += parseFloat(e.style.borderTopWidth) || 0,
                a.left += parseFloat(e.style.borderLeftWidth) || 0),
                {
                    top: r.top - a.top,
                    left: r.left - a.left
                }
            }
        };
        var r = {};
        $.expando = "velocity" + (new Date).getTime(),
        $.uuid = 0;
        for (var a = {}, n = a.hasOwnProperty, o = a.toString, i = "Boolean Number String Function Array Date RegExp Object Error".split(" "), s = 0; s < i.length; s++)
            a["[object " + i[s] + "]"] = i[s].toLowerCase();
        $.fn.init.prototype = $.fn,
        e.Velocity = {
            Utilities: $
        }
    }
}(window),
function(e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
}(function() {
    return function(e, t, r, a) {
        function n(e) {
            for (var t = -1, r = e ? e.length : 0, a = []; ++t < r; ) {
                var n = e[t];
                n && a.push(n)
            }
            return a
        }
        function o(e) {
            return g.isWrapped(e) ? e = [].slice.call(e) : g.isNode(e) && (e = [e]),
            e
        }
        function i(e) {
            var t = $.data(e, "velocity");
            return null === t ? a : t
        }
        function s(e) {
            return function(t) {
                return Math.round(t * e) * (1 / e)
            }
        }
        function l(e, r, a, n) {
            function o(e, t) {
                return 1 - 3 * t + 3 * e
            }
            function i(e, t) {
                return 3 * t - 6 * e
            }
            function s(e) {
                return 3 * e
            }
            function l(e, t, r) {
                return ((o(t, r) * e + i(t, r)) * e + s(t)) * e
            }
            function u(e, t, r) {
                return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t)
            }
            function c(t, r) {
                for (var n = 0; m > n; ++n) {
                    var o = u(r, e, a);
                    if (0 === o)
                        return r;
                    var i = l(r, e, a) - t;
                    r -= i / o
                }
                return r
            }
            function p() {
                for (var t = 0; b > t; ++t)
                    w[t] = l(t * x, e, a)
            }
            function f(t, r, n) {
                var o, i, s = 0;
                do
                    i = r + (n - r) / 2,
                    o = l(i, e, a) - t,
                    o > 0 ? n = i : r = i;
                while (Math.abs(o) > h && ++s < v);
                return i
            }
            function d(t) {
                for (var r = 0, n = 1, o = b - 1; n != o && w[n] <= t; ++n)
                    r += x;
                --n;
                var i = (t - w[n]) / (w[n + 1] - w[n])
                  , s = r + i * x
                  , l = u(s, e, a);
                return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x)
            }
            function g() {
                V = !0,
                (e != r || a != n) && p()
            }
            var m = 4
              , y = .001
              , h = 1e-7
              , v = 10
              , b = 11
              , x = 1 / (b - 1)
              , S = "Float32Array"in t;
            if (4 !== arguments.length)
                return !1;
            for (var P = 0; 4 > P; ++P)
                if ("number" != typeof arguments[P] || isNaN(arguments[P]) || !isFinite(arguments[P]))
                    return !1;
            e = Math.min(e, 1),
            a = Math.min(a, 1),
            e = Math.max(e, 0),
            a = Math.max(a, 0);
            var w = S ? new Float32Array(b) : new Array(b)
              , V = !1
              , C = function(t) {
                return V || g(),
                e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n)
            };
            C.getControlPoints = function() {
                return [{
                    x: e,
                    y: r
                }, {
                    x: a,
                    y: n
                }]
            }
            ;
            var T = "generateBezier(" + [e, r, a, n] + ")";
            return C.toString = function() {
                return T
            }
            ,
            C
        }
        function u(e, t) {
            var r = e;
            return g.isString(e) ? v.Easings[e] || (r = !1) : r = g.isArray(e) && 1 === e.length ? s.apply(null, e) : g.isArray(e) && 2 === e.length ? b.apply(null, e.concat([t])) : g.isArray(e) && 4 === e.length ? l.apply(null, e) : !1,
            r === !1 && (r = v.Easings[v.defaults.easing] ? v.defaults.easing : h),
            r
        }
        function c(e) {
            if (e)
                for (var t = (new Date).getTime(), r = 0, n = v.State.calls.length; n > r; r++)
                    if (v.State.calls[r]) {
                        var o = v.State.calls[r]
                          , s = o[0]
                          , l = o[2]
                          , u = o[3];
                        u || (u = v.State.calls[r][3] = t - 16);
                        for (var f = Math.min((t - u) / l.duration, 1), d = 0, m = s.length; m > d; d++) {
                            var y = s[d]
                              , h = y.element;
                            if (i(h)) {
                                var b = !1;
                                if (l.display !== a && null !== l.display && "none" !== l.display) {
                                    if ("flex" === l.display) {
                                        var S = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                        $.each(S, function(e, t) {
                                            x.setPropertyValue(h, "display", t)
                                        })
                                    }
                                    x.setPropertyValue(h, "display", l.display)
                                }
                                l.visibility && "hidden" !== l.visibility && x.setPropertyValue(h, "visibility", l.visibility);
                                for (var w in y)
                                    if ("element" !== w) {
                                        var V = y[w], C, T = g.isString(V.easing) ? v.Easings[V.easing] : V.easing;
                                        if (C = 1 === f ? V.endValue : V.startValue + (V.endValue - V.startValue) * T(f),
                                        V.currentValue = C,
                                        x.Hooks.registered[w]) {
                                            var k = x.Hooks.getRoot(w)
                                              , A = i(h).rootPropertyValueCache[k];
                                            A && (V.rootPropertyValue = A)
                                        }
                                        var F = x.setPropertyValue(h, w, V.currentValue + (0 === parseFloat(C) ? "" : V.unitType), V.rootPropertyValue, V.scrollData);
                                        x.Hooks.registered[w] && (i(h).rootPropertyValueCache[k] = x.Normalizations.registered[k] ? x.Normalizations.registered[k]("extract", null, F[1]) : F[1]),
                                        "transform" === F[0] && (b = !0)
                                    }
                                l.mobileHA && i(h).transformCache.translate3d === a && (i(h).transformCache.translate3d = "(0px, 0px, 0px)",
                                b = !0),
                                b && x.flushTransformCache(h)
                            }
                        }
                        l.display !== a && "none" !== l.display && (v.State.calls[r][2].display = !1),
                        l.visibility && "hidden" !== l.visibility && (v.State.calls[r][2].visibility = !1),
                        l.progress && l.progress.call(o[1], o[1], f, Math.max(0, u + l.duration - t), u),
                        1 === f && p(r)
                    }
            v.State.isTicking && P(c)
        }
        function p(e, t) {
            if (!v.State.calls[e])
                return !1;
            for (var r = v.State.calls[e][0], n = v.State.calls[e][1], o = v.State.calls[e][2], s = v.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
                var p = r[u].element;
                if (t || o.loop || ("none" === o.display && x.setPropertyValue(p, "display", o.display),
                "hidden" === o.visibility && x.setPropertyValue(p, "visibility", o.visibility)),
                ($.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test($.queue(p)[1])) && i(p)) {
                    i(p).isAnimating = !1,
                    i(p).rootPropertyValueCache = {};
                    var f = !1;
                    $.each(x.Lists.transforms3D, function(e, t) {
                        var r = /^scale/.test(t) ? 1 : 0
                          , n = i(p).transformCache[t];
                        i(p).transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (f = !0,
                        delete i(p).transformCache[t])
                    }),
                    o.mobileHA && (f = !0,
                    delete i(p).transformCache.translate3d),
                    f && x.flushTransformCache(p),
                    x.Values.removeClass(p, "velocity-animating")
                }
                if (!t && o.complete && !o.loop && u === c - 1)
                    try {
                        o.complete.call(n, n)
                    } catch (d) {
                        setTimeout(function() {
                            throw d
                        }, 1)
                    }
                s && o.loop !== !0 && s(n),
                o.loop !== !0 || t || ($.each(i(p).tweensContainer, function(e, t) {
                    /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0,
                    t.startValue = 360)
                }),
                v(p, "reverse", {
                    loop: !0,
                    delay: o.delay
                })),
                o.queue !== !1 && $.dequeue(p, o.queue)
            }
            v.State.calls[e] = !1;
            for (var g = 0, m = v.State.calls.length; m > g; g++)
                if (v.State.calls[g] !== !1) {
                    l = !0;
                    break
                }
            l === !1 && (v.State.isTicking = !1,
            delete v.State.calls,
            v.State.calls = [])
        }
        var f = function() {
            if (r.documentMode)
                return r.documentMode;
            for (var e = 7; e > 4; e--) {
                var t = r.createElement("div");
                if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->",
                t.getElementsByTagName("span").length)
                    return t = null,
                    e
            }
            return a
        }(), d = function() {
            var e = 0;
            return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                var r = (new Date).getTime(), a;
                return a = Math.max(0, 16 - (r - e)),
                e = r + a,
                setTimeout(function() {
                    t(r + a)
                }, a)
            }
        }(), g = {
            isString: function(e) {
                return "string" == typeof e
            },
            isArray: Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
            ,
            isFunction: function(e) {
                return "[object Function]" === Object.prototype.toString.call(e)
            },
            isNode: function(e) {
                return e && e.nodeType
            },
            isNodeList: function(e) {
                return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
            },
            isWrapped: function(e) {
                return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
            },
            isSVG: function(e) {
                return t.SVGElement && e instanceof SVGElement
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            }
        }, $, m = !1;
        if (e.fn && e.fn.jquery ? ($ = e,
        m = !0) : $ = t.Velocity.Utilities,
        8 >= f && !m)
            throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= f)
            return void (jQuery.fn.velocity = jQuery.fn.animate);
        var y = 400
          , h = "swing"
          , v = {
            State: {
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                isAndroid: /Android/i.test(navigator.userAgent),
                isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                isChrome: t.chrome,
                isFirefox: /Firefox/i.test(navigator.userAgent),
                prefixElement: r.createElement("div"),
                prefixMatches: {},
                scrollAnchor: null,
                scrollPropertyLeft: null,
                scrollPropertyTop: null,
                isTicking: !1,
                calls: []
            },
            CSS: {},
            Utilities: $,
            Sequences: {},
            Easings: {},
            Promise: t.Promise,
            defaults: {
                queue: "",
                duration: y,
                easing: h,
                begin: null,
                complete: null,
                progress: null,
                display: a,
                loop: !1,
                delay: !1,
                mobileHA: !0,
                _cacheValues: !0
            },
            init: function(e) {
                $.data(e, "velocity", {
                    isSVG: g.isSVG(e),
                    isAnimating: !1,
                    computedStyle: null,
                    tweensContainer: null,
                    rootPropertyValueCache: {},
                    transformCache: {}
                })
            },
            animate: null,
            hook: null,
            mock: !1,
            version: {
                major: 1,
                minor: 0,
                patch: 0
            },
            debug: !1
        };
        t.pageYOffset !== a ? (v.State.scrollAnchor = t,
        v.State.scrollPropertyLeft = "pageXOffset",
        v.State.scrollPropertyTop = "pageYOffset") : (v.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body,
        v.State.scrollPropertyLeft = "scrollLeft",
        v.State.scrollPropertyTop = "scrollTop");
        var b = function() {
            function e(e) {
                return -e.tension * e.x - e.friction * e.v
            }
            function t(t, r, a) {
                var n = {
                    x: t.x + a.dx * r,
                    v: t.v + a.dv * r,
                    tension: t.tension,
                    friction: t.friction
                };
                return {
                    dx: n.v,
                    dv: e(n)
                }
            }
            function r(r, a) {
                var n = {
                    dx: r.v,
                    dv: e(r)
                }
                  , o = t(r, .5 * a, n)
                  , i = t(r, .5 * a, o)
                  , s = t(r, a, i)
                  , l = 1 / 6 * (n.dx + 2 * (o.dx + i.dx) + s.dx)
                  , u = 1 / 6 * (n.dv + 2 * (o.dv + i.dv) + s.dv);
                return r.x = r.x + l * a,
                r.v = r.v + u * a,
                r
            }
            return function a(e, t, n) {
                var o = {
                    x: -1,
                    v: 0,
                    tension: null,
                    friction: null
                }, i = [0], s = 0, l = 1e-4, u = .016, c, p, f;
                for (e = parseFloat(e) || 500,
                t = parseFloat(t) || 20,
                n = n || null,
                o.tension = e,
                o.friction = t,
                c = null !== n,
                c ? (s = a(e, t),
                p = s / n * u) : p = u; ; )
                    if (f = r(f || o, p),
                    i.push(1 + f.x),
                    s += 16,
                    !(Math.abs(f.x) > l && Math.abs(f.v) > l))
                        break;
                return c ? function(e) {
                    return i[e * (i.length - 1) | 0]
                }
                : s
            }
        }();
        v.Easings = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            spring: function(e) {
                return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
            }
        },
        $.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function(e, t) {
            v.Easings[t[0]] = l.apply(null, t[1])
        });
        var x = v.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
            },
            Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function() {
                    for (var e = 0; e < x.Lists.colors.length; e++)
                        x.Hooks.templates[x.Lists.colors[e]] = ["Red Green Blue Alpha", "255 255 255 1"];
                    var t, r, a;
                    if (f)
                        for (t in x.Hooks.templates) {
                            r = x.Hooks.templates[t],
                            a = r[0].split(" ");
                            var n = r[1].match(x.RegEx.valueSplit);
                            "Color" === a[0] && (a.push(a.shift()),
                            n.push(n.shift()),
                            x.Hooks.templates[t] = [a.join(" "), n.join(" ")])
                        }
                    for (t in x.Hooks.templates) {
                        r = x.Hooks.templates[t],
                        a = r[0].split(" ");
                        for (var e in a) {
                            var o = t + a[e]
                              , i = e;
                            x.Hooks.registered[o] = [t, i]
                        }
                    }
                },
                getRoot: function(e) {
                    var t = x.Hooks.registered[e];
                    return t ? t[0] : e
                },
                cleanRootPropertyValue: function(e, t) {
                    return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.Hooks.RegEx.valueUnwrap)[1]),
                    x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]),
                    t
                },
                extractValue: function(e, t) {
                    var r = x.Hooks.registered[e];
                    if (r) {
                        var a = r[0]
                          , n = r[1];
                        return t = x.Hooks.cleanRootPropertyValue(a, t),
                        t.toString().match(x.RegEx.valueSplit)[n]
                    }
                    return t
                },
                injectValue: function(e, t, r) {
                    var a = x.Hooks.registered[e];
                    if (a) {
                        var n = a[0], o = a[1], i, s;
                        return r = x.Hooks.cleanRootPropertyValue(n, r),
                        i = r.toString().match(x.RegEx.valueSplit),
                        i[o] = t,
                        s = i.join(" ")
                    }
                    return r
                }
            },
            Normalizations: {
                registered: {
                    clip: function(e, t, r) {
                        switch (e) {
                        case "name":
                            return "clip";
                        case "extract":
                            var a;
                            return x.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(x.RegEx.valueUnwrap),
                            a = a ? a[1].replace(/,(\s+)?/g, " ") : r),
                            a;
                        case "inject":
                            return "rect(" + r + ")"
                        }
                    },
                    opacity: function(e, t, r) {
                        if (8 >= f)
                            switch (e) {
                            case "name":
                                return "filter";
                            case "extract":
                                var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                                return r = a ? a[1] / 100 : 1;
                            case "inject":
                                return t.style.zoom = 1,
                                parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
                            }
                        else
                            switch (e) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return r;
                            case "inject":
                                return r
                            }
                    }
                },
                register: function() {
                    9 >= f || v.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));
                    for (var e = 0; e < x.Lists.transformsBase.length; e++)
                        !function() {
                            var t = x.Lists.transformsBase[e];
                            x.Normalizations.registered[t] = function(e, r, n) {
                                switch (e) {
                                case "name":
                                    return "transform";
                                case "extract":
                                    return i(r) === a || i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");
                                case "inject":
                                    var o = !1;
                                    switch (t.substr(0, t.length - 1)) {
                                    case "translate":
                                        o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);
                                        break;
                                    case "scal":
                                    case "scale":
                                        v.State.isAndroid && i(r).transformCache[t] === a && 1 > n && (n = 1),
                                        o = !/(\d)$/i.test(n);
                                        break;
                                    case "skew":
                                        o = !/(deg|\d)$/i.test(n);
                                        break;
                                    case "rotate":
                                        o = !/(deg|\d)$/i.test(n)
                                    }
                                    return o || (i(r).transformCache[t] = "(" + n + ")"),
                                    i(r).transformCache[t]
                                }
                            }
                        }();
                    for (var e = 0; e < x.Lists.colors.length; e++)
                        !function() {
                            var t = x.Lists.colors[e];
                            x.Normalizations.registered[t] = function(e, r, n) {
                                switch (e) {
                                case "name":
                                    return t;
                                case "extract":
                                    var o;
                                    if (x.RegEx.wrappedValueAlreadyExtracted.test(n))
                                        o = n;
                                    else {
                                        var i, s = {
                                            black: "rgb(0, 0, 0)",
                                            blue: "rgb(0, 0, 255)",
                                            gray: "rgb(128, 128, 128)",
                                            green: "rgb(0, 128, 0)",
                                            red: "rgb(255, 0, 0)",
                                            white: "rgb(255, 255, 255)"
                                        };
                                        /^[A-z]+$/i.test(n) ? i = s[n] !== a ? s[n] : s.black : x.RegEx.isHex.test(n) ? i = "rgb(" + x.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (i = s.black),
                                        o = (i || n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return 8 >= f || 3 !== o.split(" ").length || (o += " 1"),
                                    o;
                                case "inject":
                                    return 8 >= f ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"),
                                    (8 >= f ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                }
            },
            Names: {
                camelCase: function(e) {
                    return e.replace(/-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    })
                },
                SVGAttribute: function(e) {
                    var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (f || v.State.isAndroid && !v.State.isChrome) && (t += "|transform"),
                    new RegExp("^(" + t + ")$","i").test(e)
                },
                prefixCheck: function(e) {
                    if (v.State.prefixMatches[e])
                        return [v.State.prefixMatches[e], !0];
                    for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
                        var n;
                        if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function(e) {
                            return e.toUpperCase()
                        }),
                        g.isString(v.State.prefixElement.style[n]))
                            return v.State.prefixMatches[e] = n,
                            [n, !0]
                    }
                    return [e, !1]
                }
            },
            Values: {
                hexToRgb: function(e) {
                    var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, a;
                    return e = e.replace(t, function(e, t, r, a) {
                        return t + t + r + r + a + a
                    }),
                    a = r.exec(e),
                    a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0]
                },
                isCSSNullValue: function(e) {
                    return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                },
                getUnitType: function(e) {
                    return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                },
                getDisplayType: function(e) {
                    var t = e.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : "block"
                },
                addClass: function(e, t) {
                    e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                },
                removeClass: function(e, t) {
                    e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)","gi"), " ")
                }
            },
            getPropertyValue: function(e, r, n, o) {
                function s(e, r) {
                    function n() {
                        u && x.setPropertyValue(e, "display", "none")
                    }
                    var l = 0;
                    if (8 >= f)
                        l = $.css(e, r);
                    else {
                        var u = !1;
                        if (/^(width|height)$/.test(r) && 0 === x.getPropertyValue(e, "display") && (u = !0,
                        x.setPropertyValue(e, "display", x.Values.getDisplayType(e))),
                        !o) {
                            if ("height" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var c = e.offsetHeight - (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);
                                return n(),
                                c
                            }
                            if ("width" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var p = e.offsetWidth - (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0);
                                return n(),
                                p
                            }
                        }
                        var d;
                        d = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null),
                        (f || v.State.isFirefox) && "borderColor" === r && (r = "borderTopColor"),
                        l = 9 === f && "filter" === r ? d.getPropertyValue(r) : d[r],
                        ("" === l || null === l) && (l = e.style[r]),
                        n()
                    }
                    if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
                        var g = s(e, "position");
                        ("fixed" === g || "absolute" === g && /top|left/i.test(r)) && (l = $(e).position()[r] + "px")
                    }
                    return l
                }
                var l;
                if (x.Hooks.registered[r]) {
                    var u = r
                      , c = x.Hooks.getRoot(u);
                    n === a && (n = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])),
                    x.Normalizations.registered[c] && (n = x.Normalizations.registered[c]("extract", e, n)),
                    l = x.Hooks.extractValue(u, n)
                } else if (x.Normalizations.registered[r]) {
                    var p, d;
                    p = x.Normalizations.registered[r]("name", e),
                    "transform" !== p && (d = s(e, x.Names.prefixCheck(p)[0]),
                    x.Values.isCSSNullValue(d) && x.Hooks.templates[r] && (d = x.Hooks.templates[r][1])),
                    l = x.Normalizations.registered[r]("extract", e, d)
                }
                return /^[\d-]/.test(l) || (l = i(e) && i(e).isSVG && x.Names.SVGAttribute(r) ? /^(height|width)$/i.test(r) ? e.getBBox()[r] : e.getAttribute(r) : s(e, x.Names.prefixCheck(r)[0])),
                x.Values.isCSSNullValue(l) && (l = 0),
                v.debug >= 2 && console.log("Get " + r + ": " + l),
                l
            },
            setPropertyValue: function(e, r, a, n, o) {
                var s = r;
                if ("scroll" === r)
                    o.container ? o.container["scroll" + o.direction] = a : "Left" === o.direction ? t.scrollTo(a, o.alternateValue) : t.scrollTo(o.alternateValue, a);
                else if (x.Normalizations.registered[r] && "transform" === x.Normalizations.registered[r]("name", e))
                    x.Normalizations.registered[r]("inject", e, a),
                    s = "transform",
                    a = i(e).transformCache[r];
                else {
                    if (x.Hooks.registered[r]) {
                        var l = r
                          , u = x.Hooks.getRoot(r);
                        n = n || x.getPropertyValue(e, u),
                        a = x.Hooks.injectValue(l, a, n),
                        r = u
                    }
                    if (x.Normalizations.registered[r] && (a = x.Normalizations.registered[r]("inject", e, a),
                    r = x.Normalizations.registered[r]("name", e)),
                    s = x.Names.prefixCheck(r)[0],
                    8 >= f)
                        try {
                            e.style[s] = a
                        } catch (c) {
                            v.debug && console.log("Browser does not support [" + a + "] for [" + s + "]")
                        }
                    else
                        i(e) && i(e).isSVG && x.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;
                    v.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a)
                }
                return [s, a]
            },
            flushTransformCache: function(e) {
                function t(t) {
                    return parseFloat(x.getPropertyValue(e, t))
                }
                var r = "";
                if ((f || v.State.isAndroid && !v.State.isChrome) && i(e).isSVG) {
                    var a = {
                        translate: [t("translateX"), t("translateY")],
                        skewX: [t("skewX")],
                        skewY: [t("skewY")],
                        scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                        rotate: [t("rotateZ"), 0, 0]
                    };
                    $.each(i(e).transformCache, function(e) {
                        /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"),
                        a[e] && (r += e + "(" + a[e].join(" ") + ") ",
                        delete a[e])
                    })
                } else {
                    var n, o;
                    $.each(i(e).transformCache, function(t) {
                        return n = i(e).transformCache[t],
                        "transformPerspective" === t ? (o = n,
                        !0) : (9 === f && "rotateZ" === t && (t = "rotate"),
                        void (r += t + n + " "))
                    }),
                    o && (r = "perspective" + o + " " + r)
                }
                x.setPropertyValue(e, "transform", r)
            }
        };
        x.Hooks.register(),
        x.Normalizations.register(),
        v.hook = function(e, t, r) {
            var n = a;
            return e = o(e),
            $.each(e, function(e, o) {
                if (i(o) === a && v.init(o),
                r === a)
                    n === a && (n = v.CSS.getPropertyValue(o, t));
                else {
                    var s = v.CSS.setPropertyValue(o, t, r);
                    "transform" === s[0] && v.CSS.flushTransformCache(o),
                    n = s
                }
            }),
            n
        }
        ;
        var S = function() {
            function e() {
                return f ? k.promise || null : d
            }
            function s() {
                function e(e) {
                    function f(e, t) {
                        var r = a
                          , n = a
                          , i = a;
                        return g.isArray(e) ? (r = e[0],
                        !g.isArray(e[1]) && /^[\d-]/.test(e[1]) || g.isFunction(e[1]) || x.RegEx.isHex.test(e[1]) ? i = e[1] : (g.isString(e[1]) && !x.RegEx.isHex.test(e[1]) || g.isArray(e[1])) && (n = t ? e[1] : u(e[1], s.duration),
                        e[2] !== a && (i = e[2]))) : r = e,
                        t || (n = n || s.easing),
                        g.isFunction(r) && (r = r.call(o, V, w)),
                        g.isFunction(i) && (i = i.call(o, V, w)),
                        [r || 0, n, i]
                    }
                    function d(e, t) {
                        var r, a;
                        return a = (t || 0).toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                            return r = e,
                            ""
                        }),
                        r || (r = x.Values.getUnitType(e)),
                        [a, r]
                    }
                    function m() {
                        var e = {
                            myParent: o.parentNode || r.body,
                            position: x.getPropertyValue(o, "position"),
                            fontSize: x.getPropertyValue(o, "fontSize")
                        }
                          , a = e.position === L.lastPosition && e.myParent === L.lastParent
                          , n = e.fontSize === L.lastFontSize;
                        L.lastParent = e.myParent,
                        L.lastPosition = e.position,
                        L.lastFontSize = e.fontSize;
                        var s = 100
                          , l = {};
                        if (n && a)
                            l.emToPx = L.lastEmToPx,
                            l.percentToPxWidth = L.lastPercentToPxWidth,
                            l.percentToPxHeight = L.lastPercentToPxHeight;
                        else {
                            var u = i(o).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");
                            v.init(u),
                            e.myParent.appendChild(u),
                            $.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                                v.CSS.setPropertyValue(u, t, "hidden")
                            }),
                            v.CSS.setPropertyValue(u, "position", e.position),
                            v.CSS.setPropertyValue(u, "fontSize", e.fontSize),
                            v.CSS.setPropertyValue(u, "boxSizing", "content-box"),
                            $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                                v.CSS.setPropertyValue(u, t, s + "%")
                            }),
                            v.CSS.setPropertyValue(u, "paddingLeft", s + "em"),
                            l.percentToPxWidth = L.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(u, "width", null, !0)) || 1) / s,
                            l.percentToPxHeight = L.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(u, "height", null, !0)) || 1) / s,
                            l.emToPx = L.lastEmToPx = (parseFloat(x.getPropertyValue(u, "paddingLeft")) || 1) / s,
                            e.myParent.removeChild(u)
                        }
                        return null === L.remToPx && (L.remToPx = parseFloat(x.getPropertyValue(r.body, "fontSize")) || 16),
                        null === L.vwToPx && (L.vwToPx = parseFloat(t.innerWidth) / 100,
                        L.vhToPx = parseFloat(t.innerHeight) / 100),
                        l.remToPx = L.remToPx,
                        l.vwToPx = L.vwToPx,
                        l.vhToPx = L.vhToPx,
                        v.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), o),
                        l
                    }
                    if (s.begin && 0 === V)
                        try {
                            s.begin.call(h, h)
                        } catch (y) {
                            setTimeout(function() {
                                throw y
                            }, 1)
                        }
                    if ("scroll" === A) {
                        var S = /^x$/i.test(s.axis) ? "Left" : "Top", C = parseFloat(s.offset) || 0, T, F, E;
                        s.container ? g.isWrapped(s.container) || g.isNode(s.container) ? (s.container = s.container[0] || s.container,
                        T = s.container["scroll" + S],
                        E = T + $(o).position()[S.toLowerCase()] + C) : s.container = null : (T = v.State.scrollAnchor[v.State["scrollProperty" + S]],
                        F = v.State.scrollAnchor[v.State["scrollProperty" + ("Left" === S ? "Top" : "Left")]],
                        E = $(o).offset()[S.toLowerCase()] + C),
                        l = {
                            scroll: {
                                rootPropertyValue: !1,
                                startValue: T,
                                currentValue: T,
                                endValue: E,
                                unitType: "",
                                easing: s.easing,
                                scrollData: {
                                    container: s.container,
                                    direction: S,
                                    alternateValue: F
                                }
                            },
                            element: o
                        },
                        v.debug && console.log("tweensContainer (scroll): ", l.scroll, o)
                    } else if ("reverse" === A) {
                        if (!i(o).tweensContainer)
                            return void $.dequeue(o, s.queue);
                        "none" === i(o).opts.display && (i(o).opts.display = "auto"),
                        "hidden" === i(o).opts.visibility && (i(o).opts.visibility = "visible"),
                        i(o).opts.loop = !1,
                        i(o).opts.begin = null,
                        i(o).opts.complete = null,
                        P.easing || delete s.easing,
                        P.duration || delete s.duration,
                        s = $.extend({}, i(o).opts, s);
                        var j = $.extend(!0, {}, i(o).tweensContainer);
                        for (var H in j)
                            if ("element" !== H) {
                                var N = j[H].startValue;
                                j[H].startValue = j[H].currentValue = j[H].endValue,
                                j[H].endValue = N,
                                g.isEmptyObject(P) || (j[H].easing = s.easing),
                                v.debug && console.log("reverse tweensContainer (" + H + "): " + JSON.stringify(j[H]), o)
                            }
                        l = j
                    } else if ("start" === A) {
                        var j;
                        i(o).tweensContainer && i(o).isAnimating === !0 && (j = i(o).tweensContainer),
                        $.each(b, function(e, t) {
                            if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(e)) {
                                var r = f(t, !0)
                                  , n = r[0]
                                  , o = r[1]
                                  , i = r[2];
                                if (x.RegEx.isHex.test(n)) {
                                    for (var s = ["Red", "Green", "Blue"], l = x.Values.hexToRgb(n), u = i ? x.Values.hexToRgb(i) : a, c = 0; c < s.length; c++)
                                        b[e + s[c]] = [l[c], o, u ? u[c] : u];
                                    delete b[e]
                                }
                            }
                        });
                        for (var z in b) {
                            var q = f(b[z])
                              , R = q[0]
                              , M = q[1]
                              , I = q[2];
                            z = x.Names.camelCase(z);
                            var W = x.Hooks.getRoot(z)
                              , B = !1;
                            if (i(o).isSVG || x.Names.prefixCheck(W)[1] !== !1 || x.Normalizations.registered[W] !== a) {
                                (s.display !== a && null !== s.display && "none" !== s.display || s.visibility && "hidden" !== s.visibility) && /opacity|filter/.test(z) && !I && 0 !== R && (I = 0),
                                s._cacheValues && j && j[z] ? (I === a && (I = j[z].endValue + j[z].unitType),
                                B = i(o).rootPropertyValueCache[W]) : x.Hooks.registered[z] ? I === a ? (B = x.getPropertyValue(o, W),
                                I = x.getPropertyValue(o, z, B)) : B = x.Hooks.templates[W][1] : I === a && (I = x.getPropertyValue(o, z));
                                var G, D, X, Y = !1;
                                if (G = d(z, I),
                                I = G[0],
                                X = G[1],
                                G = d(z, R),
                                R = G[0].replace(/^([+-\/*])=/, function(e, t) {
                                    return Y = t,
                                    ""
                                }),
                                D = G[1],
                                I = parseFloat(I) || 0,
                                R = parseFloat(R) || 0,
                                "%" === D && (/^(fontSize|lineHeight)$/.test(z) ? (R /= 100,
                                D = "em") : /^scale/.test(z) ? (R /= 100,
                                D = "") : /(Red|Green|Blue)$/i.test(z) && (R = R / 100 * 255,
                                D = "")),
                                /[\/*]/.test(Y))
                                    D = X;
                                else if (X !== D && 0 !== I)
                                    if (0 === R)
                                        D = X;
                                    else {
                                        p = p || m();
                                        var Q = /margin|padding|left|right|width|text|word|letter/i.test(z) || /X$/.test(z) || "x" === z ? "x" : "y";
                                        switch (X) {
                                        case "%":
                                            I *= "x" === Q ? p.percentToPxWidth : p.percentToPxHeight;
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            I *= p[X + "ToPx"]
                                        }
                                        switch (D) {
                                        case "%":
                                            I *= 1 / ("x" === Q ? p.percentToPxWidth : p.percentToPxHeight);
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            I *= 1 / p[D + "ToPx"]
                                        }
                                    }
                                switch (Y) {
                                case "+":
                                    R = I + R;
                                    break;
                                case "-":
                                    R = I - R;
                                    break;
                                case "*":
                                    R = I * R;
                                    break;
                                case "/":
                                    R = I / R
                                }
                                l[z] = {
                                    rootPropertyValue: B,
                                    startValue: I,
                                    currentValue: I,
                                    endValue: R,
                                    unitType: D,
                                    easing: M
                                },
                                v.debug && console.log("tweensContainer (" + z + "): " + JSON.stringify(l[z]), o)
                            } else
                                v.debug && console.log("Skipping [" + W + "] due to a lack of browser support.")
                        }
                        l.element = o
                    }
                    l.element && (x.Values.addClass(o, "velocity-animating"),
                    O.push(l),
                    "" === s.queue && (i(o).tweensContainer = l,
                    i(o).opts = s),
                    i(o).isAnimating = !0,
                    V === w - 1 ? (v.State.calls.length > 1e4 && (v.State.calls = n(v.State.calls)),
                    v.State.calls.push([O, h, s, null, k.resolver]),
                    v.State.isTicking === !1 && (v.State.isTicking = !0,
                    c())) : V++)
                }
                var o = this, s = $.extend({}, v.defaults, P), l = {}, p;
                if (i(o) === a && v.init(o),
                parseFloat(s.delay) && s.queue !== !1 && $.queue(o, s.queue, function(e) {
                    v.velocityQueueEntryFlag = !0,
                    i(o).delayTimer = {
                        setTimeout: setTimeout(e, parseFloat(s.delay)),
                        next: e
                    }
                }),
                v.mock === !0)
                    s.duration = 1;
                else
                    switch (s.duration.toString().toLowerCase()) {
                    case "fast":
                        s.duration = 200;
                        break;
                    case "normal":
                        s.duration = y;
                        break;
                    case "slow":
                        s.duration = 600;
                        break;
                    default:
                        s.duration = parseFloat(s.duration) || 1
                    }
                s.easing = u(s.easing, s.duration),
                s.begin && !g.isFunction(s.begin) && (s.begin = null),
                s.progress && !g.isFunction(s.progress) && (s.progress = null),
                s.complete && !g.isFunction(s.complete) && (s.complete = null),
                s.display !== a && null !== s.display && (s.display = s.display.toString().toLowerCase(),
                "auto" === s.display && (s.display = v.CSS.Values.getDisplayType(o))),
                s.visibility && (s.visibility = s.visibility.toString().toLowerCase()),
                s.mobileHA = s.mobileHA && v.State.isMobile && !v.State.isGingerbread,
                s.queue === !1 ? s.delay ? setTimeout(e, s.delay) : e() : $.queue(o, s.queue, function(t, r) {
                    return r === !0 ? (k.promise && k.resolver(h),
                    !0) : (v.velocityQueueEntryFlag = !0,
                    void e(t))
                }),
                "" !== s.queue && "fx" !== s.queue || "inprogress" === $.queue(o)[0] || $.dequeue(o)
            }
            var l = arguments[0] && ($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || g.isString(arguments[0].properties)), f, d, m, h, b, P;
            if (g.isWrapped(this) ? (f = !1,
            m = 0,
            h = this,
            d = this) : (f = !0,
            m = 1,
            h = l ? arguments[0].elements : arguments[0]),
            h = o(h)) {
                l ? (b = arguments[0].properties,
                P = arguments[0].options) : (b = arguments[m],
                P = arguments[m + 1]);
                var w = h.length
                  , V = 0;
                if ("stop" !== b && !$.isPlainObject(P)) {
                    var C = m + 1;
                    P = {};
                    for (var T = C; T < arguments.length; T++)
                        g.isArray(arguments[T]) || !/fast|normal|slow/i.test(arguments[T].toString()) && !/^\d/.test(arguments[T]) ? g.isString(arguments[T]) || g.isArray(arguments[T]) ? P.easing = arguments[T] : g.isFunction(arguments[T]) && (P.complete = arguments[T]) : P.duration = arguments[T]
                }
                var k = {
                    promise: null,
                    resolver: null,
                    rejecter: null
                };
                f && v.Promise && (k.promise = new v.Promise(function(e, t) {
                    k.resolver = e,
                    k.rejecter = t
                }
                ));
                var A;
                switch (b) {
                case "scroll":
                    A = "scroll";
                    break;
                case "reverse":
                    A = "reverse";
                    break;
                case "stop":
                    $.each(h, function(e, t) {
                        i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout),
                        i(t).delayTimer.next && i(t).delayTimer.next(),
                        delete i(t).delayTimer)
                    });
                    var F = [];
                    return $.each(v.State.calls, function(e, t) {
                        t && $.each(t[1], function(r, n) {
                            var o = g.isString(P) ? P : "";
                            return P !== a && t[2].queue !== o ? !0 : void $.each(h, function(t, r) {
                                r === n && (P !== a && ($.each($.queue(r, o), function(e, t) {
                                    g.isFunction(t) && t(null, !0)
                                }),
                                $.queue(r, o, [])),
                                i(r) && "" === o && $.each(i(r).tweensContainer, function(e, t) {
                                    t.endValue = t.currentValue
                                }),
                                F.push(e))
                            })
                        })
                    }),
                    $.each(F, function(e, t) {
                        p(t, !0)
                    }),
                    k.promise && k.resolver(h),
                    e();
                default:
                    if (!$.isPlainObject(b) || g.isEmptyObject(b)) {
                        if (g.isString(b) && v.Sequences[b]) {
                            var E = $.extend({}, P)
                              , j = E.duration
                              , H = E.delay || 0;
                            return E.backwards === !0 && (h = h.reverse()),
                            $.each(h, function(e, t) {
                                parseFloat(E.stagger) ? E.delay = H + parseFloat(E.stagger) * e : g.isFunction(E.stagger) && (E.delay = H + E.stagger.call(t, e, w)),
                                E.drag && (E.duration = parseFloat(j) || (/^(callout|transition)/.test(b) ? 1e3 : y),
                                E.duration = Math.max(E.duration * (E.backwards ? 1 - e / w : (e + 1) / w), .75 * E.duration, 200)),
                                v.Sequences[b].call(t, t, E || {}, e, w, h, k.promise ? k : a)
                            }),
                            e()
                        }
                        var N = "Velocity: First argument (" + b + ") was not a property map, a known action, or a registered sequence. Aborting.";
                        return k.promise ? k.rejecter(new Error(N)) : console.log(N),
                        e()
                    }
                    A = "start"
                }
                var L = {
                    lastParent: null,
                    lastPosition: null,
                    lastFontSize: null,
                    lastPercentToPxWidth: null,
                    lastPercentToPxHeight: null,
                    lastEmToPx: null,
                    remToPx: null,
                    vwToPx: null,
                    vhToPx: null
                }
                  , O = [];
                $.each(h, function(e, t) {
                    g.isNode(t) && s.call(t)
                });
                var E = $.extend({}, v.defaults, P), z;
                if (E.loop = parseInt(E.loop),
                z = 2 * E.loop - 1,
                E.loop)
                    for (var q = 0; z > q; q++) {
                        var R = {
                            delay: E.delay
                        };
                        q === z - 1 && (R.display = E.display,
                        R.visibility = E.visibility,
                        R.complete = E.complete),
                        S(h, "reverse", R)
                    }
                return e()
            }
        };
        v = $.extend(S, v),
        v.animate = S;
        var P = t.requestAnimationFrame || d;
        return v.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function() {
            r.hidden ? (P = function(e) {
                return setTimeout(function() {
                    e(!0)
                }, 16)
            }
            ,
            c()) : P = t.requestAnimationFrame || d
        }),
        e.Velocity = v,
        e !== t && (e.fn.velocity = S,
        e.fn.velocity.defaults = v.defaults),
        $.each(["Down", "Up"], function(e, t) {
            v.Sequences["slide" + t] = function(e, r, n, o, i, s) {
                var l = $.extend({}, r)
                  , u = l.begin
                  , c = l.complete
                  , p = {
                    height: "",
                    marginTop: "",
                    marginBottom: "",
                    paddingTop: "",
                    paddingBottom: ""
                }
                  , f = {};
                l.display === a && (l.display = "Down" === t ? "inline" === v.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"),
                l.begin = function() {
                    u && u.call(i, i),
                    f.overflow = e.style.overflow,
                    e.style.overflow = "hidden";
                    for (var r in p) {
                        f[r] = e.style[r];
                        var a = v.CSS.getPropertyValue(e, r);
                        p[r] = "Down" === t ? [a, 0] : [0, a]
                    }
                }
                ,
                l.complete = function() {
                    for (var t in f)
                        e.style[t] = f[t];
                    c && c.call(i, i),
                    s && s.resolver(i)
                }
                ,
                v(e, p, l)
            }
        }),
        $.each(["In", "Out"], function(e, t) {
            v.Sequences["fade" + t] = function(e, r, n, o, i, s) {
                var l = $.extend({}, r)
                  , u = {
                    opacity: "In" === t ? 1 : 0
                }
                  , c = l.complete;
                l.complete = n !== o - 1 ? l.begin = null : function() {
                    c && c.call(i, i),
                    s && s.resolver(i)
                }
                ,
                l.display === a && (l.display = "In" === t ? "auto" : "none"),
                v(this, u, l)
            }
        }),
        v
    }(window.jQuery || window.Zepto || window, window, document)
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Avoid `console` errors in browsers that lack a console.
 */
(function() {
    var method;
    var noop = function() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Fast Click 1.0.3
 * https://github.com/ftlabs/fastclick
 */
(function() {
    "use strict";
    function e(n, r) {
        function s(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        }
        var i;
        r = r || {};
        this.trackingClick = false;
        this.trackingClickStart = 0;
        this.targetElement = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.lastTouchIdentifier = 0;
        this.touchBoundary = r.touchBoundary || 10;
        this.layer = n;
        this.tapDelay = r.tapDelay || 200;
        if (e.notNeeded(n)) {
            return
        }
        var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
        var u = this;
        for (var a = 0, f = o.length; a < f; a++) {
            u[o[a]] = s(u[o[a]], u)
        }
        if (t) {
            n.addEventListener("mouseover", this.onMouse, true);
            n.addEventListener("mousedown", this.onMouse, true);
            n.addEventListener("mouseup", this.onMouse, true)
        }
        n.addEventListener("click", this.onClick, true);
        n.addEventListener("touchstart", this.onTouchStart, false);
        n.addEventListener("touchmove", this.onTouchMove, false);
        n.addEventListener("touchend", this.onTouchEnd, false);
        n.addEventListener("touchcancel", this.onTouchCancel, false);
        if (!Event.prototype.stopImmediatePropagation) {
            n.removeEventListener = function(e, t, r) {
                var i = Node.prototype.removeEventListener;
                if (e === "click") {
                    i.call(n, e, t.hijacked || t, r)
                } else {
                    i.call(n, e, t, r)
                }
            }
            ;
            n.addEventListener = function(e, t, r) {
                var i = Node.prototype.addEventListener;
                if (e === "click") {
                    i.call(n, e, t.hijacked || (t.hijacked = function(e) {
                        if (!e.propagationStopped) {
                            t(e)
                        }
                    }
                    ), r)
                } else {
                    i.call(n, e, t, r)
                }
            }
        }
        if (typeof n.onclick === "function") {
            i = n.onclick;
            n.addEventListener("click", function(e) {
                i(e)
            }, false);
            n.onclick = null
        }
    }
    var t = navigator.userAgent.indexOf("Android") > 0;
    var n = /iP(ad|hone|od)/.test(navigator.userAgent);
    var r = n && /OS 4_\d(_\d)?/.test(navigator.userAgent);
    var i = n && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
    var s = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function(e) {
        switch (e.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (e.disabled) {
                return true
            }
            break;
        case "input":
            if (n && e.type === "file" || e.disabled) {
                return true
            }
            break;
        case "label":
        case "video":
            return true
        }
        return /\bneedsclick\b/.test(e.className)
    }
    ;
    e.prototype.needsFocus = function(e) {
        switch (e.nodeName.toLowerCase()) {
        case "textarea":
            return true;
        case "select":
            return !t;
        case "input":
            switch (e.type) {
            case "button":
            case "checkbox":
            case "file":
            case "image":
            case "radio":
            case "submit":
                return false
            }
            return !e.disabled && !e.readOnly;
        default:
            return /\bneedsfocus\b/.test(e.className)
        }
    }
    ;
    e.prototype.sendClick = function(e, t) {
        var n, r;
        if (document.activeElement && document.activeElement !== e) {
            document.activeElement.blur()
        }
        r = t.changedTouches[0];
        n = document.createEvent("MouseEvents");
        n.initMouseEvent(this.determineEventType(e), true, true, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, false, false, false, false, 0, null);
        n.forwardedTouchEvent = true;
        e.dispatchEvent(n)
    }
    ;
    e.prototype.determineEventType = function(e) {
        if (t && e.tagName.toLowerCase() === "select") {
            return "mousedown"
        }
        return "click"
    }
    ;
    e.prototype.focus = function(e) {
        var t;
        if (n && e.setSelectionRange && e.type.indexOf("date") !== 0 && e.type !== "time" && e.type !== "month") {
            t = e.value.length;
            e.setSelectionRange(t, t)
        } else {
            e.focus()
        }
    }
    ;
    e.prototype.updateScrollParent = function(e) {
        var t, n;
        t = e.fastClickScrollParent;
        if (!t || !t.contains(e)) {
            n = e;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    t = n;
                    e.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        if (t) {
            t.fastClickLastScrollTop = t.scrollTop
        }
    }
    ;
    e.prototype.getTargetElementFromEventTarget = function(e) {
        if (e.nodeType === Node.TEXT_NODE) {
            return e.parentNode
        }
        return e
    }
    ;
    e.prototype.onTouchStart = function(e) {
        var t, i, s;
        if (e.targetTouches.length > 1) {
            return true
        }
        t = this.getTargetElementFromEventTarget(e.target);
        i = e.targetTouches[0];
        if (n) {
            s = window.getSelection();
            if (s.rangeCount && !s.isCollapsed) {
                return true
            }
            if (!r) {
                if (i.identifier && i.identifier === this.lastTouchIdentifier) {
                    e.preventDefault();
                    return false
                }
                this.lastTouchIdentifier = i.identifier;
                this.updateScrollParent(t)
            }
        }
        this.trackingClick = true;
        this.trackingClickStart = e.timeStamp;
        this.targetElement = t;
        this.touchStartX = i.pageX;
        this.touchStartY = i.pageY;
        if (e.timeStamp - this.lastClickTime < this.tapDelay) {
            e.preventDefault()
        }
        return true
    }
    ;
    e.prototype.touchHasMoved = function(e) {
        var t = e.changedTouches[0]
          , n = this.touchBoundary;
        if (Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n) {
            return true
        }
        return false
    }
    ;
    e.prototype.onTouchMove = function(e) {
        if (!this.trackingClick) {
            return true
        }
        if (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) {
            this.trackingClick = false;
            this.targetElement = null
        }
        return true
    }
    ;
    e.prototype.findControl = function(e) {
        if (e.control !== undefined) {
            return e.control
        }
        if (e.htmlFor) {
            return document.getElementById(e.htmlFor)
        }
        return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }
    ;
    e.prototype.onTouchEnd = function(e) {
        var s, o, u, a, f, l = this.targetElement;
        if (!this.trackingClick) {
            return true
        }
        if (e.timeStamp - this.lastClickTime < this.tapDelay) {
            this.cancelNextClick = true;
            return true
        }
        this.cancelNextClick = false;
        this.lastClickTime = e.timeStamp;
        o = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;
        if (i) {
            f = e.changedTouches[0];
            l = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || l;
            l.fastClickScrollParent = this.targetElement.fastClickScrollParent
        }
        u = l.tagName.toLowerCase();
        if (u === "label") {
            s = this.findControl(l);
            if (s) {
                this.focus(l);
                if (t) {
                    return false
                }
                l = s
            }
        } else if (this.needsFocus(l)) {
            if (e.timeStamp - o > 100 || n && window.top !== window && u === "input") {
                this.targetElement = null;
                return false
            }
            this.focus(l);
            this.sendClick(l, e);
            if (!n || u !== "select") {
                this.targetElement = null;
                e.preventDefault()
            }
            return false
        }
        if (n && !r) {
            a = l.fastClickScrollParent;
            if (a && a.fastClickLastScrollTop !== a.scrollTop) {
                return true
            }
        }
        if (!this.needsClick(l)) {
            e.preventDefault();
            this.sendClick(l, e)
        }
        return false
    }
    ;
    e.prototype.onTouchCancel = function() {
        this.trackingClick = false;
        this.targetElement = null
    }
    ;
    e.prototype.onMouse = function(e) {
        if (!this.targetElement) {
            return true
        }
        if (e.forwardedTouchEvent) {
            return true
        }
        if (!e.cancelable) {
            return true
        }
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
            if (e.stopImmediatePropagation) {
                e.stopImmediatePropagation()
            } else {
                e.propagationStopped = true
            }
            e.stopPropagation();
            e.preventDefault();
            return false
        }
        return true
    }
    ;
    e.prototype.onClick = function(e) {
        var t;
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true
        }
        if (e.target.type === "submit" && e.detail === 0) {
            return true
        }
        t = this.onMouse(e);
        if (!t) {
            this.targetElement = null
        }
        return t
    }
    ;
    e.prototype.destroy = function() {
        var e = this.layer;
        if (t) {
            e.removeEventListener("mouseover", this.onMouse, true);
            e.removeEventListener("mousedown", this.onMouse, true);
            e.removeEventListener("mouseup", this.onMouse, true)
        }
        e.removeEventListener("click", this.onClick, true);
        e.removeEventListener("touchstart", this.onTouchStart, false);
        e.removeEventListener("touchmove", this.onTouchMove, false);
        e.removeEventListener("touchend", this.onTouchEnd, false);
        e.removeEventListener("touchcancel", this.onTouchCancel, false)
    }
    ;
    e.notNeeded = function(e) {
        var n;
        var r;
        var i;
        if (typeof window.ontouchstart === "undefined") {
            return true
        }
        r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
        if (r) {
            if (t) {
                n = document.querySelector("meta[name=viewport]");
                if (n) {
                    if (n.content.indexOf("user-scalable=no") !== -1) {
                        return true
                    }
                    if (r > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true
                    }
                }
            } else {
                return true
            }
        }
        if (s) {
            i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
            if (i[1] >= 10 && i[2] >= 3) {
                n = document.querySelector("meta[name=viewport]");
                if (n) {
                    if (n.content.indexOf("user-scalable=no") !== -1) {
                        return true
                    }
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true
                    }
                }
            }
        }
        if (e.style.msTouchAction === "none") {
            return true
        }
        return false
    }
    ;
    e.attach = function(t, n) {
        return new e(t,n)
    }
    ;
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define(function() {
            return e
        })
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = e.attach;
        module.exports.FastClick = e
    } else {
        window.FastClick = e
    }
}
)()

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * history.js
*/
typeof JSON != "object" && (JSON = {}),
function() {
    "use strict";
    function f(e) {
        return e < 10 ? "0" + e : e
    }
    function quote(e) {
        return escapable.lastIndex = 0,
        escapable.test(e) ? '"' + e.replace(escapable, function(e) {
            var t = meta[e];
            return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }
    function str(e, t) {
        var n, r, i, s, o = gap, u, a = t[e];
        a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)),
        typeof rep == "function" && (a = rep.call(t, e, a));
        switch (typeof a) {
        case "string":
            return quote(a);
        case "number":
            return isFinite(a) ? String(a) : "null";
        case "boolean":
        case "null":
            return String(a);
        case "object":
            if (!a)
                return "null";
            gap += indent,
            u = [];
            if (Object.prototype.toString.apply(a) === "[object Array]") {
                s = a.length;
                for (n = 0; n < s; n += 1)
                    u[n] = str(n, a) || "null";
                return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]",
                gap = o,
                i
            }
            if (rep && typeof rep == "object") {
                s = rep.length;
                for (n = 0; n < s; n += 1)
                    typeof rep[n] == "string" && (r = rep[n],
                    i = str(r, a),
                    i && u.push(quote(r) + (gap ? ": " : ":") + i))
            } else
                for (r in a)
                    Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a),
                    i && u.push(quote(r) + (gap ? ": " : ":") + i));
            return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}",
            gap = o,
            i
        }
    }
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
        return this.valueOf()
    }
    );
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
        var r;
        gap = "",
        indent = "";
        if (typeof n == "number")
            for (r = 0; r < n; r += 1)
                indent += " ";
        else
            typeof n == "string" && (indent = n);
        rep = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")
            return str("", {
                "": e
            });
        throw new Error("JSON.stringify")
    }
    ),
    typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
        function walk(e, t) {
            var n, r, i = e[t];
            if (i && typeof i == "object")
                for (n in i)
                    Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n),
                    r !== undefined ? i[n] = r : delete i[n]);
            return reviver.call(e, t, i)
        }
        var j;
        text = String(text),
        cx.lastIndex = 0,
        cx.test(text) && (text = text.replace(cx, function(e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return j = eval("(" + text + ")"),
            typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
        throw new SyntaxError("JSON.parse")
    }
    )
}(),
function(e, t) {
    "use strict";
    var n = e.History = e.History || {}
      , r = e.jQuery;
    if (typeof n.Adapter != "undefined")
        throw new Error("History.js Adapter has already been loaded...");
    n.Adapter = {
        bind: function(e, t, n) {
            r(e).bind(t, n)
        },
        trigger: function(e, t, n) {
            r(e).trigger(t, n)
        },
        extractEventData: function(e, n, r) {
            var i = n && n.originalEvent && n.originalEvent[e] || r && r[e] || t;
            return i
        },
        onDomLoad: function(e) {
            r(e)
        }
    },
    typeof n.init != "undefined" && n.init()
}(window),
function(e, t) {
    "use strict";
    var n = e.document
      , r = e.setTimeout || r
      , i = e.clearTimeout || i
      , s = e.setInterval || s
      , o = e.History = e.History || {};
    if (typeof o.initHtml4 != "undefined")
        throw new Error("History.js HTML4 Support has already been loaded...");
    o.initHtml4 = function() {
        if (typeof o.initHtml4.initialized != "undefined")
            return !1;
        o.initHtml4.initialized = !0,
        o.enabled = !0,
        o.savedHashes = [],
        o.isLastHash = function(e) {
            var t = o.getHashByIndex(), n;
            return n = e === t,
            n
        }
        ,
        o.isHashEqual = function(e, t) {
            return e = encodeURIComponent(e).replace(/%25/g, "%"),
            t = encodeURIComponent(t).replace(/%25/g, "%"),
            e === t
        }
        ,
        o.saveHash = function(e) {
            return o.isLastHash(e) ? !1 : (o.savedHashes.push(e),
            !0)
        }
        ,
        o.getHashByIndex = function(e) {
            var t = null;
            return typeof e == "undefined" ? t = o.savedHashes[o.savedHashes.length - 1] : e < 0 ? t = o.savedHashes[o.savedHashes.length + e] : t = o.savedHashes[e],
            t
        }
        ,
        o.discardedHashes = {},
        o.discardedStates = {},
        o.discardState = function(e, t, n) {
            var r = o.getHashByState(e), i;
            return i = {
                discardedState: e,
                backState: n,
                forwardState: t
            },
            o.discardedStates[r] = i,
            !0
        }
        ,
        o.discardHash = function(e, t, n) {
            var r = {
                discardedHash: e,
                backState: n,
                forwardState: t
            };
            return o.discardedHashes[e] = r,
            !0
        }
        ,
        o.discardedState = function(e) {
            var t = o.getHashByState(e), n;
            return n = o.discardedStates[t] || !1,
            n
        }
        ,
        o.discardedHash = function(e) {
            var t = o.discardedHashes[e] || !1;
            return t
        }
        ,
        o.recycleState = function(e) {
            var t = o.getHashByState(e);
            return o.discardedState(e) && delete o.discardedStates[t],
            !0
        }
        ,
        o.emulated.hashChange && (o.hashChangeInit = function() {
            o.checkerFunction = null;
            var t = "", r, i, u, a, f = Boolean(o.getHash());
            return o.isInternetExplorer() ? (r = "historyjs-iframe",
            i = n.createElement("iframe"),
            i.setAttribute("id", r),
            i.setAttribute("src", "#"),
            i.style.display = "none",
            n.body.appendChild(i),
            i.contentWindow.document.open(),
            i.contentWindow.document.close(),
            u = "",
            a = !1,
            o.checkerFunction = function() {
                if (a)
                    return !1;
                a = !0;
                var n = o.getHash()
                  , r = o.getHash(i.contentWindow.document);
                return n !== t ? (t = n,
                r !== n && (u = r = n,
                i.contentWindow.document.open(),
                i.contentWindow.document.close(),
                i.contentWindow.document.location.hash = o.escapeHash(n)),
                o.Adapter.trigger(e, "hashchange")) : r !== u && (u = r,
                f && r === "" ? o.back() : o.setHash(r, !1)),
                a = !1,
                !0
            }
            ) : o.checkerFunction = function() {
                var n = o.getHash() || "";
                return n !== t && (t = n,
                o.Adapter.trigger(e, "hashchange")),
                !0
            }
            ,
            o.intervalList.push(s(o.checkerFunction, o.options.hashChangeInterval)),
            !0
        }
        ,
        o.Adapter.onDomLoad(o.hashChangeInit)),
        o.emulated.pushState && (o.onHashChange = function(t) {
            var n = t && t.newURL || o.getLocationHref(), r = o.getHashByUrl(n), i = null, s = null, u = null, a;
            return o.isLastHash(r) ? (o.busy(!1),
            !1) : (o.doubleCheckComplete(),
            o.saveHash(r),
            r && o.isTraditionalAnchor(r) ? (o.Adapter.trigger(e, "anchorchange"),
            o.busy(!1),
            !1) : (i = o.extractState(o.getFullUrl(r || o.getLocationHref()), !0),
            o.isLastSavedState(i) ? (o.busy(!1),
            !1) : (s = o.getHashByState(i),
            a = o.discardedState(i),
            a ? (o.getHashByIndex(-2) === o.getHashByState(a.forwardState) ? o.back(!1) : o.forward(!1),
            !1) : (o.pushState(i.data, i.title, encodeURI(i.url), !1),
            !0))))
        }
        ,
        o.Adapter.bind(e, "hashchange", o.onHashChange),
        o.pushState = function(t, n, r, i) {
            r = encodeURI(r).replace(/%25/g, "%");
            if (o.getHashByUrl(r))
                throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
            if (i !== !1 && o.busy())
                return o.pushQueue({
                    scope: o,
                    callback: o.pushState,
                    args: arguments,
                    queue: i
                }),
                !1;
            o.busy(!0);
            var s = o.createStateObject(t, n, r)
              , u = o.getHashByState(s)
              , a = o.getState(!1)
              , f = o.getHashByState(a)
              , l = o.getHash()
              , c = o.expectedStateId == s.id;
            return o.storeState(s),
            o.expectedStateId = s.id,
            o.recycleState(s),
            o.setTitle(s),
            u === f ? (o.busy(!1),
            !1) : (o.saveState(s),
            c || o.Adapter.trigger(e, "statechange"),
            !o.isHashEqual(u, l) && !o.isHashEqual(u, o.getShortUrl(o.getLocationHref())) && o.setHash(u, !1),
            o.busy(!1),
            !0)
        }
        ,
        o.replaceState = function(t, n, r, i) {
            r = encodeURI(r).replace(/%25/g, "%");
            if (o.getHashByUrl(r))
                throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
            if (i !== !1 && o.busy())
                return o.pushQueue({
                    scope: o,
                    callback: o.replaceState,
                    args: arguments,
                    queue: i
                }),
                !1;
            o.busy(!0);
            var s = o.createStateObject(t, n, r)
              , u = o.getHashByState(s)
              , a = o.getState(!1)
              , f = o.getHashByState(a)
              , l = o.getStateByIndex(-2);
            return o.discardState(a, s, l),
            u === f ? (o.storeState(s),
            o.expectedStateId = s.id,
            o.recycleState(s),
            o.setTitle(s),
            o.saveState(s),
            o.Adapter.trigger(e, "statechange"),
            o.busy(!1)) : o.pushState(s.data, s.title, s.url, !1),
            !0
        }
        ),
        o.emulated.pushState && o.getHash() && !o.emulated.hashChange && o.Adapter.onDomLoad(function() {
            o.Adapter.trigger(e, "hashchange")
        })
    }
    ,
    typeof o.init != "undefined" && o.init()
}(window),
function(e, t) {
    "use strict";
    var n = e.console || t
      , r = e.document
      , i = e.navigator
      , s = e.sessionStorage || !1
      , o = e.setTimeout
      , u = e.clearTimeout
      , a = e.setInterval
      , f = e.clearInterval
      , l = e.JSON
      , c = e.alert
      , h = e.History = e.History || {}
      , p = e.history;
    try {
        s.setItem("TEST", "1"),
        s.removeItem("TEST")
    } catch (d) {
        s = !1
    }
    l.stringify = l.stringify || l.encode,
    l.parse = l.parse || l.decode;
    if (typeof h.init != "undefined")
        throw new Error("History.js Core has already been loaded...");
    h.init = function(e) {
        return typeof h.Adapter == "undefined" ? !1 : (typeof h.initCore != "undefined" && h.initCore(),
        typeof h.initHtml4 != "undefined" && h.initHtml4(),
        !0)
    }
    ,
    h.initCore = function(d) {
        if (typeof h.initCore.initialized != "undefined")
            return !1;
        h.initCore.initialized = !0,
        h.options = h.options || {},
        h.options.hashChangeInterval = h.options.hashChangeInterval || 100,
        h.options.safariPollInterval = h.options.safariPollInterval || 500,
        h.options.doubleCheckInterval = h.options.doubleCheckInterval || 500,
        h.options.disableSuid = h.options.disableSuid || !1,
        h.options.storeInterval = h.options.storeInterval || 1e3,
        h.options.busyDelay = h.options.busyDelay || 250,
        h.options.debug = h.options.debug || !1,
        h.options.initialTitle = h.options.initialTitle || r.title,
        h.options.html4Mode = h.options.html4Mode || !1,
        h.options.delayInit = h.options.delayInit || !1,
        h.intervalList = [],
        h.clearAllIntervals = function() {
            var e, t = h.intervalList;
            if (typeof t != "undefined" && t !== null) {
                for (e = 0; e < t.length; e++)
                    f(t[e]);
                h.intervalList = null
            }
        }
        ,
        h.debug = function() {
            (h.options.debug || !1) && h.log.apply(h, arguments)
        }
        ,
        h.log = function() {
            var e = typeof n != "undefined" && typeof n.log != "undefined" && typeof n.log.apply != "undefined", t = r.getElementById("log"), i, s, o, u, a;
            e ? (u = Array.prototype.slice.call(arguments),
            i = u.shift(),
            typeof n.debug != "undefined" ? n.debug.apply(n, [i, u]) : n.log.apply(n, [i, u])) : i = "\n" + arguments[0] + "\n";
            for (s = 1,
            o = arguments.length; s < o; ++s) {
                a = arguments[s];
                if (typeof a == "object" && typeof l != "undefined")
                    try {
                        a = l.stringify(a)
                    } catch (f) {}
                i += "\n" + a + "\n"
            }
            return t ? (t.value += i + "\n-----\n",
            t.scrollTop = t.scrollHeight - t.clientHeight) : e || c(i),
            !0
        }
        ,
        h.getInternetExplorerMajorVersion = function() {
            var e = h.getInternetExplorerMajorVersion.cached = typeof h.getInternetExplorerMajorVersion.cached != "undefined" ? h.getInternetExplorerMajorVersion.cached : function() {
                var e = 3
                  , t = r.createElement("div")
                  , n = t.getElementsByTagName("i");
                while ((t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && n[0])
                    ;
                return e > 4 ? e : !1
            }();
            return e
        }
        ,
        h.isInternetExplorer = function() {
            var e = h.isInternetExplorer.cached = typeof h.isInternetExplorer.cached != "undefined" ? h.isInternetExplorer.cached : Boolean(h.getInternetExplorerMajorVersion());
            return e
        }
        ,
        h.options.html4Mode ? h.emulated = {
            pushState: !0,
            hashChange: !0
        } : h.emulated = {
            pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),
            hashChange: Boolean(!("onhashchange"in e || "onhashchange"in r) || h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8)
        },
        h.enabled = !h.emulated.pushState,
        h.bugs = {
            setHash: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
            safariPoll: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),
            ieDoubleCheck: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8),
            hashEscape: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 7)
        },
        h.isEmptyObject = function(e) {
            for (var t in e)
                if (e.hasOwnProperty(t))
                    return !1;
            return !0
        }
        ,
        h.cloneObject = function(e) {
            var t, n;
            return e ? (t = l.stringify(e),
            n = l.parse(t)) : n = {},
            n
        }
        ,
        h.getRootUrl = function() {
            var e = r.location.protocol + "//" + (r.location.hostname || r.location.host);
            if (r.location.port || !1)
                e += ":" + r.location.port;
            return e += "/",
            e
        }
        ,
        h.getBaseHref = function() {
            var e = r.getElementsByTagName("base")
              , t = null
              , n = "";
            return e.length === 1 && (t = e[0],
            n = t.href.replace(/[^\/]+$/, "")),
            n = n.replace(/\/+$/, ""),
            n && (n += "/"),
            n
        }
        ,
        h.getBaseUrl = function() {
            var e = h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();
            return e
        }
        ,
        h.getPageUrl = function() {
            var e = h.getState(!1, !1), t = (e || {}).url || h.getLocationHref(), n;
            return n = t.replace(/\/+$/, "").replace(/[^\/]+$/, function(e, t, n) {
                return /\./.test(e) ? e : e + "/"
            }),
            n
        }
        ,
        h.getBasePageUrl = function() {
            var e = h.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e, t, n) {
                return /[^\/]$/.test(e) ? "" : e
            }).replace(/\/+$/, "") + "/";
            return e
        }
        ,
        h.getFullUrl = function(e, t) {
            var n = e
              , r = e.substring(0, 1);
            return t = typeof t == "undefined" ? !0 : t,
            /[a-z]+\:\/\//.test(e) || (r === "/" ? n = h.getRootUrl() + e.replace(/^\/+/, "") : r === "#" ? n = h.getPageUrl().replace(/#.*/, "") + e : r === "?" ? n = h.getPageUrl().replace(/[\?#].*/, "") + e : t ? n = h.getBaseUrl() + e.replace(/^(\.\/)+/, "") : n = h.getBasePageUrl() + e.replace(/^(\.\/)+/, "")),
            n.replace(/\#$/, "")
        }
        ,
        h.getShortUrl = function(e) {
            var t = e
              , n = h.getBaseUrl()
              , r = h.getRootUrl();
            return h.emulated.pushState && (t = t.replace(n, "")),
            t = t.replace(r, "/"),
            h.isTraditionalAnchor(t) && (t = "./" + t),
            t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""),
            t
        }
        ,
        h.getLocationHref = function(e) {
            return e = e || r,
            e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : e.URL.indexOf("#") == -1 && e.location.href.indexOf("#") != -1 ? e.location.href : e.URL || e.location.href
        }
        ,
        h.store = {},
        h.idToState = h.idToState || {},
        h.stateToId = h.stateToId || {},
        h.urlToId = h.urlToId || {},
        h.storedStates = h.storedStates || [],
        h.savedStates = h.savedStates || [],
        h.normalizeStore = function() {
            h.store.idToState = h.store.idToState || {},
            h.store.urlToId = h.store.urlToId || {},
            h.store.stateToId = h.store.stateToId || {}
        }
        ,
        h.getState = function(e, t) {
            typeof e == "undefined" && (e = !0),
            typeof t == "undefined" && (t = !0);
            var n = h.getLastSavedState();
            return !n && t && (n = h.createStateObject()),
            e && (n = h.cloneObject(n),
            n.url = n.cleanUrl || n.url),
            n
        }
        ,
        h.getIdByState = function(e) {
            var t = h.extractId(e.url), n;
            if (!t) {
                n = h.getStateString(e);
                if (typeof h.stateToId[n] != "undefined")
                    t = h.stateToId[n];
                else if (typeof h.store.stateToId[n] != "undefined")
                    t = h.store.stateToId[n];
                else {
                    for (; ; ) {
                        t = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
                        if (typeof h.idToState[t] == "undefined" && typeof h.store.idToState[t] == "undefined")
                            break
                    }
                    h.stateToId[n] = t,
                    h.idToState[t] = e
                }
            }
            return t
        }
        ,
        h.normalizeState = function(e) {
            var t, n;
            if (!e || typeof e != "object")
                e = {};
            if (typeof e.normalized != "undefined")
                return e;
            if (!e.data || typeof e.data != "object")
                e.data = {};
            return t = {},
            t.normalized = !0,
            t.title = e.title || "",
            t.url = h.getFullUrl(e.url ? e.url : h.getLocationHref()),
            t.hash = h.getShortUrl(t.url),
            t.data = h.cloneObject(e.data),
            t.id = h.getIdByState(t),
            t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""),
            t.url = t.cleanUrl,
            n = !h.isEmptyObject(t.data),
            (t.title || n) && h.options.disableSuid !== !0 && (t.hash = h.getShortUrl(t.url).replace(/\??\&_suid.*/, ""),
            /\?/.test(t.hash) || (t.hash += "?"),
            t.hash += "&_suid=" + t.id),
            t.hashedUrl = h.getFullUrl(t.hash),
            (h.emulated.pushState || h.bugs.safariPoll) && h.hasUrlDuplicate(t) && (t.url = t.hashedUrl),
            t
        }
        ,
        h.createStateObject = function(e, t, n) {
            var r = {
                data: e,
                title: t,
                url: n
            };
            return r = h.normalizeState(r),
            r
        }
        ,
        h.getStateById = function(e) {
            e = String(e);
            var n = h.idToState[e] || h.store.idToState[e] || t;
            return n
        }
        ,
        h.getStateString = function(e) {
            var t, n, r;
            return t = h.normalizeState(e),
            n = {
                data: t.data,
                title: e.title,
                url: e.url
            },
            r = l.stringify(n),
            r
        }
        ,
        h.getStateId = function(e) {
            var t, n;
            return t = h.normalizeState(e),
            n = t.id,
            n
        }
        ,
        h.getHashByState = function(e) {
            var t, n;
            return t = h.normalizeState(e),
            n = t.hash,
            n
        }
        ,
        h.extractId = function(e) {
            var t, n, r, i;
            return e.indexOf("#") != -1 ? i = e.split("#")[0] : i = e,
            n = /(.*)\&_suid=([0-9]+)$/.exec(i),
            r = n ? n[1] || e : e,
            t = n ? String(n[2] || "") : "",
            t || !1
        }
        ,
        h.isTraditionalAnchor = function(e) {
            var t = !/[\/\?\.]/.test(e);
            return t
        }
        ,
        h.extractState = function(e, t) {
            var n = null, r, i;
            return t = t || !1,
            r = h.extractId(e),
            r && (n = h.getStateById(r)),
            n || (i = h.getFullUrl(e),
            r = h.getIdByUrl(i) || !1,
            r && (n = h.getStateById(r)),
            !n && t && !h.isTraditionalAnchor(e) && (n = h.createStateObject(null, null, i))),
            n
        }
        ,
        h.getIdByUrl = function(e) {
            var n = h.urlToId[e] || h.store.urlToId[e] || t;
            return n
        }
        ,
        h.getLastSavedState = function() {
            return h.savedStates[h.savedStates.length - 1] || t
        }
        ,
        h.getLastStoredState = function() {
            return h.storedStates[h.storedStates.length - 1] || t
        }
        ,
        h.hasUrlDuplicate = function(e) {
            var t = !1, n;
            return n = h.extractState(e.url),
            t = n && n.id !== e.id,
            t
        }
        ,
        h.storeState = function(e) {
            return h.urlToId[e.url] = e.id,
            h.storedStates.push(h.cloneObject(e)),
            e
        }
        ,
        h.isLastSavedState = function(e) {
            var t = !1, n, r, i;
            return h.savedStates.length && (n = e.id,
            r = h.getLastSavedState(),
            i = r.id,
            t = n === i),
            t
        }
        ,
        h.saveState = function(e) {
            return h.isLastSavedState(e) ? !1 : (h.savedStates.push(h.cloneObject(e)),
            !0)
        }
        ,
        h.getStateByIndex = function(e) {
            var t = null;
            return typeof e == "undefined" ? t = h.savedStates[h.savedStates.length - 1] : e < 0 ? t = h.savedStates[h.savedStates.length + e] : t = h.savedStates[e],
            t
        }
        ,
        h.getCurrentIndex = function() {
            var e = null;
            return h.savedStates.length < 1 ? e = 0 : e = h.savedStates.length - 1,
            e
        }
        ,
        h.getHash = function(e) {
            var t = h.getLocationHref(e), n;
            return n = h.getHashByUrl(t),
            n
        }
        ,
        h.unescapeHash = function(e) {
            var t = h.normalizeHash(e);
            return t = decodeURIComponent(t),
            t
        }
        ,
        h.normalizeHash = function(e) {
            var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");
            return t
        }
        ,
        h.setHash = function(e, t) {
            var n, i;
            return t !== !1 && h.busy() ? (h.pushQueue({
                scope: h,
                callback: h.setHash,
                args: arguments,
                queue: t
            }),
            !1) : (h.busy(!0),
            n = h.extractState(e, !0),
            n && !h.emulated.pushState ? h.pushState(n.data, n.title, n.url, !1) : h.getHash() !== e && (h.bugs.setHash ? (i = h.getPageUrl(),
            h.pushState(null, null, i + "#" + e, !1)) : r.location.hash = e),
            h)
        }
        ,
        h.escapeHash = function(t) {
            var n = h.normalizeHash(t);
            return n = e.encodeURIComponent(n),
            h.bugs.hashEscape || (n = n.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")),
            n
        }
        ,
        h.getHashByUrl = function(e) {
            var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return t = h.unescapeHash(t),
            t
        }
        ,
        h.setTitle = function(e) {
            var t = e.title, n;
            t || (n = h.getStateByIndex(0),
            n && n.url === e.url && (t = n.title || h.options.initialTitle));
            try {
                r.getElementsByTagName("title")[0].innerHTML = t.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (i) {}
            return r.title = t,
            h
        }
        ,
        h.queues = [],
        h.busy = function(e) {
            typeof e != "undefined" ? h.busy.flag = e : typeof h.busy.flag == "undefined" && (h.busy.flag = !1);
            if (!h.busy.flag) {
                u(h.busy.timeout);
                var t = function() {
                    var e, n, r;
                    if (h.busy.flag)
                        return;
                    for (e = h.queues.length - 1; e >= 0; --e) {
                        n = h.queues[e];
                        if (n.length === 0)
                            continue;
                        r = n.shift(),
                        h.fireQueueItem(r),
                        h.busy.timeout = o(t, h.options.busyDelay)
                    }
                };
                h.busy.timeout = o(t, h.options.busyDelay)
            }
            return h.busy.flag
        }
        ,
        h.busy.flag = !1,
        h.fireQueueItem = function(e) {
            return e.callback.apply(e.scope || h, e.args || [])
        }
        ,
        h.pushQueue = function(e) {
            return h.queues[e.queue || 0] = h.queues[e.queue || 0] || [],
            h.queues[e.queue || 0].push(e),
            h
        }
        ,
        h.queue = function(e, t) {
            return typeof e == "function" && (e = {
                callback: e
            }),
            typeof t != "undefined" && (e.queue = t),
            h.busy() ? h.pushQueue(e) : h.fireQueueItem(e),
            h
        }
        ,
        h.clearQueue = function() {
            return h.busy.flag = !1,
            h.queues = [],
            h
        }
        ,
        h.stateChanged = !1,
        h.doubleChecker = !1,
        h.doubleCheckComplete = function() {
            return h.stateChanged = !0,
            h.doubleCheckClear(),
            h
        }
        ,
        h.doubleCheckClear = function() {
            return h.doubleChecker && (u(h.doubleChecker),
            h.doubleChecker = !1),
            h
        }
        ,
        h.doubleCheck = function(e) {
            return h.stateChanged = !1,
            h.doubleCheckClear(),
            h.bugs.ieDoubleCheck && (h.doubleChecker = o(function() {
                return h.doubleCheckClear(),
                h.stateChanged || e(),
                !0
            }, h.options.doubleCheckInterval)),
            h
        }
        ,
        h.safariStatePoll = function() {
            var t = h.extractState(h.getLocationHref()), n;
            if (!h.isLastSavedState(t))
                return n = t,
                n || (n = h.createStateObject()),
                h.Adapter.trigger(e, "popstate"),
                h;
            return
        }
        ,
        h.back = function(e) {
            return e !== !1 && h.busy() ? (h.pushQueue({
                scope: h,
                callback: h.back,
                args: arguments,
                queue: e
            }),
            !1) : (h.busy(!0),
            h.doubleCheck(function() {
                h.back(!1)
            }),
            p.go(-1),
            !0)
        }
        ,
        h.forward = function(e) {
            return e !== !1 && h.busy() ? (h.pushQueue({
                scope: h,
                callback: h.forward,
                args: arguments,
                queue: e
            }),
            !1) : (h.busy(!0),
            h.doubleCheck(function() {
                h.forward(!1)
            }),
            p.go(1),
            !0)
        }
        ,
        h.go = function(e, t) {
            var n;
            if (e > 0)
                for (n = 1; n <= e; ++n)
                    h.forward(t);
            else {
                if (!(e < 0))
                    throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for (n = -1; n >= e; --n)
                    h.back(t)
            }
            return h
        }
        ;
        if (h.emulated.pushState) {
            var v = function() {};
            h.pushState = h.pushState || v,
            h.replaceState = h.replaceState || v
        } else
            h.onPopState = function(t, n) {
                var r = !1, i = !1, s, o;
                return h.doubleCheckComplete(),
                s = h.getHash(),
                s ? (o = h.extractState(s || h.getLocationHref(), !0),
                o ? h.replaceState(o.data, o.title, o.url, !1) : (h.Adapter.trigger(e, "anchorchange"),
                h.busy(!1)),
                h.expectedStateId = !1,
                !1) : (r = h.Adapter.extractEventData("state", t, n) || !1,
                r ? i = h.getStateById(r) : h.expectedStateId ? i = h.getStateById(h.expectedStateId) : i = h.extractState(h.getLocationHref()),
                i || (i = h.createStateObject(null, null, h.getLocationHref())),
                h.expectedStateId = !1,
                h.isLastSavedState(i) ? (h.busy(!1),
                !1) : (h.storeState(i),
                h.saveState(i),
                h.setTitle(i),
                h.Adapter.trigger(e, "statechange"),
                h.busy(!1),
                !0))
            }
            ,
            h.Adapter.bind(e, "popstate", h.onPopState),
            h.pushState = function(t, n, r, i) {
                if (h.getHashByUrl(r) && h.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (i !== !1 && h.busy())
                    return h.pushQueue({
                        scope: h,
                        callback: h.pushState,
                        args: arguments,
                        queue: i
                    }),
                    !1;
                h.busy(!0);
                var s = h.createStateObject(t, n, r);
                return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s),
                h.expectedStateId = s.id,
                p.pushState(s.id, s.title, s.url),
                h.Adapter.trigger(e, "popstate")),
                !0
            }
            ,
            h.replaceState = function(t, n, r, i) {
                if (h.getHashByUrl(r) && h.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (i !== !1 && h.busy())
                    return h.pushQueue({
                        scope: h,
                        callback: h.replaceState,
                        args: arguments,
                        queue: i
                    }),
                    !1;
                h.busy(!0);
                var s = h.createStateObject(t, n, r);
                return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s),
                h.expectedStateId = s.id,
                p.replaceState(s.id, s.title, s.url),
                h.Adapter.trigger(e, "popstate")),
                !0
            }
            ;
        if (s) {
            try {
                h.store = l.parse(s.getItem("History.store")) || {}
            } catch (m) {
                h.store = {}
            }
            h.normalizeStore()
        } else
            h.store = {},
            h.normalizeStore();
        h.Adapter.bind(e, "unload", h.clearAllIntervals),
        h.saveState(h.storeState(h.extractState(h.getLocationHref(), !0))),
        s && (h.onUnload = function() {
            var e, t, n;
            try {
                e = l.parse(s.getItem("History.store")) || {}
            } catch (r) {
                e = {}
            }
            e.idToState = e.idToState || {},
            e.urlToId = e.urlToId || {},
            e.stateToId = e.stateToId || {};
            for (t in h.idToState) {
                if (!h.idToState.hasOwnProperty(t))
                    continue;
                e.idToState[t] = h.idToState[t]
            }
            for (t in h.urlToId) {
                if (!h.urlToId.hasOwnProperty(t))
                    continue;
                e.urlToId[t] = h.urlToId[t]
            }
            for (t in h.stateToId) {
                if (!h.stateToId.hasOwnProperty(t))
                    continue;
                e.stateToId[t] = h.stateToId[t]
            }
            h.store = e,
            h.normalizeStore(),
            n = l.stringify(e);
            try {
                s.setItem("History.store", n)
            } catch (i) {
                if (i.code !== DOMException.QUOTA_EXCEEDED_ERR)
                    throw i;
                s.length && (s.removeItem("History.store"),
                s.setItem("History.store", n))
            }
        }
        ,
        h.intervalList.push(a(h.onUnload, h.options.storeInterval)),
        h.Adapter.bind(e, "beforeunload", h.onUnload),
        h.Adapter.bind(e, "unload", h.onUnload));
        if (!h.emulated.pushState) {
            h.bugs.safariPoll && h.intervalList.push(a(h.safariStatePoll, h.options.safariPollInterval));
            if (i.vendor === "Apple Computer, Inc." || (i.appCodeName || "") === "Mozilla")
                h.Adapter.bind(e, "hashchange", function() {
                    h.Adapter.trigger(e, "popstate")
                }),
                h.getHash() && h.Adapter.onDomLoad(function() {
                    h.Adapter.trigger(e, "hashchange")
                })
        }
    }
    ,
    (!h.options || !h.options.delayInit) && h.init()
}(window)
