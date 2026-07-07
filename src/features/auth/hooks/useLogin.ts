import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '../../../core/stores/auth-store';
import { type LoginPayload, portfolioService } from '../../../services/portfolio-service';

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: LoginPayload) => portfolioService.login(payload),
    onSuccess: (result) => {
      setSession(result.token, result.user.email);
    },
  });
}
