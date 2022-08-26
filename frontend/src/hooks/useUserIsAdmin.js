import { useCurrentUser } from '../services/AuthService';

export default function useUserIsAdmin() {
  return useCurrentUser().isAdmin;
}
