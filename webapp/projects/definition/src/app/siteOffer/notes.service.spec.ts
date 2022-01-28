import { TestBed } from '@angular/core/testing';
import { NotesService } from './notes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestNote } from './notes.model';

describe('NotesService', () => {
  let service: NotesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NotesService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing createNote() method', () => {
    const note = new RequestNote();
    note.offer_id = 1;
    note.note = 'test';

    service.createNote(note).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne('/api/notes/');
    expect(req.request.method).toEqual('POST');
    req.flush({ msg: 'The note has been created successfully', data: { id: 3 } });
  });


  it('testing getNotesForOffer() method', () => {

    service.getNotesForOffer(5).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.length).toEqual(3);
    });

    const req = http.expectOne('/api/notes/?offer_id=5');
    expect(req.request.method).toEqual('GET');
    req.flush({
      data: [
        {
          id: 40, created_at: 1594638025, created_by_user: 'Admin Admin', note: 'The offer has been created',
          offer_id: 14, offer_name: 'Test', site_id: 1, site_code: '0', site_name: 'kumanovo', client_id: 1, client_code: '1', client_name: 'boirs'
        },
        {
          id: 41, created_at: 1594646915, created_by_user: 'Admin Admin', note: 'dddd',
          offer_id: 14, offer_name: 'Test', site_id: 1, site_code: '0', site_name: 'kumanovo', client_id: 1, client_code: '1', client_name: 'boirs'
        },
        {
          id: 42, created_at: 1594646919, created_by_user: 'Admin Admin', note: 'dfsfds',
          offer_id: 14, offer_name: 'Test', site_id: 1, site_code: '0', site_name: 'kumanovo', client_id: 1, client_code: '1', client_name: 'boirs'
        }
      ]
    });
  });

});
