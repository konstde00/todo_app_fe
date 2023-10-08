import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from '@app/src/app/components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import {TasksListComponent} from "@app/src/app/components/tasks-list/tasks-list.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
