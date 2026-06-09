import Cookies from 'js-cookie';
import { useEffect } from 'react';

const TOKEN_KEY = 'authToken_GM-APP';
const TOKEN_EXPIRATION = 7;

export default function useToken(token = null) {
  const setToken = (newToken) => {
    if (newToken) {
      Cookies.set(TOKEN_KEY, newToken, {
        expires: TOKEN_EXPIRATION,
        secure: true,
        sameSite: 'strict',
      });
    }
  };

  const getToken = () => {
    return Cookies.get(TOKEN_KEY) || null;
  };

  const deleteToken = () => {
    Cookies.remove(TOKEN_KEY);
  };

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);

  return {
    setToken,
    getToken,
    deleteToken,
    token: getToken(),
  };
}