import { useMutation } from '@tanstack/react-query';
import { portfolioService, type LoginPayload } from '../../services/portfolio-service';
import { useAuthStore } from '../../core/stores/auth-store';

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: LoginPayload) => portfolioService.login(payload),
    onSuccess: (result) => {
      setSession(result.token, result.user.email);
    },
  });
}
