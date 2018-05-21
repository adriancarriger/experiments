import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  public brightness;
  constructor(public navCtrl: NavController) {}
}
