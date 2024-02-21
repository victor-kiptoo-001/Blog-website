// import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { jwtDecode } from 'jwt-decode';

// const UserContext = createContext();

// export const useUser = () => {
//   return useContext(UserContext);
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const isLoggedIn = user !== null; // Check if a user is logged in
//   const isAdmin = user && user.user_type === "admin";



//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (token) {
//       // check if jwt toke is to be decoded
//       // const userData = jwtDecode(token);
//       setUser(token);
//     }
//   }, []);


//   const signup = (values, callback) => {
//     fetch('http://127.0.0.1:5555/sign_up', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(values),
//     })
//       .then((res) => {
//         if (res.status === 201) {
//           // Registration was successful, but the server shouldn't return a token here
//           // Simply execute the callback function
//           callback();
//         } else {
//           // Handle sign-up error
//           throw new Error('Sign-up failed');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     // const userData = jwtDecode(token);
//     setUser(token);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, signup,isLoggedIn, login, logout, isAdmin }}>
//       {children}
//     </UserContext.Provider>
//   );
// };




import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = user !== null; // Check if a user is logged in
  const isAdmin = user && user.user_type === "admin";

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken,token);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const signup = (values, callback) => {
    fetch('http://127.0.0.1:5555/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 201) {
          // Registration was successful, but the server shouldn't return a token here
          // Simply execute the callback function
          callback();
        } else {
          // Handle sign-up error
          throw new Error('Sign-up failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken,token);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signup, isLoggedIn, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
