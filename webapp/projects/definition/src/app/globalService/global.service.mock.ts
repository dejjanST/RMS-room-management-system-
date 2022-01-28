import { of } from 'rxjs';

export class GlobalServiceMock {
    client = {
        set() { },
        data: of()
    };
    site = {
        set() { },
        data$: of({
            id: 1,
            name: 'Hilton Skopje',
            site_id: 1100,
            client_id: 1,
            client_name: 'Mario Maksimovic',
            client_code: 11,
            country: null, address: null, city: null,
            progress: {
                definition: { total: 10, created: 10 },
                commissioning: { total: 10, created: 0 }
            },
            serial_no: '66b50f7f-bf22-4bc4-9fdf-5d4c4f44d952'
        })
    };
    building = {
        set() { },
        data$: of()
    };
    floor = {
        set() { },
        data$: of()
    };
    unit = {
        set() { },
        data$: of()
    };
}
