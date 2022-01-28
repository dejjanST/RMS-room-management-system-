import { Observable, BehaviorSubject } from 'rxjs';

export class AHierarchy {
  protected id: number;
  protected dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  protected service: any;
  protected parentService: any;
  protected parentField: string;
  data$: Observable<any>;


  init() {
    this.service.updated$.subscribe(() => {
      this.load();
    });
  }

  set(id: number) {
    if (this.id !== id) {
      this.id = id;
      this.load();
    }
    this.parent();
  }
  protected load() {
    this.service.get(this.id).subscribe(res => {
      this.dataSubject.next(res.data);
    });
  }
  protected parent() {
    if (this.parentService) {
      this.data$.subscribe(entity => {
        if (Object.keys(entity).length) {
          this.parentService.set(entity[this.parentField]);
        }
      });
    }
  }
}
