export class VerificationReport {
    data: Array<VerificatinReportData> = [];
}


export class VerificatinReportData {
    id?: number;
    floor: number;
    unit_name: string;
    equipment: string;
    status: number;
    note: string;
}
