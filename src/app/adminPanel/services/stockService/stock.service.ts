import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stock } from '../../models/stock.model';

const headerOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StockService {
  dataUrl = 'https://3a21-103-4-117-150.ngrok-free.app/stock';

  panelOpenState = false;

  currentStock: Stock = new Stock();
  
  constructor(
    private http: HttpClient
  ) { }

  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }

  getAllStock(): Observable<Object[]> {
    return this.http.get<Object[]>(this.dataUrl+'/getAll', headerOption);
  }

  
}
