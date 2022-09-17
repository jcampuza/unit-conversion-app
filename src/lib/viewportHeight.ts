export const setupViewportHeightListener = () => {
  const setHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    console.log(document.documentElement.style.getPropertyValue('--vh'));
  };

  window.addEventListener('resize', setHeight);
  window.addEventListener('orientationchange', setHeight);
  setHeight();
};
