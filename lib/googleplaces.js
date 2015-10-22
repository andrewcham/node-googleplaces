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

function getFormattedHttpUrl(type) {
  const coreUrl = 'https://maps.googleapis.com/maps/api/place/';

  return coreUrl + type + '/json';
}

function getCall(type, queryObj, cb) {
  const url = getFormattedHttpUrl(type);

  request
    .get(url)
    .query(queryObj)
    .end(cb);
}

function postCall(type, sendObj, cb) {
  const url = getFormattedHttpUrl(type);

  request
    .post(url)
    .send(sendObj)
    .end(cb);
}

export function nearbySearch(queryObj, cb) {
  getCall(NEARBY_SEARCH, queryObj, cb);
}

export function textSearch(queryObj, cb) {
  getCall(TEXT_SEARCH, queryObj, cb);
}

export function radarSearch(queryObj, cb) {
  getCall(RADAR_SEARCH, queryObj, cb);
}

export function details(queryObj, cb) {
  getCall(DETAILS, queryObj, cb);
}

export function add(sendObj, cb) {
  postCall(ADD, sendObj, cb);
}

export function delete(sendObj, cb) {
  postCall(DELETE, sendObj, cb);
}

export function photo(queryObj, cb) {
  getCall(PHOTO, queryObj, cb);
}

export function autocomplete(queryObj, cb) {
  getCall(AUTOCOMPLETE, queryObj, cb);
}

export function queryAutocomplete(queryObj, cb) {
  getCall(QUERY_AUTOCOMPLETE, queryObj, cb);
}
