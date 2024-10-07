const useChrome = () => {
  if (typeof chrome !== 'undefined') {
    return chrome;
  }
  return null;
};

export default useChrome;