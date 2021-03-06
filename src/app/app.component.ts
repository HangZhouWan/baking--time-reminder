import {Component, ElementRef, ViewChild} from '@angular/core';

import * as _ from 'lodash';
import construct = Reflect.construct;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filePath = './assets/alert/alert.mp3';
  rowData = [];
  reminderList = [];
  index = 0;

  @ViewChild('alertMessage') alertMessage: ElementRef;

  @ViewChild('tableWapper') tableWapper: ElementRef;


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
    this.index = this.rowData.length + 1;
    const newRow = this.constructRow();
    this.rowData.push(newRow);
    setTimeout(function () {
      this.tableWapper.nativeElement.scrollTop = this.tableWapper.nativeElement.scrollHeight;
    }.bind(this), 1);
  }


  constructTimeCol(row, index): void {
    const cols = ['proof', 'knead', 'split', 'shrink', 'bake', 'baked'];
    const nowTime = new Date();
    _.forEach(cols, (col) => {
      this.constructCol(row, col, nowTime, index + 1);
    });
    row.start = true;
    this.setIndexByTime();
  }

  constructRow(): object {
    const row = {
      index: this.index,
      waterRange: 0,
      water: 0,
      start: false
    };
    return row;
  }

  calculateWaterValume(row, waterRange): void {
    row.water = (waterRange * 2 - 88).toFixed(1);
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

  isStartButtonDisabled(index): boolean {
    if (index === 1) {
      return false;
    }
    const pervRow = _.find(this.rowData, (row) => {
      return row.index === (index - 1);
    });
    return pervRow && !pervRow.start;
  }

  deleteRow(currentRow): void {
    _.remove(this.rowData, currentRow);
    _.remove(this.reminderList, function (reminder) {
      return reminder.index === currentRow.index;
    });
    this.rowData.forEach(function (row) {
      if (row.index > currentRow.index) {
        row.index -= 1;
      }
    });
    this.reminderList.forEach(function (reminder) {
      if (reminder.index > currentRow.index) {
        reminder.index -= 1;
      }
    });
  }
}

