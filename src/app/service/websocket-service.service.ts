import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
 /* private stompClient: any;
  private currentUser: { id: string };

  constructor() {
    this.stompClient = stompClient;
    this.currentUser = currentUser;

    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, this.onConnected, this.onError);*/

    /*const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnect, onError);*/
  }

  /*onError = (error: string) => {
    console.error('Error: ' + error);
  };

  public onConnected(): void {
    console.log("connected");

    this.stompClient.subscribe(); //здесь изначатьно: "/user/" + currentUser.id + "/queue/messages", onMessageReceived
}


  /*private socket: WebSocket;
  public message: Subject<NewsletterDTO> = new Subject<NewsletterDTO>();
  private greeting: NewsletterDTO;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/gs-guide-websocket/');
    this.greeting = new NewsletterDTO();
    this.connect();
  }
  private connect(): void{

    this.socket.onopen = (event: Event) => {   // Событие при успешном открытии соединения    это происходит 101 Switching Protocols
      console.log('Connected: ', event);
      this.socket.send(JSON.stringify({ type: 'SUBSCRIBE', channel: '/topic/greetings'}));
      this.subscribe();
    };


    this.socket.onmessage = (event: MessageEvent) => { //получение данных, автоматически срабатывает, когда приходит ответ с сервера
      console.log("OnMessage: ", event);
      this.setMess(event);              //это не работает
    };

    this.socket.onclose = (event: CloseEvent) => {  //работает кайф
      console.log('Disconnected: ', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

  }
  //
  sendName(nl: NewsletterDTO): void {     // заходит сюда все ок
    if (this.socket.readyState === WebSocket.OPEN) {
      debugger;
      this.socket.send(JSON.stringify({
        destination: '/app/hello',
        headers: {},
        payload: nl
      }));
    } else {
      console.error('Websocket is not connected.');
    }
  }

  //сохранение ответа
  private setMess(event: MessageEvent): any {
    const message = JSON.parse(event.data);
      if (message.channel === '/topic/greetings') {
        this.greeting = message.payload; // Сохранение ответа в поле класса
        console.log('greeting received: ', this.greeting);
      }
    return this.greeting;
  }

  disconnect(): void {
    console.log("Disconnect()");

    if (this.socket.readyState === WebSocket.OPEN){
      this.socket.close();
    }
  }

  onMessageHandler(event: any): void {
    console.log("Получено сообщение: " + event.data);
  }

  public subscribe() {
    const message = { type: 'SUBSCRIBE', destination: '/topic/greetings' };
    this.socket.send(JSON.stringify(message));
  }*/


