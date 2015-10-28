import EventEmitter from 'events';

var noop = function() {};

export default class FluxtonStore extends EventEmitter {
  constructor(fluxton, name) {
    super();
    this.fluxton = fluxton;
    this.name = name;
    this.value = null;
    this.dispatchToken = this.fluxton.dispatcher.register(payload => {
      if (payload.actionType === this.name) {
        this.value = payload.value;
        this.emit();
      }
      this.emit('action', payload.actionType, payload.value);
    });
  }

  waitFor(...args) {
    args = args.map(arg => {
      return this.fluxton.get(arg).dispatchToken;
    })
    this.fluxton.dispatcher.waitFor(args);
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.fluxton.dispatcher.dispatch({
      actionType: this.name,
      value: value
    });
  }

  emitChange() {
    this.emit('change', this.value);
  }
}
