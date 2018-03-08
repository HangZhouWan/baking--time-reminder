import {Component, ElementRef, ViewChild} from '@angular/core';

import * as _ from 'lodash';
import construct = Reflect.construct;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rowData = [];
  index = 1;
  reminderList = [];

  @ViewChild('alertMessage')

  alertMessage: ElementRef;

  ngOnInit(): void {
    this.setIntervalCheck();
  }

  setIntervalCheck() {
    setInterval(this.checkIsOntime.bind(this), 10000);
  }

  checkIsOntime() {
    const nowTime = new Date();
    const dataString = this.getFormatTime(nowTime);
    _.forEach(this.reminderList, (reminder) => {
      if (reminder.done || reminder.alert || reminder.reminder === '醒发') {
        return true;
      }
      if (reminder.displayTime === dataString) {
        reminder.alert = true;
        this.alertMessage.nativeElement.play();
      }
    });
  }

  onNewDataButtonClick(): void {
    const newRow = this.constructRow();
    this.rowData.push(newRow);
    this.index += 1;
    this.setIndexByTime();
  }

  constructRow(): object {
    const row = {
      index: this.index,
      waterRange: 0,
      water: 0
    };
    const cols = ['proof', 'knead', 'split', 'shrink', 'bake', 'baked'];
    const nowTime = new Date();
    _.forEach(cols, (col) => {
      this.constructCol(row, col, nowTime, this.index);
    });
    return row;
  }

  calculateWaterValume(row, waterRange): void {
    row.water = waterRange * 2 - 88;
  }

  getFormatTime(time): string {
    const hour = time.getHours();
    let min = time.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    return hour + ':' + min;
  }

  constructCol(row, colName, nowTime, index): void {
    const col = {
      actualtime: null,
      displayTime: '',
      index: index,
      reminder: '',
      timeStap: null,
      alert: false,
      done: false
    };
    let timeStamp;
    switch (colName) {
      case 'proof':
        col.actualtime = nowTime;
        col.reminder = '醒发';
        break;
      case 'knead':
        timeStamp = nowTime.getTime();
        col.actualtime = new Date(timeStamp + 3300000);
        col.reminder = '揉面';
        break;
      case 'split':
        timeStamp = nowTime.getTime();
        col.actualtime = new Date(timeStamp + 4800000);
        col.reminder = '分样';
        break;
      case 'shrink':
        timeStamp = nowTime.getTime();
        col.actualtime = new Date(timeStamp + 5400000);
        col.reminder = '缩模';
        break;
      case 'bake':
        timeStamp = nowTime.getTime();
        col.actualtime = new Date(timeStamp + 9000000);
        col.reminder = '烘烤';
        break;
      case 'baked':
        timeStamp = nowTime.getTime();
        col.actualtime = new Date(timeStamp + 10080000);
        col.reminder = '出炉';
        break;
    }
    col.displayTime = this.getFormatTime(col.actualtime);
    col.timeStap = col.actualtime.getTime();
    _.set(row, colName, col);
  }

  concatAllData(): any {
    const allDataArray = [];
    _.forEach(this.rowData, (row) => {
      _.forEach(row, (col) => {
        console.log(col.reminder);
        if (_.isObject(col) && col.reminder !== '醒发') {
          allDataArray.push(col);
        }
      });
    });
    return allDataArray;
  }

  setIndexByTime(): void {
    this.reminderList = this.concatAllData().sort((per, next) => {
      return per.timeStap - next.timeStap;
    });
  }

  reminderDone(row): void {
    row.alert = false;
    row.done = true;
  }
}

