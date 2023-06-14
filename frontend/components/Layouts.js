import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const MainLayouts = () => {
  return <div></div>;
};

// const handle
export const AdminLayouts = ({ children }) => {
  const [isAdmin, setISAdmin] = useState(false);
  const router = useRouter();
  if (typeof window !== 'undefined') {
    router.push('/');
    
  }
  return (
    <div>
      {isAdmin && (
        <>
          <nav>Admin header</nav>

          {children}
          <footer>Admin footer</footer>
        </>
      )}
    </div>
  );
};
