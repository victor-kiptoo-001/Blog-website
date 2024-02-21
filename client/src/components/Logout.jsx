import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Logout() {
  const navigate = useNavigate();
  const { logout } = useUser();

  useEffect(() => {
    // Call the 'logout' function from UserContext
    logout();

    // Redirect to the sign-in page
    navigate('/sign-in');
  }, [navigate, logout]);

  return (
    <div>
      {/* You can remove this button since the logout is handled in the 'useEffect' above */}
    </div>
  );
}

export default Logout;
