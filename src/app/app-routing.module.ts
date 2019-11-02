import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuardService } from './service/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';


const routes: Routes = [
  {path :'', component: WelcomeComponent, canActivate:[AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService]},
  { path: 'contacts', component: ContactsComponent, canActivate:[AuthGuardService] },
  { path: 'create-contact', component: CreateContactComponent, canActivate:[AuthGuardService] },
  { path: 'activities', component: ActivitiesComponent, canActivate:[AuthGuardService] },
  { path: 'profile-setting', component: ProfileSettingComponent, canActivate:[AuthGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
