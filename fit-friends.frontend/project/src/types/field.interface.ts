import {CertificateInterface} from './certificate.interface';

export type Types = string | File | number | Date | boolean | string[] | File[] | CertificateInterface[]
export interface Field {[k: string]: Types}
