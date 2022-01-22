import bcrypt from "bcryptjs";

export async function generateHash(password: string) {
  return bcrypt.hashSync(password, 8);
}

export async function compare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
