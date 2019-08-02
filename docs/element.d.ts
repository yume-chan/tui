import { Event } from './event';

export type Length = number | string;

export type Color = string;

export interface Thickness {
    left: Length;

    top: Length;

    right: Length;

    bottom: Length;
}

export interface Size {
    width: number;

    height: number;
}

export interface Rect {
    x: number;

    y: number;

    width: number;

    height: number;
}

export abstract class Element {
    width: Length;
    minWidth: Length;
    maxWidth: Length;

    height: Length;
    minHeight: Length;
    maxHeight: Length;

    margin: Thickness;

    borderThickness: Thickness;
    borderColor: Color;
    focusBorderColor: Color;

    backgroundColor: Color;
    focusBackgroundColor: Color;

    foregroundColor: Color;
    focusForegroundColor: Color;

    readonly desiredSize: Size;
    readonly actualSize: Size;

    readonly focused: boolean;

    readonly onGotFocus: Event<this, void>;
    readonly onLostFocus: Event<this, void>;

    readonly onClick: Event<this, void>;
    readonly onDoubleClick: Event<this, void>;

    readonly onKeyDown: Event<this, string>;

    measure(availableSize: Size): void;

    arrange(rect: Rect): void;
}
