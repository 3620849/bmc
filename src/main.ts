import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjGyl/Vkd+XU9FcVRDXHxLfkx0RWFcb116dVdMY1xBNQtUQF1hTH9TdERjWn1acHZQQ2ldWkd3');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
