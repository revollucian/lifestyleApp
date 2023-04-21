import {getStringData} from './store';

export const postNoAuthRequest = async (url: string, payload: any) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
};
  
export const postRequest = async (url: string, payload: any) => {
  const token = await getStringData('token');
  if (!token) {
    return;
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};
  
export const putRequest = async (url: string, payload: any) => {
  const token = await getStringData('token');
  if (!token) {
    return;
  }
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const putNoAuthRequest = async (url: string, payload: any) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const getRequest = async (url: string) => {
  const token = await getStringData('token');
  if (!token) {
    return;
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRequest = async (url: string) => {
  const token = await getStringData('token');
  if (!token) {
    return;
  }
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};