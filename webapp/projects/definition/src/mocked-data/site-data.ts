import { ResponseSiteList, Site } from '../app/site/site';

export const siteListMock: ResponseSiteList = {
    data: [
        {
            id: 1, name: 'Hilton', site_id: 1100, client_id: 1, client_name: 'Name1 Surname1',
            client_code: 11, country: 'Macedonia', address: 'Bulevar ASNOM 17, Skopje 1000', city: 'Kumanovo',
            progress: { definition: { total: 30, created: 4 }, commissioning: { total: 12, created: 0 } }, link: null
        },
        {
            id: 2, name: 'Merriott', site_id: 1101, client_id: 1, client_name: 'Name1 Surname1',
            client_code: 11, country: 'Macedonia', address: 'Bulevar ASNOM 17, Skopje 1000', city: 'Kumanovo',
            progress: { definition: { total: 40, created: 4 }, commissioning: { total: 22, created: 0 } }, link: null
        }, {
            id: 3, name: 'Harmony', site_id: 1102, client_id: 1, client_name: 'Name1 Surname1',
            client_code: 11, country: 'Macedonia', address: 'Bulevar ASNOM 17, Skopje 1000', city: 'Kumanovo',
            progress: { definition: { total: 50, created: 4 }, commissioning: { total: 33, created: 0 } }, link: null
        }, {
            id: 4, name: 'Satelit', site_id: 1103, client_id: 1, client_name: 'Name1 Surname1',
            client_code: 11, country: 'Macedonia', address: 'Bulevar ASNOM 17, Skopje 1000', city: 'Kumanovo',
            progress: { definition: { total: 60, created: 4 }, commissioning: { total: 44, created: 0 } }, link: null
        }, {
            id: 5, name: 'Aleksandar Palace', site_id: 1104, client_id: 1, client_name: 'Name1 Surname1',
            client_code: 11, country: 'Macedonia', address: 'Bulevar ASNOM 17, Skopje 1000', city: 'Kumanovo',
            progress: { definition: { total: 70, created: 4 }, commissioning: { total: 55, created: 0 } }, link: null
        },
    ]
};

export const siteMock1: Site = {
    data: {
        id: 1, name: 'Hilton Skopje', site_id: 1100, client_id: 1, client_name: 'Name1 Surname1',
        client_code: 11, country: 'Macedonia', address: 'ul.132 br.123', city: 'Skopje',
        progress: {
            definition: { total: 30, created: 4 },
            commissioning: { total: 4, created: 0 }
        },
        serial_no: 'f6ac11f8-9dbd-4e40-8bf0-03e0471ff358',
        link: null
    }
};

export const siteMock2: Site = {
    data: {
        id: 1, name: 'Merriott Skopje', site_id: 1101, client_id: 1, client_name: 'Name2 Surname2',
        client_code: 11, country: 'Macedonia', address: 'ul.222 br.22', city: 'Skopje',
        progress: {
            definition: { total: 30, created: 4 },
            commissioning: { total: 4, created: 0 }
        },
        serial_no: 'b355c9f1-3d37-434d-a050-2788c7ffe7d7',
        link: null
    }
};

export const sitesInfoMock = {
    data: [
        {
            site_id: 1, status: 1, site_mode: 1, last_push: 1600255554,
            progress: {
                definition: { total: 30, created: 4 },
                commissioning: { total: 4, created: 0 }
            }
        },
        {
            site_id: 2, status: 0, site_mode: 1, last_push: 1600260426,
            progress: {
                definition: { total: 0, created: 0 },
                commissioning: { total: 0, created: 0 }
            }
        }]
};
