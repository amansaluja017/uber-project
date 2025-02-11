import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CaptianProtected({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const captianStatus = useSelector(state => state.captian?.status);

  useEffect(() => {
    if (captianStatus === undefined) return;

    if (authentication && captianStatus !== authentication) {
      navigate('/captian-login');
    } else if (!authentication && captianStatus !== authentication) {
      navigate('/captian-home');
    }

    setLoading(false);
  }, [authentication, captianStatus, navigate]);

  if (loading) return <h1>Loading...</h1>;

  return <>{children}</>;
}

export default CaptianProtected;