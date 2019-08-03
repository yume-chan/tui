export type EventHandler<TSource, TArgs> = (source: TSource, e: TArgs) => void;

export class Event<TSource, TArgs> {
    add(handler: EventHandler<TSource, TArgs>): void;

    remove(handler: EventHandler<TSource, TArgs>): void;

    invoke(source: TSource, e: TArgs): void;
}
