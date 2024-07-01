import { useState, useEffect } from 'react';
import Routes from './routes'

const App = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('rsv_token'));

  useEffect(() => {
    const auth = localStorage.getItem('rsv_token');
    setToken(auth);
  }, []);

  return (
    <div className="w-full h-screen">
      <Routes token={token}/>
    </div>
  );
};

export default App;
