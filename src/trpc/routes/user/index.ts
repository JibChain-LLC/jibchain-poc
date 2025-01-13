import { readUser } from './user-read';
import { updateUser } from './user-update';

const userRoutes = {
  read: readUser,
  update: updateUser
};

export default userRoutes;
