import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UuidInterceptorService } from '../../interceptors/uuid/uuid-interceptor.service';
import { RequestLoaderInterceptorService } from '../../interceptors/Loader/request-loader-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UuidInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestLoaderInterceptorService,
      multi: true,
    }
  ],
})
export class LoaderModule { }
