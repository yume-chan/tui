export type EventHandler<TArgs> = (source: unknown, e: TArgs) => void;

export class Event<TArgs> {
    private _handlers: Set<EventHandler<TArgs>> = new Set();

    public add(handler: EventHandler<TArgs>): void {
        this._handlers.add(handler);
    }

    public remove(handler: EventHandler<TArgs>): void {
        this._handlers.delete(handler);
    }

    public invoke(source: unknown, e: TArgs): void {
        for (const handler of this._handlers) {
            handler(source, e);
        }
    }
}
