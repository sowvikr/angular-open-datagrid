import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

interface ChangedValue {
  value: string;
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
  @Output() changed = new EventEmitter<any>();

  @ViewChild('name') vc: ElementRef;

  private isEdit: boolean = false;
  private isCombobox: boolean = false;
  private changedValue: ChangedValue = {column: 0, row: 0, value: null};

  onFocusOut() {
    this.isEdit = false;
  }

  onClick() {
    console.log("Clicked");
    this.isCombobox = typeof (this.cellData) === "object";
    this.isEdit = true;
    this.vc.nativeElement.focus();
  }

  onChange(value: string) {
    this.changedValue.value = value;
    this.changedValue.row = this.row;
    this.changedValue.column = this.column;
    this.changed.emit(this.changedValue);
  }

  constructor() {
    this.isCombobox = typeof (this.cellData) === "object";
  }

  ngOnInit() {
  }

}
