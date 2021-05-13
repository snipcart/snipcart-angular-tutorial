import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  }