import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { RequestLoaderService } from '../../../interceptors/Loader/request-loader.service';
import { VedMetaLoader } from '../../../interceptors/Loader/ved-meta-loader';


@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading = false;


  constructor(private requestLoader: RequestLoaderService) { }

  ngOnInit() {
    this.requestLoader.loaderSubject$
    .pipe(
        // tap(console.log),
        map(items => {
          return items.filter((item: VedMetaLoader) => {
            return item.params.exclude === false;
          });
        })
      )
      .subscribe(activeRequestsArray => {
        if (activeRequestsArray.length > 0) {
          this.loading = true;
        } else {
          this.loading = false;
        }
      });
    }

}
