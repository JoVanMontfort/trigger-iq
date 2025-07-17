import { Component } from '@angular/core';
import { FdSidebarComponent } from './fd-sidebar.component';
import { FdHeaderComponent } from './fd-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'jhi-free-dashboard-layout',
  templateUrl: './free-dashboard-layout.component.html',
  imports: [FdSidebarComponent, FdHeaderComponent, RouterOutlet],
})
export class FreeDashboardLayoutComponent {}
