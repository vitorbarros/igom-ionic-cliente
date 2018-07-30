import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AcompanhantePage} from '../serviceAcompanhante/acompanhante';
import {FixoPage} from '../serviceFixo/fixo';
import {LoginService} from "../../services/loginService";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private loginService: LoginService) {
  }

  acompanhanteRoot: any = AcompanhantePage;
  fixoRoot: any = FixoPage;

  ionViewDidLoad() {
    this.verifyIfUserIsLogged();
  }

  ionViewWillEnter() {
    this.verifyIfUserIsLogged();
  }

  ionViewDidEnter() {
    this.verifyIfUserIsLogged();
  }

  verifyIfUserIsLogged() {

    this.loginService.verifyIfUserIslogged()
      .subscribe(
        (data) => {

          //if user is logged do nothing

        },
        (err) => {
          this.navCtrl.setRoot(LoginPage);
        }
      )
  }
}
