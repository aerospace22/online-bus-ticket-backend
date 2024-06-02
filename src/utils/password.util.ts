import { hash, verify } from 'argon2';

export const hashPassword = async (raw: string) => {
  return await hash(raw);
};

export const verifyPassword = async (raw: string, hashed: string) => {
  return await verify(hashed, raw);
};
