import { useQuery } from '@tanstack/react-query';

import { getReservations } from '@/remote/reservation';
import useUser from '@/hooks/auth/useUser';

function useReservations() {
  const user = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ['reservations', user?.uid],
    queryFn: () => getReservations({ userId: user?.uid as string }),
    enabled: user?.uid != null,
  });

  return { data, isLoading };
}

export default useReservations;
