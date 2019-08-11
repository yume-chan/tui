import readline from 'readline';

import chalk from 'chalk';

import { Element } from './element';

export class Terminal {
    public child: Element | undefined;

    public render(): void {
        if (typeof this.child === 'undefined') {
            return;
        }

        this.child.measure({
            width: process.stdout.columns!,
            height: process.stdout.rows!,
        });

        this.child.arrange({
            x: 0,
            y: 0,
            width: this.child.desiredSize.width,
            height: this.child.desiredSize.height,
        });

        const buffer = this.child.renderedBuffer;
        for (let row = 0; row < this.child.actualHeight; row++) {
            for (let column = 0; column < this.child.actualWidth; column++) {
                const cell = buffer[row][column];

                readline.moveCursor(process.stdout, 0, 0);

                let style = chalk;
                if (cell.bold) {
                    style = style.bold;
                }
                if (cell.italic) {
                    style = style.italic;
                }
                if (cell.foregroundColor) {
                    style = style.keyword(cell.foregroundColor);
                }
                if (cell.backgroundColor) {
                    style = style.bgKeyword(cell.backgroundColor);
                }

                process.stdout.write(style(cell.character));
            }
        }


    }
}
