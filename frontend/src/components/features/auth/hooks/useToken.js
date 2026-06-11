import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { tokenEvents } from "../events/tokenEvents";

const TOKEN_KEY = "authToken_GM-APP";
const TOKEN_EXPIRATION = 7;

const getToken = () => Cookies.get(TOKEN_KEY) || null;

export default function useToken() {
  const [token, setTokenState] = useState(() => getToken());

  // S'abonner aux changements du token
  useEffect(() => {
    const unsubscribe = tokenEvents.subscribe(() => {
      setTokenState(getToken());
    });

    return unsubscribe;
  }, []);

  const setToken = useCallback((newToken) => {
    Cookies.set(TOKEN_KEY, newToken, {
      expires: TOKEN_EXPIRATION,
      secure: true,
      sameSite: "strict",
    });

    setTokenState(newToken);
    tokenEvents.notify(); // Notifier tous les abonnés
  }, []);

  const deleteToken = useCallback(() => {
    Cookies.remove(TOKEN_KEY);
    setTokenState(null);
    tokenEvents.notify(); // Notifier tous les abonnés
  }, []);

  const isLogged = !!token;

  return {
    isLogged,
    token,
    setToken,
    deleteToken,
  };
}