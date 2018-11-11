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
      ajaxRequests.addOptions(call.options, init);
    }
    console.log(init);

    fetch(call.url, init)
      .then(response => response.json())
      .then(call.success)
      .catch(error => call.error ? call.error : console.log(error));
  }

  static addOptions(newOptions, initOptions) {
    let options;
    for (let key in newOptions) {
      console.log(newOptions[key]);
      if (typeof key === 'object') {
        return ajaxRequests.addOptions(newOptions[key], initOptions[key])
      } else if (!initOptions.hasOwnProperty(key)) {
        initOptions[key] = newOptions[key];
      }
    }
  }

  static getFetch(call) {
    ajaxRequests.baseFetch({
      ...call,
      options: { method: 'GET', headers: {'fuck': 'this'} }
    });
  }

  static postFetch(call) {
    ajaxRequests.baseFetch({
      ...call,
      options: { method: 'POST' }
    });
  }

  static getUser(success) {
    ajaxRequests.getFetch({
      url: '/api/get_user/',
      success: success
    });
  }

  static login(username, password, success) {
    fetch('/api/login/', {
      method: 'POST',
      body: `username=${username}&password=${password}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(success)
      .catch(error => console.log(error));
  }

  static logout(success) {
    fetch('/api/logout/', {
      method: 'POST',
      body: `logout=${true}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(success)
      .catch(error => console.log(error));
  }

  static getPlace(searchInput, success) {
    fetch('/api/', {
      method: 'POST',
      body: 'place=' + searchInput,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(success)
      .catch(error => console.log(error));
  }

  static getGames(success) {
    ajaxRequests.getFetch({
      url: '/api/get_games/',
      success: success
    });
  }

}
