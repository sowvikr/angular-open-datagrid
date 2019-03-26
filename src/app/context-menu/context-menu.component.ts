import {Component, OnInit, Input} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ClipboardService} from '../clipboard.service';
import { ExportToCsv } from 'export-to-csv';

interface MenuItem {
  text: string;
  shortcut: string;
  icon: string;
  hasOptions?: boolean;
  onClick: any;
  options?: Array<MenuItem>;
  hasSeparator?: boolean;
  enabled?: boolean;
  rowData?:Array<any>;
  columnData?:Array<any>;
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input() x = 0;
  @Input() y = 0;
  @Input() isEdit:boolean;
  @Input() contextData:any;
  @Input() theme:string;
  @Input() rowData;
  @Input() columnData:Array<any>;
  @Input() MenuItems:Array<MenuItem> = [
    {
      text: 'Copy',
      shortcut: 'Ctrl+C',
      icon: 'fa fa-copy',
      onClick($event, contextData, copyFunction, clipboardService) {
        copyFunction(contextData, clipboardService);
      }
    },
    {
      text: 'Paste', shortcut: 'Ctrl+V', icon: 'fa fa-paste', onClick() {
    }
    },
    {
      text: 'Export', shortcut: ' ', icon: null, onClick() {
      let col = [];
      for (let i = 0; i < this.columnData.length; ++i) {
        col.push(this.columnData[i].field);
      }
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Data',
        useTextFile: false,
        useBom: true,
         headers: col
      };
      const csvExporter = new ExportToCsv(options);

      csvExporter.generateCsv(this.rowData);    }
    }
  ];


  copyTextToClipboard(text, clipboardService) {
    clipboardService.copyToClipboard(text);
  }

  constructor(private clipboardService:ClipboardService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    for (let i = 0; i < this.MenuItems.length; ++i) {
      const item:MenuItem = this.MenuItems[i];
      if (item.text === 'Paste' && !this.isEdit) {
        item.enabled = false;
      }
      else{
        item.enabled = true;
      }
      if (item.text === 'Export'){
        item.columnData = this.columnData;
        item.rowData = this.rowData;
      }
    }
  }

}
