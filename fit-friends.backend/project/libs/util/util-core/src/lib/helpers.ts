import {ClassConstructor, plainToInstance} from 'class-transformer';
import {isUppercase} from 'class-validator';
import {readSingle} from 'read-env-file';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeInUnit = { value: number; unit: DateTimeUnit };
const timeInUnitRegex = /^(\d+)([shdmy])/;

export type RabbitConnectionOption = {
  user: string;
  password: string;
  host: string;
  port: string;
}

export function getRabbitMQConnectionString({user, password, host, port}: RabbitConnectionOption): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export const getMongoURI = (
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string,
  auth: string
): string => `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${auth}`;

export const getMongoUriFromEnv = (envPath: string): string => {
  const environments = readSingle.sync(envPath);
  return getMongoURI(
          environments.MONGO_DB_USER,
          environments.MONGO_DB_PASSWORD,
          environments.MONGO_DB_HOST,
          environments.MONGO_DB_PORT,
          environments.MONGO_DB_NAME,
          environments.MONGO_DB_AUTH_BASE);
};

export const getUploadDirectory = (envPath: string): string => {
  const environments = readSingle.sync(envPath);
  return environments.UPLOAD_DIRECTORY_PATH;
};


export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true, enableImplicitConversion: true});
}


export function parseTime(time: string): TimeInUnit {
  const match = timeInUnitRegex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit };
}

export function envStyleToCamelCase(env: string, firsUpper: number) {
  return env.toLowerCase().split('_').map((item, index) =>
  index < firsUpper ? item : item[0].toUpperCase().concat(item.substring(1))).join('');
}

// export function camelCaseToEnvStyle(camel: string, prefix: string) {
//   return `${ prefix ? `${prefix.toUpperCase()}_` : ''}${camel.split('').map((letter, index) =>
//     isUppercase(letter) && index > 0 ? `_${letter}` : letter).join('').toUpperCase()}`;
// }

export function camelCaseToEnvStyle(camel: string, prefix: string) {
  return `${ prefix ? `${prefix.toUpperCase()}_` : ''}${camelCaseToSnakeStyle(camel).toUpperCase()}`;
}

export function camelCaseToSnakeStyle(camel: string) {
  return `${camel.split('').map((letter, index) =>
    isUppercase(letter) && index > 0 ? `_${letter}` : letter).join('')}`;
}

export const getAuthHeader = (token: string, typeContent?: string) => {
  const contentType = typeContent ? typeContent : 'application/json';
  return {
    headers: {
      'Authorization': token,
      'Content-Type': contentType
    }};
};
