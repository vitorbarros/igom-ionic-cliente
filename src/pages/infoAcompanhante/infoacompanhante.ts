import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PagamentoPage} from "../pagamento/pagamento";

@Component({
    selector: 'page-infoacompanhante',
    templateUrl: 'infoacompanhante.html'

})
export class InfoacompanhantePage {

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

    pagamento() {
        this.navCtrl.push(PagamentoPage);
    }
}
