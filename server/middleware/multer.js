//mddleware for handling images, primarily used for uploading files
import multer from 'multer';

const upload =multer({storage:multer.diskStorage({})});

export default upload;