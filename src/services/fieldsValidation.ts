import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Model} from "../models/model";

@Injectable()

export class FieldsValidation {

  validate(model: Model): Observable<any> {

    return new Observable<any>((observer) => {

      let messageRequired = "O(s) campo(s) ";
      let messageMaxAndMinLength = "";
      let messageMaxLength = "";
      let messageMinLength = "";
      let messagePattern = "";

      let err = false;
      let msgRequired = false;

      for (let i = 0; i < model.getFields().length; i++) {

        if (model.getFields()[i].rules.required) {
          if (model[model.getFields()[i].field] === null || model[model.getFields()[i].field] === "" || model[model.getFields()[i].field] === "undefined") {
            messageRequired += model.getFields()[i].translate + ", ";
            err = true;
            msgRequired = true;
          }
        }

        if (model.getFields()[i].rules.maxLength && model.getFields()[i].rules.minLength) {
          if (model[model.getFields()[i].field].toString().length > model.getFields()[i].rules.maxLength || model[model.getFields()[i].field].toString().length < model.getFields()[i].rules.minLength) {
            if (model.getFields()[i].rules.maxLength === model.getFields()[i].rules.minLength) {
              messageMaxAndMinLength += "O campo " + model.getFields()[i].translate + " precisa ter " + model.getFields()[i].rules.minLength + " caracteres.";
              err = true;
            } else {
              messageMaxAndMinLength += "O campo " + model.getFields()[i].translate + " precisa ter entre" + model.getFields()[i].rules.minLength + " e " + model.getFields()[i].rules.minLength + " caracteres.";
              err = true;
            }
          }
        }

        if (model.getFields()[i].rules.maxLength && !model.getFields()[i].rules.minLength) {
          if (model[model.getFields()[i].field].toString().length < model.getFields()[i].rules.maxLength) {
            messageMaxLength += "O campo " + model.getFields()[i].translate + " não pode ter mais do que " + model.getFields()[i].rules.maxLength + " caracteres.";
            err = true;
          }
        }

        if (!model.getFields()[i].rules.maxLength && model.getFields()[i].rules.minLength) {
          if (model[model.getFields()[i].field].toString().length > model.getFields()[i].rules.minLength) {
            messageMinLength += "O campo " + model.getFields()[i].translate + " não pode ter menos do que " + model.getFields()[i].rules.minLength + " caracteres.";
            err = true;
          }
        }

        if (model.getFields()[i].rules.pattern) {
          if (!model.getFields()[i].rules.pattern.test(model[model.getFields()[i].field])) {
            messagePattern += "O campo " + model.getFields()[i].translate + " é inválido.";
            err = true;
          }
        }
      }

      //TODO IMPLEMENTAR O EQUALS

      if (err) {
        messageRequired = messageRequired.substr(0, messageRequired.length - 2) + " são obrigatórios.";
        observer.error({
          required: msgRequired ? messageRequired : "",
          maxLengthAndMinLength: messageMaxAndMinLength,
          maxLength: messageMaxLength,
          minLength: messageMinLength,
          pattern: messagePattern,
        });
        observer.complete();
      } else {
        observer.next(true);
        observer.complete();
      }
    });
  }
}
