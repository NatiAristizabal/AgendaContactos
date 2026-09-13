import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ContactList } from './pages/contact-list/contact-list';
import { ContactDetails } from './pages/contact-details/contact-details';

export const routes: Routes = [
    {
        path:"login",
        component:Login
    },
    {
        path:"register",
        component:Register
    },
    {
        path: "contacts",
        component: ContactList
    },
    {
        path: "contacts/:id",
        component: ContactDetails
    },
    {
        path: "",
        redirectTo: "contacts",
        pathMatch: "full"
    }
];
