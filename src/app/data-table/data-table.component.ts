import {Component, OnInit} from '@angular/core';

//
interface CellRenderer {
  cellRender?(row: number, column: number, data: any, columnDefs: Column[]): string
}

//interface for columns
interface Column extends CellRenderer {
  headerName: string;
  field: string;
  sortState?: boolean;
  sort?: boolean;
  filter?: boolean;
}

// interface for each table row
interface TableRow extends CellRenderer {
  filtered: boolean;
  pageNo?: number;
  data: Array<any>;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  pagination: boolean = true;
  pageSize: number = 5;

  columnDefs: Column[] = [
    {
      headerName: 'Model', field: 'model', sort: true, filter: true, cellRender: (row, column, data, def) => {
        return '<a href="#">' + data + '</a>';
      }
    },
    {headerName: 'Make', field: 'make', filter: true},
    {headerName: 'Price', field: 'price'}
  ];
  rowData = [
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 72000},
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 72000},
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 72000},
    {make: 'Toyota', model: 'Celica', price: 35000},
    {make: 'Ford', model: 'Mondeo', price: 32000},
    {make: 'Porsche', model: 'Boxter', price: 72000}
  ];


  private TableRows: TableRow[] = [];
  private FilterRowCount: number;
  private TotalPages: number;
  private PagedRows: TableRow[] = [];
  private CurrentPage: number = 1;
  private InvalidPage: number = 0;
  private FromRecord: number = 1;
  private ToRecord: number = this.pageSize;


  // Convert row data to a 2D array.
  createTableData() {
    if (this.columnDefs.length !== Object.keys(this.rowData[0]).length) {
      console.warn('Invalid data: Total Column in def: ' + this.columnDefs.length + 'Total Columns in data:'
        + Object.keys(this.rowData[0]).length);
    }
    for (let j = 0; j < this.rowData.length; ++j) {
      let row: TableRow = {data: [], filtered: false};
      for (let i = 0; i < this.columnDefs.length; ++i) {
        this.columnDefs[i].sortState = null;
        row.cellRender = this.cellRenderer;
        row.data.push(this.rowData[j][this.columnDefs[i].field]);
      }
      this.TableRows.push(row);
    }
    this.pagedRows();
    this.setPagedRow(1);
  }

  private pagedRows() {
    let j: number = 0;
    for (let i = 0; i < this.TableRows.length; ++i) {
      let row: TableRow = this.TableRows[i];
      if (row.filtered) {
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

  private setPagedRow(pageNo: number) {
    this.PagedRows = [];
    for (let j = 0; j < this.TableRows.length; ++j) {
      let row: TableRow = this.TableRows[j];
      if (row.pageNo === this.InvalidPage) continue;
      if (row.pageNo === pageNo) {
        this.PagedRows.push(row);
      }
    }
  }

  private cellRenderer(row: number, column: number, data: any, columnDefs: Column[]) {
    if (columnDefs[column].cellRender === undefined && (typeof (columnDefs[column].cellRender) !== 'function')) {
      return data;
    } else {
      return columnDefs[column].cellRender(row, column, data, columnDefs);
    }
  }

// Filters data based on CONTAINS.
  filter(column, text) {
    this.FilterRowCount = 0;
    for (let i = 0; i < this.TableRows.length; ++i) {
      this.TableRows[i].filtered = !this.TableRows[i].data[column].toLowerCase().includes(text.toLowerCase());
      if (!this.TableRows[i].filtered) this.FilterRowCount++;
    }
    this.pagedRows();
    this.setPagedRow(1);
  }

  //Nevigate to Next Page
  nextPage() {
    this.CurrentPage++;
    this.FromRecord += this.pageSize;
    this.ToRecord += this.pageSize;
    if (this.ToRecord > this.rowData.length) {
      this.ToRecord = this.rowData.length;
    }
    this.setPagedRow(this.CurrentPage);
  }

  //Nevigate to Previous page
  previousPage() {
    this.CurrentPage--;
    this.FromRecord -= this.pageSize;
    this.ToRecord -= this.pageSize;
    this.setPagedRow(this.CurrentPage);
  }

  //Nevigate to Last page
  lastPage() {
    this.CurrentPage = this.TotalPages;
    this.setPagedRow(this.CurrentPage);
  }

  //Nevigate to First page
  firstPage() {
    this.CurrentPage = 1;
    this.setPagedRow(this.CurrentPage);
  }

  // Sort columns
  sortColumn(column) {
    // check whether it is sortable.
    if (!this.columnDefs[column].sort) return;
    // Reset all other sort
    for (let i = 0; i < this.columnDefs.length; ++i) {
      if (i === column) continue;
      this.columnDefs[i].sortState = null;
    }

    // cache the sort state
    let sortState: boolean = this.columnDefs[column].sortState;
    if (sortState == null) {
      this.columnDefs[column].sortState = true;
    } else {
      this.columnDefs[column].sortState = !this.columnDefs[column].sortState;
    }
    sortState = this.columnDefs[column].sortState;
    let that = this;
    // Sort te table.
    this.TableRows.sort(function (a, b) {
      return that.sortFunction(a, b, column, sortState);
    });
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


  constructor() {
    this.createTableData();
    this.TotalPages = Math.ceil(this.rowData.length / this.pageSize);
  }

  ngOnInit() {
  }

}
