export const FileSignatures = {
  jpeg: 'ff d8',
  png: '89 50',
  pdf: '25 50 44 46 2d',
  riff: '52 49 46 46',
  avi: '41 56 49 20',
  ftyp: '66 74 79 70',
  mp4: '6d 6d 70 34',
  mov: '71 74 20 20'
};

export const ImageSignatures = [FileSignatures.jpeg, FileSignatures.png];


export enum Extensions {
  jpeg = 0xff,
  png = 0x89,
  pdf = 0x25,
  avi = 0x41,
  mp4 = 0x6d,
  mov = 0x71
}
