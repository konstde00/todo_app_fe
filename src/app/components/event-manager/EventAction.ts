export interface IEventAction {
    subscribe(callback: (payload?: any, id?: number) => void): number;
    unSubscribe(id: number): void;
    notify(payload?: any): void;
  }

  class Subscription {
    constructor(public id: number,
                public callback: (payload?: any, id?: number) => void) {
    }
  }

  export class EventAction implements IEventAction {
    private _subscriptions: Subscription[];
    private _nextId: number;

    constructor() {
      this._subscriptions = [];
      this._nextId = 0;
    }

    public subscribe(callback: (payload?: any, id?: number) => void): number {
      const subscription = new Subscription(this._nextId++, callback);
      this._subscriptions[subscription.id] = subscription;
      return subscription.id;
    }

    public unSubscribe(id: number): void {
      // @ts-ignore
      this._subscriptions[id] = undefined;
    }

    public notify(payload?: any): void {
      this._subscriptions.forEach((subscription, index) => {
        if (subscription) {
          subscription.callback(payload, index);
        }
      });
    }
  }
