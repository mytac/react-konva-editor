const debounce = (callback = (a?: any, b?: any) => {}, time = 100) => {
  let timer: any = null;
  // @ts-ignore
  return (...params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...params);
    }, time);
  };
};

export default debounce;
