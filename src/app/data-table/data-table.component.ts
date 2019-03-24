import {Component, OnInit, Input} from '@angular/core';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {filter} from 'rxjs/internal/operators/filter';
import {ClipboardService} from '../clipboard.service';

// Cell renderer interface.
interface CellRenderer {
  cellRender?(row:number, column:number, data:any, columnDefs:Column[]): string;
}

// interface for columns
interface Column extends CellRenderer {
  headerName: string;
  field: string;
  sortState?: boolean;
  sort?: boolean;
  filter?: boolean;
  columnFilter?: boolean;
  uniqueFilterValues?: Array<any>;
  selectAll?: boolean;
  selectOne?: boolean;
  isEdit?: boolean;
}

interface FilterOptions {
  operator: string;
  values: string[];
  comparator: string;
}

// interface for each table row
interface TableRow extends CellRenderer {
  filteredOut: boolean;
  pageNo?: number;
  data: Array<any>;
}

interface ContextMenuData {
  row: number;
  column: number;
  data: any;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() pagination = true;
  @Input() pageSize = 10;

  @Input() columnDefs:Column[] = [
    {
      headerName: 'Model',
      field: 'model',
      sort: true,
      filter: true,
      cellRender: (row, column, data, def) => {
        return '<a href="#">' + data + '</a>';
      }
    },
    {headerName: 'Make', isEdit: true, field: 'make', filter: true, columnFilter: true},
    {headerName: 'Price', isEdit: true, field: 'price'},
    {headerName: 'Mileage (km/ltr)', isEdit: true, field: 'mileage'},
    {headerName: 'Color', isEdit: true, field: 'color'}
  ];
  @Input() rowData = [
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'red'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'green'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'blue'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'bottle green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'black'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 30, color: 'sky blue'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 30, color: 'red'}
  ];


  private TableRows:TableRow[] = [];
  private FilterRowCount:number = this.rowData.length;
  private TotalPages:number;
  private PagedRows:TableRow[] = [];
  private CurrentPage = 1;
  private InvalidPage = 0;
  private FromRecord = 1;
  private ToRecord:number = this.pageSize;
  private FilterData:Array<FilterOptions> = new Array<FilterOptions>(this.columnDefs.length);
  private TotalRows:number = this.rowData.length;
  private FilteredRows:TableRow[] = [];
  private contextmenu:boolean;
  private contextmenuX = 0;
  private contextmenuY = 0;
  private contextMenuData:Array<Array<any>> = [[]];
  private contextMenuIsEdit:boolean;
  private isDragging:boolean;


  // Convert row data to a 2D array.
  createTableData(filteredData?:Array<any>, currentPage?:number) {
    this.TableRows = new Array<any>();
    if (this.columnDefs.length !== Object.keys(this.rowData[0]).length) {
      console.warn('Invalid data: Total Column in def: ' + this.columnDefs.length + 'Total Columns in data:'
        + Object.keys(this.rowData[0]).length);
    }
    for (let j = 0; j < this.rowData.length; ++j) {
      const row:TableRow = {data: [], filteredOut: false};
      for (let i = 0; i < this.columnDefs.length; ++i) {
        if (!(filteredData && filteredData.length !== 0 && currentPage > 0)) {
          this.columnDefs[i].sortState = null;
        }
        row.cellRender = this.cellRenderer;
        row.data.push(this.rowData[j][this.columnDefs[i].field]);
      }
      this.TableRows.push(row);
      this.FilteredRows.push(row);
    }

    this.generateUniqueFilters();

    if (filteredData && filteredData.length !== 0 && currentPage > 0) {
      this.applyFilter(this.FilterData);
      this.setPagedRow(currentPage);
      for (let i = 0; i < this.columnDefs.length; ++i) {
        if (this.columnDefs[i].sortState !== null) {
          this.applySort(i, this.columnDefs[i].sortState);
        }
      }
    } else {
      this.pagedRows();
      this.setPagedRow(1);
    }
  }

  private generateUniqueFilters() {
    for (let i = 0; i < this.columnDefs.length; ++i) {
      this.createColumnFilter(this.columnDefs[i], this.TableRows, i);
    }
  }

