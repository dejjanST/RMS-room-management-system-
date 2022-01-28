export class ResponseMailerSettings {
    data: MailerSettingsData = new MailerSettingsData();
}

export class MailerSettingsData {
    email: string;
    host_name: string;
    port: number;
    protocol: string;
    user_name: string;
    password: string;
    email_to: string;
}
