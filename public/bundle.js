/******/ (() => { // webpackBootstrap
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var pagination = document.querySelector('.pages');
var output = document.querySelector('.english');
var langToggle = document.querySelector('#show-hide-articles');
var engLang = document.querySelector('#english-lang');
var marLang = document.querySelector('#martian-lang');
var prev = document.querySelector('#left');
var next = document.querySelector('#right');
var posts = {
  postPerPg: 5,
  currentPg: 1,
  tolPage: null,
  isEnglish: true
};
var data = null;
var articles = [];

var useHTTPReq = function useHTTPReq() {
  var Http = new XMLHttpRequest();
  var url = 'https://np-ec2-nytimes-com.s3.amazonaws.com/dev/test/nyregion.js';
  Http.open('GET', url);
  Http.send();

  Http.onreadystatechange = function (e) {
    console.log(Http.responseText);
  };
};

var init = function init() {
  console.log('ready');
  var url = 'http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test/nyregion.js'; // site that doesn’t send Access-Control-*

  fetch(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    data = json.content;
    buildArticles();
  })["catch"](function () {
    console.log('Can’t access ' + url + ' response. Blocked by browser?');
    useHTTPReq();
    loadBackupData();
  });
  prev.addEventListener('click', handleArticleNavigation);
  next.addEventListener('click', handleArticleNavigation);
  engLang.addEventListener('click', handleLanguageToggle);
  marLang.addEventListener('click', handleLanguageToggle);
};

var handleArticleNavigation = function handleArticleNavigation(e) {
  console.log(e.target.id === 'right');

  if (e.target.id === 'right') {
    renderArticles(posts.currentPg++);
  } else if (e.target.id === 'left') {
    renderArticles(posts.currentPg--);
  }
};

var handleLanguageToggle = function handleLanguageToggle(e) {
  console.log(e, e.target.id);
  e.target.id === 'english-lang' ? posts.isEnglish = true : posts.isEnglish = false;
  renderArticles();
};

var renderArticles = function renderArticles(page) {
  console.log(posts.isEnglish);
  var header = document.createElement('div');
  page ? page : posts.currentPg;
  output.innerHTML = '';

  if (!posts.isEnglish) {// updateLang();
  }

  var startPost = (posts.currentPg - 1) * posts.postPerPg;
  var endPost = startPost + posts.postPerPg > articles.length ? articles.length : startPost + posts.postPerPg;
  posts.tolPage = Math.ceil(articles.length / posts.postPerPg);
  pagination.innerHTML = "<h2>".concat(posts.currentPg, " of ").concat(posts.tolPage, "  </h2>");
  header.innerHTML = "<h1>".concat(data.page.parameters.title, "</h1> <hr/>");
  output.appendChild(header);

  for (var i = startPost; i < endPost; i++) {
    var div = document.createElement('div');
    div.innerHTML = "<li><div>".concat(articles[i].publicationDt, "</div>\n    <div>\n    <a href=\"").concat(articles[i].url, "\">\n    <h2> ").concat(posts.isEnglish ? articles[i].headline : updateLang(articles[i].headline), "</h2></a>\n    <p>").concat(posts.isEnglish ? articles[i].summary : updateLang(articles[i].summary), "</p>\n    <p><").concat(articles[i].byline, "</p>\n    </div></li>");
    output.appendChild(div);
  }
}; // Create article to be populated


var createArticle = function createArticle(content, img) {
  // console.log(img);
  var publicationDt = content.publicationDt,
      headline = content.headline,
      summary = content.summary,
      byline = content.byline,
      url = content.url;
  articles.push({
    publicationDt: publicationDt,
    headline: headline,
    summary: summary,
    byline: byline,
    url: url,
    img: img
  });
}; //check if data has
// headline && publication datw &&  summary && url


var isArticle = function isArticle(data) {
  var publicationDt = data.publicationDt,
      headline = data.headline,
      summary = data.summary,
      byline = data.byline,
      url = data.url;
  return publicationDt && headline && summary && byline && url !== undefined ? true : false;
};

var loadBackupData = function loadBackupData() {
  fetch('./src/backup.json').then(function (response) {
    return response.json();
  }).then(function (json) {
    data = json;
    buildArticles();
  })["catch"](function () {
    console.log('backup data is not available'); //display static image
  });
};

var buildArticles = function buildArticles() {
  var contents = data.page.content;

  for (var content in contents) {
    // 1 to 5
    var contentLength = contents[content].collections;

    for (var eachCollection in contentLength) {
      var assets = contentLength[eachCollection].assets;

      if (assets[0] !== undefined) {
        if (assets.length > 1) {
          for (var position = 0; position < assets.length; position++) {
            var img = void 0;

            if (isArticle(assets[position])) {
              assets[position].images[0] ? img = assets[position].images[0].types[0].content : img = '';
              createArticle(assets[position], img);
            }
          }
        } else {
          if (isArticle(assets[0])) {
            createArticle(assets[0]);
          }
        }
      }
    }

    console.log('before calling build article');
  }

  renderArticles();
};

var updateLang = function updateLang(lang) {
  console.log('Martian Language begins', lang, _typeof(lang));
  console.log('///');
  console.log(lang.split(' ').length);
  return lang.split(' ').map(function (word, idx) {
    if (word.length > 3) {
      /[A-Z]/.test(word[0]) ? word = 'Boinga' : word = 'boinga';
    }

    return word;
  }).join(' ');
};

window.addEventListener('load', function (event) {
  console.log('page is fully loaded'); // init();

  useHTTPReq();
});
/******/ })()
;