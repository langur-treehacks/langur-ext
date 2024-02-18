export const getLang = () =>
  new Promise((resolve, reject) => {
    chrome.tabs.detectLanguage((language) => {
      console.log('Language is: ' + language);
      return resolve(language);
    });
  });
