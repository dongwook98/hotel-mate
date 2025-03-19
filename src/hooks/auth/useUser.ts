import { useAtomValue } from 'jotai';

import { userAtom } from '@/store/atom/user';

function useUser() {
  return useAtomValue(userAtom);
}

export default useUser;
