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
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

// ---- GUARDS ---- //
import { RequireAnonGuard } from './guards/require-anon.guard';


// ---- ROUTES ---- //

const routes: Routes = [
  { path: 'signup', component: SignupPageComponent, canActivate: [RequireAnonGuard]},
  { path: 'login', component: LogInPageComponent, canActivate: [RequireAnonGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    RequireAnonGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
