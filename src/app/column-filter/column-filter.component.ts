import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit {

  @Input() FilterValues:Array<any> = [];
  @Input() Column;
  @Input() theme;
  @Output() OnFilterChange = new EventEmitter<any>();

  private selectAll:boolean = true;
  private selectOne:boolean = true;
  private filteredData:Array<any> = [];


  checkedColumnFilter(value:string, event) {

    if (value === 'Select All' && event.target.checked) {
      this.filteredData = [];
      this.selectOne = true;
      for (let i = 0; i < this.FilterValues.length; ++i) {
        this.filteredData.push(this.FilterValues[i].toLowerCase());
      }
    } else if (value === 'Select All' && !event.target.checked) {
      this.filteredData = [];
      this.selectOne = false;
    } else if (event.target.checked) {
      this.filteredData.push(value.toLowerCase());
      if (this.filteredData.length === this.FilterValues.length) {
        this.selectAll = true;
      }
    } else if (!event.target.checked) {
      const index = this.filteredData.indexOf(value.toLowerCase());
      this.selectAll = false;
      if (index >= 0) {
        this.filteredData.splice(index, 1);
      }
    }
    this.OnFilterChange.emit({filteredData: this.filteredData, column: this.Column});
  }

  constructor() {
  }

  ngOnInit() {
  }

}
