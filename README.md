# fluxton
Flux Singleton Values

###Concept

Fluxton forces a store to only have a single immutatble value, and a single action. The user generates a 'change', based on creating a new Immutable object, and passes this to 'setValue' which automatically generates an action, passes it to the flux dispatcher, and applies the change to the related store. Since all changes pass through the Dispatcher, other stores can for the action and 'waitFor' the change to be applied, as is expected in flux.

Since values are treated as immutable (or use immutable.js) then having the change represent the whole value is not an issue.

###TodoMVC Example

[Fluxton-todoMVC](https://github.com/tonypee/fluxton-todomvc)

###Example

Facebook's flux documentation give an example of calculating a flight cost which has dependent values. Lets explore this below, by creating 5 independent stores, 3 of which are dependent.

```
import Fluxton from './Fluxton';
import FluxtonStore from './FluxtonStore';

var fluxton = window.fluxton = new Fluxton();

var summary = fluxton.create('summary');
var countries = fluxton.create('countries');
var selectedCountry = fluxton.create('selectedCountry');
var selectedState = fluxton.create('selectedState');
var flightCost = fluxton.create('flightCost');

selectedState.on('action', function(action, value) {
  this.waitFor('selectedCountry');
  console.log('selectedState  handle action:', action)
  switch (action) {
    case 'selectedCountry':
      this.value = (`Idahoe(in ${value})`);
      this.emitChange();
    break;
  }
});


flightCost.on('action', function(action, value) {
  this.waitFor('selectedCountry', 'selectedState');
  console.log('flightCost handle action:', action)
  switch (action) {
    case 'selectedCountry':
    case 'selectedState':
      this.value = (fluxton.get('selectedCountry').getValue() + ' > '  +   fluxton.get('selectedState').getValue());
      this.emitChange();
    break;
  }
});

summary.on('action', function(action, value) {
  this.waitFor('flightCost');
  console.log('summary handle action:', action)
  switch (action) {
    case 'selectedCountry':
    case 'selectedState':
    case 'flightCost':
      this.value = (`summary here: ` + fluxton.get('flightCost').getValue());
      this.emitChange();
    break;
  }
});

flightCost.on('change', function(value) {
  console.debug('flight cost change: ', value)
});

summary.on('change', function(value) {
  console.debug('summary change: ', value)
});

console.debug('---- set country', countries);
countries.setValue(['USA', 'australia', 'nz']);
console.debug('---- set selectedCountry');
selectedCountry.setValue(fluxton.get('countries').getValue()[0]);
console.debug('---- set selectedState');
selectedState.setValue('California');
console.debug('----');

```

### Running the code

npm install

npm install -g webpack

webpack
