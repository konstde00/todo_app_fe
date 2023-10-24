import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from '@app/src/app/components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import {TasksListComponent} from "@app/src/app/components/tasks-list/tasks-list.component";
import {AnalyticsComponent} from "@app/src/app/components/analytics/analytics.component";
import {TabsComponent} from "@app/src/app/components/tabs/tabs.component";
import {ListComponent} from "@app/src/app/components/list/list.component";
import {CreateTaskComponent} from "@app/src/app/components/create-task/create-task.component";
import {AnalyticsGuard} from "@app/src/app/services/guards/analytics.guard";
import {AdminPanelComponent} from "@app/src/app/components/admin-panel/admin-panel.component";
import {AdminPanelGuard} from "@app/src/app/services/guards/admin-panel.guard";
import {AuthenticatedGuard} from "@app/src/app/services/guards/authenticated.guard";
import {RegistrationComponent} from "@app/src/app/components/registration/registration.component";
import {PasswordResetInitComponent} from "@app/src/app/components/password-reset-init/password-reset-init.component";
import {
  PasswordResetFinishComponent
} from "@app/src/app/components/password-reset-finish/password-reset-finish.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'password-reset/init', component: PasswordResetInitComponent },
  { path: 'password-reset/finish', component: PasswordResetFinishComponent },
  { path: 'tasks', component: TabsComponent, canActivate: [AuthenticatedGuard], children: [
      { path: '', redirectTo: 'not_started', pathMatch: 'full'},
      { path: ':status', component: ListComponent, canActivate: [AuthenticatedGuard]}
    ]
  },
  { path: 'new-task', component: CreateTaskComponent, canActivate: [AuthenticatedGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthenticatedGuard, AnalyticsGuard]},
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthenticatedGuard, AdminPanelGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticatedGuard] },
  { path: 'error', component: ErrorComponent, canActivate: [AuthenticatedGuard] },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
