import flux from 'flux';
import FluxtonStore from './FluxtonStore';

export default class Fluxton {
  constructor() {
    this.dispatcher = new flux.Dispatcher();
    this.stores = {};
  }
  create(name, initialValue) {
    if (this.stores[name]) {
      throw `Store ${name} already exists.`
    }
    return this.stores[name] = new FluxtonStore(this, name, initialValue);
  }
  get(name) {
    return this.stores[name];
  }
}
