import {certificates} from '../certificates';
import {CertificateInterface} from '../../types/certificate.interface';

export const makeFakeCertificates = (): CertificateInterface[] =>
  certificates.map((certificate, index) => ({
    id: index.toString(),
    path: certificate.src,
    ext: 'jpg',
    isEdit: certificate.isEdit,
    index: index
  }));
