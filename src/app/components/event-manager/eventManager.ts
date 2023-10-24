import {EventAction, IEventAction} from './EventAction';

export abstract class IEventManager {
  abstract subscribe<TPayload>(event: string, callback: (payload?: TPayload, token?: number) => void): number;
  abstract unSubscribe(event: string, token: number): void;
  abstract publish<TPayload>(event: string, payload?: TPayload): void;
}

  export class EventManager extends IEventManager {
    private _eventActions: {[event: string]: IEventAction; };

    constructor() {
      super();
      this._eventActions = {};
    }

    subscribe<TPayload>(event: string, callback: (payload?: TPayload, token?: number) => void): number {
      var evt: IEventAction;
      evt = this._eventActions[event] || (this._eventActions[event] = new EventAction());
      return evt.subscribe(callback);
    }

    unSubscribe(event: string, token: number): void {
      if (this._eventActions[event]) {
        this._eventActions[event].unSubscribe(token);
      }
    }

    publish<TPayload>(event: string, payload?: TPayload): void {
      if (this._eventActions[event]) {
        this._eventActions[event].notify(payload);
      }
    }
  }

