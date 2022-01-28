import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect-to-login',
  templateUrl: './redirect-to-login.component.html',
  styleUrls: ['./redirect-to-login.component.css']
})
export class RedirectToLoginComponent implements OnInit {

  constructor() { 
    // window.location.href = '/';
  }

  ngOnInit(): void {
  }

}
