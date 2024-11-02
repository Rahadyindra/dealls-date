import bcryptjs from "bcryptjs";

export function hashPassword(value: string) {
  const salt = bcryptjs.genSaltSync(8);
  const hash = bcryptjs.hashSync(value, salt);
  return hash;
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcryptjs.compareSync(password, hashedPassword);
}
