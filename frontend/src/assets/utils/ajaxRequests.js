import csrf from 'assets/utils/getCsrfToken';


export default class ajaxRequests {

  static getUser(success) {
    fetch('/api/get_user/', {
      method: 'POST',
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

  static login(username, password, success) {
    fetch('/api/login/', {
      method: 'POST',
      body: `username=${username}&password=${password}`,
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

}
