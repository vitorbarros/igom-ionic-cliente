import {Component} from '@angular/core';
import {NavController, AlertController, ModalController} from 'ionic-angular';
import {CadastroPage} from '../cadastro/cadastro';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/loginService";
import {Login} from "../../models/login";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private authenticateForm: FormGroup;
  public err: any;
  public login: Login;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public modalCtrl: ModalController, private formBuilder: FormBuilder, private loginService: LoginService) {

    this.err = {
      error: false,
      messages: {}
    };

    this.authenticateForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * @desc Metodo de ir para a pagina de cadastro
   */
  cadastro() {
    let cadastroModal = this.modalCtrl.create(CadastroPage);
    cadastroModal.present();
  }

  /**
   * @desc Metodo de login
   */
  authenticate() {

    this.err.error = false;
    this.err.messages.general = "";

    this.login = new Login(this.authenticateForm.value);
    this.loginService.login(this.login)
      .subscribe(
        (data) => {
          this.navCtrl.setRoot(HomePage);
        },
        (err) => {
          this.err.error = true;
          this.err.messages.general = "Usuário ou senha incorretos.";
        }
      );
  }

  /**
   * @desc Modal de recuperacao de senha
   */
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Resetar Senha',
      message: 'Informe seu email para a recuperação da sua senha, uma nova senha será enviada em seu email.',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
      ],
      buttons: [
        {
          text: 'Sair',
          role: 'sair',
          handler: () => {

          }
        },
        {
          text: 'Enviar',
          handler: () => {

          }
        }
      ]

    });
    alert.present();
  }
}
