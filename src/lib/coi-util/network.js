import { objectToUrlParam } from 'LIB/coi-util/path';

/**
 * @desc: a wrapper function which standardize the way all GET request are being handled
 */
export async function handleGETRequest(path, payload = {}) {
  try {
    const query = objectToUrlParam(payload);
    const request = await fetch(`${path}${query}`);
    const { requestId, result, response } = await request.json();
    const { status, statusText, redirected, type } = request;

    return {
      payload: response,
      requestId, result, status, statusText, redirected, type
    };

  } catch(error) {
    // TODO: implement error common error handling method here
    console.error(error);
  }
}
