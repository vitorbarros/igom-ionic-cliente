import {Observable} from "rxjs/Observable";
import {FieldsValidation} from "../services/fieldsValidation";

/**
 * @desc Classe abstrada dos models do app
 */
export class Model {

  protected fields = [];

  getFields() {
    return this.fields;
  }

  toJson() {
  };

  validate(): Observable<Model> {
    return new Observable((observer) => {

      let validationService: FieldsValidation = new FieldsValidation();
      validationService.validate(this)
        .subscribe(
          (data) => {
            observer.next(data);
            observer.complete();
          },
          (err) => {
            observer.error(err);
            observer.complete();
          }
        );
    });
  };
}
