/******/ (() => { // webpackBootstrap
var pagination = document.querySelector('.pages');
var output = document.querySelector('.loading');
var contents = null; // randomuser.me/api/?results=10
// get around the blocking
// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

var loadBackupData = function loadBackupData() {
  fetch('./src/backup.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    return console.log(data);
  })["catch"](function () {
    console.log('backup data is not available'); //display static image
  });
};

var init = function init() {
  console.log('ready');
  var url = 'http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test/nyregion.js'; // site that doesn’t send Access-Control-*

  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    return console.log(data);
  })["catch"](function () {
    console.log('Can’t access ' + url + ' response. Blocked by browser?');
    loadBackupData();
  });
};

window.addEventListener('load', function (event) {
  console.log('page is fully loaded');
  init();
});
/******/ })()
;