import { User } from "../../database/models/user";
import  { verifyPermissionInterface } from "../interfaces/verifyPermission";

export const verifyPermission = async(userId: string):Promise<verifyPermissionInterface> => {
  const user = await User.findById(userId);
  if (!user) {
    return {
      isAdmin: false,
      message: "User not found",
    };
  }
  if (!user.isAdmin) {
    return {
      isAdmin: false,
      message: "User is not admin",
    };
  }

  if (user.isAdmin){
    return {
      isAdmin: true,
      message: "User is admin",
    };
  }
  return {
    isAdmin: false,
    message: "Internal Erorr",
  }
}