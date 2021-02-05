import { Directive, forwardRef, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { User } from './app.component';

@Directive({
  selector: '[NullTimeZone][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NullTimeZoneDirectiveDirective), multi: true }
    ]
})
export class NullTimeZoneDirectiveDirective implements Validator,OnChanges {

@Input() source: User[];

constructor() { }
 validate(c: AbstractControl): { [key: string]: any } | null{
   let noError= null;
   if(this.source === null) return noError;
   if(this.source === undefined) return noError;
   if(this.source.length === 0) return noError;
    if(c.value === undefined) return noError;
    if(c.value === null) return noError;
    const selectedUser = this.source.find(s=> s.UserName === c.value);
    if(selectedUser === undefined) return noError;
    if(selectedUser.Timezone === null)return {TimeZoneNull:true};
    
    return noError;
 }
   ngOnChanges(changes: SimpleChanges) {
        if (changes['source']) {
            if (this._onChange)
                this._onChange();
        }
    }

     registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

    private _onChange: () => void;
}