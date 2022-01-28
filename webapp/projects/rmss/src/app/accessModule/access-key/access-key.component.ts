import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith, filter, tap } from 'rxjs/operators';
import { KeyService } from '../key.service';
import { KeyData, ResponseKeyList } from './key';

@Component({
  selector: 'app-access-key',
  templateUrl: './access-key.component.html',
  styleUrls: ['./access-key.component.css']
})
export class AccessKeyComponent implements OnInit {
  key = new FormControl();
  filteredKeys: KeyData[] = [];
  keyRoute = '';

  constructor(
    private keyService: KeyService,
    private router: Router) { }


  ngOnInit(): void {
    this.key.valueChanges
      .pipe(
        tap(res => {
          this.keyRoute = (isNaN(res)) ? '' : res;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        filter(search => search?.length >= 3),
        switchMap((searchValue: string) => {
          return this.keyService.getList(searchValue)
            .pipe(
              map((item: ResponseKeyList) => item.data)
            );
        })
      )
      .subscribe(res => {
        this.filteredKeys = res;
      });

  }

  edit(key) {
    this.router.navigate(['/key', key.id]);
  }
}
