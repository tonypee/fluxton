# fluxton
Flux Singleton Values

###Concept

Flux is about managing data dependencies via uni-directional data flow and the dispatcher's 'waitFor' feature. This allows the developer to, at an action level, define which store should be updated first. A lot of boilerplate is generated in passing the data through actions, into stores, before modifying an underlying value. By adding constraints that each store can only have a single value, and a single action (change), we can retain the ability to have data dependencies, but with less boilerplate.

If we treat the value in the store as immutable (as best practices suggest in all flux implementations), then each change will pass through the dispatched, and cause dependent updates, before mutating the store's value.

##Example

Facebooks flux documentation give an example of calculating a flight cost. We will do that below:

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

Copy the source into an existing project - this is just a test.
