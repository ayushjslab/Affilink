import bcrypt from "bcryptjs";

const saltRounds = 12;

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashed: string) {
  return await bcrypt.compare(password, hashed);
}
