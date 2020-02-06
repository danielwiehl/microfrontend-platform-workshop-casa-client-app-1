import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beans, ContextService } from '@scion/microfrontend-platform';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {

  public id$: Observable<string>;
  public company$: Observable<string>;

  constructor(route: ActivatedRoute) {
    this.id$ = route.params.pipe(map(params => params['id']));
    this.company$ = Beans.get(ContextService).observe$('company')
  }
}
