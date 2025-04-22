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

    const encryptedData = {
      "encdata" : encrypted.toString()
    }
  
    return encryptedData; 
  }
  
  decrypt(ciphertext: string): any {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const iv = CryptoJS.enc.Utf8.parse(this.secretIv);
  
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  }
}
