import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const TOKEN_KEY = 'authToken_GM-APP';
const TOKEN_EXPIRATION = 7;

export default function useToken(token = null) {
  const [isLogged, setIsLogged] = useState(!!Cookies.get(TOKEN_KEY));

  useEffect(() => {
    console.log(isLogged);
    const checkToken = () => setIsLogged(!!Cookies.get(TOKEN_KEY));
    console.log(`scd: ${isLogged}`);
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, [isLogged]);

  const setToken = (newToken) => {
    if (newToken) {
      Cookies.set(TOKEN_KEY, newToken, {
        expires: TOKEN_EXPIRATION,
        secure: true,
        sameSite: 'strict',
      });
      setIsLogged(true);
    }
  };

  const getToken = () => {
    return Cookies.get(TOKEN_KEY) || null;
  };

  const deleteToken = () => {
    Cookies.remove(TOKEN_KEY);
    setIsLogged(false);
  };

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);

  return {
    isLogged,
    setToken,
    getToken,
    deleteToken,
    token: getToken(),
  };
}