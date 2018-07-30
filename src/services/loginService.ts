import {Injectable} from "@angular/core";
import {API} from "./abstract/api";
import {HttpClient} from "@angular/common/http";
import {StorageIGOM} from "./abstract/storageIgom";
import {Observable} from "rxjs/Observable";
import {Login} from "../models/login";

@Injectable()
export class LoginService extends API {

  private jsonResponse: any;

  constructor(public http: HttpClient, public storage: StorageIGOM) {
    super(http, storage);
  }

  /**
   * @desc Metodo de autenticacao
   * @param {Login} login
   * @returns {Observable<any>}
   */
  login(login: Login): Observable<any> {

    return new Observable<any>((observer) => {
      this.post(login, Login.baseURL)
        .subscribe(
          (success) => {
            this.jsonResponse = JSON.stringify(success.data);
            StorageIGOM.put('user', this.jsonResponse);
            observer.next(true);
            observer.complete();
          },
          (err) => {
            observer.error(err);
            observer.complete();
          }
        )
    });
  }
}
