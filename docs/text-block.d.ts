import { Color } from "./element";
import { Event } from './event';

export class TextBlock extends Element implements TextBlock.Inline {
    text: string | (string | TextBlock.Inline)[];

    foregroundColor: Color;

    underline: boolean;

    italic: boolean;

    readonly onClick: Event<this, void>;
}

export namespace TextBlock {
    export class Inline {
        text: string | (string | TextBlock.Inline)[];

        foregroundColor: Color;

        underline: boolean;

        italic: boolean;

        readonly onClick: Event<this, void>;
    }
}
