import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit {

  @Input() row: number;
  @Input() column:number;
  @Input() cellData:any;
  @Input() cellValue:any;
  @Output() changed = new EventEmitter<any>();



  private isEdit: boolean = false;
  private isCombobox: boolean = false;
  onFocusOut(){
    this.isEdit = false;
  }

  onClick(){
    console.log("Clicked");
    this.isEdit = true;
  }


  constructor() {
    this.isCombobox = typeof (this.cellData) === "object";
  }

  ngOnInit() {
  }

}
