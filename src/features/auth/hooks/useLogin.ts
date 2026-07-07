import { useMutation } from '@tanstack/react-query';

import { type LoginPayload, portfolioService } from '../../../services/portfolio-service';
import { useAuthStore } from '../../../stores/auth-store';

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: LoginPayload) => portfolioService.login(payload),
    onSuccess: (result) => {
      setSession(result.token, result.user.email);
    },
  });
}
