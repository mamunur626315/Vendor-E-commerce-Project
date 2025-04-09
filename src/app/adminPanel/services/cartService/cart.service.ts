import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { Cart } from '../../models/Cart.model';
import { Product } from '../../models/product.mode';

const headerOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData = new EventEmitter<Product[] | []>();
  constructor(private http: HttpClient, private router:Router) { }

  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }

  addToCart(cartData: Cart) {
    return this.http.post('https://3a21-103-4-117-150.ngrok-free.app/cart/post', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<Product[]>('https://3a21-103-4-117-150.ngrok-free.app/cart/getCartList?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
                if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  // removeToCart(cartId:number){
  //   console.warn("hit to removeCart/"+cartId)
  //   return this.http.delete('http://localhost:8080/cart/delete/' + cartId);
  // }

  removeToCart(cartId:number): Observable<Cart> {
    console.warn("hit to removeCart/"+cartId)
    return this.http.delete<Cart>('https://3a21-103-4-117-150.ngrok-free.app/cart/delete/' + cartId, headerOption).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    )
  }

  currentCart(){
    let userStore= localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>('https://3a21-103-4-117-150.ngrok-free.app/cart/getCartList?userId=' + userData.id)
  }


}
