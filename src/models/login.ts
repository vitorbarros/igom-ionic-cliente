import {Model} from "./model";

export class Login extends Model {

  public username: String;
  public password: String;

  public static baseURL = "/api/V1/login/authenticate";

  constructor(json?: any) {
    super();

    if (json) {
      this.username = json.username;
      this.password = json.password;
    }
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  toJson() {
    return {
      username: this.username,
      password: this.password,
      type: "clients"
    }
  }
}
