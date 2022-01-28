import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { KeyData, ResponseKeyList } from '../access-key/key';
import { KeyService } from '../key.service';

@Component({
  selector: 'app-key-list',
  templateUrl: './key-list.component.html',
  styleUrls: ['./key-list.component.css']
})

export class KeyListComponent implements OnInit {

  // keys: ResponseKeyList = new ResponseKeyList();
  keys: KeyData[] = [];
  searchKey: string;
  types = [{ key: 1, value: 'Front Desk' }, { key: 2, value: 'Cleaning Staff' }, { key: 3, value: 'Maintenance' }, { key: 4, value: 'Security' }, { key: 5, value: 'Management' }];
  keyNumber = new FormControl('');

  constructor(
    private keyService: KeyService,
  ) { }


  ngOnInit(): void {
    // this.keyService.getList().subscribe(
    //   res => {
    //     this.keys = res.data;
    //   }
    // );

    this.keyNumber.valueChanges
      .pipe(
        debounceTime(333),
        distinctUntilChanged(),
        startWith('')
      )
      .subscribe(res => {
        this.searchKey = res;
        this.keyService.getList(this.searchKey).subscribe(response => {
          this.keys = response.data;
        });
      });
  }

  getType(key: number): string {
    if (this.types.find(item => item.key === key)) {
      return this.types.find(item => item.key === key).value;
    }
  }
}

