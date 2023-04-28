import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { config } from 'dotenv';

if (environment.production) {
  enableProdMode();
}

// Load environment variables from .env file
config();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
