import { API } from '../API';
import { TLoginResponse } from './dao/auth.dao';
import { TLoginRequest } from './dto/auth.dto';

export const authService = {
  login: async (payload: TLoginRequest) => {
    return await API.post<TLoginResponse>('/auth/login', payload);
  },
};
