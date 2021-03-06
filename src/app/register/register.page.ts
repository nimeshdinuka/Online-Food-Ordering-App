import { Component , OnInit} from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userName ="Nimesh";
  createSuccess = false;
  registerCredentials = { firstname: '', lastname: '', email: '', mobileno: '', username: '' , password: '' };

  constructor(private alertCtrl: AlertController, private auth: UserService, private nav: NavController) { }

  ngOnInit() {
  }

  public register() {
    // tslint:disable-next-line:max-line-length
    if (this.registerCredentials.firstname !== '' && this.registerCredentials.lastname !== '' && this.registerCredentials.email !== '' && this.registerCredentials.mobileno !== '' && this.registerCredentials.username !== '' && this.registerCredentials.password !== '') {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup('Success', 'Account created.');
      } else {
        this.showPopup('Error', 'Problem creating account.');
      }
    },
      error => {
        this.showPopup('Error', error);
      });
    } else {
      this.showPopup('Error', 'Please Fill All Details.');
    }
  }


  async showPopup(title, text) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.navigateForward('/login');

            }
          }
        }
      ]
    });
    await alert.present();
  }
}
