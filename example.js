import Fluxton from './Fluxton';
import FluxtonStore from './FluxtonStore';

var fluxton = new Fluxton();

var summary = fluxton.create('summary');
var countries = fluxton.create('countries');
var selectedCountry = fluxton.create('selectedCountry');
var selectedState = fluxton.create('selectedState');
var flightCost = fluxton.create('flightCost');

selectedState.onAction = function(action, value) {
  console.log('#selectedState', action, value)
  this.waitFor('selectedCountry');
  switch (action) {
    case 'selectedCountry':
      this.value = (`Idahoe(in ${value})`);
      this.emitChange();
    break;
  }
};


flightCost.onAction = function(action, value) {
  console.log('#flightCost', action, value)
  this.waitFor('selectedCountry', 'selectedState');
  switch (action) {
    case 'selectedCountry':
    case 'selectedState':
      this.value = (fluxton.get('selectedCountry').getValue() + ' > '  +   fluxton.get('selectedState').getValue());
      this.emitChange();
    break;
  }
};

summary.onAction = function(action, value) {
  console.log('#summary', action)
  this.waitFor('flightCost');
  switch (action) {
    case 'selectedCountry':
    case 'selectedState':
    case 'flightCost':
      this.value = (`summary here: ` + fluxton.get('flightCost').getValue());
      this.emitChange();
    break;
  }
};

summary.on('change', function(value) {
  console.debug('!!! flight cost', value)
});

console.debug('----', countries);
countries.setValue(['USA', 'australia', 'nz']);
console.debug('----');
selectedCountry.setValue(fluxton.get('countries').getValue()[0]);
console.debug('----');
selectedState.setValue('California');
console.debug('----');
