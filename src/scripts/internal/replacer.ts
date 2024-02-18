import axios from 'axios';
import { extractFromHtml } from '@extractus/article-extractor';

export const extractSite = async (): Promise<String> => {
  const documentHTML = document.documentElement.outerHTML;
  const article = await extractFromHtml(documentHTML);
  if (!article) return '';
  const content = article.content ?? '';
  return (
    new DOMParser()
      .parseFromString(content, 'text/html')
      .documentElement.textContent?.replace(/\s\s+/g, ' ') ?? ''
  );
};

export const getReplacements = async (content: String): Promise<String[][]> => {
  try {
    const response = await axios.post('http://localhost:8080/translate', {
      Article: content,
      Readability: 5,
      Language: 'spanish',
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const replaceText = (replacements: String[][]) => {
  document.querySelectorAll('*').forEach((node) => {
    if (
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE
    ) {
      const innerHTML = node.innerHTML;
      let replacedHTML = innerHTML;
      for (const replacement of replacements) {
        const [original, replacementText] = replacement;
        replacedHTML = replacedHTML.replace(
          new RegExp(original.toString(), 'g'),
          `<span class="langur-highlight">${replacementText}</span>`
        );
      }
      node.innerHTML = replacedHTML;
    }
  });
};
