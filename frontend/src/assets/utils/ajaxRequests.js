import csrf from 'assets/utils/getCsrfToken';


export default class ajaxRequests {

  /**
   * Base fetch api
   *
   * This base function sets up the initial fetch ajax request.  Options can be passed to
   * adjust the request as needed (e.g., GET vs POST)
   *
   * @param {Object}   call         Options, and success & error functions
   * @param {string}   call.url     API endpoint
   * @param {Object}   call.options Options to add to the fetch request
   * @param {Function} call.success Function called if request is successful
   * @param {Function} call.error   Function called if request errors
   */
  static baseFetch(call) {

    // Setup base fetch options
    let init = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      }
    };

    // Add additional fetch options
    if (call.options) {
      ajaxRequests.addOptions(init, call.options);
    }

    fetch(call.url, init)
      .then(response => response.json())
      .then(call.success)
      .catch(error => call.error ? call.error(error) : console.log(error));
  }

  /**
   * Merge new ajax options
   *
   * This function will merge an object of new ajax options with existing options in place
   *
   * @param {Object} initOptions Current options
   * @param {Object} newOptions  New options to add to current options
   * @returns {*|void}
   */
  static addOptions(initOptions, newOptions) {
    for (let key in newOptions) {
      if (newOptions.hasOwnProperty(key)) {
        if (typeof newOptions[key] === 'object') {
          return ajaxRequests.addOptions(initOptions[key], newOptions[key]);
        } else {
          initOptions[key] = newOptions[key];
        }
      }
    }
  }

  /**
   * Base and additional options for post requests
   *
   * @param {Object} options Additional ajax options
   * @returns {{
   *   options: {
   *     method: string,
   *     headers: {
   *       'content-type': string,
   *       Accept: string,
   *       'X-Requested-With': string,
   *       'X-CSRFToken'
   *     },
   *     credentials: string
   *   }
   * }}
   */
  static postOptions(options = undefined) {
    return {
      options: {
        ...options,
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': csrf
        },
        credentials: 'include'
      }
    };
  }

  /**
   * Base and additional options for put requests
   *
   * @param {Object} options Additional ajax options
   * @returns {{
   *   options: {
   *     method: string,
   *     headers: {
   *       'content-type': string,
   *       Accept: string,
   *       'X-Requested-With': string,
   *       'X-CSRFToken'
   *     },
   *     credentials: string
   *   }
   * }}
   */
  static putOptions(options = undefined) {
    return {
      options: {
        ...options,
        method: 'PUT',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': csrf
        },
        credentials: 'include'
      }
    };
  }

  /**
   * Request the current user
   *
   * @param {Function} success
   */
  static getUser(success) {
    ajaxRequests.baseFetch({
      url: '/api/get_user/',
      success: success,
    });
  }

  /**
   * Login user
   *
   * @param {Object}   request
   * @param {string}   request.username
   * @param {string}   request.password
   * @param {function} request.success
   * @param {function} request.error
   */
  static login(request) {
    ajaxRequests.baseFetch({
      url: '/api/login/',
      ...ajaxRequests.postOptions({
        body: `username=${request.username}&password=${request.password}`
      }),
      success: request.success,
      error: request.error
    });
  }

  /**
   * Register user
   *
   * @param {Object}   request
   * @param {string}   request.username
   * @param {string}   request.password
   * @param {function} request.success
   * @param {function} request.error
   */
  static register(request) {
    ajaxRequests.baseFetch({
      url: '/api/register/',
      ...ajaxRequests.postOptions({
        body: `username=${request.username}&password=${request.password}`
      }),
      success: request.success,
      error: request.error
    });
  }

  /**
   * Logout request
   *
   * @param {Object}   request
   * @param {function} request.success
   * @param {function} request.error
   */
  static logout(request) {
    ajaxRequests.baseFetch({
      url: '/api/logout/',
      ...ajaxRequests.postOptions(),
      success: request.success,
      error: request.error
    });
  }

  /**
   * Request place information
   *
   * @param {string}   searchInput WHERE query for places table
   * @param {Function} success
   */
  static getPlace(searchInput, success) {
    ajaxRequests.baseFetch({
      url: '/api/place/' + searchInput,
      success: success
    });
  }

  /**
   * Request game information
   *
   * @param {Object}   request
   * @param {string}   request.user
   * @param {function} request.success
   * @param {function} request.error
   */
  static getGames(request) {
    ajaxRequests.baseFetch({
      url: '/api/games/' + request.user,
      success: request.success,
      error: request.error
    });
  }

}
