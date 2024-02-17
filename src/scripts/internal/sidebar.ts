const iframe = document.createElement('iframe');
iframe.style.height = '100vh';
iframe.style.width = '0px';
iframe.style.position = 'fixed';
iframe.style.top = '0px';
iframe.style.right = '0px';
iframe.style.zIndex = '9000000000000000000';
iframe.style.border = '0px';
iframe.style.transition = 'width 0.5s ease-in-out';
iframe.src = chrome.runtime.getURL('sidebar/index.html');
document.body.appendChild(iframe);

export const sidebarOpenListener = (
  msg: any,
  sender: chrome.runtime.MessageSender
) => {
  if (msg == 'toggle') {
    openSidebar();
  }
};

export const sidebarCloseListener = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target !== iframe) {
    closeSidebar();
  }
};

export const openSidebar = () => {
  iframe.style.width = '400px';
};

export const closeSidebar = () => {
  iframe.style.width = '0px';
};
