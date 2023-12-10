import {registerAs} from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';
import {Static} from '@project/shared-constants';

export interface StaticConfig {
  serveRoot: string;
  rootPath: string;
  host: string;
}

export default registerAs('static', (): StaticConfig => {
  const config: StaticConfig = {
    serveRoot: process.env['SERVE_ROOT'] || Static.SERVE_ROOT,
    rootPath: process.env['ROOT_PATH'] || Static.ROOT_PATH,
    host: process.env['HOST'] || Static.HOST,
  };

  const validationSchema = Joi.object<StaticConfig>({
    serveRoot: Joi.string().required(),
    host: Joi.string().required(),
    rootPath: Joi.string(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Static Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
