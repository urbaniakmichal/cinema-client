export interface UserLoginPayloadResponse {

  id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean,
  jwtToken: string
}
