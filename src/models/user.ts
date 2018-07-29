import {Model} from "./model";

export class User extends Model {

  public _id: String;
  public name: String;
  public tel: String;
  public email: String;
  public password: String;
  public confirmPassword: String;

  protected fields = [
    {field: "name", translate: "Nome", rules: {required: true}},
    {
      field: "email",
      translate: "E-mail",
      rules: {required: true, pattern: new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")}
    },
    {field: "tel", translate: "Telefone", rules: {required: true, maxLength: 13, minLength: 13}},
    {field: "password", translate: "Senha", rules: {required: true}},
    {field: "confirmPassword", translate: "Confirmar Senha", rules: {required: true, equals: "password"}}
  ];

  public static baseURL = '/api/V1/people/clients';

  constructor(json?: any) {
    super();

    if (json) {
      this.name = json.name;
      this.tel = "55" + json.tel;
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
      password: this.password,
      confirmPassword: this.confirmPassword
    };
  }
}
