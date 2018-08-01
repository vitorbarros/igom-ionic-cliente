import {Model} from "./model";

export class CreditCard extends Model {

  public brand: String;
  public cardNumber: String;
  public securityCode: String;
  public expirationDate: String;
  public holderName: String;
  public cpf: String;

  protected fields = [
    {field: "brand", translate: "Bandeira", rules: {required: true}},
    {field: "cardNumber", translate: "Número", rules: {required: true, minLength: 16, maxLength: 16}},
    {field: "securityCode", translate: "CVV", rules: {required: true, minLength: 3, maxLength: 4}},
    {field: "expirationDate", translate: "Data de vencimento", rules: {required: true}},
    {field: "holderName", translate: "Nome", rules: {required: true}},
    {field: "cpf", translate: "CPF", rules: {required: true, minLength: 11, maxLength: 11}}
  ];

  constructor(json?: any) {
    super();

    if (json) {
      this.brand = json.brand;
      this.cardNumber = "55" + json.cardNumber;
      this.securityCode = json.securityCode;
      this.expirationDate = json.expirationDate;
      this.holderName = json.holderName;
      this.cpf = json.cpf;
    }
  }

  toJson() {
    return {
      brand: this.brand,
      cardNumber: this.cardNumber,
      securityCode: this.securityCode,
      expirationDate: this.expirationDate,
      holderName: this.holderName,
      cpf: this.cpf
    };
  }
}
