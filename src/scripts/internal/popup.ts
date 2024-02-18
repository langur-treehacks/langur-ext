const iframe = document.createElement("iframe");
iframe.style.height = "auto";
iframe.style.width = "0px";
iframe.style.position = "absolute";
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "0px";
iframe.style.transition = "width 0.5s ease-in-out";
iframe.src = chrome.runtime.getURL("popup/index.html");
document.body.appendChild(iframe);

export const popupOpenListener = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.className === "langur-highlight") {
    openPopup(event);
  } else {
    closePopup();
  }
};

export const openPopup = (event: MouseEvent) => {
  iframe.style.width = "400px";
  iframe.style.top = `${event.clientY}px`;
  iframe.style.left = `${event.clientX}px`;
};

export const closePopup = () => {
  iframe.style.width = "0px";
};
