import { TestBed } from '@angular/core/testing';
import { SiteOfferService } from './site-offer.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestSiteOffer, OfferMail } from './site-offer.model';

describe('SiteOfferService', () => {
  let service: SiteOfferService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SiteOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test getOffersBySite()', () => {
    service.getOffersBySite(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.length).toEqual(2);
    });

    const req = http.expectOne('/api/offers/?site_id=1');
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: [
        {
          id: 2, name: 'Ponuda 1', status: 1, file_id: null, site_id: 1, client_id: 1, site_name: 'Hilton Skopje', client_name: 'Hilton',
          client_code: 11, site_code: 11, created_at: 1594985304, number_of_buildings: 1, number_of_receptions: 2, items: {}
        },
        {
          id: 3, name: 'Ponuda 2', status: 1, file_id: null, site_id: 1, client_id: 1, site_name: 'Hilton Skopje', client_name: 'Hilton',
          client_code: 11, site_code: 11, created_at: 1594985304, number_of_buildings: 4, number_of_receptions: 4, items: {}
        }]
    });
  });


  it('test createSiteOffer()', () => {
    const reqSiteOffer = new RequestSiteOffer();
    reqSiteOffer.name = 'Test';
    reqSiteOffer.client_id = 1;
    reqSiteOffer.number_of_buildings = 2;
    reqSiteOffer.number_of_receptions = 4;
    reqSiteOffer.site_id = 2;
    reqSiteOffer.status = 1;

    service.createSiteOffer(reqSiteOffer).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.id).toEqual(4);
    });

    const req = http.expectOne('/api/offers/');
    expect(req.request.method).toEqual('POST');
    req.flush({ msg: 'The offer has been created successfully', data: { id: 4 } });
  });

  it('test getSiteOffer()', () => {
    service.getSiteOffer(2).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.name).toEqual('Ponuda 1');
    });

    const req = http.expectOne('/api/offers/2');
    expect(req.request.method).toEqual('GET');
    req.flush({
      data:
      {
        id: 2, name: 'Ponuda 1', status: 1, file_id: null, site_id: 1, client_id: 1, site_name: 'Hilton Skopje', client_name: 'Hilton',
        client_code: 11, site_code: 11, created_at: 1594985304, number_of_buildings: 1, number_of_receptions: 2,
        items:
        {
          ut: [{ utd_id: 1, utd_name: 'Ednosoben apartman', quantity: 2 }, { utd_id: 2, utd_name: 'Dvosoben apartman', quantity: 2 }],
          additional: [{ equipment_id: 76, model: 'WS - AI', description: 'Windows Additional Item', quantity: 20 }]
        }
      }
    });
  });


  it('test editSiteOffer()', () => {
    const reqSiteOffer = new RequestSiteOffer();
    reqSiteOffer.name = 'Test 1';
    reqSiteOffer.client_id = 2;
    reqSiteOffer.number_of_buildings = 3;
    reqSiteOffer.number_of_receptions = 5;
    reqSiteOffer.site_id = 3;
    reqSiteOffer.status = 2;
    service.editSiteOffer(reqSiteOffer, 100).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.id).toEqual(100);
    });

    const req = http.expectOne('/api/offers/100');
    expect(req.request.method).toEqual('PUT');
    req.flush({ msg: 'The offer has been updated successfully', data: { id: 100 } });
  });


  it('test deleteSiteOffer()', () => {
    service.deleteSiteOffer(15).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne('/api/offers/15');
    expect(req.request.method).toEqual('DELETE');
    req.flush({ msg: 'The offer has been deleted successfully' });
  });


  it('test updateOfferStatus()', () => {
    service.updateOfferStatus(4, 3).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.id).toEqual(4);
    });

    const req = http.expectOne('/api/offers/status/4');
    expect(req.request.method).toEqual('PUT');
    req.flush({ msg: 'The offer has been accepted successfully', data: { id: 4 } });
  });

  it('test sendMail()', () => {
    const offerMail = new OfferMail();
    offerMail.email = 'test@ved.mk';
    offerMail.subject = 'Offer 3';
    offerMail.message = 'Offer is attached in mail';
    service.sendMail(3, offerMail).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne('/api/offers/3/send_mail/');
    expect(req.request.method).toEqual('POST');
    req.flush({ msg: 'The offer has been sent successfully', data: { id: 3 } });
  });

});
