import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-exhibitions',
  standalone: true,
  templateUrl: './exhibitions.component.html',
  styleUrl: './exhibitions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExhibitionsComponent {}
