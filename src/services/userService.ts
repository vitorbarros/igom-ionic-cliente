import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {StorageIGOM} from "./abstract/storageIgom";
import {API} from "./abstract/api";
import {User} from "../models/user";

@Injectable()

/**
 * @desc Abstracao para a abstracao dos heaaders com a token valida
 */
export class UserService extends API {

  constructor(public http: HttpClient, public storage: StorageIGOM) {
    super(http, storage);
  }

  store(user: User) {

    this.post(user, User.baseURL)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          //TODO implementar handleerror
          console.log(err);
        }
      )
  }
}
