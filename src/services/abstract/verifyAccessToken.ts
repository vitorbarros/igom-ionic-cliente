import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {StorageIGOM} from "./storageIgom";
import {AccessToken} from "../../models/accessToken";
import moment from "moment";
import {Observable} from "rxjs/Observable";

let headers = {
  'Content-Type': 'application/json'
};

let httpOptions = {
  headers: new HttpHeaders(headers)
};

@Injectable()
export class VerifyAccessToken {

  //protected APIBaseURL = 'http://localhost:8080';

  protected APIBaseURL = 'https://igom-api.herokuapp.com';

  private json: any;
  private accessToken: AccessToken;

  /**
   * @desc toda classe que for fazer chamadas na API que extender essa classe tera automaticamente a verificacao da validade da token
   * @param {HttpClient} http
   * @param {StorageIGOM} storage
   */
  constructor(public http: HttpClient, public storage: StorageIGOM) {

    this.storage.get('access_token')
      .subscribe(
        (data) => {
          //caso exista token armazenada no local storage do app
          this.accessToken = new AccessToken(JSON.parse(data));
          let todayDate = moment().format("Y-MM-DD H:mm:ss");
          let today = new Date(todayDate);

          if (!this.accessToken.getAccessTokenExpireAt()) {
            this.storeToken()
              .subscribe(
                (data) => {
                  console.log('successo ao recuperar a token -----> ', data);
                },
                (err) => {
                  console.log('erro ao recuperar o token ------> ', err);
                }
              );
          } else {

            let expireAt = new Date(this.accessToken.getAccessTokenExpireAt().toString());
            let hasExpired = today > expireAt;

            if (hasExpired) {
              this.storeToken()
                .subscribe(
                  (data) => {
                    console.log('successo ao recuperar a token -----> ', data);
                  },
                  (err) => {
                    console.log('erro ao recuperar o token ------> ', err);
                  }
                );
            }
          }
        },
        (err) => {
          //caso não exista token armazenada no local storage do app
          this.storeToken()
            .subscribe(
              (data) => {
                console.log('successo ao recuperar a token -----> ', data);
              },
              (err) => {
                console.log('erro ao recuperar o token ------> ', err);
              }
            );
        }
      );
  }

  /**
   * @desc Metodo que insere no local storage as informacoes da token
   * @returns {Observable<any>}
   */
  storeToken(): Observable<any> {

    return new Observable<any>((observer) => {

      this.http.post(this.APIBaseURL + "/api/V1/oauth2/oauth/access_token", {
        grantType: "password",
        appId: "igom_app_android",
        secret: "N&{<>0JhT3*W",
        username: "igom_app_android",
        password: "N&{<>0JhT3*W"
      }, httpOptions)
        .subscribe(
          (data) => {
            this.json = data;
            this.accessToken = new AccessToken(this.json.data);
            StorageIGOM.put('access_token', this.accessToken.toJsonString());
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
