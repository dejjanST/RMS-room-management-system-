import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageModel } from '../models/language-model';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {


	private subject: BehaviorSubject<LanguageModel> = new BehaviorSubject(new LanguageModel('en'));
	language$ = this.subject.asObservable();

	constructor() { }

	changeLanguage(input: LanguageModel) {
		this.subject.next(input);
	}
}
