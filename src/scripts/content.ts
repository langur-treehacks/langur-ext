/* This file is your content script. */
document.querySelectorAll('*').forEach((node) => {
  if (
    node.childNodes.length === 1 &&
    node.childNodes[0].nodeType === Node.TEXT_NODE &&
    node.textContent?.includes('extension')
  ) {
    const innerHTML = node.innerHTML;
    const replacedHTML = innerHTML.replace(
      new RegExp('extension', 'g'),
      `<span class="highlight">${'REPLACED'}</span>`
    );
    node.innerHTML = replacedHTML;
  }
});
function addHoverListener() {
  const elements = Array.from(document.getElementsByClassName('highlight'));
  for (const element of elements) {
    element.addEventListener('mouseover', function (this: HTMLElement) {
      console.log('Hovered over:', this.textContent);
      // Add any additional hover actions here
    });
  }
}
setTimeout(addHoverListener, 0);
