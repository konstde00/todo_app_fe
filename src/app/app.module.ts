import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserCardComponent} from "./components/user-card/user-card.component";
import {ErrorComponent} from "./components/error/error.component";
import {ProfileComponent} from "@app/src/app/components/profile/profile.component";
import {LoginComponent} from "./components/login/login.component";
import {AppRoutingModule} from "./app-routing.module";
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskComponent } from './components/task/task.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AnalyticsComponent } from '@app/src/app/components/analytics/analytics.component';
import {httpInterceptorProviders} from "@app/src/app/services/request-interceptor.service";
import {AuthService} from "@app/src/app/services/authentication.service";
import {NgChartsModule} from "ng2-charts";
import {AnalyticsService} from "@app/src/app/services/analytics.service";
import { NavbarComponent } from '@app/src/app/components/navbar/navbar.component';
import {CreateTaskComponent} from "@app/src/app/components/create-task/create-task.component";
import {HeaderComponent} from "@app/src/app/components/header/header.component";
import {ItemComponent} from "@app/src/app/components/item/item.component";
import {ListComponent} from "@app/src/app/components/list/list.component";
import {TabsComponent} from "@app/src/app/components/tabs/tabs.component";
import {TaskService} from "@app/src/app/services/task.service";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {AnalyticsGuard} from "@app/src/app/services/guards/analytics.guard";
import { AdminPanelComponent } from '@app/src/app/components/admin-panel/admin-panel.component';
import {AdminPanelGuard} from "@app/src/app/services/guards/admin-panel.guard";
import {UserService} from "@app/src/app/services/user.service";
import {AuthenticatedGuard} from "@app/src/app/services/guards/authenticated.guard";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { RegistrationComponent } from '@app/src/app/components/registration/registration.component';
import { PasswordResetInitComponent } from '@app/src/app/components/password-reset-init/password-reset-init.component';
import { PasswordResetFinishComponent } from '@app/src/app/components/password-reset-finish/password-reset-finish.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    HeaderComponent,
    ItemComponent,
    ListComponent,
    LoginComponent,
    ProfileComponent,
    ErrorComponent,
    UserCardComponent,
    TasksListComponent,
    TaskComponent,
    TabsComponent,
    PaginationComponent,
    AnalyticsComponent,
    NavbarComponent,
    AdminPanelComponent,
    RegistrationComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatTableModule,
    MatInputModule,
    CdkDropList,
    MatIconModule,
    CdkDragHandle,
    CdkDrag,
    MatSelectModule,
    MatButtonToggleModule,
  ],
  providers: [
    AuthService,
    TaskService,
    AnalyticsService,
    UserService,
    AnalyticsGuard,
    AdminPanelGuard,
    AuthenticatedGuard,
    httpInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '116154229086-6i9qgcthsq1bbl2f5pbcfgejek6bbdul.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
