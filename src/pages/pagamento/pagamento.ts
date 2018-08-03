import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BuscandoPage} from "../buscando/buscando";
import {CreditCard} from "../../models/creditCard";

@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html'
})
export class PagamentoPage {

  public tabBarElement: any;
  private dadosMissao: any;
  public err: any;
  private card: CreditCard;

  creditCard = {
    brand: '',
    cardNumber: '',
    securityCode: '',
    expirationDate: '',
    holderName: '',
    cpf: ''
  };

  constructor(public navCtrl: NavController, private navParams: NavParams) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.dadosMissao = navParams.get('dadosMissao');

    this.err = {
      error: false,
      messages: {}
    };
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  buscar() {

    this.card = new CreditCard(this.creditCard);
    this.card.validate()
      .subscribe(
        (data) => {
          this.navCtrl.push(BuscandoPage, {
            'creditCard': this.card,
            'dadosMissao': this.dadosMissao
          });
        },
        (err) => {
          this.err.error = true;
          this.err.messages = {};
          this.err.messages.general = err;
        }
      );

  }
}
