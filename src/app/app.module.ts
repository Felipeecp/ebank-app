import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    MatToolbarModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync('noop'),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
