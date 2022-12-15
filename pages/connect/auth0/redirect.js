// Route to handle access token coming from Strapi
// Strapi will call this route with the access_token parameter and what we want to do is to make a call_back request to 
// http://localhost:1337/api/auth/auth0/callback?access_token=[our_access_token] and then we will get a JWT token and store it using http-only cookie

import React, { useEffect, useState } from 'react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/auth0/callback';

const Auth0Redirect = () => {
    const [accessToken, setAccessToken] = useState(null);
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        setAccessToken(accessToken);
    }, []);
    
    useEffect(() => {
        if (accessToken) {
        fetch(`${backendUrl}?access_token=${accessToken}`)
            .then((res) => res.json())
            .then((data) => {
                // store jwt and user profile using http-only cookie
                document.cookie = `jwt=${data.jwt}; path=/;`;
                document.cookie = `user=${JSON.stringify(data.user)}; path=/;`;
                // set 30 days expiry
                document.cookie = `expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}; path=/;`;
                // redirect to home page
                window.location.href = '/';
            });
        }
    }, [accessToken]);
    
    return <div>Redirecting...</div>;
    };

export default Auth0Redirect;

