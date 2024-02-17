export const addHoverListener = () => {
  const elements = Array.from(
    document.getElementsByClassName('langur-highlight')
  );
  for (const element of elements) {
    element.addEventListener('mouseover', function (this: HTMLElement) {
      console.log('Hovered over:', this.textContent);
      // Add any additional hover actions here
    });
  }
};
