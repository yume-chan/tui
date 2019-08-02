import { Color } from "./element";
import { Event } from './event';

export class TextBlock extends Element implements TextBlock.Inline {
    text: string | (string | TextBlock.Run)[];

    foregroundColor: Color;

    underline: boolean;

    italic: boolean;
}

export namespace TextBlock {
    export interface Inline {
        text: string | (string | TextBlock.Run)[];

        foregroundColor: Color;

        underline: boolean;

        italic: boolean;
    }

    export interface Run extends Inline {
        onClick: Event<Run, void>;
    }
}
