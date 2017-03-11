import { ajax } from 'rxjs/observable/dom/ajax';

export function normalizeBaseURL(url) {
  return url.replace(/\/+$/, '');
};

export function createAJAXSettings(serverConfig, uri = '/', opts = {}) {
  const baseURL = normalizeBaseURL(serverConfig.endpoint || serverConfig.url);
  const url = `${baseURL}${uri}`;
  // Merge in our typical settings for responseType, allow setting additional options
  // like the method
  const settings = Object.assign({
    url,
    responseType: 'json',
  }, serverConfig, opts);

  delete settings.endpoint;
  return settings;
};

/**
 * Creates an AjaxObservable for listing available games.
 *
 * @param {Object} serverConfig  - The server configuration
 *
 * @return  {AjaxObservable}  An Observable with the request response
 */
export function list(serverConfig) {
  return ajax(createAJAXSettings(serverConfig, '/api/games'));
}

/**
 * Creates an AjaxObservable for getting a game as JSON.
 *
 * @param {Object}  serverConfig  - The server configuration
 * @param {string}  id  - The id of the game
 *
 * @return  {AjaxObservable}  An Observable with the request response
 */
export function get(serverConfig, id) {
  return ajax(createAJAXSettings(serverConfig, `/api/games/${id}`));
}

/**
 * Creates an AjaxObservable for creating a game as JSON.
 *
 * @param {Object}  serverConfig  - The server configuration
 * @param {string}  id  - The id of the game
 *
 * @return  {AjaxObservable}  An Observable with the request response
 */
export function post(serverConfig, playerOne, playerTwo) {
  const settings = createAJAXSettings(serverConfig, '/api/games', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {
      "players": [playerOne, playerTwo],
      "board": [null, null, null,
                null, null, null,
                null, null, null]
    },
  });
  return ajax(settings);
}

/**
 * Creates an AjaxObservable for replacing a game with updated JSON.
 *
 * @param {Object}  serverConfig  - The server configuration
 * @param {string}  id  - The id of the game
 * @param {Object}  attributes - JSON data for updated game
 *
 * @return  {AjaxObservable}  An Observable with the request response
 */
export function update(serverConfig, id, attributes) {
  const settings = createAJAXSettings(serverConfig, `/api/games/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: attributes,
  });
  return ajax(settings);
}
