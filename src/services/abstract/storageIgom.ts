import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

declare var localStorage: any;
declare var JSON: any;

@Injectable()

/**
 * @desc Classe responsavel por trabalhar com o localstorage do app
 */
export class StorageIGOM {
  constructor() {
  }

  public static put(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key): Observable<any> {
    return new Observable(
      (observer) => {
        let data = localStorage.getItem(key);
        if (data) {
          observer.next(JSON.parse(data));
          observer.complete();
        } else {
          observer.error("Não existe valor para esse index :( " + key);
        }
      }
    );
  }

  public static exists(key) {
    return localStorage.getItem(key) != null;
  }

  public static remove(key) {
    localStorage.removeItem(key);
  }
}
