import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pagination = true;
  pageSize = 10;

  theme = "light-theme";
  columnDefs = [
    {
      headerName: 'Model',
      field: 'model',
      width: '40px',
      sort: true,
      filter: true,
      cellRender: (row, column, data, def) => {
        return '<a href="#">' + data + '</a>';
      }
    },
    {headerName: 'Make', isEdit: true, field: 'make', width: '40px', filter: true, columnFilter: true},
    {headerName: 'Price', isEdit: true, width: '40px', field: 'price'},
    {headerName: 'Mileage (km/ltr)', isEdit: true, width: '40px', field: 'mileage', sort: true},
    {headerName: 'Color', isEdit: true, field: 'color', width: '10px', filter: true, columnFilter: true}
  ];
  rowData = [
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 30, color: 'red'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 50, color: 'green'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 40, color: 'blue'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 330, color: 'bottle green'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 100, color: 'black'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 60, color: 'white'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 70, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 80, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 20, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 40, color: 'green'},
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
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 50, color: 'yellow'},
    {make: 'Ford', model: 'Mondeo', price: 32000, 'mileage': 60, color: 'yellow'},
    {make: 'Porsche', model: 'Boxter', price: 72000, 'mileage': 70, color: 'red'},
    {make: 'Toyota', model: 'Celica', price: 35000, 'mileage': 40, color: 'green'},
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


}
