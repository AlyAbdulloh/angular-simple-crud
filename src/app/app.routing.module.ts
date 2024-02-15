import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ItemListComponent } from "./item-list/item-list.component";
import { UserListComponent } from "./user-list/user-list.component";


const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user-list', component: UserListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule{}