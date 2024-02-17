import axios from 'axios';

type RecommendationsResponse = {
  summary: String;
  readability: Number;
  link: String;
};

export const getSearchHistory = (): Promise<String[]> =>
  new Promise((resolve, reject) => {
    chrome.history.search(
      { text: 'https://www.google.com/search?q=', maxResults: 10 },
      (result) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        } else {
          return resolve(
            result
              .map((item) => {
                const url = new URL(item.url || '');
                const queryString = url.searchParams.get('q');
                return queryString?.replace('+', ' ') ?? null;
              })
              .filter((queryString) => queryString !== null) as String[]
          );
        }
      }
    );
  });

export const getRecommendations = async (
  searches: String[]
): Promise<RecommendationsResponse[]> => {
  try {
    const response = await axios.post('http://localhost:8080/recommend', {
      SearchHistory: searches,
      Readability: 5,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
