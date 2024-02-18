export const addHoverListener = () => {
  const elements = Array.from(
    document.getElementsByClassName("langur-highlight"),
  );
  for (const element of elements) {
    element.addEventListener("mouseover", async function (this: HTMLElement) {
      await chrome.runtime.sendMessage({
        message: "openPopup",
        data: this.textContent,
      });
    });
  }
};
