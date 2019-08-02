import { Length, Element } from "./element";

export class Grid extends Element {
    children: Element[];

    rows: Grid.RowDefinition[];
    columns: Grid.ColumnDefinition[];
}

export namespace Grid {
    export const rowIndex: unique symbol;
    export const rowSpan: unique symbol;
    export const columnIndex: unique symbol;
    export const columnSpan: unique symbol;

    export type GridLength = number | string;

    export interface RowDefinition {
        height: GridLength;
        minHeight: Length;
        maxHeight: Length;
    }

    export interface ColumnDefinition {
        width: GridLength;
        minWidth: Length;
        maxWidth: Length;
    }
}

interface Element {
    [Grid.rowIndex]: number;
    [Grid.rowSpan]: number;
    [Grid.columnIndex]: number;
    [Grid.columnSpan]: number;
}
