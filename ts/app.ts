namespace Sin {
    export class App {
        cychwyn() {
            const canvas = <HTMLCanvasElement>document.getElementById("canvas");
            const context = canvas.getContext("2d");
            const lliniadydd = new Lliniadydd(context);            

            // Gosod y canvas i'r maint mwyaf bosib
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;

            const xCanol = (canvas.width/2)-1;
            const yCanol = (canvas.height/2)-1;

            const cyflymderOnglaidd = (Math.PI*2) / 2;
            const radiws = Math.min(xCanol, yCanol) / 1.1;
            let ongl = 0;

            const nolTon = (ongl : number, radiws : number) : Llinell[] => {
                const llinellau : Llinell[] = [];
                let pwyntDiwethaf : Fector2D;
                for(let o=0 ; o<Math.PI*2 ; o += (Math.PI*2)/350) {
                    const r = (radiws*0.8+radiws*0.05*Math.sin(o*32)*Math.sin(ongl)+radiws*0.05*Math.sin(ongl));
                    const x = xCanol + r*Math.cos(o+ongl/4); 
                    const y = yCanol + r*Math.sin(o+ongl/4);
                    const pwyntYma = new Fector2D(x, y);
                    if (o > 0) {
                        llinellau.push(new Llinell(pwyntDiwethaf, pwyntYma, Lliw.oHex("FFFFFF")));
                    }
                    pwyntDiwethaf = pwyntYma;
                }
                const lliwiau = Lliw.nolEnfys(llinellau.length);
                return llinellau.map( (llinell, i) => llinell.gydaLliw(lliwiau[i]));
            }

            const diweddaru = (amserDiwethaf : number, amser : number) : void => {
                const dt = (amser - amserDiwethaf)/1000; // cymryd y gwahaniaeth mewn amser a troi o milieiliadau i eiliadau
                ongl += dt*cyflymderOnglaidd;

                const siapiau : Siap[] = [];
                nolTon(ongl, radiws).forEach(llinell => siapiau.push(llinell));
                nolTon(-ongl, radiws*0.7).forEach(llinell => siapiau.push(llinell));
                nolTon(ongl, radiws*0.45).forEach(llinell => siapiau.push(llinell));
                nolTon(-ongl, radiws*0.3).forEach(llinell => siapiau.push(llinell));

                const byd = new Byd(siapiau);
                lliniadydd.lliniadu(byd);

                window.requestAnimationFrame((rwan) => { diweddaru(amser, rwan); });
            };

            diweddaru(performance.now(), performance.now());
        }
    }
}