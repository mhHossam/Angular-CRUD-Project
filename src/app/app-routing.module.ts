import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PhotoComponent } from './photos/photo.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {path:'landing-page' , component:LandingPageComponent},
  { path: 'users/:userId', component: UserPageComponent },
  {path:'users/:userId/albums/:albumId' , component:PhotoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
