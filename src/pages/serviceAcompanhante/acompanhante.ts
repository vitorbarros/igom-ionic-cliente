import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {InfoacompanhantePage} from "../infoAcompanhante/infoacompanhante";

@Component({
    selector: 'page-acompanhante',
    templateUrl: 'acompanhante.html'
})
export class AcompanhantePage {

    constructor(public navCtrl: NavController) {


    }

    infoAcompa() {
        this.navCtrl.push(InfoacompanhantePage);
    }

}
