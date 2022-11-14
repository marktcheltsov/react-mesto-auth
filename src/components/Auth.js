export const BASE_URL = 'https://auth.nomoreparties.co';

export const registration = (password, email) => {
    console.log(password)
    console.log(email)

    
  return fetch('https://auth.nomoreparties.co/signup', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({password: password,
    email: email})
  })
  .then((response) => {
    console.log(response.status)
    console.log(response)
    try {
      if (response.status === 201){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
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
  .then((response) => {

    try {
      if (response.status === 200){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
};

export const getUserInfo = (jwt) => { 
  return fetch('https://auth.nomoreparties.co/users/me', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    },
  })
  .then((response) => {
    try {
      if (response.status === 200){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
};

