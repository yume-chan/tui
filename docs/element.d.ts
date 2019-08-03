import { Event } from './event';

/**
 * A `Length` value.
 *
 * `width` and `height` can be a finite positive number, `'auto'`, or a percentage string.
 *
 * `minWidth`, `maxWidth`, `minHeight`, `maxHeight` can be `Infinity`, a positive number, or a percentage string.
 *
 * The meaning of `auto` may vary between `Element`s.
 */
export type Length = number | string;

/**
 * A `Color` value
 *
 * Can be a color keyword, or a '#RRGGBB' value.
 *
 * For terminals doesn't support true color, RGB values will be downsampled to keywords.
 */
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

/**
 * Indicates where an element should be displayed on the horizontal axis
 * relative to the allocated layout slot of the parent element.
 */
export enum HorizontalAlignment {
    /**
     * An element aligned to the left of the layout slot for the parent element.
     */
    Left = 0,
    /**
     * An element aligned to the center of the layout slot for the parent element.
     */
    Center,
    /**
     * An element aligned to the right of the layout slot for the parent element.
     */
    Right,
    /**
     * An element stretched to fill the entire layout slot of the parent element.
     */
    Stretch,
}

export namespace Tui {
    /**
     * Provides a base element class for UI objects.
     */
    export abstract class Element {
        /**
         * Gets or sets the suggested height of an `Element`.
         */
        height: Length;
        /**
         * Gets or sets the minimum height constraint of an `Element`.
         */
        minHeight: Length;
        /**
         * Gets or sets the maximum height constraint of an `Element`.
         */
        maxHeight: Length;

        /**
         * Gets or sets the suggested width of an `Element`.
         */
        width: Length;
        /**
         * Gets or sets the minimum width constraint of an `Element`.
         */
        minWidth: Length;
        /**
         * Gets or sets the maximum width constraint of an `Element`.
         */
        maxWidth: Length;

        /**
         * Gets or sets the horizontal alignment characteristics that are applied to
         * an `Element` when it is composed in a layout parent, such as a panel or items control.
         */
        horizontalAlignment: HorizontalAlignment;

        /**
         * Gets or sets the outer margin of an `Element`.
         */
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

        render(): void;
    }
}

export type Element = Tui.Element;
