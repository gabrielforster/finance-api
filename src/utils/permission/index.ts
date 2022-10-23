import { User } from "../../routes/users/users.model";

export async function PermissionValidator(userId: string, permissionNeeded: string){
  const user = await User.findById(userId);
  if(user.roles.includes(permissionNeeded)){
      return true;
  }
  return false;
}