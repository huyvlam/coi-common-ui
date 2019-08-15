export const cookieToObject = (cookie = document.cookie) => {
  const output = { };

  cookie.replace(/\w+=\w+(;?.?)/gi, (match) => {
    const extracts = match.replace(/;?\s/, '').split('=');
    Object.defineProperty(output, extracts[0], {
      value: extracts[1], enumerable: true
    });
  })

  return output;
}
