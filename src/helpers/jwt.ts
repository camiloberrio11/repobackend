import jwt from 'jsonwebtoken';
const JWT_KEY = 'ARAUCA_METIS';

export function createToken(data: any): string {
  const token = jwt.sign(
    {
      //    exp: Math.floor(Date.now() / 1000) + 15 * 15,
      data,
    },
    JWT_KEY,
    { expiresIn: '15m' }
  );
  return token;
}

export function validateToken(token: string = ''): string | null {
  try {
  const statusToken: any = jwt.verify(token, JWT_KEY);
  if (statusToken) {
    return statusToken?.data;
  }
  return null;
  } catch (error) {
    return null;
  }
}