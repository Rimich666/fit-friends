import {FileContent} from 'use-file-picker/types';
import {Accept} from '../settings';
import {useFilePicker} from 'use-file-picker';

export default function useAppFilesPicker
(selectFilesHandle: (plainFile: File[], file: FileContent<string>[]) => void, accept: Accept){
  const {openFilePicker} = useFilePicker({
    readAs: 'DataURL',
    accept: accept,
    multiple: true,
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      selectFilesHandle(plainFiles, filesContent);
    },
  });
  return openFilePicker;
}
