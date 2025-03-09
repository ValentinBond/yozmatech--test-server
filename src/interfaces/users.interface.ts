export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  refreshToken: string | null;
}

export interface IUserLoginBody {
  name: string;
  password: string;
}

export interface IUserSignUpBody {
  name: string;
  password: string;
  email: string;
}
