import axios from "axios";
import { extractFromHtml } from "@extractus/article-extractor";

export const extractSite = async (): Promise<String> => {
  const documentHTML = document.documentElement.outerHTML;
  const article = await extractFromHtml(documentHTML);
  if (!article) return "";
  const content = article.content ?? "";
  return (
    new DOMParser()
      .parseFromString(content, "text/html")
      .documentElement.textContent?.replace(/\s\s+/g, " ") ?? ""
  );
};

export const getReplacements = async (content: String): Promise<String[][]> => {
  try {
    const url = new URL(
      window.location.href
    );
    const params = url.searchParams;
    let difflevel = params.get("difflevel");
    let readability = null;
    if (difflevel !== null)
    {
      let diffnum = difflevel as unknown as number;
      readability = diffnum * 2;
    }
    console.log("HEREEEEEEEE");
    console.log(readability);
    const response = await axios.post("http://127.0.0.1:8080/translate", {
      Article: content,
      Readability: readability ? readability : 5,
      Language: "spanish",
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const replaceText = (replacements: String[][]) => {
  document.querySelectorAll("*").forEach((node) => {
    if (
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE
    ) {
      const innerHTML = node.innerHTML;
      let replacedHTML = innerHTML;
      for (const replacement of replacements) {
        const [original, replacementText] = replacement;
        replacedHTML = replacedHTML.replace(
          new RegExp(original.toString(), "g"),
          `<mark class="langur-highlight" style="background-color: #84CDEE; cursor: help">${replacementText}</mark>`,
        );
      }
      node.innerHTML = replacedHTML;
    }
  });
};

export const translateText = async (text: String, language: String) => {
  const response = await axios.post("http://127.0.0.1:8080/meaning", {
    Target: text,
    Language: language,
  });
  return response.data;
};
