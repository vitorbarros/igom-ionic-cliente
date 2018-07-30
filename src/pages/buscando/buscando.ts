import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    selector: 'page-buscando',
    templateUrl: 'buscando.html'
})
export class BuscandoPage {
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
}