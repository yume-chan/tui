import { Element } from './element';
import { TextBlock } from './text-block';

export class Table extends Element {
    columns: Table.ColumnDefinition[];

    data: unknown[][];
}

export namespace Table {
    export interface ColumnDefinition {
        id: string;

        header: string;

        template: (value: unknown, index: number, item: unknown) => TextBlock.Run;
    }
}
