import * as placesLib from './lib/googleplaces';

function processInput(apiKey, placesFunction, args) {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError('Not the right number of arguments');

  let query = arg[0];

  if (typeof query !== 'object')
    throw new SyntaxError('Input is incorrect, must be JSON');

  // add the API key to the query; every query needs one
  query.key = apiKey;

  // promise call
  if (args.length === 1) {
    if (typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        placesFunction(query, (err, res) => {
          if (err) 
            return reject(err);
          
          resolve(res);
        });
      });
    } 
    else 
      throw new SyntaxError('Promises are not available for this call');
  } 
  else { // regular callback
    const cb = arg[1];

    if (typeof cb !== 'function') 
      throw new SyntaxError('No callback present');
    
    placesFunction(query, cb);
  } 
}

class GooglePlaces {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  nearbySearch(query, cb) {
    processInput(this.apiKey, placesLib.nearbySearch, arguments);
  }

  textSearch(queryObj, cb) {
    processInput(this.apiKey, placesLib.textSearch, arguments);
  }

  radarSearch(queryObj, cb) {
    processInput(this.apiKey, placesLib.radarSearch, arguments);
  }

  details(queryObj, cb) {
    processInput(this.apiKey, placesLib.details, arguments);
  }

  add(sendObj, cb) {
    processInput(this.apiKey, placesLib.addPlace, arguments);
  }

  delete(sendObj, cb) {
    processInput(this.apiKey, placesLib.deletePlace, arguments);
  }

  photo(queryObj, cb) {
    processInput(this.apiKey, placesLib.photo, arguments);
  }

  autocomplete(queryObj, cb) {
    processInput(this.apiKey, placesLib.autocomplete, arguments);
  }

  queryAutocomplete(queryObj, cb) {
    processInput(this.apiKey, placesLib.queryAutocomplete, arguments);
  }
}

export default GooglePlaces;
