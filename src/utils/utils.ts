import bcrypt from "bcryptjs";

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compareSync(password, hash);
}