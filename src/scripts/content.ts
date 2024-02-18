import { addHoverListener } from "./internal/hover";
import { extractSite, getReplacements, replaceText } from "./internal/replacer";
import { sidebarCloseListener, sidebarOpenListener } from "./internal/sidebar";
import { retrieveValueByKey } from "./internal/storage";

chrome.runtime.onMessage.addListener(sidebarOpenListener);
document.addEventListener("click", sidebarCloseListener);
// replaceText([['extension', 'REPLACED!!!!']]);
async function replace() {
  const langurDisabled = await retrieveValueByKey("langurDisabled");
  console.log("yo");
  if (langurDisabled) {
    return;
  }

  console.log("lmfao");
  const content = await extractSite();
  console.log(content);
  const replacements = await getReplacements(content);
  console.log(replacements);
  replaceText(replacements);
}
replace().catch((err) => console.error(err));
setTimeout(addHoverListener, 0);
