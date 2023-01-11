import axios from "axios";

export default interface Auth {
  isLoggedIn(): boolean;
  readonly loggedInUser: any;
}
