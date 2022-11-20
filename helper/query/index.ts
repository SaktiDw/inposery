import { gql } from "graphql-request";
export const Authenticated = gql`
  query Authenticated {
    authenticated {
      id
      email
      roles
      allRoles {
        name
      }
      allPermissions {
        name
      }
    }
  }
`;

export const Register = gql`
  mutation Register(
    $email: String!
    $password: String!
    $roles: [RoleString!]
  ) {
    register(object: { email: $email, password: $password, roles: $roles }) {
      accessToken
      refreshToken
      expiresIn
      user {
        id
        email
        roles
        allRoles {
          name
        }
        allPermissions {
          name
        }
      }
    }
  }
`;

export const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(object: { email: $email, password: $password }) {
      accessToken
      refreshToken
      expiresIn
      user {
        id
        email
        roles
        allRoles {
          name
        }
        allPermissions {
          name
        }
      }
    }
  }
`;

export const RefreshToken = gql`
  mutation RefreshToken($refreshToken: String) {
    refreshToken(object: { refreshToken: $refreshToken }) {
      accessToken
      refreshToken
      expiresIn
      user {
        id
        email
        roles
        allRoles {
          name
        }
        allPermissions {
          name
        }
      }
    }
  }
`;

export const RequestPasswordReset = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(object: { email: $email })
  }
`;

export const ResetPassword = gql`
  mutation ResetPassword($email: String!, $token: String!, $password: String!) {
    resetPassword(object: { email: $email, token: $token, password: $password })
  }
`;

export const GetAllStore = gql`
  query Store {
    stores {
      id
      name
      user {
        email
      }
    }
    storesCount
  }
`;
