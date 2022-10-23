import { ObjectId } from 'mongodb';
import * as z from 'zod';

export const User = z.object({
    user_id: z.string().min(1),
    email: z.string().email().nullish(),
    username: z.string().min(1).nullish(),
    iat: z.number().min(1),
    exp: z.number().min(1),
  }).refine((val) => {
    try {
      return new ObjectId(val.user_id);
    } catch (error) {
      return false;
    }
  }, {
    message: 'Invalid ObjectId',
  });

export type User = z.infer<typeof User>;