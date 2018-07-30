import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BuscandoPage} from "../buscando/buscando";

@Component({
    selector: 'page-pagamento',
    templateUrl: 'pagamento.html'
})
export class PagamentoPage {
    tabBarElement: any;

    constructor(public navCtrl: NavController) {

        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    ionViewWillEnter() {
        this.tabBarElement.style.display = 'none';
    }

    ionViewWillLeave() {
        this.tabBarElement.style.display = 'flex';
    }

    buscar() {
        this.navCtrl.push(BuscandoPage);
    }
}