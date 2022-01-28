import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestSiteOffer, ResponseSiteOffers, ResponseSiteOffer, OfferMail } from './site-offer.model';
import { OFFERS, API, STATUS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SiteOfferService {

  constructor(private http: HttpClient) { }

  getOffersBySite(siteId: number): Observable<ResponseSiteOffers> {
    const params = new HttpParams()
      .set('site_id', siteId.toString());

    return this.http.get<ResponseSiteOffers>(`${API}${OFFERS}/`, { params });
  }

  createSiteOffer(siteOffer: RequestSiteOffer): Observable<any> {
    return this.http.post(`${API}${OFFERS}/`, siteOffer);
  }

  getSiteOffer(id: number): Observable<ResponseSiteOffer> {
    return this.http.get<ResponseSiteOffer>(`${API}${OFFERS}/` + id);
  }

  editSiteOffer(siteOffer: RequestSiteOffer, id: number): Observable<any> {
    return this.http.put(`${API}${OFFERS}/` + id, siteOffer);
  }

  deleteSiteOffer(id: number): Observable<any> {
    return this.http.delete(`${API}${OFFERS}/` + id);
  }

  updateOfferStatus(offerId: number, status: number): Observable<any> {
    return this.http.put(`${API}${OFFERS}${STATUS}/` + offerId, { status });
  }

  sendMail(offerId: number, offerMail: OfferMail): Observable<any> {
    return this.http.post(`${API}${OFFERS}/${offerId}/send_mail/`, offerMail);
  }

}
