import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

interface ChangedValue {
  value: string;
  row: number;
  column: number;
}

interface ContextMenuArgs {
  x: number;
  y: number;
  isEdit: boolean;
  row: number;
  column: number;
}

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})


export class InlineEditComponent implements OnInit {

  @Input() row: number;
  @Input() column: number;
  @Input() cellData: any;
  @Input() cellValue: any;
  @Input() columnDefs: any;
  @Input() renderer: any;
  @Input() isEditable: boolean;
  @Input() isSelected: boolean;
  @Output() changed = new EventEmitter<any>();
  @Output() rightClicked = new EventEmitter<ContextMenuArgs>();
  @Input() theme:string;

  @ViewChild('name') vc: ElementRef;

  private isEdit = false;
  private isCombobox = false;
  private changedValue: ChangedValue = {column: 0, row: 0, value: null};
  private contextMenuArgs: ContextMenuArgs = {x: 0, y: 0, isEdit: false, column: 0, row: 0};

  onFocusOut() {
    this.isEdit = false;
  }

  onClick() {
    if (this.isEdit) {
      this.isEdit = false;
    }
  }

  onDoubleClick() {
    this.isCombobox = typeof (this.cellData) === 'object';
    this.isEdit = true;
    this.vc.nativeElement.focus();
  }

  onChange(value: string) {
    this.changedValue.value = value;
    this.changedValue.row = this.row;
    this.changedValue.column = this.column;
    this.changed.emit(this.changedValue);
  }

  onRightClick(event) {
    this.contextMenuArgs.x = event.clientX;
    this.contextMenuArgs.y = event.clientY;
    this.contextMenuArgs.isEdit = this.isEdit;
    this.contextMenuArgs.row = this.row;
    this.contextMenuArgs.column = this.column;
    this.rightClicked.emit(this.contextMenuArgs);
  }

  constructor() {
    this.isCombobox = typeof (this.cellData) === 'object';
  }

  ngOnInit() {
  }

}
