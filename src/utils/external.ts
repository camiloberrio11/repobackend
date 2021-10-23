import axios from 'axios';
import { LoginAuthExternal } from '../interfaces/LoginExternal';

export async function loginExternal(
  username: string,
  password: string
): Promise<LoginAuthExternal | null> {
  try {
    const response: any = await axios({
      method: 'post',
      url: 'https://flotaospina.metis.com.co/api/login',
      data: {
        username,
        password,
      },
    });
    return response?.data;
  } catch (error) {
    return null;
  }
}
