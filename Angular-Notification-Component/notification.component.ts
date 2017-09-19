import {Component, OnInit} from '@angular/core';

import {NotificationService} from './notification.service';

@Component({
    selector: 'notification-component',
    template: `
            <div class="notification-wrapper {{notificationService.bgType}}"
                [ngClass]="{'pushdown': notificationService.isNotificationHidden}" 
                (click)="notificationService.hideNotification()"
            >
                <div>{{notificationService.message}}</div>
                <i style="margin: 0 6px 0 6px;" class="notification-icon fa {{notificationService.iconType}}"></i>
            </div>
    `,
    styles: [`
        .notification-wrapper {
            opacity: 1;
            position: fixed;
            box-sizing: border-box;
            bottom: 15px;
            right: 15px;
            min-width: 250px;
            max-width: 50%;
            border-radius: 5px;
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 12px;
            font-size: 1em;
            -webkit-backface-visibility: hidden;
            transform: translateY(0);
            transition: transform 0.5s ease;
            z-index: 9999;
            cursor: pointer;
        }
        .pushdown {
            transform: translateY(200%);
        }
    `]
})
export class NotificationComponent implements OnInit {
    showNotice;

    constructor(
        public notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.showNotice = this.notificationService.showNotification;
        this.notificationService.manualDismiss = false;
        this.notificationService.timeToClose = 3000;
    }
}
