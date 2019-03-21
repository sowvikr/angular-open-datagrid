import {Component, OnInit, Input} from '@angular/core';

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
    const txtArea = document.createElement('textarea');
    txtArea.id = 'txt';
    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    txtArea.value = text;
    document.body.appendChild(txtArea);
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
  constructor() {
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
