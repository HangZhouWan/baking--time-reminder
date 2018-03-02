import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}

export interface Element {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: '9:18', name: '9:20', weight: '9:25', symbol: '9:30'},
  {position: '9:28', name: '10:20', weight: '10:25', symbol: '10:30'},
  {position: '9:38', name: '10:30', weight: '10:35', symbol: '10:40'},
  {position: '9:48', name: '10:40', weight: '10:45', symbol: '10:50'},
  {position: '9:58', name: '10:50', weight: '11:05', symbol: '11:10'},
  {position: '9:18', name: '9:20', weight: '9:25', symbol: '9:30'},
  {position: '9:28', name: '10:20', weight: '10:25', symbol: '10:30'},
  {position: '9:38', name: '10:30', weight: '10:35', symbol: '10:40'},
  {position: '9:48', name: '10:40', weight: '10:45', symbol: '10:50'},
  {position: '9:58', name: '10:50', weight: '11:05', symbol: '11:10'}
];
