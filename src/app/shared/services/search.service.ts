import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchValue: Subject<any> = new Subject<string>();
  search(value: string): void {
    this.searchValue.next(value);
  }
}
