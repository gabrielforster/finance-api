import { User } from "../../database/models/user";
import  { verifyIsAdminInterface } from "../types/types";

export const verifyIsAdmin = async(userId: string):Promise<verifyIsAdminInterface> => {
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