export interface AuthInput {
  email: string;
  password: string;
}

export interface RegisterInput extends AuthInput {
  name: string;
  password_confirmation: string;
}
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: Date;
  updated_at: Date;
  social_id?: any;
  social_type?: any;
}
