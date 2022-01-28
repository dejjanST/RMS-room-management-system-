import { ResponseMailerSettings } from './mailer-settings.model';

export const mailerSettingsMock: ResponseMailerSettings = {
    data: {
        email: 'admin@ved.mk',
        user_name: 'admin',
        password: '12345',
        port: 123,
        protocol: 'ssl_tls',
        host_name: 'ved.mk',
        email_to: 'qwert@asdf.com'
    }
};
