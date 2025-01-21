import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private recaptchaV3Service: ReCaptchaV3Service) { }

  get recaptchaToken(): Observable<string | undefined> {

    return new Observable(ob => {
      if (!environment?.recaptcha?.siteKey) {
        ob.next(undefined);
        ob.complete();
        return ;
      }
      this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
        ob.next(token);
        ob.complete();
      },
        (_err: any) => {
          ob.error(_err);
        });
    });
  }

}
