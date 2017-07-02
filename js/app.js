var Sin;
(function (Sin) {
    class App {
        cychwyn() {
            const canvas = document.getElementById("canvas");
            const context = canvas.getContext("2d");
            const lliniadydd = new Sin.Lliniadydd(context);
            // Gosod y canvas i'r maint mwyaf bosib
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            const xCanol = (canvas.width / 2) - 1;
            const yCanol = (canvas.height / 2) - 1;
            const cyflymderOnglaidd = (Math.PI * 2) / 2;
            const radiws = Math.min(xCanol, yCanol) / 1.1;
            let ongl = 0;
            const nolTon = (ongl, radiws) => {
                const llinellau = [];
                let pwyntDiwethaf;
                for (let o = 0; o < Math.PI * 2; o += (Math.PI * 2) / 350) {
                    const r = (radiws * 0.8 + radiws * 0.05 * Math.sin(o * 32) * Math.sin(ongl) + radiws * 0.05 * Math.sin(ongl));
                    const x = xCanol + r * Math.cos(o + ongl / 4);
                    const y = yCanol + r * Math.sin(o + ongl / 4);
                    const pwyntYma = new Sin.Fector2D(x, y);
                    if (o > 0) {
                        llinellau.push(new Sin.Llinell(pwyntDiwethaf, pwyntYma, Sin.Lliw.oHex("FFFFFF")));
                    }
                    pwyntDiwethaf = pwyntYma;
                }
                const lliwiau = Sin.Lliw.nolEnfys(llinellau.length);
                return llinellau.map((llinell, i) => llinell.gydaLliw(lliwiau[i]));
            };
            const diweddaru = (amserDiwethaf, amser) => {
                const dt = (amser - amserDiwethaf) / 1000; // cymryd y gwahaniaeth mewn amser a troi o milieiliadau i eiliadau
                ongl += dt * cyflymderOnglaidd;
                const siapiau = [];
                nolTon(ongl, radiws).forEach(llinell => siapiau.push(llinell));
                nolTon(-ongl, radiws * 0.7).forEach(llinell => siapiau.push(llinell));
                nolTon(ongl, radiws * 0.45).forEach(llinell => siapiau.push(llinell));
                nolTon(-ongl, radiws * 0.3).forEach(llinell => siapiau.push(llinell));
                const byd = new Sin.Byd(siapiau);
                lliniadydd.lliniadu(byd);
                window.requestAnimationFrame((rwan) => { diweddaru(amser, rwan); });
            };
            diweddaru(performance.now(), performance.now());
        }
    }
    Sin.App = App;
})(Sin || (Sin = {}));
var Sin;
(function (Sin) {
    class Byd {
        constructor(siapiau) {
            this.siapiau = siapiau;
        }
    }
    Sin.Byd = Byd;
})(Sin || (Sin = {}));
var Sin;
(function (Sin) {
    class Fector2D {
        constructor(x, y) {
            this._data = [x, y];
        }
        get 0() { return this._data[0]; }
        get 1() { return this._data[1]; }
        get x() { return this._data[0]; }
        get y() { return this._data[1]; }
        get length() { return 2; }
        toString() {
            return `(${Math.round(this.x * 100) / 100},${Math.round(this.y * 100) / 100})`;
        }
        // Dot product
        dot(fector) {
            return this.x * fector.x + this.y * fector.y;
        }
        lluosi(n) {
            return new Fector2D(this.x * n, this.y * n);
        }
        rhannu(n) {
            return new Fector2D(this.x / n, this.y / n);
        }
        ychwanegu(fector) {
            return new Fector2D(this.x + fector.x, this.y + fector.y);
        }
        tynnu(fector) {
            return new Fector2D(this.x - fector.x, this.y - fector.y);
        }
        maint() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        maintSgwar() {
            return this.x * this.x + this.y * this.y;
        }
        pellterI(fector) {
            const a = fector.tynnu(this);
            return a.maint();
        }
        pellterSgwarI(fector) {
            const a = fector.tynnu(this);
            return a.maintSgwar();
        }
        uned() {
            return this.rhannu(this.maint());
        }
        map(func) {
            return new Fector2D(func(this.x), func(this.y));
        }
        ynHafal(fector) {
            return this.x === fector.x && this.y === fector.y;
        }
    }
    Sin.Fector2D = Fector2D;
})(Sin || (Sin = {}));
var Sin;
(function (Sin) {
    class Siap {
        constructor() {
        }
    }
    Sin.Siap = Siap;
})(Sin || (Sin = {}));
/// <reference path="./siap.ts" />
var Sin;
(function (Sin) {
    class Llinell extends Sin.Siap {
        constructor(cychwyn, gorffen, lliw) {
            super();
            this.cychwyn = cychwyn;
            this.gorffen = gorffen;
            this.lliw = lliw;
        }
        gydaLliw(lliw) {
            return new Llinell(this.cychwyn, this.gorffen, lliw);
        }
    }
    Sin.Llinell = Llinell;
})(Sin || (Sin = {}));
var Sin;
(function (Sin) {
    class Lliniadydd {
        constructor(context) {
            this._context = context;
        }
        lliniadu(byd) {
            const ctx = this._context;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            byd.siapiau.forEach(siap => {
                if (siap instanceof (Sin.Llinell)) {
                    const llinell = siap;
                    ctx.strokeStyle = llinell.lliw.felRGBA();
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(llinell.cychwyn.x, llinell.cychwyn.y);
                    ctx.lineTo(llinell.gorffen.x, llinell.gorffen.y);
                    ctx.stroke();
                }
            });
        }
    }
    Sin.Lliniadydd = Lliniadydd;
})(Sin || (Sin = {}));
var Sin;
(function (Sin) {
    class Lliw {
        constructor(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            if (!Lliw.ynDilys(r))
                throw Error(`Cydran r annilys: ${r}`);
            if (!Lliw.ynDilys(g))
                throw Error(`Cydran g annilys: ${g}`);
            if (!Lliw.ynDilys(b))
                throw Error(`Cydran b annilys: ${b}`);
            if (!Lliw.ynDilys(a))
                throw Error(`Cydran a annilys: ${a}`);
        }
        static ynDilys(cydran) {
            return cydran >= 0 && cydran <= 255;
        }
        static oRGBA(r, g, b, a) {
            return new Lliw(r, g, b, a);
        }
        static oRGB(r, g, b) {
            return new Lliw(r, g, b, 255);
        }
        static oHex(hex) {
            const str = hex.startsWith("#") ? hex.substr(1) : hex;
            const hyd = str.length;
            // RGB, RGBA, RRGGBB, RRGGBBAA
            let step;
            switch (hyd) {
                case 3:
                case 4:
                    step = 1;
                    break;
                case 6:
                case 8:
                    step = 2;
                    break;
                default:
                    throw Error(`Fformat lliw anhywir: ${hex}`);
            }
            const c = []; // cydrannau
            for (let i = 0; i < hyd; i += step) {
                c.push(parseInt(str.substr(i, step), 16));
            }
            if (c.length < 4)
                c.push(255);
            return new Lliw(c[0], c[1], c[2], c[3]);
        }
        felRGBA() {
            return `rgba(${this.r},${this.g},${this.b},${this.a})`;
        }
        static nolRhestr(cychwyn, gorffen, nifer) {
            const lliwiau = [];
            for (let i = 0; i < nifer; i++) {
                const r = cychwyn.r + Math.round((gorffen.r - cychwyn.r) * i / nifer);
                const g = cychwyn.g + Math.round((gorffen.g - cychwyn.g) * i / nifer);
                const b = cychwyn.b + Math.round((gorffen.b - cychwyn.b) * i / nifer);
                lliwiau.push(Lliw.oRGB(r, g, b));
            }
            return lliwiau;
        }
        static nolEnfys(nifer) {
            // o https://stackoverflow.com/a/25510241
            const nolLliw = (numOfSteps, step) => {
                let r = 0.0;
                let g = 0.0;
                let b = 0.0;
                let h = step / numOfSteps;
                let i = Math.floor(h * 6);
                let f = h * 6.0 - i;
                let q = 1 - f;
                switch (i % 6) {
                    case 0:
                        r = 1;
                        g = f;
                        b = 0;
                        break;
                    case 1:
                        r = q;
                        g = 1;
                        b = 0;
                        break;
                    case 2:
                        r = 0;
                        g = 1;
                        b = f;
                        break;
                    case 3:
                        r = 0;
                        g = q;
                        b = 1;
                        break;
                    case 4:
                        r = f;
                        g = 0;
                        b = 1;
                        break;
                    case 5:
                        r = 1;
                        g = 0;
                        b = q;
                        break;
                }
                return Lliw.oRGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
            };
            const lliwiau = [];
            for (let cam = 0; cam < nifer; cam++) {
                lliwiau.push(nolLliw(nifer, cam));
            }
            return lliwiau;
        }
    }
    Sin.Lliw = Lliw;
})(Sin || (Sin = {}));
//# sourceMappingURL=app.js.map