  private createColumnFilter(column:Column, rows:Array<TableRow>, columnNumber:number) {
    const uniqueItems = [];
    column.selectAll = true;
    column.selectOne = true;
    if (!column.columnFilter) {
      return;
    }
    for (let i = 0; i < rows.length; ++i) {
      if (rows[i].filteredOut) {
        continue;
      }
      const columnValue = rows[i].data[columnNumber];
      if (uniqueItems.indexOf(columnValue) < 0) {
        uniqueItems.push(columnValue);
        if (!this.FilterData[columnNumber]) {
          this.FilterData[columnNumber] = {comparator: 'includes', operator: 'or', values: []};
        }
        this.FilterData[columnNumber].values.push(columnValue.toLowerCase());
      }
    }
    column.uniqueFilterValues = uniqueItems;
  }


  private pagedRows() {
    let j = 0;
    for (let i = 0; i < this.TableRows.length; ++i) {
      const row:TableRow = this.TableRows[i];
      if (row.filteredOut) {
        row.pageNo = 0;
        continue;
      }
      if (this.pagination) {
        row.pageNo = Math.ceil((j + 1) / this.pageSize);
      } else {
        row.pageNo = 1;
      }
      j++;
    }
  }

  private setPagedRow(pageNo:number) {
    this.PagedRows = [];
    for (let j = 0; j < this.TableRows.length; ++j) {
      const row:TableRow = this.TableRows[j];
      if (row.pageNo === this.InvalidPage) {
        continue;
      }
      if (row.pageNo === pageNo) {
        this.PagedRows.push(row);
      }
    }
  }

  private cellRenderer(row:number, column:number, data:any, columnDefs:Column[]) {
    if (columnDefs[column].cellRender === undefined && (typeof (columnDefs[column].cellRender) !== 'function')) {
      return data;
    } else {
      return columnDefs[column].cellRender(row, column, data, columnDefs);
    }
  }

// Filters data based on CONTAINS.
  filter(column, text) {
    this.FilterData[column] = {operator: 'or', values: [text], comparator: 'includes'};
    this.applyFilter(this.FilterData);
  }

  private getFilteredValue(column:number, filterOptions:Array<FilterOptions>, data:string) {
    let filtered = false;
    for (let i = 0; i < filterOptions[column].values.length; ++i) {
      if (filterOptions[column].comparator === 'includes') {
        if (filterOptions[column].operator == 'or') {
          filtered = filtered || data.toLowerCase().includes(filterOptions[column].values[i]);
        }
      }
    }
    return filtered;
  }

  private applyFilter(filterData:Array<FilterOptions>) {
    this.FilterRowCount = 0;
    for (let i = 0; i < this.TableRows.length; ++i) {
      let isFiltered = true;
      for (let j = 0; j < this.FilterData.length; ++j) {
        if (this.FilterData[j] === undefined) {
          isFiltered = isFiltered && this.TableRows[i].data[j].toString().toLowerCase().includes('');
          continue;
        }
        isFiltered = isFiltered && this.getFilteredValue(j, filterData, this.TableRows[i].data[j].toString().toLowerCase());
      }
      this.TableRows[i].filteredOut = !isFiltered;
      if (!this.TableRows[i].filteredOut) {
        this.FilterRowCount++;
      }
    }
    this.pagedRows();
    this.setPagedRow(1);
    this.updateTotalPageCount();
  }

  checkedColumnFilter(filterEventArgs) {

    this.FilterData[filterEventArgs.column].values = [];
    for (let i = 0; i < filterEventArgs.filteredData.length; ++i) {
      this.FilterData[filterEventArgs.column].values.push(filterEventArgs.filteredData[i]);
    }
    this.applyFilter(this.FilterData);
  }

  updateTotalPageCount() {
    this.TotalPages = Math.ceil(this.FilterRowCount / this.pageSize);
    this.FromRecord = 1;
    this.TotalRows = this.FilterRowCount;
    if (this.FilterRowCount < this.pageSize) {
      this.ToRecord = this.FilterRowCount;
    } else {
      this.ToRecord = this.pageSize;
    }
  }

  // Nevigate to Next Page
  nextPage() {
    this.CurrentPage++;
    this.FromRecord += this.pageSize;
    this.ToRecord += this.pageSize;
    if (this.ToRecord > this.rowData.length) {
      this.ToRecord = this.rowData.length;
    }
    this.setPagedRow(this.CurrentPage);
  }

  // Nevigate to Previous page
  previousPage() {
    this.CurrentPage--;
    this.FromRecord -= this.pageSize;
    this.ToRecord -= this.pageSize;
    this.setPagedRow(this.CurrentPage);
  }

