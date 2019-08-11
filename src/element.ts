import { Size } from "./size";
import { HorizontalAlignment } from "./horizontal-alignment";
import { Thickness } from "./thickness";
import { Rect } from "./rect";
import { Event } from "./event";
import { i32, f64 } from "./types";

/**
 * A `Length` value.
 *
 * `width` and `height` can be a finite positive number, `'auto'`, or a percentage string.
 *
 * `minWidth`, `maxWidth`, `minHeight`, `maxHeight` can be `Infinity`, a positive number, or a percentage string.
 *
 * The meaning of `auto` may vary between `Element`s.
 */
export type Length = f64 | 'auto' | string;

/**
 * A `Color` value
 *
 * Can be a color keyword, or a '#RRGGBB' value.
 *
 * For terminals doesn't support true color, RGB values will be downsampled to keywords.
 */
export type Color = string | undefined;

export namespace Ensure {
    export function length(name: string, value: Length, allowInfinity: boolean, allowAuto: boolean) {
        if (typeof value === 'number') {
            if (Number.isNaN(value)) {
                throw new Error(`${name} must not be NaN`);
            }

            if (!allowInfinity && !Number.isFinite(value)) {
                throw new Error(`${name} must not be Infinity`)
            }

            if (value < 0) {
                throw new Error(`${name} must not be nagative`);
            }
        } else {
            if (value === 'auto') {
                if (!allowAuto) {
                    throw new Error(`${name} must not be 'auto'`)
                }
                return;
            }

            if (!value.match(/\d+\%/)) {
                throw new Error(`${name} is in invalid format`);
            }
        }
    }
}

/**
 * Provides a base element class for UI objects.
 */
export abstract class Element {
    protected _height: Length = 'auto';
    /**
     * Gets or sets the suggested height of an `Element`.
     */
    public get height(): Length { return this._height; }
    public set height(value: Length) {
        Ensure.length('height', value, false, true);
        this._height = value;
    }

    protected _minHeight: Length = 0;
    /**
     * Gets or sets the minimum height constraint of an `Element`.
     */
    public get minHeight(): Length { return this._minHeight; }
    public set minHeight(value: Length) {
        Ensure.length('minHeight', value, false, false);
        this._minHeight = value;
    }

    protected _maxHeight: Length = Infinity;
    /**
     * Gets or sets the maximum height constraint of an `Element`.
     */
    public get maxHeight(): Length { return this._maxHeight; }
    public set maxHeight(value: Length) {
        Ensure.length('maxHeight', value, true, false);
        this._maxHeight = value;
    }

    protected _width: Length = 'auto';
    /**
     * Gets or sets the suggested width of an `Element`.
     */
    public get width(): Length { return this._width; }
    public set width(value: Length) {
        Ensure.length('width', value, false, true);
        this._width = value;
    }

    protected _minWidth: Length = 0;
    /**
     * Gets or sets the minimum width constraint of an `Element`.
     */
    public get minWidth(): Length { return this._minWidth; }
    public set minWidth(value: Length) {
        Ensure.length('minWidth', value, false, false);
        this._minWidth = value;
    }

    protected _maxWidth: Length = Infinity;
    /**
     * Gets or sets the maximum width constraint of an `Element`.
     */
    public get maxWidth(): Length { return this._maxWidth; }
    public set maxWidth(value: Length) {
        Ensure.length('maxWidth', value, true, false);
        this._maxWidth = value;
    }

    protected _horizontalAlignment: HorizontalAlignment = HorizontalAlignment.Stretch;
    /**
     * Gets or sets the horizontal alignment characteristics that are applied to
     * an `Element` when it is composed in a layout parent, such as a panel or items control.
     */
    public get horizontalAlignment(): HorizontalAlignment { return this._horizontalAlignment; }
    public set horizontalAlignment(value: HorizontalAlignment) { this._horizontalAlignment = value; }

    protected _margin: Thickness = { left: 0, top: 0, right: 0, bottom: 0 };
    /**
     * Gets or sets the outer margin of an `Element`.
     */
    public get margin(): Thickness { return this._margin; }
    public set margin(value: Thickness) { this._margin = value; }

    private _borderThickness: Thickness = { left: 0, top: 0, right: 0, bottom: 0 };
    public get borderThickness(): Thickness { return this._borderThickness; }
    public set borderThickness(value: Thickness) { this._borderThickness = value; }

