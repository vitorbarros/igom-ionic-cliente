import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from "../../models/user";
import {UserService} from "../../services/userService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldsValidation} from "../../services/fieldsValidation";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public user: User;
  public err: any;
  private register: FormGroup;
  private fieldsValidation: FieldsValidation;

  constructor(public navCtrl: NavController, private userService: UserService, private formBuilder: FormBuilder) {

    this.err = {
      error: false,
      message: ''
    };

    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

  }

  storeUser() {


    this.fieldsValidation = new FieldsValidation(this.register);
    this.fieldsValidation.validate()
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      )


    // this.user = new User(this.register.value);
    //
    //
    // console.log(this.user);
    // console.log(this.register);


    //this.userService.store(this.user);
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
