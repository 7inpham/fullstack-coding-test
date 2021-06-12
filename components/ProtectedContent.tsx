import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'modules/auth';
import Loading from 'components/Loading';

export default function ProtectedContent({ onOK, children }) {
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
    return <Loading />
  }

  return <>{children}</>;
}
