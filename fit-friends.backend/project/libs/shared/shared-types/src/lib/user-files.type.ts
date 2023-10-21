import 'multer';

export type UserFilesType = {
  avatar?: Express.Multer.File[];
  certificate?: Express.Multer.File[];
}
