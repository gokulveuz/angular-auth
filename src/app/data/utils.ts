import { HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';

export class Utils {
  static createAuthSign(string: any): Observable<string> {
    return from(this.getHash('gk' + JSON.stringify(string) + 'gk'));
  }
  /** Hash a string */
  static async getHash(string: string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    });
  }

   /** HTTP HEADERS */
   static httpHeaders(values: { [key: string]: any}): any {
    return {  headers: new HttpHeaders(values)  };
  }

}
