import { Router } from '@angular/router';
import { Component, ViewEncapsulation  } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  options : InAppBrowserOptions = {
    location : 'no',
    hidden : 'no',
    zoom : 'yes',
    toolbar: 'no',
    hideurlbar:'yes',

};
  constructor(private router:Router, private iab: InAppBrowser, private spinnerDialog: SpinnerDialog) {}
  public login() {
    const browser = this.iab.create('https://dev70643.service-now.com/oauth_auth.do?response_type=code&client_id=06296f0d9e404010b3bab5ab0696e1a7&redirect_uri=http://localhost:8100/oauth/callback&state=login', '_blank');
    //browser.executeScript(...);
    //browser.insertCSS(...);
    this.spinnerDialog.show(); 

    browser.on('loadstart').subscribe((event) => {
      const callbackEvent  = new URL(event.url);
      if(callbackEvent.host === 'localhost:8100'){
        const authCode = callbackEvent.searchParams.get('code');
        browser.close();
        this.router.navigate(['/oauth/callback'], { queryParams: { code: authCode } });
      }
    }, err => {
      this.spinnerDialog.hide();
    });

    browser.on('loadstop').subscribe(event => {
      this.spinnerDialog.hide();
      //browser.insertCSS({ code: "body{color: red;" });
    });

  }

}
