import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
import {CadastroPage} from '../pages/cadastro/cadastro';
import {HomePage} from '../pages/home/home';
import {AcompanhantePage} from '../pages/serviceAcompanhante/acompanhante';
import {FixoPage} from '../pages/serviceFixo/fixo';
import {InfoacompanhantePage} from '../pages/infoAcompanhante/infoacompanhante';
import {InfofixoPage} from '../pages/infoFixo/infofixo';
import {PagamentoPage} from '../pages/pagamento/pagamento';
import {BuscandoPage} from '../pages/buscando/buscando';

@Component({
    templateUrl: 'app.html'

})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Login', component: LoginPage},
            {title: 'Cadastro', component: CadastroPage},
            {title: 'Home', component: HomePage},
            {title: 'Acompanhante', component: AcompanhantePage},
            {title: 'Fixo', component: FixoPage},
            {title: 'Infoacompanhante', component: InfoacompanhantePage},
            {title: 'Infofixo', component: InfofixoPage},
            {title: 'Pagamento', component: PagamentoPage},
            {title: 'Buscando', component: BuscandoPage}

        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}