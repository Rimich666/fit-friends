import {registerAs} from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';
import {Logger} from '@nestjs/common';

export interface ApplicationsConfig {
  users: string;
  coaching: string;
  files: string;
  notify: string;
}


export default registerAs('applications', (): ApplicationsConfig => {
  const config: ApplicationsConfig = {
    users : process.env.APP_USERS,
    coaching: process.env.APP_COACHING,
    files: process.env.APP_FILES,
    notify: process.env.APP_NOTIFY
  };

  const validationSchema = Joi.object<ApplicationsConfig>(
    Object.fromEntries(Object.keys(config).map((key) => [key, Joi.string().required()]))
  );

  Logger.log(validationSchema);

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Applications Config]: Environments validation failed. Please check .env file.
      Error message: Applications.${error.message}`,
    );
  }

  return config;
});
