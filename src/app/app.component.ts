import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { concatMap,  filter,    map, tap } from "rxjs/operators";
import { SampleServiceService } from "../sample-service.service";

/**
 * @title Display value autocomplete
 */
@Component({
  selector: "app-component",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  providers: [SampleServiceService]
})
export class AutocompleteDisplayExample implements OnInit {
  constructor(
    private http: HttpClient,
    private sampleServiceService: SampleServiceService
  ) {
    this.getUsers();
    this.getDepot();
  }

  userName: string;
  selectDepot: string;

  ngOnInit() {
    this.firstSampleHttpCall()
    .pipe(
      filter(()=>this.firstCompleted),
      concatMap(()=> this.secondSampleHttpCall())
    )
    .pipe(
      
    ).subscribe()
   
  }

  users: User[] = [];
  
  getUsers() {
    this.http
      .get<User[]>("assets/users.json")
      .subscribe((data: User[]) => (this.users = data));
  }
  depot: string[] = [];
  getDepot() {
    this.http
      .get<string[]>("assets/depot.json")
      .pipe(
        map((s:string[])=> s.filter(this.onlyUnique)))
      .subscribe((data: string[]) => this.depot = data);
  }

 onlyUnique(value:string, index:number, self:string[]) {
  return self.indexOf(value) === index;
}

  textAreaValue:string = '';
  firstCompleted: boolean = false
  firstSampleHttpCall() {
    return this.sampleServiceService
      .getNumber()
      .pipe(
        tap(result => {
        this.textAreaValue += `\n${result}`
        if(result == 3)
        this.firstCompleted = true;
        }),
        );
  }

  secondSampleHttpCall() {
    return this.sampleServiceService
      .getText()
      .pipe(tap(result => {
        console.log(result);
        this.textAreaValue += `\n${result}`;
        }));
  }
}

export class User {
  public UserName: string;
  public Timezone: number;
}

export class UserDepot {
  public UserName: string;
  public Depot: string;
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
