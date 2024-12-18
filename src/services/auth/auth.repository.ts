import { useMutation } from '@tanstack/react-query';
import { authService } from './auth.service';
import { TLoginRequest } from './dto/auth.dto';

export const useAuthRepository = () => {
  const login = useMutation({
    mutationFn: async (payload: TLoginRequest) => {
      const res = await authService.login(payload);
      return res;
    },

    // onError: error => {
    //   console.error({ error });
    //   throw new erro
    // },
  });

  return { login };
};
