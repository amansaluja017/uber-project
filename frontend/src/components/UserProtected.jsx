import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserProtected({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userStatus = useSelector(state => state.user?.status);

  useEffect(() => {
    if(typeof userStatus !== 'boolean') return;

    if (authentication && userStatus !== authentication) {
      navigate('/login');
    } else if (!authentication && userStatus !== authentication) {
      navigate('/home');
    }

    setLoading(false);
  }, [authentication, userStatus, navigate]);

  if (loading) return <h1>Loading...</h1>;

  return <>{children}</>;
}

export default UserProtected;
