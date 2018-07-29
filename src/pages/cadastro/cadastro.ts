import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../models/user";
import {UserService} from "../../services/userService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public user: User;
  public err: any;
  private success: any;
  private register: FormGroup;

  constructor(public navCtrl: NavController, private userService: UserService, private formBuilder: FormBuilder) {

    this.err = {
      error: false,
      messages: {}
    };

    this.success = {
      success: false,
      message: ""
    };

    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

  }

  /**
   * @desc Método que faz o insert do usuario na base de dados
   */
  storeUser() {

    this.user = new User(this.register.value);
    this.user.validate()
      .subscribe(
        (success) => {
          this.userService.store(this.user)
            .subscribe(
              (user) => {
                this.err.error = false;
                this.err.messages = {};
                this.success.success = true;
                this.success.message = "Cadastro realizado com sucesso. Acesse seu e-mail para ativar sua conta.";
                this.register.reset();
              },
              (err) => {
                this.err.error = true;
                this.err.messages = {};
                this.err.messages.general = err;
              }
            )
        },
        (err) => {
          this.err.error = true;
          this.err.messages = err;
        }
      )
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
