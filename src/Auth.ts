export interface Auth {
  isLoggedIn(): boolean;
  readonly loggedInUser: any;
}
