
export class OfferStatus {
    value: number;
    viewValue: string;
}

export class RequestSiteOffer {
    name: string;
    status: number;
    site_id: number;
    client_id: number;
    number_of_buildings: number;
    number_of_receptions: number;
    items: OfferItems = new OfferItems();
}

export class OfferItems {
    ut: OfferUnitType[] = [];
    additional: OfferAdditionalEqpt[] = [];
}

export class OfferUnitType {
    utd_id: number;
    utd_name: string;
    quantity: number;
}
export class OfferAdditionalEqpt {
    equipment_id: number;
    model: string;
    description: string;
    quantity: number;
}

export class ResponseSiteOffers {
    data: SiteOffer[];
}

export class ResponseSiteOffer {
    data: SiteOffer = new SiteOffer();
}

export class SiteOffer {
    id: number;
    name: string;
    status: number;
    site_id: number;
    site_code: number;
    site_name: number;
    client_id: number;
    client_code: number;
    client_name: number;
    created_at: number
    number_of_buildings: number;
    number_of_receptions: number;
    items: OfferItems;
    disabled: boolean;
    file_id: number;
    file_name: string;
}

export class OfferMail {
    email: string;
    subject: string;
    message: string;
}
