namespace Sin {
    export class Lliw {

        private constructor(readonly r: number, readonly g: number, readonly b: number, readonly a: number) {
            if (!Lliw.ynDilys(r)) throw Error(`Cydran r annilys: ${r}`);
            if (!Lliw.ynDilys(g)) throw Error(`Cydran g annilys: ${g}`);
            if (!Lliw.ynDilys(b)) throw Error(`Cydran b annilys: ${b}`);
            if (!Lliw.ynDilys(a)) throw Error(`Cydran a annilys: ${a}`);
        }

        private static ynDilys(cydran: number) : boolean {
            return cydran >= 0 && cydran <=255;
        }

        static oRGBA(r: number, g: number, b: number, a: number) : Lliw {            
            return new Lliw(r, g, b, a);
        }

        static oRGB(r: number, g: number, b: number) : Lliw {            
            return new Lliw(r, g, b, 255);
        }

        static oHex(hex: string) : Lliw {
            const str = hex.startsWith("#") ? hex.substr(1) : hex;
            const hyd = str.length;

            // RGB, RGBA, RRGGBB, RRGGBBAA
            let step : number;
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

            const c : number[] = []; // cydrannau
            for (let i=0; i<hyd ; i += step) {
                c.push(parseInt(str.substr(i,step), 16));
            }
            if (c.length < 4) c.push(255);

            return new Lliw(c[0], c[1], c[2], c[3]);
        }

        felRGBA() : string {
            return `rgba(${this.r},${this.g},${this.b},${this.a})`;
        }

        static nolRhestr(cychwyn : Lliw, gorffen : Lliw, nifer : number) : Lliw[] {
            const lliwiau : Lliw[] = [];
            for (let i=0 ; i<nifer ; i++) {
                const r = cychwyn.r + Math.round((gorffen.r-cychwyn.r)*i/nifer);
                const g = cychwyn.g + Math.round((gorffen.g-cychwyn.g)*i/nifer);
                const b = cychwyn.b + Math.round((gorffen.b-cychwyn.b)*i/nifer);
                lliwiau.push(Lliw.oRGB(r,g,b));
            }
            return lliwiau;
        }

        static nolEnfys(nifer : number) : Lliw[] {
            // o https://stackoverflow.com/a/25510241
            const nolLliw = (numOfSteps : number, step : number) : Lliw => {
                let r = 0.0;
                let g = 0.0;
                let b = 0.0;
                let h = step / numOfSteps;
                let i = Math.floor(h * 6);
                let f = h * 6.0 - i;
                let q = 1 - f;

                switch (i % 6)
                {
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
                return Lliw.oRGB(Math.round(r*255), Math.round(g*255), Math.round(b*255));
            };

            const lliwiau : Lliw[] = [];
            for (let cam=0 ; cam<nifer ; cam++) {
                lliwiau.push(nolLliw(nifer, cam));
            }
            return lliwiau;
        }
    }
}