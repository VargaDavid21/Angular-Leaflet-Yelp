import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BusinessSearchService } from './services/business-search.service';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { YelpApiKeyInterceptor } from './helpers/yelp-api-key.interceptor';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: YelpApiKeyInterceptor,
      multi: true,
    },
    BusinessSearchService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
