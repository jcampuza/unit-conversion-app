export const createViewportHeightListener = () => {
  const setDocHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    console.log(document.documentElement.style.getPropertyValue('--vh'));
  };

  window.addEventListener('resize', setDocHeight);
  window.addEventListener('orientationchange', setDocHeight);
  setDocHeight();

  return () => {
    window.removeEventListener('resize', setDocHeight);
    window.removeEventListener('orientationchange', setDocHeight);
  };
};
