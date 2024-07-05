import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as StompJs from '@stomp/stompjs';
import { NewsletterDTO } from '../dto/NewsletterDTO';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {

  private socket: WebSocket;

  constructor(){
    this.socket = new WebSocket('ws://localhost:8080/gs-guide-websocket/websocket');

    this.socket.onopen = (event) => {
      console.log('Connected: ', event);
    };

    this.socket.onmessage = (event) => {
      const greeting = JSON.parse(event.data); //здесь дальнейшая работа с данными
    };

    this.socket.onclose = (event) => {
      console.log('Disconnected: ', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
  }

  connect(): void {
    if (this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket('ws://localhost:8080/gs-guide-websocket/websocket');
    }
  }

  disconnect(): void {
    if (this.socket.readyState === WebSocket.OPEN){
      this.socket.close();
    }
  }

  sendName(nl: NewsletterDTO): void {
    if (this.socket.readyState === WebSocket.OPEN) {
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
      if (message.channel === '/topic/greetings'){
        console.log('greeting received: ', message.payload);
      }
    };
  }
  /*private stompClient: StompJs.Client;

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
}
