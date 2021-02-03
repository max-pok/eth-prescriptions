import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as medicine from '../../assets/medicines.json';

export interface MedicineData {
  id: string;
  name: string;
  brand_name: string;
  price: string;
}

@Component({
  selector: 'medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements AfterViewInit  {

  displayedColumns: string[] = ['id', 'name', 'brand_name', 'price', 'update'];
  dataSource: MatTableDataSource<MedicineData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {    
    // Create 100 users
    const medicines = Array.from({length: medicine.results.length}, (_, k) => createMedicine(medicine.results[k]));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(medicines);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new Medicine. */
function createMedicine(med: any): MedicineData {  
  return {
    id: med["product_ndc"],
    name: med["generic_name"],
    brand_name: med["brand_name"],
    price: med["product_price"]
  };

}
