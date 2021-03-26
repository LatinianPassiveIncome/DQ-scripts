// Insert this code in all "collection" pages.
// Static pages could be updated by unlinking the  NavBar Symbol, but for consistency, we use this code in static pages as well.
/**
 * Purpose: update NavBar text and hrefs in collection (and static) pages.
 * Dependencies: js/lang.js needs to be injected in the site settings' custom code section.
 */
(function updateNavBar() {
  if (localStorage) {
    const savedLanguage = localStorage.getItem('lang');
    if (savedLanguage) {
      const languageLink = document.getElementById('lang');
      const homeLink = document.getElementById('home-link');
      const aboutLink = document.getElementById('about-link');
      const journalLink = document.getElementById('journal-link');
      const pressLink = document.getElementById('press-link');
      const hospitalityLink = document.getElementById('hospitality-link');
      const commercialLink = document.getElementById('commercial-link');
      const exhibitionsLink = document.getElementById('exhibitions-link');
      const quotationsLink = document.getElementById('quotations-link');
      if (aboutLink && journalLink && pressLink && quotationsLink && languageLink && hospitalityLink && commercialLink && exhibitionsLink && homeLink) {
        languageLink.href = window.location.href;
        if (savedLanguage === 'es') {
          languageLink.textContent = 'English';
          homeLink.href = homeLink.href + 'es/home';
          aboutLink.textContent = 'Acerca';
          aboutLink.href = aboutLink.href.replace('/about', '/es/about');
          journalLink.textContent = 'Revista';
          journalLink.href = journalLink.href.replace('/journal', '/es/journal');
          pressLink.textContent = 'Prensa';
          pressLink.href = pressLink.href.replace('/press', '/es/press');
          hospitalityLink.textContent = 'Hospitalidad';
          commercialLink.textContent = 'Comercial';
          exhibitionsLink.textContent = 'Exposiciones';
          quotationsLink.textContent = 'Cotización';
        } else {
          languageLink.textContent = 'Español';
          homeLink.href = homeLink.href.replace('/es/home', '');
          aboutLink.textContent = 'About';
          aboutLink.href = aboutLink.href.replace('/es/about', '/about');
          journalLink.textContent = 'Journal';
          journalLink.href = journalLink.href.replace('/es/journal', '/journal');
          pressLink.textContent = 'Press';
          pressLink.href = pressLink.href.replace('/es/press', '/press');
          hospitalityLink.textContent = 'Hospitality';
          commercialLink.textContent = 'Commercial';
          exhibitionsLink.textContent = 'Exhibitions';
          quotationsLink.textContent = 'Quote';
        }
        if (window.location.href.includes('quotation')) {
          quotationsLink.style.opacity = 0.38;
        }
        // if (window.location.href.includes('projects')) {
        //   hospitalityLink.style.opacity = 0.38;
        //   commercialLink.style.opacity = 0.38;
        //   exhibitionsLink.style.opacity = 0.38;
        // }
      } else {
        console.warn('links are not defined');
      }
    }
  } else {
    console.warn('no local storage', localStorage);
  }
})();
