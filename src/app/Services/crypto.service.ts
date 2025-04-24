import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private secretKey = 'EQAeseqSecretKey'; 
  private secretIv = 'RandomInitVector';   

  encrypt(data: any): any {
    const plaintext = JSON.stringify(data);
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const iv = CryptoJS.enc.Utf8.parse(this.secretIv);

    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return {
      encdata: encrypted.toString()
    };
  }

  decrypt(ciphertext: string): any {
    try {
      const key = CryptoJS.enc.Utf8.parse(this.secretKey);
      const iv = CryptoJS.enc.Utf8.parse(this.secretIv);

      const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

      // Handle empty or malformed data
      if (!plaintext) throw new Error('Empty decrypted data.');

      return JSON.parse(plaintext);
    } catch (error) {
      console.error('❌ Decryption failed:', error);
      return null; // You can optionally return an error object or string
    }
  }
}