  // Nevigate to Last page
  lastPage() {
    this.ToRecord = this.FilterRowCount;
    this.CurrentPage = this.TotalPages;
    this.setPagedRow(this.CurrentPage);
    this.FromRecord = this.FilterRowCount - this.PagedRows.length + 1;
  }

  // Nevigate to First page
  firstPage() {
    this.FromRecord = 1;
    this.ToRecord = this.pageSize;
    this.CurrentPage = 1;
    this.setPagedRow(this.CurrentPage);
  }

  // Sort columns
  sortColumn(column) {
    // check whether it is sortable.
    if (!this.columnDefs[column].sort) {
      return;
    }
    // Reset all other sort
    for (let i = 0; i < this.columnDefs.length; ++i) {
      if (i === column) {
        continue;
      }
      this.columnDefs[i].sortState = null;
    }

    // cache the sort state
    let sortState:boolean = this.columnDefs[column].sortState;
    if (sortState == null) {
      this.columnDefs[column].sortState = true;
    } else {
      this.columnDefs[column].sortState = !this.columnDefs[column].sortState;
    }
    sortState = this.columnDefs[column].sortState;
    this.applySort(column, sortState);
  }

  //
  private applySort(column:number, sortState:boolean) {
    const that:this = this;
    // Sort te table.
    this.TableRows.sort((a, b) => that.sortFunction(a, b, column, sortState));
    this.pagedRows();
    this.setPagedRow(this.CurrentPage);

  }

// Sort function
  private sortFunction(a, b, columnValue, isAsc) {
    if (a.data[columnValue] === b.data[columnValue]) {
      return 0;
    } else if (isAsc) {
      return (a.data[columnValue] < b.data[columnValue]) ? -1 : 1;
    } else {
      return (a.data[columnValue] > b.data[columnValue]) ? -1 : 1;
    }
  }

  drop(event) {
    moveItemInArray(this.columnDefs, event.previousIndex, event.currentIndex);
    moveItemInArray(this.FilterData, event.previousIndex, event.currentIndex);
    this.createTableData(this.FilterData, this.CurrentPage);
  }


  valueChanged(changeValue:any) {
    this.TableRows[changeValue.row].data[changeValue.column] = changeValue.value;
    this.pagedRows();
    this.setPagedRow(this.CurrentPage);

  }

  showContextMenu(event) {
    this.contextmenuX = event.x;
    this.contextmenuY = event.y;
    if (!this.contextMenuData[event.row]) {
      this.contextMenuData[event.row] = [];
    }
    this.contextMenuData[event.row][event.column] = this.PagedRows[event.row].data[event.column];
    this.contextMenuIsEdit = event.isEdit;
    this.contextmenu = true;
  }


  hasData(column) {
    for (let i = 0; i < this.contextMenuData.length; ++i) {
      if (!this.contextMenuData[i]) {
        continue;
      }
      for (let j = 0; j < this.contextMenuData[i].length; ++i) {
        if (!this.contextMenuData[i][j]) {
          return true;
        }
      }
    }
    return false;
  }

  onSelecting(rowCount, columnCount, cell, $event) {
    if (this.isDragging) {
      if (!this.contextMenuData[rowCount]) {
        this.contextMenuData[rowCount] = [];
      }
      this.contextMenuData[rowCount][columnCount] = this.PagedRows[rowCount].data[columnCount];
    }
  }

  onClick(rowCount, columnCount, cell, $event) {
    if (this.contextMenuData[rowCount] && this.contextMenuData[rowCount][columnCount]) {
      this.contextMenuData = [];
    }
    else {
      this.contextMenuData = [];
      if (!this.contextMenuData[rowCount]) {
        this.contextMenuData[rowCount] = [];
      }
      this.contextMenuData[rowCount][columnCount] = this.PagedRows[rowCount].data[columnCount];
    }
  }

  onDragStart($event) {
    this.isDragging = true;
  }

  onDragEnd($event) {
    this.isDragging = false;
  }

  onContextMenuOff() {
    this.contextmenu = false;
  }

  onCtrlV() {
    //this.clipboardService.copyToClipboard(this.contextMenuData);
  }

  onCtrlC() {
    this.clipboardService.copyToClipboard(this.contextMenuData);
  }

  constructor(private clipboardService:ClipboardService) {
    this.createTableData();
    this.TotalPages = Math.ceil(this.rowData.length / this.pageSize);
  }

  ngOnInit() {
  }

}
