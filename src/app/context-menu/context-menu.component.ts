import {Component, OnInit, Input} from '@angular/core';
import {ClipboardService} from '../clipboard.service';

interface MenuItem {
  text: string;
  shortcut: string;
  icon: string;
  hasOptions?: boolean;
  onClick: any;
  options?: Array<MenuItem>;
  hasSeparator?: boolean;
  enabled?: boolean;
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input() x = 0;
  @Input() y = 0;
  @Input() isEdit: boolean;
  @Input() contextData: any;

  @Input() MenuItems: Array<MenuItem> = [
    {
      text: 'Copy', shortcut: 'Ctrl+C', icon: 'fa fa-copy', onClick($event, contextData, copyFunction) {
        copyFunction(contextData);
      }
    },
    {
      text: 'Paste', shortcut: 'Ctrl+V', icon: 'fa fa-paste', onClick() {
      }
    },
    {
      text: 'Export', shortcut: 'Ctrl+V', icon: null, onClick() {
      }
    }
  ];
  copyTextToClipboard(text) {
    return this.clipboardService.copyToClipboard(text);
  }
  constructor(private clipboardService: ClipboardService) {
    for (let i = 0; i < this.MenuItems.length; ++i) {
      const item: MenuItem = this.MenuItems[i];
      if (item.text === 'paste' && !this.isEdit) {
        item.enabled = false;
      }
      item.enabled = true;
    }
  }

  ngOnInit() {
  }

}
