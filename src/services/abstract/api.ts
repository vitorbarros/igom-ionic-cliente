import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {VerifyAccessToken} from "./verifyAccessToken";
import {StorageIGOM} from "./storageIgom";
import {AccessToken} from "../../models/accessToken";
import {Observable} from "rxjs/Observable";
import {Model} from "../../models/model";

@Injectable()

/**
 * @desc Abstracao para a abstracao dos heaaders com a token valida
 */
export class API extends VerifyAccessToken {

  protected httpOptions: any;

  constructor(public http: HttpClient, public storage: StorageIGOM) {
    super(http, storage);
  }

  /**
   * @desc Metodo que faz o post para as rotas da API
   * @param {Model} data
   * @param url
   * @returns {Observable<any>}
   */
  protected post(data: Model, url): Observable<any> {

    return new Observable<any>((observer) => {

      AccessToken.getFromStorage()
        .subscribe(
          (accessToken: AccessToken) => {

            console.log(accessToken);

            this.httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken.getAccessToken()
              })
            };

            this.http.post(this.APIBaseURL + url, data.toJson(), this.httpOptions)
              .subscribe(
                (data) => {
                  console.log(data);
                },
                (err) => {
                  //TODO implementar handleerror
                  console.log(err);
                }
              )

          },
          (err) => {
            //TODO implementar handleerror
            console.log(err);
          }
        )
    });
  }
}
