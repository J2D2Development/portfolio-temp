import { Injectable } from '@angular/core';

//options are optional, but if provided, this will help guide types and choices
export interface NotificationOptions {
    message?: string;
    timer?: number;
    type?: string;
    closeable?: boolean;
}

@Injectable()
export class NotificationService {
    notfications: any[];
    isNotificationHidden: boolean = true;
    manualDismiss: boolean = false;
    timeToClose: any = 3000;
    timerHandle: any;
    message: string;
    bgType: string;
    iconType: string;

    constructor() { }

    showNotification(options?: NotificationOptions) {
        if(!this.isNotificationHidden) {
            return;
        }

        if(options && (options.timer || options.timer === 0)) {
            //special case for timer = 0 (a simple check will always return false)
            this.timeToClose = options.timer;
        } else {
            this.timeToClose = 3000;
        }

        this.message = (options && options.message) || 'System Notification';
        const type = (options && options.type) || 'default';
        this.manualDismiss = (options && options.closeable) || false;

        switch (type) {
            case 'success':
                this.bgType = 'bg-success';
                this.iconType = 'fa-thumbs-o-up';
                break;
            case 'error':
                this.bgType = 'bg-danger';
                this.iconType = 'fa-asterisk';
                break;
            case 'warning':
                this.bgType = 'bg-warning';
                this.iconType = 'fa-exclamation-triangle';
                break;
            case 'default':
            default:
                this.bgType = 'bg-primary';
                this.iconType = 'fa-exclamation-triangle';
                break;
        }

        this.isNotificationHidden = false;

        //if timer is passed in config and set to 0, we don't want to hide it after a timeout (user has to click to dismiss
        if (this.timeToClose > 0) {
            this.setTimers();
        } else {
            this.manualDismiss = true;
        }
    }

    hideNotification() {
        if(this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = null;
        }
        this.isNotificationHidden = true;
        this.resetNotificationInfo;
    }

    resetNotificationInfo() {
        this.message = '';
        this.bgType = '';
        this.iconType = '';
        this.manualDismiss = false;
        this.timeToClose = 3000;
    }

    setTimers() {
        //remove css effect takes 500ms - make sure that completes before removing content from notice.
        //let timePadding = this.timeToClose + 600;
        this.timerHandle = setTimeout(() => {
            this.isNotificationHidden = true;
            setTimeout(() => {
                this.resetNotificationInfo();
            }, 600);
        }, this.timeToClose);
    }
}
