import { Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { LoginOptionsComponent } from './login-options/login-options.component';
import { FreeDashboardLayoutComponent } from './layouts/free-dashboard/free-dashboard-layout.component';
import { FreeDashboardComponent } from './dashboard/free/free-dashboard.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
    title: 'home.title',
    children: [
      {
        path: '',
        loadComponent: () => import('./home/landing/landing.component').then(m => m.LandingComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layouts/navbar/navbar.component'),
    outlet: 'navbar',
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.route'),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
    title: 'login.title',
  },
  {
    path: '',
    loadChildren: () => import(`./entities/entity.routes`),
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
  },
  {
    path: 'login-options',
    component: LoginOptionsComponent,
  },
  {
    path: 'dashboard/free',
    component: FreeDashboardLayoutComponent,
    children: [{ path: '', component: FreeDashboardComponent }],
  },
  ...errorRoute,
];

export default routes;
