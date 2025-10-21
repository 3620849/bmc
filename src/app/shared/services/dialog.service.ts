import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Patient} from '../../datasource';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public show: Subject<any> = new Subject<boolean>();
  dialogData: Subject<Patient> = new Subject<Patient>();
  showDialog(context:Patient,value: boolean): void {
    this.show.next(value);
    this.dialogData.next(context);
  }
}
