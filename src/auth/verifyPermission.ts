import  { verifyPermissionInterface } from "../interfaces/verifyPermission";

import { User } from "../../database/models/user";

export const verifyPermission = async(userId: string):Promise<boolean> => {
  const user = await User.findById(userId);
  if (user.isAdmin) return true
  if (!user) return false;
  if (!user.isAdmin) return false;
  return false
}