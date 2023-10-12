import { Injectable } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {EmailNotificationModel} from '@project/notify.model';
import {EmailSubject} from '@project/shared-constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  public async send(notifications: EmailNotificationModel[]) {
    function getMailOptions(notification: EmailNotificationModel) {
      return {
        to: notification.email,
        subject: EmailSubject.EmailNewTraining,
        template: './new-training',
        context: {
          user: `${notification.subscriberName}`,
          date: `${notification.createDate}`,
          author: `${notification.coachName}`,
          training: `${notification.trainingName}`,
          url: `${notification.url}`
        }
      };
    }

    await Promise.all(notifications.map((notification) => {
      console.log(notification);
      this.mailerService.sendMail(getMailOptions(notification))}
    ))
  }
}
