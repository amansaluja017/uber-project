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

  if (loading) return <div className='w-full h-screen flex items-center justify-center'>
    <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black'></div>
  </div>;

  return <>{children}</>;
}

export default CaptianProtected;