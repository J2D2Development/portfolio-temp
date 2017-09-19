declare const describe: any;
declare const expect: any;
declare const it: any;
declare const beforeEach: any;

import { NotificationService } from './notification.service';

describe('Basic Notification Service Config Tests', () => {
    beforeEach(() => {
        this.notificationService = new NotificationService();
    });

    it('isNotificationHidden should be true on init', () => {
        expect(this.notificationService.isNotificationHidden).toEqual(true);
    })

    it('Should set the manualDismiss var to false on init', () => {
        expect(this.notificationService.manualDismiss).toEqual(false);
    });
});

describe('Default Notification Display Tests', () => {
    beforeEach(() => {
        this.notificationService = new NotificationService();
        this.notificationService.showNotification();
    });

    it('Should show notification with default message if no config object passed', () => {
        expect(this.notificationService.isNotificationHidden).toEqual(false);
        expect(this.notificationService.message).toEqual('System Notification');
    });

    it('Should use default close timer if no config object passed', () => {
        expect(this.notificationService.timeToClose).toEqual(5000);
    });

    it('Should automatically close if no config object passed', () => {
        expect(this.notificationService.manualDismiss).toEqual(false);
    });

    it('Should show default background color and icon if no config option passed', () => {
        expect(this.notificationService.bgType).toEqual('bg-primary');
        expect(this.notificationService.iconType).toEqual('fa-exclamation-triangle');
    });

    it('Should automatically close after default close timer expires if no config option passed', (done) => {
        setTimeout(() => {
            expect(this.notificationService.isNotificationHidden).toEqual(true);
            done();
        }, this.notificationService.timeToClose);
    });
});

describe('Custom Notification Display Tests', () => {
    beforeEach(() => {
        this.notificationService = new NotificationService();
        this.notificationService.showNotification({ timer: 1000, message: 'Custom Msg', type: 'error'});
    });

    it('Should display notification with custom message when passed', () => {
        expect(this.notificationService.isNotificationHidden).toEqual(false);
        expect(this.notificationService.message).toEqual('Custom Msg');
    });

    it('Should use custom background color and icon when passed', () => {
        expect(this.notificationService.bgType).toEqual('bg-danger');
        expect(this.notificationService.iconType).toEqual('fa-exclamation-triangle');
    });

    it('Should automatically close after custom timer expires', (done) => {
        setTimeout(() => {
            expect(this.notificationService.isNotificationHidden).toEqual(true);
            done();
        }, 1000);
    });
});