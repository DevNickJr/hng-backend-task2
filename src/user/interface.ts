export interface IUser {
  userId?: string; // must be unique
  firstName: string; // must not be null
  lastName: string; // must not be null
  email: string; // must be unique and must not be null
  password: string; // must not be null
  phone: string;
}
