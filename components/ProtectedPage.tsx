import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'context/auth';

export default function ProtectedPage({ onOK, children }) {
  const { user, loading } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (onOK) {
          onOK();
        }
      } else {
        router.push('/login');
      }
    }
  }, [user, loading]);

  if (loading || !user) {
    return <p>Redirecting...</p>
  }

  return <>{children}</>;
}
