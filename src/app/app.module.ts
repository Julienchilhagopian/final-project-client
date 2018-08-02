// --- MODULES IMPORT --- //
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ---- PAGES ---- //
import { AppComponent } from './app.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';

// --- SERVICES --- //
import { AuthService } from './services/auth.service';

// ---- GUARDS ---- //


// ---- ROUTES ---- //

const routes: Routes = [
  { path: 'login', component: LogInPageComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
