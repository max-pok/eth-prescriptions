import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';

export interface  PrescriptionRequestData {
  client_id: string;
  client_name: string;
  medicine_id: string;
  medicine_name: string;
}

@Component({
  selector: 'prescription-request-list',
  templateUrl: './prescription-request-list.component.html',
  styleUrls: ['./prescription-request-list.component.css']
})
export class PrescriptionRequestListComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['client_id', 'client_name', 'medicine_id', 'medicine_name', 'update'];
  dataSource: MatTableDataSource<PrescriptionRequestData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private request: RequestService) {
    this.request.requestListBehavior.subscribe(requests => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(requests);
    })
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
