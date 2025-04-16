import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private secretKey = 'thisIsNotSecretKey';

  encrypt(data: any): string {
    const plaintext = JSON.stringify(data);
    const ciphertext = CryptoJS.AES.encrypt(plaintext, this.secretKey).toString();
    return ciphertext;
  }

  decrypt(ciphertext: string): any {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  }
}
