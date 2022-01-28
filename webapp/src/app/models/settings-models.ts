export class CombinedSettings {
	userSettings: ResponseUserModel;
	globalSettings: ResponseGlobalModel;

	constructor(userSettings: ResponseUserModel, globalSettings: ResponseGlobalModel) {
		this.userSettings = userSettings;
		this.globalSettings = globalSettings;

	}
}

export class ResponseUserModel {
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	username: string;
	settings: ResponseUserSettingsModel;
	id: number;
	constructor(userSettings = null) {
		this.firstName = (userSettings) ? userSettings.first_name : null;
		this.lastName = (userSettings) ? userSettings.last_name : null;
		this.email = (userSettings) ? userSettings.email : null;
		let settings = (userSettings) ? userSettings.settings : null;
		this.settings = new ResponseUserSettingsModel(settings);
	}

}
export class ResponseUserSettingsModel {
	deviceGroup: any;
	userType: any;
	marker: any;
	map: any;
	language: any;
	alarmNotif: any;
	constructor(settings) {

		this.deviceGroup = (settings) ? settings.DEVICE_GROUP : null;
		this.userType = (settings) ? settings.USER_TYPE : null;
		this.map = (settings) ? settings.MAP : null;
	}
}

export class ResponseGlobalModel {

	map: ResponseGlobalMapSettingsModel;
	markerSettings: Array<ResponseGlobalMarkerSettingsModel> = [];

	constructor(globalSettings = null) {
		globalSettings = (globalSettings) ? globalSettings : null;
		if (globalSettings) {
			globalSettings.items.filter(element => {
				switch (element.key) {
					case ('MAP'):
						this.setMap(element.option);
						break;

					case ('marker_settings'):
						element.option.forEach(item => {
							this.setMarker(item);
						});

						break;

				}

			});
		}
	}
	setMap(option: any) {

		this.map = new ResponseGlobalMapSettingsModel;
		this.map.extent = option.extent;
		this.map.center = option.center;
		this.map.minZoom = option.min_zoom;
		this.map.maxZoom = option.max_zoom;
	}
	setMarker(option: any) {

		let tmpModel = new ResponseGlobalMarkerSettingsModel;

		tmpModel.img = option.img;
		tmpModel.devType = option.dev_type;
		tmpModel.color0 = option.color0;
		tmpModel.size = option.size;
		tmpModel.var = option.var;
		tmpModel.color3 = option.color3;
		tmpModel.color2 = option.color2;

		this.markerSettings.push(tmpModel);

	}
}

export class ResponseGlobalMapSettingsModel {
	extent: boolean;
	center: Array<number>;
	minZoom: number;
	maxZoom: number;
	zoom: number;

}

export class ResponseGlobalMarkerSettingsModel {
	img: string;
	devType: number;
	color0: string;
	size: number;
	var: number;
	color3: string;
	color2: string;
}