import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(records: Array<any>, args?: any): any {
    return records.sort(function (a, b) {
      if (args.property == 'prodId' || args.property == 'prodQuantity') {
        if (parseInt(a[args.property]) < parseInt(b[args.property])) {
          return -1 * args.direction;
        }
        else if (parseInt(a[args.property]) > parseInt(b[args.property])) {
          return 1 * args.direction;
        }
        else {
          return 0;
        }
      } else if (args.property == 'prodName' || args.property == 'fName' || args.property == 'lName') {
        if (a[args.property] < b[args.property]) {
          return -1 * args.direction;
        }
        else if (a[args.property] > b[args.property]) {
          return 1 * args.direction;
        }
        else {
          return 0;
        }
      } else if (args.property == 'prodExpiryDate') {
        if (new Date(a[args.property]) < new Date(b[args.property])) {
          return -1 * args.direction;
        }
        else if (new Date(a[args.property]) > new Date(b[args.property])) {
          return 1 * args.direction;
        }
        else {
          return 0;
        }
      }
    });
  };

  /*compare(arg1: any, arg2: any, direction: number): number {
    if (arg1 < arg2) {
      return -1 * direction;
    }
    else if (arg1 > arg2) {
      return 1 * direction;
    }
    else {
      return 0;
    }
  }*/

}
