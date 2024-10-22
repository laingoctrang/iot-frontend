import { Component } from '@angular/core';
import { CardModule } from '@coreui/angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
