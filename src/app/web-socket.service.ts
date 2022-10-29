import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) { }
  joinRoom(data: string){
    this.socket.emit("Join",data)
  }

  sendMessage(str: any){
    this.socket.emit("Message sent",{
      message:"Message sent",
      user:str.from,
      toaddress:str.to
    })
    
  }

  getMessage(email: string){
    let observable = new Observable<string>(observer=>{
      this.socket.on(email,(data:string)=>{
        observer.next(data)
      })
      return ()=>{this.socket.disconnect()}
    })
    return observable
  }
}
