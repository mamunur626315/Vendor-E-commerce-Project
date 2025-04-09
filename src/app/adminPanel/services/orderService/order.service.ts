import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http:HttpClient) { }

  orderNow(data:Order){
    return this.http.post('https://3a21-103-4-117-150.ngrok-free.app/order/post',data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>('https://3a21-103-4-117-150.ngrok-free.app/order/getOrderList?userId=' + userData.id )
 
  }

  getAllOrderList() {
    return this.http.get<Order[]>('https://3a21-103-4-117-150.ngrok-free.app/order/getAllOrderList')
 
  }

  updateStatus(id:number, status:string){
    return this.http.post('https://3a21-103-4-117-150.ngrok-free.app/order/updateStatus?orderId=' + id+'&status='+status,{
      observe: 'response'
    });
  }

}
