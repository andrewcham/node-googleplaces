import request from 'superagent';

const NEARBY_SEARCH = 'nearbysearch';
const TEXT_SEARCH = 'textsearch';
const RADAR_SEARCH = 'radarsearch';
const DETAILS = 'details';
const ADD = 'add';
const DELETE = 'delete';
const PHOTO = 'photo';
const AUTOCOMPLETE = 'autocomplete';
const QUERY_AUTOCOMPLETE = 'queryautocomplete';

const JSON = '/json';
const NOTHING = '';

function getFormattedHttpUrl(type, format) {
  const coreUrl = 'https://maps.googleapis.com/maps/api/place/';

  return coreUrl + type + format;
}

function getCall(type, queryObj, format, cb) {
  const url = getFormattedHttpUrl(type, format);

  request
    .get(url)
    .query(queryObj)
    .end(cb);
}

function postCall(type, sendObj, cb) {
  const url = getFormattedHttpUrl(type, JSON);
  const key = sendObj.key;

  delete sendObj.key;

  request
    .post(url)
    .query({key})
    .send(sendObj)
    .end(cb);
}

export function nearbySearch(queryObj, cb) {
  getCall(NEARBY_SEARCH, queryObj, JSON, cb);
}

export function textSearch(queryObj, cb) {
  getCall(TEXT_SEARCH, queryObj, JSON, cb);
}

export function radarSearch(queryObj, cb) {
  getCall(RADAR_SEARCH, queryObj, JSON, cb);
}

export function details(queryObj, cb) {
  getCall(DETAILS, queryObj, JSON, cb);
}

export function addPlace(sendObj, cb) {
  postCall(ADD, sendObj, cb);
}

export function deletePlace(sendObj, cb) {
  postCall(DELETE, sendObj, cb);
}

export function photo(queryObj, cb) {
  getCall(PHOTO, queryObj, NOTHING, cb);
}

export function autocomplete(queryObj, cb) {
  getCall(AUTOCOMPLETE, queryObj, JSON, cb);
}

export function queryAutocomplete(queryObj, cb) {
  getCall(QUERY_AUTOCOMPLETE, queryObj, JSON, cb);
}
