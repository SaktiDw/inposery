// export interface Root {
//   data: RegisteredResponse | LoginResponse | AuthUser;
// }

export interface RegirterResponse {
  user: RegisteredUser;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
export interface LoginResponse {
  user: LoginUser;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface AuthUser {
  id: number;
  roles: string[];
  email: string;
  blocked: boolean;
  emailVerifiedAt: any;
  createdAt: string;
  updatedAt: string;
  allRoles: AllRole[];
  allPermissions: AllPermission[];
}

export interface RegisteredUser {
  id: number;
  email: string;
  emailVerifiedAt: any;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  allRoles: AllRole[];
  allPermissions: AllPermission[];
}

export interface LoginUser {
  id: number;
  roles: string[];
  email: string;
  blocked: boolean;
  emailVerifiedAt: any;
  createdAt: string;
  updatedAt: string;
  allRoles: AllRole[];
  allPermissions: AllPermission[];
}

export interface AllRole {
  slug: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  name: string;
  slug: string;
  description: string;
}

export interface AllPermission {
  slug: string;
  name: string;
  description: string;
}

export interface AuthInput {
  email: string;
  password: string;
}
