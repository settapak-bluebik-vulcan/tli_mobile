import { useAuthStore } from '@stores';
import { useAuthRepository } from '../../services/auth/auth.repository';

const useViewModel = () => {
  const { setTokens } = useAuthStore();

  const { login } = useAuthRepository();

  const { mutateAsync } = login;

  const onLogin = async () => {
    const resp = await mutateAsync({
      username: 'emilys',
      password: 'emilyspass',
    });

    setTokens({
      accessToken: resp.data.accessToken,
      refreshToken: resp.data.refreshToken,
    });
  };

  return { onLogin };
};

export default useViewModel;
