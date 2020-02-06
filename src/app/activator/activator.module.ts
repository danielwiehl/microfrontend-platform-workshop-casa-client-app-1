import { NgModule } from '@angular/core';
import { Beans, ManifestService, MessageClient, OutletRouter, RouterOutlets } from '@scion/microfrontend-platform';
import PRIMARY_OUTLET = RouterOutlets.PRIMARY_OUTLET;
import { take } from 'rxjs/operators';

@NgModule({})
export class ActivatorModule {

  constructor() {
    console.log('>>> Casa App1 activated');
    Beans.get(MessageClient).handleIntent$({type: 'view'}).subscribe(intent => {
      console.log(`>>> view intent received`, intent);
      Beans.get(OutletRouter).navigate(`/person/${intent.qualifier.id}`, {outlet: PRIMARY_OUTLET}).then();
    });

    Beans.get(MessageClient).handleIntent$({type: 'toolbar-item'}).subscribe(intent => {
      console.log('>>> onToolbarItemClick', intent);
    });

    setInterval(() => {
      Beans.get(ManifestService).lookupCapabilityProviders$({"type": "toolbar-item"})
        .pipe(take(1))
        .subscribe(providers => {
          if (providers.length) {
            Beans.get(ManifestService).unregisterCapabilityProviders$({"type": "toolbar-item"}).subscribe();
          }
          else {
            Beans.get(ManifestService).registerCapabilityProvider$(
              {
                "type": "toolbar-item",
                "private": false,
                "qualifier": {
                  "location": "header",
                  "entity": "person",
                  "action": "create",
                },
                "properties": {
                  "label": "Person erstellen",
                },

              }).subscribe();
          }
        })

    }, 5000);
  }
}
