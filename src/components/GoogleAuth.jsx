// GoogleAuth.jsx
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

// const CLIENT_ID = 'YOUR_CLIENT_ID_FROM_STEP_3.apps.googleusercontent.com';

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
 // 
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

export function useGoogleAuth(onAuthSuccess) {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          onAuthSuccess(authInstance.currentUser.get());
        }
      });
    };

    gapi.load('client:auth2', initClient);
  }, [onAuthSuccess]);
}

export function signInWithGoogle() {
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signIn();
}

export function signOutFromGoogle() {
  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signOut();
}
