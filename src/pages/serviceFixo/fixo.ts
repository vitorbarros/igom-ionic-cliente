import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {InfoacompanhantePage} from "../infoAcompanhante/infoacompanhante";
import {InfofixoPage} from "../infoFixo/infofixo";

@Component({
    selector: 'page-fixo',
    templateUrl: 'fixo.html'
})
export class FixoPage {

    constructor(public navCtrl: NavController) {


    }


    infoFixo() {
        this.navCtrl.push(InfofixoPage);
    }


}
