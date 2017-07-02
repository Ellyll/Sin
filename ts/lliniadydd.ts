namespace Sin {
    export class Lliniadydd {
        private _context : CanvasRenderingContext2D;

        constructor(context: CanvasRenderingContext2D) {
            this._context = context;
        }

        lliniadu(byd : Byd) : void {
            const ctx = this._context;

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            byd.siapiau.forEach(siap => {
                if (siap instanceof(Llinell)) {
                    const llinell : Llinell = <Llinell>siap;
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
}