import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rute212',
  templateUrl: './rute212.page.html',
  styleUrls: ['./rute212.page.scss'],
})
export class Rute212Page implements OnInit {

  ComponentRoute212: ComponentRoute[] = [
    {
      answer: 'To collect food',
      redirecTo: '/geolocation213'
    },
    {
      answer: 'To give new guidelines',
      redirecTo: '/geolocation213'
    },
    {
      answer: 'To repair "la Pinta"', // correcta
      redirecTo: '/geolocation213'
    },
    {
      answer: 'To request accommodation',
      redirecTo: '/geolocation213'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

interface ComponentRoute {
  answer: string;
  redirecTo: string;
}
