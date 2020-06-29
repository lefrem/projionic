import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  showFirstMenue : boolean = true;
  showSndMenue : boolean = false;
  data: Object = {
    tokenUser: null,
    action: null
  }
  result: any;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'home',
      url: '',
      icon: ''
    },{
      title: 'login',
      url: '/login',
      icon: ''
    },
    {
      title: 'register',
      url: '/register',
      icon: ''
    }
  ];
  public appsPages = [
    {
      title: 'quest',
      url: '/quest',
      icon: ''
    },
    {
      title: 'my Quests',
      url: '/myQuests',
      icon: ''
    },
    {
      title: 'setting',
      url: '/setting',
      icon: ''
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  showMenu() {
    if (localStorage.getItem('token') == null) {
      this.showFirstMenue = true;
      this.showSndMenue = false;
    } else {
      this.showFirstMenue = false;
      this.showSndMenue = true;
    }
  }

  checkToken() {
    this.data["tokenUser"] = localStorage.getItem('token');
    this.data["action"] = "checkToken";

    console.log(this.data["tokenUser"]);
    

    // this.PostService.checkToken(this.data).subscribe(response => {
    //   this.result = response;
    //   return this.result;
    // })
  }

  ngOnInit() {
    this.showMenu();
  }
}
