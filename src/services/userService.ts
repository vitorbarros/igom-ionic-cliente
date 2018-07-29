import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {StorageIGOM} from "./abstract/storageIgom";
import {API} from "./abstract/api";
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";

@Injectable()

/**
 * @desc Abstracao para a abstracao dos heaaders com a token valida
 */
export class UserService extends API {

  constructor(public http: HttpClient, public storage: StorageIGOM) {
    super(http, storage);
  }

  /**
   * @desc Metodo que insere os dados do user na base
   * @param {User} user
   * @returns {Observable<any>}
   */
  store(user: User): Observable<any> {

    return new Observable<any>((observer) => {

      this.post(user, User.baseURL)
        .subscribe(
          (data) => {
            observer.next(data);
            observer.complete();
          },
          (err) => {
            if (err.error.success === false) {
              if (err.error.data.information) {
                let fields = Object.getOwnPropertyNames(err.error.data.information);
                observer.error("Já existe um cadastro com " + err.error.data.information[fields[0]] + ".");
                observer.complete();
              } else if (err.data.errors.tel) {
                observer.error("O número de telefone é inválido");
                observer.complete();
              } else {
                observer.error("Ocorreu um erro ao salvar as informações, tente novamente mais tarde.");
                observer.complete();
              }
            }
          }
        )
    });
  }
}
