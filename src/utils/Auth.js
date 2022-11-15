export const BASE_URL = 'https://auth.nomoreparties.co';

const getResponseData = (response, status) => {
  try {
    if (response.status === status){
      return response.json();
    }
  } catch(e){
    return (e)
  }
} 

export const registration = (password, email) => {
  return fetch('https://auth.nomoreparties.co/signup', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({password: password,
    email: email})
  })
  .then(response => getResponseData(response, 201))
};

export const login = (password, email) => { 
  return fetch('https://auth.nomoreparties.co/signin', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({password: password,
    email: email})
  })
  .then(response => getResponseData(response, 200))
};

export const getUserInfo = (jwt) => { 
  return fetch('https://auth.nomoreparties.co/users/me', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    },
  })
  .then(response => getResponseData(response, 200))
};