    protected _desiredSize: Size = { width: 0, height: 0 };
    /**
     * Gets the size that this `Element` computed during the measure pass of the layout process.
     */
    public get desiredSize(): Size { return this._desiredSize; }

    private _actualHeight: number = 0;
    /**
     * Gets the rendered height of an `Element`.
     */
    public get actualHeight(): number { return this._actualHeight; }

    private _actualWidth: number = 0;
    /**
     * Gets the rendered width of an `Element`.
     */
    public get actualWidth(): number { return this._actualWidth; }

    protected _allowFocusOnInteraction: boolean = false;
    public get allowFocusOnInteraction(): boolean { return this._allowFocusOnInteraction; }
    public set allowFocusOnInteraction(value: boolean) { this._allowFocusOnInteraction = value; }

    protected _isHitTestVisible: boolean = false;
    public get isHitTestVisible(): boolean { return this._isHitTestVisible; }
    public set isHitTestVisible(value: boolean) { this._isHitTestVisible = value; }

    private _backgroundColor: Color;
    /**
     * Gets or sets a `Color` that is used to fill the area between the borders of a `Panel`.
     */
    public get backgroundColor(): Color { return this._backgroundColor; }
    public set backgroundColor(value: Color) { this._backgroundColor = value; }

    public get parent(): Element { throw new Error('not implemented'); }

    private _onGotFocus: Event<void> = new Event();
    /**
     * Occurs when this element gets logical focus.
     */
    public get onGotFocus(): Event<void> { return this._onGotFocus; }

    private _onLostFocus: Event<void> = new Event();
    /**
     * Occurs when this element loses logical focus.
     */
    public get onLostFocus(): Event<void> { return this._onLostFocus; }

    public renderedBuffer: Cell[][] = [];

    protected computeAutoWidth(availableWidth: number): number {
        return availableWidth;
    }

    protected computeAutoHeight(availableHeight: number): number {
        return availableHeight;
    }

    protected computeWidth(availableWidth: i32, length: Length): f64 {
        if (typeof length === 'number') {
            return length;
        }

        if (length === 'auto') {
            return this.computeAutoWidth(availableWidth);
        }

        return availableWidth * Number.parseFloat(length) / 100;
    }

    protected computeHeight(availableHeight: number, length: Length): f64 {
        if (typeof length === 'number') {
            return length;
        }

        if (length === 'auto') {
            return this.computeAutoHeight(availableHeight);
        }

        return availableHeight * Number.parseFloat(length) / 100;
    }

    public arrange(finalRect: Rect): void {
        finalRect = this.arrangeOverride(finalRect);
        this._actualWidth = finalRect.width;
        this._actualHeight = finalRect.height;

        const buffer: Cell[][] = new Array(finalRect.height);
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = new Array(finalRect.width);
        }

        this.render(buffer);

        this.renderedBuffer = buffer;
    }

    protected arrangeOverride(finalRect: Rect): Rect {
        return finalRect;
    }

    public measure(availableSize: Size): void {
        const contentAvailableSize: Size = {
            width: Math.max(availableSize.width - this.margin.left - this.margin.right, 0),
            height: Math.max(availableSize.height - this.margin.top - this.margin.bottom, 0),
        };

        const desiredSize = this.measureOverride(contentAvailableSize);

        const minWidth = this.computeWidth(contentAvailableSize.width, this.minWidth);
        if (desiredSize.width < minWidth) {
            desiredSize.width = minWidth;
        }

        const minHeight = this.computeHeight(contentAvailableSize.height, this.minHeight);
        if (desiredSize.height < minHeight) {
            desiredSize.height = minHeight;
        }

        const maxWidth = this.computeWidth(contentAvailableSize.width, this.maxWidth);
        if (desiredSize.width > maxWidth) {
            desiredSize.width = maxWidth;
        }

        const maxHeight = this.computeHeight(contentAvailableSize.height, this.maxHeight);
        if (desiredSize.height > maxHeight) {
            desiredSize.height = maxHeight;
        }

        this._desiredSize = desiredSize;
    }

    protected measureOverride(availableSize: Size): Size {
        return {
            width: this.computeWidth(availableSize.width, this.width),
            height: this.computeHeight(availableSize.height, this.height),
        };
    }

    protected render(buffer: Cell[][]): void {
        // do nothing
    }
}

export interface CellStyle {
    backgroundColor: Color;

    foregroundColor: Color;

    bold: boolean;

    italic: boolean;

    underline: boolean;
}

export interface Cell extends CellStyle {
    character: string;

    dirty: boolean;
}
