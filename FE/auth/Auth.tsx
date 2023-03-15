import { useEffect, useState } from 'react';


import { useRouter } from 'next/router';

// HOC function
function withAuth(WrappedComponent: any) {
  // Return a new component that renders the wrapped component
  return function (props: any) {
    // Get access to the router object
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    async function checkIfLoggedIn() {
      const res = await fetch('http://localhost:5000/api/user', {
        credentials: 'include'
      });
      return res.status >= 200 && res.status < 300;
    }

    useEffect(() => {
      checkIfLoggedIn().then((isLoggedIn) => {
        if (!isLoggedIn) {
          // Redirect to the login page if the JWT is invalid
          router.push('/login');
        }
      })
    }, [])


    // Render the wrapped component if the JWT is valid
    return <WrappedComponent {...props} />;
  }
}


export { withAuth }
