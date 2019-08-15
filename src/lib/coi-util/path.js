const { search } = window && window.location;

export const urlParamToObject = (param = search) => {
  const output = { };

  param.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    (match, name, value) => {
      Object.defineProperty(output, name, {
        value, enumerable: true, configurable: true, writable: false
      });
    }
  );

  return output;
}

export const objectToUrlParam = (obj = {}) => {
  const entries = Object.entries(obj);
  if (!entries.length) return '';

  let param = '?'

  entries.forEach((entry, index) => {
    const ampersand = (index < entries.length - 1) ? '&' : '';
    param = `${param}${entry[0]}=${entry[1]}${ampersand}`;
  })

  return param;
}
