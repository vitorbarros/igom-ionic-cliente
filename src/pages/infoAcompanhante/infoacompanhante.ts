import {Component, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PagamentoPage} from "../pagamento/pagamento";
import {MapsAPILoader} from "@agm/core";

@Component({
  selector: 'page-infoacompanhante',
  templateUrl: 'infoacompanhante.html'

})
export class InfoacompanhantePage {

  public tabBarElement: any;
  public err: any;
  public hasStreetNumber: any = false;

  public acompanhante = {
    address: "",
    description: "",
    address_components: [],
    geometry: {}
  };

  constructor(public navCtrl: NavController, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

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

  pagamento() {

    this.err.error = false;
    this.err.messages.general = "";

    if (!this.hasStreetNumber) {
      this.err.error = true;
      this.err.messages.general = "Informe o nome de rua e número";
    }

    if (!this.acompanhante.description) {
      this.err.error = true;
      this.err.messages.general = "Informe os detalhes da missão";
    }

    if (this.hasStreetNumber && this.acompanhante.description) {
      this.navCtrl.push(PagamentoPage, {'dadosMissao': this.acompanhante});
    }
  }

  ionViewDidLoad() {

    this.mapsAPILoader.load().then(() => {

      let nativeHomeInputBox = document.getElementById('autocompleteAddress').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          let place = google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.acompanhante.address_components = place.address_components;
          this.acompanhante.geometry = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          //validando as informacoes do endereco
          for (let i = 0; i < this.acompanhante.address_components.length; i++) {
            if (this.acompanhante.address_components[i].types) {
              for (let c = 0; c < this.acompanhante.address_components[i].types.length; c++) {
                if (this.acompanhante.address_components[i].types[c] === "street_number") {
                  this.hasStreetNumber = true;
                }
              }
            }
          }
        });
      });
    });
  }
}
