import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    const allowFileTypes = ['image/png', 'iamge/jpg', 'image/jpeg'];
    if (!allowFileTypes.includes(file.mimetype)) {
      cb(new Error('This Filetype is not accepted'));
      return;
    }
    cb(null, './src/storage');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

export { multer, storage };
