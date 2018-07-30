import {StorageIGOM} from "../services/abstract/storageIgom";
import {Observable} from "rxjs/Observable";

export class AccessToken {

  public accessToken: String;
  public accessTokenExpireAt: String;
  public refreshToken: String;
  public refreshTokenExpireAt: String;

  constructor(json?: any) {

    if (json) {
      this.accessToken = json.accessToken;
      this.accessTokenExpireAt = json.accessTokenExpireAt;
      this.refreshToken = json.refreshToken;
      this.refreshTokenExpireAt = json.refreshTokenExpireAt;
    }
  }

  getAccessToken() {
    return this.accessToken;
  }

  getAccessTokenExpireAt() {
    return this.accessTokenExpireAt;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  getRefreshTokenExpireAt() {
    return this.refreshTokenExpireAt;
  }

  toJsonString() {
    return JSON.stringify({
      accessToken: this.accessToken,
      accessTokenExpireAt: this.accessTokenExpireAt,
      refreshToken: this.refreshToken,
      refreshTokenExpireAt: this.refreshTokenExpireAt
    });
  }

  public static getFromStorage(): Observable<any> {

    return new Observable<any>((observer) => {

      let storageIgom = new StorageIGOM();
      let json: any;

      storageIgom.get('access_token')
        .subscribe(
          (data) => {

            json = JSON.parse(data);
            observer.next(new AccessToken({
              accessToken: json.accessToken,
              accessTokenExpireAt: json.accessTokenExpireAt,
              refreshToken: json.refreshToken,
              refreshTokenExpireAt: json.refreshTokenExpireAt
            }));
            observer.complete();
          },
          (err) => {
            //TODO ajustar handler
            console.log(err);
            observer.error(err);
          }
        );
    });
  }
}
