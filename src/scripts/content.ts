import { addHoverListener } from "./internal/hover";
import { replaceText } from "./internal/replacer";
import { sidebarCloseListener, sidebarOpenListener } from "./internal/sidebar";

chrome.runtime.onMessage.addListener(sidebarOpenListener);
document.addEventListener("click", sidebarCloseListener);
// replaceText([['extension', 'REPLACED!!!!']]);
setTimeout(addHoverListener, 0);
