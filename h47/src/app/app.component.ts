import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet></router-outlet>', // Placeholder for routed views
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule], // Import RouterModule
})
export class AppComponent {}
