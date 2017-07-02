/// <reference path="./siap.ts" />

namespace Sin {
    export class Llinell extends Siap {
        constructor(readonly cychwyn : Fector2D,
                    readonly gorffen : Fector2D,
                    readonly lliw : Lliw) {
            super();
        }

        gydaLliw(lliw : Lliw) {
            return new Llinell(this.cychwyn, this.gorffen, lliw);
        }
    }
}