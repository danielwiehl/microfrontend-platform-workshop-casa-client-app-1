import { Injectable, NgZone } from '@angular/core';
import { Beans, MessageClient, MicrofrontendPlatform, PlatformState, PlatformStates } from '@scion/microfrontend-platform';
import { AngularZoneMessageClientDecorator } from './angular-zone-message-client.decorator';

@Injectable({providedIn: 'root'})
export class PlatformInitializerService {

  constructor(private zone: NgZone) {
  }

  public init(): Promise<void> {
    // Initialize the platform to run with Angular.
    // For more information, see AngularZoneMessageClientDecorator
    Beans.get(PlatformState).whenState(PlatformStates.Starting).then(() => {
      Beans.register(NgZone, {useValue: this.zone});
      Beans.registerDecorator(MessageClient, {useClass: AngularZoneMessageClientDecorator});
    });

    // Start the platform
    return MicrofrontendPlatform.forClient({symbolicName: 'casa-app-1'})
  }
}
