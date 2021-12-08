/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable no-undef */

let chosenLanguage;
const defaultLanguage = 'en';
const storage = !(typeof localStorage === 'undefined');
if (storage) {
  chosenLanguage = localStorage.getItem('lang');
  console.log('Chosen lang:', chosenLanguage);
} else {
  console.warn('localStorage is undefined')
}
const language = (chosenLanguage || navigator.userLanguage || navigator.browserLanguage || navigator.language || defaultLanguage).substr(0, 2);
console.log('Defafult lang:', language);

// Get language element and add event listener for local storage
const langElement = document.getElementById('lang');
if (langElement) {
  langElement.addEventListener('click', updateLanguage);
} else {
  console.warn('Did not find language element!');
}

function updateLanguage() {
  if (langElement && localStorage) {
    console.info('Updating language');
    const newLanguage = langElement.textContent.includes('Es') ? 'es' : 'en';
    localStorage.setItem('lang', newLanguage);
  } else {
    console.warn('langElement', langElement);
    console.warn('localStorage', localStorage);
  }
}
