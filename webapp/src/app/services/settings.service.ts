import { Injectable } from '@angular/core';
import { UserSettingsService } from './user-settings.service';
import { Observable, forkJoin } from 'rxjs';
import { GlobalSettingsService } from './global-settings.service';
import { map, share, tap } from 'rxjs/operators';
import { CombinedSettings } from '../models/settings-models';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	combined$: Observable<CombinedSettings>;

	constructor(private userSettingsService: UserSettingsService, private globalSettingsService: GlobalSettingsService) {
		this.initVariables();
	}

	initVariables() {
		this.combined$ = forkJoin({ userSettings: this.userSettingsService.get(), globalSettings: this.globalSettingsService.get() })
			.pipe(
				map(item => {
					return new CombinedSettings(item.userSettings, item.globalSettings)
				}),
				share()
			);
	}
}