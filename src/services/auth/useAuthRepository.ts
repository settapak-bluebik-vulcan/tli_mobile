import { useMutation } from '@tanstack/react-query';
import { authRepository } from '@tli-up-packages/services/auth/auth.repository';
import { TLoginRequest } from '@tli-up-packages/services/auth/dto/auth.dto';

export const useAuthRepository = () => {
  const login = useMutation({
    mutationFn: (payload: TLoginRequest) => authRepository.login(payload),

    // onError: error => {
    //   console.error({ error });
    //   throw new erro
    // },
  });

  return { login };
};
