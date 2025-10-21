import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Entity, Patient} from '../../datasource';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public show: Subject<any> = new Subject<boolean>();
  dialogData: Subject<{ type:'Patient'|'Staff', data:Entity }> = new Subject<{ type:'Patient'|'Staff', data:Entity }>();
  showDialog(context: { type:'Patient'|'Staff', data:Entity },value: boolean): void {
    this.show.next(value);
    this.dialogData.next(context);
  }
}
