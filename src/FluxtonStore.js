import EventEmitter from 'events';

var noop = function() {};

export default class FluxtonStore extends EventEmitter {
  constructor(fluxton, name, initialValue) {
    super();
    this.fluxton = fluxton;
    this.name = name;
    this.previousValue = null;
    this.value = initialValue;
    this.dependencies = [];
    this.dispatchToken = this.fluxton.dispatcher.register(payload => {
      if (payload.actionType === this.name) {
        this.previousValue = this.value;
        this.value = payload.value;
        this.emitChange();
      }
      //this.emit('action', payload.actionType, payload.value);

      for (var dependency of this.dependencies) {
        for (var action of dependency.actions) {
          if (action == payload.actionType) {
            this.waitFor(dependency.actions);
            console.log('CALL!')
            dependency.callback.call(this);
          }
        }
      }
    });
  }

  waitFor(...args) {
    args = args[0].map(arg => {
      return this.fluxton.get(arg).dispatchToken;
    });
    this.fluxton.dispatcher.waitFor(args);
  }

  depend(actions, callback) {
    this.dependencies.push({ actions, callback })
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
