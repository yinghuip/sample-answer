import { Injectable } from "@angular/core";
import { interval, of } from "rxjs";
import { take } from "rxjs/operators";

@Injectable()
export class SampleServiceService {
  constructor() {}

  getNumber() {
    const numbers = interval(1000);
    return numbers.pipe(take(4));
  }

    getText() {
    return of('OK');
  }
}
