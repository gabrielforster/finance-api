import { type User } from "../../src/interfaces/User";

declare global{
    namespace Express {
        interface Request {
            user: User
        }
    }
}