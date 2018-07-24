import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AcompanhantePage} from '../serviceAcompanhante/acompanhante';
import {FixoPage} from '../serviceFixo/fixo';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) {

    }

    acompanhanteRoot: any = AcompanhantePage;
    fixoRoot: any = FixoPage;

}