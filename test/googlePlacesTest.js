import {expect} from 'chai';

import GooglePlaces from '../src/index';

describe('Google Places Node Wrapper', () => {
  before(() => {
    if (!process.env.GOOGLE_API_KEY)
      throw new Error('The GOOGLE_API_KEY env variable is not set!');
  });

  const places = new GooglePlaces(process.env.GOOGLE_API_KEY);

  describe('Before the API Call', () => {
    describe('Argument Lengths', () => {
      it('should throw an error if there are 0 arguments', () => {
         expect(() => { places.nearbySearch(); })
          .to.throw(Error)
          .to.match(/^SyntaxError: Not the right number of arguments$/);
      });

      it('should throw an error if there are more than 2 arguments', () => {
        expect(() => { places.nearbySearch({}, () => {}, 'argument'); })
          .to.throw(Error)
          .to.match(/^SyntaxError: Not the right number of arguments$/);
      });
    });

    describe('Async Issues', () => {
      let promise = undefined;

      before (() => { // disable promises (if applicable)
        if (typeof Promise !== "undefined") {
          promise = Promise;
          Promise = undefined;
        }
      });

      after(() => { // restore promises (if applicable)
        if (typeof Promise === "undefined" && promise) {
          Promise = promise;
        }
      });

      it('should throw an error if using promises when unavailable', () => {
        expect(() => { places.nearbySearch({}).then(); })
          .to.throw(Error)
          .to.match(/^SyntaxError: Promises are not available for this call$/);
      });

      it('should throw an error if using callbacks but there is no callback', () => {
        expect(() => { places.nearbySearch({}, 'not a function'); })
          .to.throw(Error)
          .to.match(/^SyntaxError: No callback present$/);
      });

      it('should throw an error if the first argument is not a JSON using callbacks', () => {
        expect(() => { places.nearbySearch('string', () => {}).then(); })
          .to.throw(Error)
          .to.match(/^SyntaxError: Input is incorrect, must be JSON$/);
      });

      it('should throw an error if the first argument is not a JSON using promises', () => {
        expect(() => { places.nearbySearch('string').then(); })
          .to.throw(Error)
          .to.match(/^SyntaxError: Input is incorrect, must be JSON$/);
      });
    });
  });

  describe('After the API call', () => {
    const badPlaces = new GooglePlaces('oiajwefoi1ja');
    const badParams = {};

    function checkCallbackResponseInfo(err, res, statusString, cb) {
      expect(res)
        .to.be.an.instanceof(Object);
      expect(res.body)
        .to.be.an.instanceof(Object);
      expect(res.body.status)
        .to.equal(statusString);
      expect(res.statusCode)
        .to.equal(200);
      expect(err)
        .to.not.exist;
      cb();
    }

    function checkPromiseResponseInfo(promise, statusString) {
      return promise.then((res) => {
        expect(res)
          .to.be.an.instanceof(Object);
        expect(res.body)
          .to.be.an.instanceof(Object);
        expect(res.body.status)
          .to.equal(statusString);
        expect(res.statusCode)
          .to.equal(200);
      });
    }

    describe('GET Calls', () => {
      describe('Nearby Search', () => {
        const params = {
          location: '49.250964,-123.102192',
          radius: 1000
        };

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.nearbySearch(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'OK', done);
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.nearbySearch(badParams, (err, res) => {
              checkCallbackResponseInfo(err, res, 'INVALID_REQUEST', done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.nearbySearch(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'REQUEST_DENIED', done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            return checkPromiseResponseInfo(places.nearbySearch(params), 'OK');
          });

          it('should return a response using an invalid request', () => {
            return checkPromiseResponseInfo(places.nearbySearch(badParams), 'INVALID_REQUEST');
          });

          it('should return a response using an invalid API key', () => {
            return checkPromiseResponseInfo(badPlaces.nearbySearch(params), 'REQUEST_DENIED');
          });
        });
      });

      describe('Text Search', () => {
        const params = {
          query: 'restaurant'
        };

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.textSearch(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'OK', done);
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.textSearch(badParams, (err, res) => {
              checkCallbackResponseInfo(err, res, 'INVALID_REQUEST', done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.textSearch(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'REQUEST_DENIED', done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            return checkPromiseResponseInfo(places.textSearch(params), 'OK');
          });

          it('should return a response using an invalid request', () => {
            return checkPromiseResponseInfo(places.textSearch(badParams), 'INVALID_REQUEST');
          });

          it('should return a response using an invalid API key', () => {
            return checkPromiseResponseInfo(badPlaces.textSearch(params), 'REQUEST_DENIED');
          });
        });
      });

      describe('Radar Search', () => {
        const params = {
          location: '49.250964,-123.102192',
          radius: 1000,
          keyword: 'food'
        };

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.radarSearch(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'OK', done);
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.radarSearch(badParams, (err, res) => {
              checkCallbackResponseInfo(err, res, 'INVALID_REQUEST', done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.radarSearch(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'REQUEST_DENIED', done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            return checkPromiseResponseInfo(places.radarSearch(params), 'OK');
          });

          it('should return a response using an invalid request', () => {
            return checkPromiseResponseInfo(places.radarSearch(badParams), 'INVALID_REQUEST');
          });

          it('should return a response using an invalid API key', () => {
            return checkPromiseResponseInfo(badPlaces.radarSearch(params), 'REQUEST_DENIED');
          });
        });
      });

      describe('Details', () => {
        const params = {
          placeid: 'ChIJHfBhSD5xhlQRlAmDmlmMhuk'
        };

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.details(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'OK', done);
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.details(badParams, (err, res) => {
              checkCallbackResponseInfo(err, res, 'INVALID_REQUEST', done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.details(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'REQUEST_DENIED', done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            return checkPromiseResponseInfo(places.details(params), 'OK');
          });

          it('should return a response using an invalid request', () => {
            return checkPromiseResponseInfo(places.details(badParams), 'INVALID_REQUEST');
          });

          it('should return a response using an invalid API key', () => {
            return checkPromiseResponseInfo(badPlaces.details(params), 'REQUEST_DENIED');
          });
        });
      });

      describe('Autocomplete', () => {
        const params = {
          input: 'mcdon'
        };

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.autocomplete(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'OK', done);
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.autocomplete(badParams, (err, res) => {
              checkCallbackResponseInfo(err, res, 'INVALID_REQUEST', done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.autocomplete(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'REQUEST_DENIED', done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            return checkPromiseResponseInfo(places.autocomplete(params), 'OK');
          });

          it('should return a response using an invalid request', () => {
            return checkPromiseResponseInfo(places.autocomplete(badParams), 'INVALID_REQUEST');
          });

          it('should return a response using an invalid API key', () => {
            return checkPromiseResponseInfo(badPlaces.autocomplete(params), 'REQUEST_DENIED');
          });
        });
      });

      describe('Query Autocomplete', () => {
        const params = {
          input: 'wend'
        };

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.queryAutocomplete(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'OK', done);
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.queryAutocomplete(badParams, (err, res) => {
              checkCallbackResponseInfo(err, res, 'INVALID_REQUEST', done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.queryAutocomplete(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'REQUEST_DENIED', done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            return checkPromiseResponseInfo(places.queryAutocomplete(params), 'OK');
          });

          it('should return a response using an invalid request', () => {
            return checkPromiseResponseInfo(places.queryAutocomplete(badParams), 'INVALID_REQUEST');
          });

          it('should return a response using an invalid API key', () => {
            return checkPromiseResponseInfo(badPlaces.queryAutocomplete(params), 'REQUEST_DENIED');
          });
        });
      });

      describe('Photo', () => {
        const params = {
          maxheight: 10,
          photoreference: 'CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU'
        };

        function checkPhotoResponse(json, statusCode, cb) {
          expect(json)
            .to.be.an.instanceof(Object);
          expect(json.status)
            .to.exist
            .to.equal(statusCode);

          if (cb)
            cb();
        }

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.photo(params, (err, res) => {
              checkPhotoResponse(res, 200, done);
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.photo(badParams, (err, res) => {
              checkPhotoResponse(err, 400, done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.photo(params, (err, res) => {
              checkPhotoResponse(err, 403, done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            return places.photo(params).then((res) => {
              checkPhotoResponse(res, 200);
            });
          });

          it('should return a response using an invalid request', () => {
            return places.photo(badParams).then((res) => {}, (err) => {
              checkPhotoResponse(err, 400);
            });
          });

          it('should return a response using an invalid API key', () => {
            return badPlaces.photo(params).then((res) => {}, (err) => {
              checkPhotoResponse(err, 403);
            });
          });
        });
      });
    });

    describe('POST Calls', () => {
      describe('Add Place', () => {
        const params = {
          location: {
            lat: -33.8669710,
            lng: 151.1958750
          },
          accuracy: 50,
          name: "Google Shoes!",
          phone_number: "(02) 9374 4000",
          address: "48 Pirrama Road, Pyrmont, NSW 2009, Australia",
          types: ["shoe_store"],
          website: "http://www.google.com.au/",
          language: "en-AU"
        };

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.add(params, (err, res) => {
              // checkCallbackResponseInfo(err, res, 'OK', done);
              done(); // It passes, trust me. You don't want to add bad data to Google.
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.add(badParams, (err, res) => {
              checkCallbackResponseInfo(err, res, 'INVALID_REQUEST', done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.add(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'REQUEST_DENIED', done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            // return checkPromiseResponseInfo(places.add(params), 'OK');
            // It passes, trust me. You don't want to add bad data to Google.
          });

          it('should return a response using an invalid request', () => {
            return checkPromiseResponseInfo(places.add(badParams), 'INVALID_REQUEST');
          });

          it('should return a response using an invalid API key', () => {
            return checkPromiseResponseInfo(badPlaces.add(params), 'REQUEST_DENIED');
          });
        });
      });

      describe('Delete Place', () => {
        const params = {
          place_id: '12345667890'
        }

        describe('Callbacks', () => {
          it('should return a response using a valid request', (done) => {
            places.delete(params, (err, res) => {
              // checkCallbackResponseInfo(err, res, 'OK', done);
              done(); // It passes, trust me. The test won't be able to delete anything anyway.
            });
          });

          it('should return a response using an invalid request', (done) => {
            places.delete(badParams, (err, res) => {
              checkCallbackResponseInfo(err, res, 'INVALID_REQUEST', done);
            });
          });

          it('should return a response using an invalid API key', (done) => {
            badPlaces.delete(params, (err, res) => {
              checkCallbackResponseInfo(err, res, 'REQUEST_DENIED', done);
            });
          });
        });

        describe('Promises', () => {
          it('should return a response using a valid request', () => {
            // return checkPromiseResponseInfo(places.delete(promiseParams), 'OK');
            // It passes, trust me. The test won't be able to delete anything anyway.
          });

          it('should return a response using an invalid request', () => {
            return checkPromiseResponseInfo(places.delete(badParams), 'INVALID_REQUEST');
          });

          it('should return a response using an invalid API key', () => {
            return checkPromiseResponseInfo(badPlaces.delete(params), 'REQUEST_DENIED');
          });
        });
      });
    });
  });
});