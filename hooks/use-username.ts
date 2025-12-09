import { useState, useEffect } from 'react';

export function useUsername() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // This runs only on the client side
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUsername(savedName);
    }
  }, []);

  const setUsernameAndSave = (name: string) => {
    localStorage.setItem('userName', name);
    setUsername(name);
  };

  const clearUsername = () => {
    localStorage.removeItem('userName');
    setUsername(null);
  };

  return {
    username,
    setUsername: setUsernameAndSave,
    clearUsername,
    isLoggedIn: !!username,
  };
}

export default useUsername;
