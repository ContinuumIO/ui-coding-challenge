import { ajax } from 'rxjs/observable/dom/ajax';
import * as uuid from 'uuid';

const serverConfig = {
  endpoint: "http://127.0.0.1:8888",
  crossDomain: true,
};

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
export function listGames(serverConfig) {
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
export function getGame(serverConfig, id) {
  return ajax(createAJAXSettings(serverConfig, `/api/games/${id}`));
}

export function postNewGame(serverConfig, playerOne, playerTwo) {
  id = uuid();
  const settings = createAJAXSettings(serverConfig, '/api/games', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {
      "type": "Game",
      id,
      "attributes": {
        "players": [playerOne, playerTwo],
        "board": [null, null, null,
                  null, null, null,
                  null, null, null]
      }
    },
  });
  return ajax(settings);
}

export function updateGame(serverConfig, id, json) {

}
