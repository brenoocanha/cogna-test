export type AuthToken = {
  token: string;
  refresh_token: string;
  last_login: Date | null;
};
