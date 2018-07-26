import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../models/user";
import {UserService} from "../../services/userService";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public user: User;

  constructor(public navCtrl: NavController, private userService: UserService) {
    this.user = new User();
  }

  storeUser() {
    this.userService.store(this.user);
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
