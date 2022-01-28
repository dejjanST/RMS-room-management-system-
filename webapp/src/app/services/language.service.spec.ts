import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { LanguageModel } from '../models/language-model';

describe('LanguageService', () => {
	let service: LanguageService;

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.get(LanguageService);
	});

	it('should be created', () => {

		expect(service).toBeTruthy();

	});

	it('default language should be en', () => {


		service.language$.subscribe(lang => {
			expect(lang.current).toEqual('en');

		})
	});
	it('should change language', () => {

		let language = new LanguageModel('srb');
		service.changeLanguage(language);

		service.language$.subscribe(lang => {
			expect(lang.current).toEqual(language.current);
		})
	})


});
