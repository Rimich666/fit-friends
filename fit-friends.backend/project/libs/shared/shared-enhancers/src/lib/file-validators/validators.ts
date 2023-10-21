import {FileSignatures, ImageSignatures} from '@project/shared-constants';

const imageValidator = (file: Express.Multer.File) => {
  const signature = Array.from(file.buffer.subarray(0, 2), (byte) => byte.toString(16)).join(' ');
  file['isError'] = !ImageSignatures.includes(signature);
  return ImageSignatures.includes(signature);
};

const pdfValidator = (file: Express.Multer.File) => {
  const signature = Array.from(file.buffer.subarray(0, 5), (byte) => byte.toString(16)).join(' ');
  file['isError'] = signature !==FileSignatures.pdf;
  return signature === FileSignatures.pdf;
};

const aviValidator = (file: Express.Multer.File) => {
  const riff = Array.from(file.buffer.subarray(0, 4), (byte) => byte.toString(16)).join(' ');
  const avi = Array.from(file.buffer.subarray(8, 12), (byte) => byte.toString(16)).join(' ');

  const result = riff === FileSignatures.riff && avi === FileSignatures.avi;

  file['isError'] = !result;
  return result;
};

const movValidator = (file: Express.Multer.File) => {
  const ftyp = Array.from(file.buffer.subarray(4, 8), (byte) => byte.toString(16)).join(' ');
  const mov = Array.from(file.buffer.subarray(8, 12), (byte) => byte.toString(16)).join(' ');

  const result = ftyp === FileSignatures.ftyp && mov === FileSignatures.mov;

  file['isError'] = !result;
  return result;
};

const mp4Validator = (file: Express.Multer.File) => {
  const ftyp = Array.from(file.buffer.subarray(4, 8), (byte) => byte.toString(16)).join(' ');
  const mp4 = Array.from(file.buffer.subarray(8, 12), (byte) => byte.toString(16)).join(' ');

  const result = ftyp === FileSignatures.ftyp && mp4 === FileSignatures.mp4;

  file['isError'] = !result;
  return result;
};

export const validators = {
  image: imageValidator,
  pdf: pdfValidator,
  avi: aviValidator,
  mov: movValidator,
  mp4: mp4Validator
};
