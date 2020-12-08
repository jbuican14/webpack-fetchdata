const pagination = document.querySelector('.pages');
const output = document.querySelector('.english');
const langToggle = document.querySelector('#show-hide-articles');
const engLang = document.querySelector('#english-lang');
const marLang = document.querySelector('#martian-lang');
const prev = document.querySelector('#left');
const next = document.querySelector('#right');
const posts = {
  postPerPg: 5,
  currentPg: 1,
  tolPage: null,
  isEnglish: true,
};

let data = null;
const articles = [];

const init = () => {
  console.log('ready', pageObj);
  buildArticles();

  prev.addEventListener('click', handleArticleNavigation);
  next.addEventListener('click', handleArticleNavigation);
  engLang.addEventListener('click', handleLanguageToggle);
  marLang.addEventListener('click', handleLanguageToggle);
};

const handleArticleNavigation = (e) => {
  console.log(e.target.id === 'right');
  if (e.target.id === 'right') {
    renderArticles(posts.currentPg++);
  } else if (e.target.id === 'left') {
    renderArticles(posts.currentPg--);
  }
};

const handleLanguageToggle = (e) => {
  console.log(e, e.target.id);
  e.target.id === 'english-lang'
    ? (posts.isEnglish = true)
    : (posts.isEnglish = false);
  renderArticles();
};

const renderArticles = (pg) => {
  console.log(pg, pageObj.page);
  let header = document.createElement('div');

  pg ? pg : posts.currentPg;
  output.innerHTML = '';
  if (!posts.isEnglish) {
    // updateLang();
  }

  let startPost = (posts.currentPg - 1) * posts.postPerPg;
  let endPost =
    startPost + posts.postPerPg > articles.length
      ? articles.length
      : startPost + posts.postPerPg;
  posts.tolPage = Math.ceil(articles.length / posts.postPerPg);
  pagination.innerHTML = `<h2>${posts.currentPg} of ${posts.tolPage}  </h2>`;

  header.innerHTML = `<h1>${pageObj.page.parameters.title}</h1> <hr/>`;
  output.appendChild(header);

  for (let i = startPost; i < endPost; i++) {
    let div = document.createElement('div');
    div.innerHTML = `<li><div>${articles[i].publicationDt}</div>
    <div>
    <a href="${articles[i].url}">
    <h2> ${
      posts.isEnglish ? articles[i].headline : updateLang(articles[i].headline)
    }</h2></a>
    <p>${
      posts.isEnglish ? articles[i].summary : updateLang(articles[i].summary)
    }</p>
    <p><${articles[i].byline}</p>
    </div></li>`;
    output.appendChild(div);
  }
};

// Create article to be populated
const createArticle = (content, img) => {
  // console.log(img);
  const { publicationDt, headline, summary, byline, url } = content;
  articles.push({ publicationDt, headline, summary, byline, url, img: img });
};

//check if data has
// headline && publication datw &&  summary && url
const isArticle = (data) => {
  const { publicationDt, headline, summary, byline, url } = data;
  return publicationDt && headline && summary && byline && url !== undefined
    ? true
    : false;
};

const buildArticles = (page) => {
  let contents = pageObj.page.content;

  for (let content in contents) {
    // 1 to 5
    let contentLength = contents[content].collections;
    for (let eachCollection in contentLength) {
      let assets = contentLength[eachCollection].assets;

      if (assets[0] !== undefined) {
        if (assets.length > 1) {
          for (let position = 0; position < assets.length; position++) {
            let img;
            if (isArticle(assets[position])) {
              assets[position].images[0]
                ? (img = assets[position].images[0].types[0].content)
                : (img = '');

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

const updateLang = (lang) => {
  console.log('Martian Language begins', lang, typeof lang);
  console.log('///');
  console.log(lang.split(' ').length);
  return lang
    .split(' ')
    .map((word, idx) => {
      if (word.length > 3) {
        /[A-Z]/.test(word[0]) ? (word = 'Boinga') : (word = 'boinga');
      }
      return word;
    })
    .join(' ');
};

window.addEventListener('load', (event) => {
  console.log('page is fully loaded', pageObj);
  init();
});
