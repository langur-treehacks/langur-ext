import { addHoverListener } from "./internal/hover";
import { extractSite, getReplacements, replaceText } from "./internal/replacer";
import { sidebarCloseListener, sidebarOpenListener } from "./internal/sidebar";
import { retrieveValueByKey } from "./internal/storage";

chrome.runtime.onMessage.addListener(sidebarOpenListener);
document.addEventListener("click", sidebarCloseListener);
async function replace() {
  const langurDisabled = await retrieveValueByKey("langurDisabled");
  if (langurDisabled) {
    return;
  }

  const content = await extractSite();
  console.log(content);
  const replacements = await getReplacements(content);
  console.log(replacements);
  replaceText(replacements);
}
replace()
  .then(() => setTimeout(addHoverListener, 0))
  .catch((err) => console.error(err));
