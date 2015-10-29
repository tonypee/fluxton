import EventEmitter from 'events';

var noop = function() {};

export default class FluxtonStore extends EventEmitter {
  constructor(fluxton, name, initialValue) {
    super();
    this.fluxton = fluxton;
    this.name = name;
    this.value = initialValue;
    this.dispatchToken = this.fluxton.dispatcher.register(payload => {
      if (payload.actionType === this.name) {
        this.value = payload.value;
        this.emitChange();
      }
      this.emit('action', payload.actionType, payload.value);
    });
  }

  waitFor(...args) {
    args = args.map(arg => {
      return this.fluxton.get(arg).dispatchToken;
    });
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

  change(modifier) {
    if (typeof modifier != 'function') {
      throw "modifier must be a function";
    }
    this.setValue(modifier.call(this, this.getValue()));
  }

  emitChange() {
    this.emit('change', this.value);
  }
}
