import { Color, Element, Cell, CellStyle } from "./element";
import { Event, EventHandler } from './event';
import { Size } from "./size";

function* iterateText(text: TextBlock.Text): Generator<string, any, undefined> {
    if (typeof text === 'string') {
        yield* text;
    } else {
        for (const inline of text) {
            if (typeof inline === 'string') {
                yield* inline;
            } else {
                yield* iterateText(inline.text);
            }
        }
    }
}

function characterWidth(char: string): number {
    return 1;
}

export class TextBlock extends Element {
    public text: TextBlock.Text = '';

    public foregroundColor: Color;

    public bold: boolean = false;

    public italic: boolean = false;

    public underline: boolean = false;

    private _onClick: Event<void> = new Event();
    public get onClick(): Event<void> { return this._onClick; }

    protected measureOverride(availableSize: Size): Size {
        const size = super.measureOverride(availableSize);

        // TextBlock's auto width and auto height are relative
        // It's easier to calculate both together than separately.
        let needCalculateWidth = this.width === 'auto';
        let needCalculateHeight = this.height === 'auto';
        if (needCalculateWidth || needCalculateHeight) {
            let currentLineLength = 0;

            let width = needCalculateWidth ? 0 : size.width;
            let height = needCalculateHeight ? 0 : size.height;

            for (const char of iterateText(this.text)) {
                if (char === '\r') {
                    continue;
                }

                if (char === '\n') {
                    if (needCalculateWidth) {
                        if (currentLineLength > width) {
                            width = currentLineLength;
                        }
                    }

                    currentLineLength = 0;

                    if (needCalculateHeight) {
                        height += 1;
                    }
                    continue;
                }

                currentLineLength += characterWidth(char);
                if (currentLineLength >= size.width) {
                    currentLineLength = 0;

                    needCalculateWidth = false;
                    width = size.width;

                    if (needCalculateHeight) {
                        if (height === size.height) {
                            break;
                        }
                        height += 1;
                    } else {
                        break;
                    }
                }
            }

            if (needCalculateWidth) {
                if (currentLineLength > width) {
                    width = currentLineLength;
                }
            }

            currentLineLength = 0;

            if (needCalculateHeight) {
                height += 1;
            }

            return {
                width: width,
                height: height,
            };
        }

        return size;
    }

    private renderInline(text: TextBlock.Text, buffer: Cell[][], row: number, column: number, style: CellStyle): { row: number, column: number } {
        if (Array.isArray(text)) {
            for (const item of text) {
                ({ row, column } = this.renderInline(item, buffer, row, column, style));
            }
        } else if (typeof text === 'string') {
            for (const char of text) {
                buffer[row][column] = {
                    ...style,
                    character: char,
                    dirty: true,
                };
                column += 1;
                if (column === this.desiredSize.width) {
                    row += 1;
                    column = 0;

                    if (row === this.desiredSize.height) {
                        break;
                    }
                }
            }
        } else {
            style = { ...style };

            if (typeof text.backgroundColor !== 'undefined') {
                style.backgroundColor = text.backgroundColor;
            }

            if (typeof text.foregroundColor !== 'undefined') {
                style.foregroundColor = text.foregroundColor;
            }

            if (typeof text.bold !== 'undefined') {
                style.bold = text.bold;
            }

            if (typeof text.italic !== 'undefined') {
                style.italic = text.italic;
            }

            if (typeof text.underline !== 'undefined') {
                style.underline = text.underline;
            }

            for (const item of text.text) {
                ({ row, column } = this.renderInline(item, buffer, row, column, style));
            }
        }

        return { row, column };
    }

    public render(): Cell[][] {
        const buffer: Cell[][] = new Array(this.desiredSize.height);
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = new Array(this.desiredSize.width);
        }

        const style: CellStyle = {
            backgroundColor: this.backgroundColor,
            foregroundColor: this.foregroundColor,
            bold: this.bold,
            italic: this.italic,
            underline: this.underline,
        }
        this.renderInline(this.text, buffer, 0, 0, style);
        return buffer;
    }
}

export namespace TextBlock {
    export interface TextElement {
        text: Text;

        backgroundColor?: Color;

        foregroundColor?: Color;

        bold: boolean | undefined;

        italic: boolean | undefined;

        underline: boolean | undefined;

        readonly onClick: Event<void>;
    }

    export type Inline = string | TextElement;

    export type Text = Inline | Inline[];

    export interface RunInit {
        text: Text;

        backgroundColor: Color;

        foregroundColor: Color;

        bold: boolean | undefined;

        italic: boolean | undefined;

        underline: boolean | undefined;

        onClick: EventHandler<void>;
    }

    export class Run implements TextElement {
        public text: Text = '';

        public backgroundColor: Color;

        public foregroundColor: Color;

        public bold: boolean | undefined;

        public italic: boolean | undefined;

        public underline: boolean | undefined;

        private _onClick: Event<void> = new Event();
        public get onClick(): Event<void> { return this._onClick; }

        public constructor(options?: Partial<RunInit>) {
            if (typeof options !== 'undefined') {
                if (typeof options.text !== 'undefined') {
                    this.text = options.text;
                }

                this.backgroundColor = options.backgroundColor;
                this.foregroundColor = options.foregroundColor;
                this.bold = options.bold;
                this.italic = options.italic;
                this.underline = options.underline;

                if (typeof options.onClick !== 'undefined') {
                    this.onClick.add(options.onClick);
                }
            }
        }
    }
}
