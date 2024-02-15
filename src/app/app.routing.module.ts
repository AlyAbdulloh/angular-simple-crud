import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ItemListComponent } from "./item-list/item-list.component";
import { UserListComponent } from "./user-list/user-list.component";
import { AuthGuard } from "./guards/auth.guard";
import { GuestGuard } from "./guards/guest.guard";


const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: '', component: LoginComponent, canActivate: [GuestGuard]},
    {path: 'user-list', component: UserListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule{}