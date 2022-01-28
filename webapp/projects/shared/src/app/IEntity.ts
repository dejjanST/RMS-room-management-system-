import { Observable } from 'rxjs';

export interface IEntity {
  updated$: Observable<any>;

  getList(queryString?: any): any;
  get(id: number): any;
  update(item: any, id: number): any;
  create(item: any): any;
  delete(id: number): any;
  search(): any;
}
