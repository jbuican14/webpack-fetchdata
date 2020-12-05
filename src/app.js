const pagination = document.querySelector('.pages');
const output = document.querySelector('.loading');
let contents = null;

// randomuser.me/api/?results=10
// get around the blocking
// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

const loadBackupData = () => {
  fetch('./src/backup.json')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(() => {
      console.log('backup data is not available');
      //display static image
    });
};

const init = () => {
  console.log('ready');
  const url = 'http://np-ec2-nytimes-com.s3.amazonaws.com/dev/test/nyregion.js'; // site that doesn’t send Access-Control-*
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(() => {
      console.log('Can’t access ' + url + ' response. Blocked by browser?');
      loadBackupData();
    });
};

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  init();
});
