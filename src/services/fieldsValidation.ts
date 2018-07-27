import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {FieldsTranslator} from "./fieldsTranslator";

@Injectable()

export class FieldsValidation {

  constructor(private formGroup: FormGroup) {
  }

  validate(): Observable<any> {

    return new Observable<any>((observer) => {

      let message = "";
      let prop = Object.getOwnPropertyNames(this.formGroup.controls);
      let translate: FieldsTranslator = new FieldsTranslator();

      for (let i = 0; i < prop.length; i++) {
        if (this.formGroup.controls[prop[i]].status === "INVALID") {

          let name = translate.translate(prop[i]);

          if (this.formGroup.controls[prop[i]].errors.required) {
            message = "O campo " + name + " é obrigatório";
          } else {
            message = "O valor do campo " + name + " é inválido";
          }

          observer.error(message);
          observer.complete();
          return observer;
        }
      }
    });
  }
}
