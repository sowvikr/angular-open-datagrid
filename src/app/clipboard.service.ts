import { Injectable } from '@angular/core';
import {stripComments} from "tslint/lib/utils";

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {


  private generateTempTextArea(clipboardData?):any {
    const txtArea = document.createElement('textarea');
    txtArea.id = 'txt';
    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    if (clipboardData) {
      txtArea.value = clipboardData;
    }
    document.body.appendChild(txtArea);
    return txtArea;
  }

  private sanitize(data):string {
    return data.replace(/^,?(.+),?$/, "$1")
  }

  private get2DArray(data):Array<Array<any>> {
    let array:Array<any> = data.split(/\r?\n/);
    let array2D = [[]];
    for (let i = 0; i < array.length; ++i) {
      array2D[i] = [].concat(array[i].split(","));
    }
    return array2D;

  }

  copyToClipboard(data:Array<Array<any>>) {
    let clipboardData:string = "";
    for (let i = 0; i < data.length; ++i) {
      if (!data[i]) {
        continue;
      }
      clipboardData += this.sanitize(data[i].join(",")) + '\n';
    }
    const txtArea = this.generateTempTextArea(clipboardData);
    txtArea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
      if (successful) {
        return true;
      }
    } catch (err) {
      console.log('Oops, unable to copy');
    } finally {
      document.body.removeChild(txtArea);
    }
    return false;

  }

  getClipboardData():Array<Array<any>> {
    const txtArea = this.generateTempTextArea();
    txtArea.focus();
    let result:string = '';
    try {
      const successful = document.execCommand('paste');
      let msg:string;
      if (successful) {
        result = txtArea.value;
        msg = 'successful';
      }
      else {
        msg = 'unsuccessful';
      }
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to paste!');
    } finally {
      document.body.removeChild(txtArea);
      return this.get2DArray(result);
    }

  }

  constructor() {
  }
}
