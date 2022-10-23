
import { RequestWithUser } from "../../src/interfaces/RequestWithUser";

declare global{
    namespace Express {
        interface Request {
            user: RequestWithUser
        }
    }
}