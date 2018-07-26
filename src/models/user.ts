import {Model} from "./model";

export class User extends Model {

  public _id: String;
  public name: String;
  public tel: String;
  public email: String;
  public password: String;
  public confirmPassword: String;

  public static baseURL = '/api/V1/people/clients';

  constructor(json?: any) {
    super();

    if (json) {
      this.name = json.name;
      this.tel = json.tel;
      this.email = json.email;
      this.password = json.password;
      this.confirmPassword = json.confirmPassword;
    }
  }

  getName() {
    return this.name;
  }

  getTel() {
    return this.tel;
  }

  getEmail() {
    return this.email;
  }

  getId() {
    return this._id;
  }

  toJson() {
    return {
      _id: this._id,
      name: this.name,
      tel: this.tel,
      email: this.email,
      password: this.password
    };
  }
}
