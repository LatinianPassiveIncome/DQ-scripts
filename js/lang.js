
let chosenLanguage;
let defaultLanguage = 'en';
let storage = !(typeof localStorage == 'undefined');
if (storage) {
  chosenLanguage = localStorage.getItem('lang');
}
let language = (chosenLanguage || navigator.userLanguage || navigator.browserLanguage || navigator.language || defaultLanguage).substr(0, 2);

// Get language element and add event listener for local storage
const langElement = document.getElementById('lang');
if (langElement) {
  langElement.addEventListener('click', updateLanguage);
}

function updateLanguage() {
  if (langElement && localStorage) {
    const newLanguage = langElement.textContent.includes('Es') ? 'es' : 'en';
    localStorage.setItem('lang', newLanguage);
  }
}
