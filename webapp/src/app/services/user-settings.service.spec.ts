import { TestBed, getTestBed } from '@angular/core/testing';
import { UserSettingsService } from './user-settings.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResponseUserModel, ResponseUserSettingsModel } from '../models/settings-models';


describe('UserSettingsService', () => {
	let injector: TestBed;
	let service: UserSettingsService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [UserSettingsService]
		});
		injector = getTestBed();
		service = injector.get(UserSettingsService);
		httpMock = injector.get(HttpTestingController)
	}

	);
	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	const dummyResponse = { "limits": { "4": -1, "0": -1, "6": 600, "3": -1, "1": 100, "2": -1, "5": 30 }, "last_name": "Demo", "deleted": false, "username": "demo", "is_active": true, "settings": { "LANGUAGE": "MK", "alarm_notif": { "185": { "4": 0, "0": 0, "3": 0, "1": 0, "2": 0, "5": 0 } }, "DEVICE_GROUP": [{ "name": "Klaus was here", "id": 22 }, { "name": "10.10.10.144", "id": 130 }, { "name": "Marc Test", "id": 146 }, { "name": "OJE JT Test 5", "id": 148 }, { "name": "KHE basement device", "id": 149 }, { "name": "Storage area", "id": 159 }, { "name": "Administration building", "id": 161 }, { "name": "Production area Old", "id": 163 }, { "name": "Narnia 5/5", "id": 171 }, { "name": "Narnia 4/5", "id": 172 }, { "name": "Narnia 2/5", "id": 173 }, { "name": "Narnia 1/5", "id": 174 }, { "name": "Production area", "id": 181 }, { "name": "Air 1", "id": 182 }, { "name": "OJE JT Test", "id": 185 }, { "name": "New Folder", "id": 1541503693260, "nodes": [{ "name": "AHC-3000 00038 KHE", "id": 775 }, { "name": "Vorteks", "id": 186 }] }, { "name": "New Folder 1", "id": 1541503746324, "nodes": [{ "name": "AHC-3000 00058 JBA", "id": 774 }] }, { "name": "New Folder 2", "id": 1541503747860, "nodes": [{ "name": "Administration building", "id": 184 }] }, { "name": "New Folder 3", "id": 1541503748423, "nodes": [{ "name": "Storrage area 1", "id": 183 }] }, { "name": "New Folder 4", "id": 1541503748914, "nodes": [] }, { "name": "New Folder 5", "id": 1541503749381, "nodes": [{ "name": "Narnia 3/5", "id": 175 }] }, { "name": "New Folder 6", "id": 1541503749800, "nodes": [] }, { "name": "New Folder 7", "id": 1541503753139, "nodes": [] }, { "name": "New Folder 8", "id": 1541503805286, "nodes": [] }, { "name": "New Folder 9", "id": 1541503838139, "nodes": [] }, { "name": "Aerodrom AHU 1", "id": 66 }, { "name": "Marc Scorpje", "id": 151 }, { "name": "Vorteks test", "pending": true, "id": 154 }, { "name": "Mark Climatic Technology Demo1", "id": 176 }, { "name": "Lucam OJ Air2 demo", "id": 177 }, { "name": "MS test Narnia 172.20.22.142", "id": 764 }, { "name": "Testagg. 117.", "id": 765 }, { "name": "21.183 Testkuffert", "id": 767 }, { "name": "-", "id": 768 }, { "name": "-", "id": 771 }, { "name": "Mark 001", "id": 785 }, { "name": "Mark 002", "id": 786 }, { "name": "Mark 004", "id": 788 }, { "name": "Mark 005", "id": 789 }, { "name": "Mark 006", "id": 790 }, { "name": "Mark 007", "id": 791 }, { "name": "Mark 009", "id": 792 }, { "name": "Mark 008", "id": 793 }, { "name": "Mark 010", "id": 794 }, { "name": "Mark 012", "id": 795 }, { "name": "Mark 013", "id": 796 }, { "name": "Mark 011", "id": 797 }, { "name": "Demo device", "id": 798 }], "MAP": { "center": [9.789869167541964, 54.91871809970627], "zoom": 19 }, "MARKER": [1, 2], "USER_TYPE": 1 }, "id": 7, "email": "tose.mitev@vorteksed.com.mk", "roles": [{ "name": "OJE Administrator", "id": 1, "actions": ["get_latest_stats", "update_user_profile", "get_user_profile", "update_user", "delete_user", "get_user", "list_users", "create_user", "update_role", "delete_role", "get_role", "list_roles", "create_role", "add_role_actions", "list_role_actions", "update_password", "activate_user", "list_devices_branches", "update_heating_branches", "list_streets", "update_device", "get_device", "list_devices", "activate_device", "list_device_constants", "list_stats", "get_summary_card", "list_live_stats", "list_log_constants", "list_logs", "generate_stats_report", "update_stats_saved_search", "get_stats_saved_search", "delete_stats_saved_search", "create_stats_saved_search", "list_stats_saved_search", "get_arm_state", "get_plc_event", "list_arm_states", "list_plc_events", "generate_plc_events_report", "get_analytic_arm", "get_app_setting", "list_app_settings", "generate_c2c_hash", "delete_user_device", "invite_user", "list_device_user", "register_device", "update_user_device", "update_app_setting", "list_count_arm_states", "write_data", "get_state", "create_log", "get_dash_stats", "create_tag", "delete_tag", "list_tags", "update_tag", "get_alarm_notifications", "update_alarm_notification", "create_event", "delete_event", "update_event", "delete_heating_schedule", "update_heating_schedule", "invite_distributor_user", "get_config_snapshot", "list_reduced_analytic_arms", "list_markers", "download_file", "upload_file", "list_users_devices", "update_mac_address", "create_app_setting", "generate_logs_report"] }], "first_name": "Demo" };


	it('get() should return ResponseUserModel', () => {

		service.get().subscribe(res => {
			expect(res instanceof ResponseUserModel).toBeTruthy();
			expect(res.settings instanceof ResponseUserSettingsModel).toBeTruthy();
			expect(dummyResponse.settings.MAP).toEqual(res.settings.map);


		});
		let req = httpMock.expectOne('/api/sessions/api/session/0/');
		expect(req.request.method).toBe('GET');
		req.flush(dummyResponse);

	})
});
