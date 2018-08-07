// --- MODULES IMPORT --- //
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';

// ---- PAGES ---- //
import { AppComponent } from './app.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SelectBikePageComponent } from './pages/select-bike-page/select-bike-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';

// ---- OVERLAYS ---- //
import { AddBikeComponent } from './overlays/add-bike/add-bike.component';
import { BikeParkFormComponent } from './overlays/bike-park-form/bike-park-form.component';

// --- SERVICES --- //
import { AuthService } from './services/auth.service';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { BikeService } from './services/bike.service';


// ---- GUARDS ---- //
import { RequireAnonGuard } from './guards/require-anon.guard';
import { RequireUserGuard } from './guards/require-user.guard';
import { InitAuthGuard } from './guards/auth-init.guard';


// ---- ROUTES ---- //

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [InitAuthGuard]},
  { path: 'signup', component: SignupPageComponent, canActivate: [RequireAnonGuard]},
  { path: 'login', component: LogInPageComponent, canActivate: [RequireAnonGuard]},
  { path: 'profile', component: ProfilePageComponent, canActivate: [RequireUserGuard]},
  { path: 'select-bike', component: SelectBikePageComponent, canActivate: [RequireUserGuard]},
  { path: 'report', component: ReportPageComponent, canActivate: [InitAuthGuard]},
];


@NgModule({
  declarations: [
    AppComponent,
    LogInPageComponent,
    SignupPageComponent,
    ProfilePageComponent,
    AddBikeComponent,
    HomePageComponent,
    SelectBikePageComponent,
    BikeParkFormComponent,
    ReportPageComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    RequireAnonGuard,
    RequireUserGuard,
    BikeService,
    InitAuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
