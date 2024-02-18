import axios from "axios";

type RecommendationsResponse = {
  summary: String;
  score: Number;
  url: String;
};

export const getSearchHistory = (): Promise<String[]> =>
  new Promise((resolve, reject) => {
    chrome.history.search(
      { text: "https://www.google.com/search?q=", maxResults: 10 },
      (result) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        } else {
          return resolve(
            result
              .map((item) => {
                const url = new URL(item.url || "");
                const queryString = url.searchParams.get("q");
                return queryString?.replace("+", " ") ?? null;
              })
              .filter((queryString) => queryString !== null) as String[],
          );
        }
      },
    );
  });

export const getRecommendations = async (
  searches: String[],
): Promise<RecommendationsResponse[]> => {
  try {
    const response = await axios.post("http://127.0.0.1:8080/recommend", {
      SearchHistory: searches,
      Readability: 5,
      Language: "spanish",
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
