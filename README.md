# node-googleplaces
User-friendly and lightweight client for the Google Places JSON API. Supports promises and callbacks.

## Features
* All the web services calls from [this](https://developers.google.com/places/web-service/) wrapped up in an easy-to-use NPM.
* Callbacks _and_ promises supported.

## Installation

```sh
> npm install node-googleplaces
```

## Example

Parameter JSON inputs are exactly as described on the [web API page](https://developers.google.com/places/web-service/intro) _minus_ the API Key.

```js
import GooglePlaces from 'node-googleplaces';

const places = new GooglePlaces(<API KEY HERE>);
const params = {
  location: '49.250964,-123.102192',
  radius: 1000
};

// Callback
places.nearbySearch(query, (err, res) => {
  console.log(res.body);
});

// Promise
places.nearbySearch(query).then((res) => {
  console.log(res.body);
});
```

## API

### GET requests

places.nearbySearch(query[, callback])

places.textSearch(query[, callback])

places.radarSearch(query[, callback])

places.details(query[, callback])

places.autocomplete(query[, callback])

places.queryAutocomplete(query[, callback])

places.photo(query[, callback])

### POST requests

places.add(query[, callback])

places.delete(query[, callback])

## Testing

```sh
> GOOGLE_API_KEY=<API_KEY_HERE> npm test
```

Note that the tests currently take up `62` quota requests when run with a valid key. 

## FAQ

> Google Places also supports XML output, why doesn't your library have that?

I did mention that this library is opinionated. I like JSON way better than XML. If you use XML you deserve to use something else.

> I entered query [query here] into [function here] and it gave me an error. This sucks.

That wasn't a question, and yes it does suck. This library is unassuming, which means it will not fill in any missing required attributes in your query for you. Make sure you read Google's documentation properly before using this.

## Credits

Google.

## License

MIT
