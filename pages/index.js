import React, { useEffect, useState } from 'react';
import Header from '../components/Header'

// read the site cookie, if JWT and User are present should user email as text, if not show you are not logged in 
// check first if the document is not undefined and cookie exist
// prevent error ReferenceError: jwt is not defined in case jwt is not defined
// if jwt is not defined, then the user is not logged in
export default function Home() {
  const [user, setUser] = useState(null);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  useEffect(() => {
    if (typeof document !== 'undefined' && document.cookie) {
      const jwt = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        .split('=')[1];
      const user = document.cookie
        .split('; ')
        .find((row) => row.startsWith('user='))
        .split('=')[1];
      setUser(JSON.parse(user));
      setUserAuthenticated(true);
    }
  }, []);
  return (
    <div>
      <Header userAuthenticated={userAuthenticated} />
      {user ? 
       <div>
          <p className='text-center my-24 text-2xl'>You are logged in as <span className='font-extrabold'>{user.email}</span></p>
        </div> : <p className='text-center my-24 text-2xl'>You are not logged in</p>
      }
    </div>
  );
}

    
