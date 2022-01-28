
export class RequestNote {
    offer_id: number;
    note: string;
}

export class ResponseNotes {
    data: Note[];
}

export class Note {
    id: number;
    created_at: number;
    created_by_user: string;
    note: string;
    offer_id: number;
    offer_name: string;
    site_id: number;
    site_code: number;
    site_name: string;
    client_id: string;
    client_code: number;
    client_name: string;
}
