import { storeStringData } from './store';
import { postRequest, postNoAuthRequest, putRequest, getRequest, putNoAuthRequest } from './requests';
import { alert } from './alerts';
import { constants } from './constants';


export const login = async (
  payload: {username: string; password: string},
  navigation: any,
) => {
  if (!payload.username || !payload.password) {
    return alert('Error', 'Username or password are missing');
  }
  postNoAuthRequest(`http://${constants.API_HOST}:5555/v1/users/login`, payload)
    .then(response => response.json())
    .then(async json => {
      if (!json?.token) {
        return alert('Error', 'Incorrect details');
      }
      await storeStringData('token', json?.token).then(async () => {
        navigation.replace('Dashboard');
      });
    });
};

export const signup = async (
  payload: {username: string; password: string; email: string; name: string},
  navigation: any,
) => {
  if (!payload.username || !payload.password) {
    return alert('Error', 'Username or password are missing');
  }
  postNoAuthRequest(`http://${constants.API_HOST}:5555/v1/users/signup`, payload)
    .then(response => response.json())
    .then(async json => {
      if (json?.message === 'User created') {
        navigation.replace('Login');
        return alert(
          'Signup successful',
          'Your account has been created, you can now log in with your details',
        );
      }
      if (json?.message === 'User already exists') {
        return alert('Error', 'A user with these details already exists');
      }
      return alert('Error', json?.message);
    });
};

export const addProductToDailyEntry = async (payload: any) => {
  return postRequest(`http://${constants.API_HOST}:5555/v1/entries/addProduct`, payload)
    .then((response: any) => response.json())
    .then(async json => {
      if (json?.message === 'Product added to entry' && json?.entry) {
        return json?.entry;
      }
      return alert('Error', json?.message);
    });
};

export const addArbitraryProductToDailyEntry = async (payload: any) => {
  return postRequest(`http://${constants.API_HOST}:5555/v1/entries/addArbitraryProduct`, payload)
    .then((response: any) => response.json())
    .then(async json => {
      if (json?.message === 'Product added to entry' && json?.entry) {
        return json?.entry;
      }
      return alert('Error', json?.message);
    });
};

export const getEntry = async (date: number) => {
  return getRequest(`http://${constants.API_HOST}:5555/v1/entries/${date}`)
    .then(response => response?.json())
    .then(async json => {
      if (json?.entry) {
        return json.entry;
      }
      return alert('Error', json?.message);
    });
};

export const passwordChange = async(payload: any) => {
  return putRequest(`http://${constants.API_HOST}:5555/v1/users/password-change`, payload)
  .then((response: any) => response.json())
  .then(async json => {
    if (json?.message === 'Password changed') {
      return 'changed';
    }
    return alert('Error', json?.message);
  });
}

export const passwordChangeNonAuth = async(payload: any) => {
  return putNoAuthRequest(`http://${constants.API_HOST}:5555/v1/users/password-change-non-auth`, payload)
  .then((response: any) => response.json())
  .then(async json => {
    console.log(json)
    if (json?.message === 'Password changed') {
      return 'changed';
    }
    return alert('Error', json?.message);
  });
}

export const nameChange = async(payload: any) => {
  return putRequest(`http://${constants.API_HOST}:5555/v1/users/name-change`, payload)
  .then((response: any) => response.json())
  .then(async json => {
    if (json?.message === 'Name changed' || json?.user) {
      return json?.user;
    }
    return alert('Error', json?.message);
  });
}

export const getStats = async() => {
  return postRequest(`http://${constants.API_HOST}:5555/v1/entries/getStats`, {})
  .then((response: any) => response.json())
  .then(async json => {
    if (json?.message === 'Found') {
      return json?.entries;
    }
    return alert('Error', json?.message);
  });
}
