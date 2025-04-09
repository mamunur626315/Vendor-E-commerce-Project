import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Coupon } from '../../models/coupon.model';

const headerOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  dataUrl = 'https://3a21-103-4-117-150.ngrok-free.app/coupon';

  panelOpenState = false;

  currentCoupon: Coupon = new Coupon();
  
  constructor(
    private http: HttpClient
  ) { }

  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }

  getAllCoupon(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.dataUrl+'/getAllCouponDetails', headerOption);
  }

  deleteCoupon(coupid: number): Observable<Coupon> {
    return this.http.delete<Coupon>(this.dataUrl + '/delete/' + coupid, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  createCoupon(cat: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(this.dataUrl+ '/post', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  updateCoupon(cat: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>(this.dataUrl + '/update', cat, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  coupCodeApply(data:string):Observable<Coupon>{
    return this.http.get<Coupon>('https://3a21-103-4-117-150.ngrok-free.app/coupon/getByCouponCode?couponCode='+ data, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

  getAllCouponDetails():Observable<Coupon[]>{
    return this.http.get<Coupon[]>('https://3a21-103-4-117-150.ngrok-free.app/coupon/getAllCouponDetails', headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }

}
