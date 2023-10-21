import * as path from 'path';

export const ROOT_ENV = path.join(__dirname, '../../../');

export enum EnvPaths {
  coaching = 'apps/coaching/.coaching.env',
  bff = 'apps/bff/.bff.env',
  users = 'apps/users/.users.env',
  uploader = 'apps/uploader/.uploader.env',
  notify = 'apps/notify/.env',
  fill = 'apps/fill-base/.fill.env'
}
