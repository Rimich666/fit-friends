import {FileContent} from 'use-file-picker/types';
import {useFilePicker} from 'use-file-picker';
import {Accept} from '../settings';

export default function useAppFilePicker
(selectFileHandle: (plainFile: File, file: FileContent<string>) => void, accept: Accept){
  const {openFilePicker} = useFilePicker({
    readAs: 'DataURL',
    accept: accept,
    multiple: false,
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      selectFileHandle(plainFiles[0], filesContent[0]);
    },
  });
  return openFilePicker;
}
