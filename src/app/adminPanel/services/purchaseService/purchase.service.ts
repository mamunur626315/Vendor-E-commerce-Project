import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from '../../models/product.mode';
import { Purchase } from '../../models/Purchase.model';

const headerOption = {
  headers :new HttpHeaders({
    'content-type':'application/json',
    'ngrok-skip-browser-warning':'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  dataUrl = 'https://3a21-103-4-117-150.ngrok-free.app/purchase';
  dataUrl2 = 'https://3a21-103-4-117-150.ngrok-free.app/joinTable';

  panelOpenState = false;
 
  product:Product=new Product();
  currentPurchase: Purchase = new Purchase();
  setPrice(val: Product){
   this.currentPurchase.pro_id = val.pro_id;
   this.currentPurchase.price=val.pro_price;
  }

  // currentPurchase.price=product.pro_price;
  constructor(
    private http: HttpClient
  ) { }

  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }

  getAllPurchase(): Observable<Object[]> {
    return this.http.get<Object[]>(this.dataUrl2+'/getAll', headerOption);
  }

  deletePurchase(catid: number): Observable<Purchase> {
    return this.http.delete<Purchase>(this.dataUrl + '/delete/' + catid, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  createPurchase(cat: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.dataUrl+ '/post', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  updatePurchase(cat: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(this.dataUrl + '/update', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }
}