/*this.socket.onmessage = (event: MessageEvent) => {
        this.handleSubscriptionConfirmation(event.data);
      }

  handleSubscriptionConfirmation(data: any):void {
    const message = JSON.parse(data);
    if (message.type === 'SUBSCRIPTION_CONFIRMATION' && message.topic === '/topic/greetings') {
      console.log("Подписка на топик '/topic/greetings' успешно выполнена.");

      this.socket.onmessage = this.onMessageHandler;
    }
  }
*/
  /*private socket : any;

    public initSocket(): void {
        this.socket = io(SERVER_URL);
    }

    public send(message: NewsletterDTO): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<NewsletterDTO> {
        return new Observable<NewsletterDTO>(observer => {
            this.socket.on('message', (data: NewsletterDTO) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    } <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<РАБОТАЕТ:<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,*/

  /*private socket: WebSocket;

  constructor(){
    this.socket = new WebSocket('ws://localhost:8080/gs-guide-websocket/');

    this.socket.onopen = (event) => {
      console.log('Connected: ', event);
      console.log(this.socket.readyState);
      this.socket.send(JSON.stringify({ action: 'subscribe', topic: '/topic/greetings'}));
    };


    this.socket.onmessage = (event) => {
      const greeting = JSON.parse(event.data); //это и есть ответ от сервера
      debugger;
      console.log("AAAAAAA" + greeting); //здесь дальнейшая работа с данными
    };

    this.socket.onclose = (event) => {
      console.log('Disconnected: ', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
  }

  connect(): void {
    console.log("Connect()");

    if (this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket('ws://localhost:8080/gs-guide-websocket/');
    }
  }

  disconnect(): void {
    console.log("Disconnect()");

    if (this.socket.readyState === WebSocket.OPEN){
      this.socket.close();
    }
  }

  sendName(nl: NewsletterDTO): void {     // заходит сюда
    if (this.socket.readyState === WebSocket.OPEN) {
      debugger;
      this.socket.send(JSON.stringify({
        destination: '/api/mail/app/hello',
        body: JSON.stringify({'id': nl.id, 'date': nl.date, 'mess': nl.mess, 'status': nl.status, 'subject': nl.subject, 'text': nl.text})
      }));
    } else {
      console.error('Websocket is not connected.');
    }
  }

  subscribeTopic(){
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const greeting = JSON.parse(event.data); //это и есть ответ от сервера
      debugger;
      console.log("AAAAAAA" + greeting); //здесь дальнейшая работа с данными
      if (message.channel === '/topic/greetings'){
        console.log('greeting received: ', message.payload);
      }
    };
  }*/
 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 /* private stompClient: StompJs.Client;

  constructor(){
    this.stompClient = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket/',
    });

    this.stompClient.onConnect = (frame) => {
      //this.setConnected(true);
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/greetings', (greeting) => {
        //this.showGreeting(JSON.parse(greeting.body).content);
      });
    };
  }*/

  /*public onConnect(frame: StompJs.Frame): void{
    //this.setConnected(true);
    console.log("Connected: " + frame);
    this.stompClient.subscribe('/topic/greetings', (nl) => {
      //this.showGreeting(JSON.parse(nl.body).content);   //здесь нам возвращается с сервера какое-то nl и мы его должны записать в таблицу
    });
  }*/

  /*connect(): void {
    this.stompClient.activate();
  }

  disconnect(): void {
    this.stompClient.deactivate();
    //this.setConnected(false);
    console.log('Disconnected');
  }

  sendName(nl: NewsletterDTO): void {
    this.stompClient.publish({
      destination: '/api/mail/app/hello',
      body: JSON.stringify({'id': nl.id, 'date': nl.date, 'mess': nl.mess, 'status': nl.status, 'subject': nl.subject, 'text': nl.text}),
    });
  }*/
  /*private connected: boolean = false;

  constructor(){
    this.stompClient = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
      //tranport: 'websocket'
    });

    //this.stompClient.onConnect = this.onConnect.bind(this);
  }

  private onConnect(frame: StompJs.Frame): void{
    //this.setConnected(true);
    console.log("Connected: " + frame);
    this.stompClient.subscribe('/topic/messNl', (nl) => {
      //this.showGreeting(JSON.parse(nl.body).content);   //здесь нам возвращается с сервера какое-то nl и мы его должны записать в таблицу
    });
  }

  public connect(): void{
    this.stompClient.activate();
    this.connected = true;
  }

  public disconnect(): void{
    this.stompClient.deactivate();
    //this.setConnected(false);
    this.connected = true;
    console.log("Disconnected");
  }

  // отправка письма
  public sendName(nl: NewsletterDTO): void{
    if(this.connected){
      this.stompClient.publish({
        destination: '/app/hello',
        body: JSON.stringify({'id': nl.id, 'date': nl.date, 'mess': nl.mess, 'status': nl.status, 'subject': nl.subject, 'text': nl.text})
      });
    }
  }*/



  /*private stompClient: StompJs.Client;

  constructor() {
    this.stompClient = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/newsletter'
    });
    this.stompClient.onConnect = this.connect.dind(this);

  }

  //private stompClient: any;
  connectedFlag: boolean = false;

  setConnected(connected: boolean): void{
  // this.connect = connected;
  }

  private connect(): void{
    const socket = new SockJS('/newsletter');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: StompJs.Frame) => {
      this.setConnected(true);
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/messNl', (greeting: { body: string; }) => {
        //this.showGreeting(JSON.parse(greeting.body).content);
      });
    });
  }

  disconnect(): void {
    if (this.stompClient){
      this.stompClient.disconnect();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  sendNewsletter(): void{
    const id = Number(document.getElementById('id')['value']);

    //this.stompClient.send("/app/newsletter", {}, JSON.stringify({'name': name}));
  }*/
//}
