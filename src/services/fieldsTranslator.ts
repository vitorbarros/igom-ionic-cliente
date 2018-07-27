import {Injectable} from "@angular/core";

@Injectable()
export class FieldsTranslator {

  constructor() {
  }

  translate(field) {

    let translated = "";

    switch (field) {
      case 'name':
        translated = "Nome";
        break;
      case 'email':
        translated = "E-mail";
        break;
      case 'tel':
        translated = "Celular";
        break;
      case 'password':
        translated = "Senha";
        break;
      case 'confirmPassword':
        translated = "Confirmar Senha";
        break;
    }
    return translated;
  }
}
