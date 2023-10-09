import {registerAs} from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';

const DefaultMailOptions = {
  SMTP_PORT: 25,
  SMTP_HOST: 'localhost',
  USER_NAME: 'mail user',
  USER_PASSWORD: '1',
  FROM: 'Fit-friends-notify@fake.ru'
};

export interface MailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

export default registerAs('mail', (): MailConfig => {
  const config: MailConfig = {
    host: process.env.MAIL_SMTP_HOST || DefaultMailOptions.SMTP_HOST,
    port: parseInt(process.env.MAIL_SMTP_PORT || DefaultMailOptions.SMTP_PORT.toString(), 10),
    user: process.env.MAIL_USER_NAME || DefaultMailOptions.USER_NAME,
    password: process.env.MAIL_USER_PASSWORD || DefaultMailOptions.USER_PASSWORD,
    from: process.env.MAIL_FROM || DefaultMailOptions.FROM,
  };

  const validationSchema = Joi.object<MailConfig>({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DefaultMailOptions.SMTP_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
