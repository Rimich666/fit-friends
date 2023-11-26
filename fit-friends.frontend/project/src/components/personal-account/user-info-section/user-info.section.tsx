import EditControls from './edit-controls';
import {useEffect, useState} from 'react';
import UserInfoForm, {UserInfoFormProps} from './user-info.form';
import {UserInfoMode} from '../constants';
import InfoAvatar from './info-avatar';
import {
  fillUpdateUser,
  fillUpdateUserErrors,
  getEmptyUpdateUser,
  getEmptyUpdateUserErrors
} from '../../../helpers/get-new-update-user';
import {UpdateUserInterface} from '../../../types/update-user.interface';
import {UpdateUserErrorsInterface} from '../../../types/update-user-errors.interface';
import {useAppDispatch} from '../../../hooks';
import {updateUserValidators, validate} from '../../../utils/validate';
import {makeUpdateUserPayload} from '../../../helpers/make-update-user-payload';
import {UserInterface} from '../../../types/user.interface';
import {updateUserAction} from '../../../store/api-actions/users-actions';

type UserInfoSectionProps = {
  user: UserInterface;
}

export default function UserInfoSection({user}: UserInfoSectionProps): JSX.Element {
  const [mode, setMode] = useState(UserInfoMode.read);
  const [updateUser, setUpdateUser] = useState(getEmptyUpdateUser());
  const [errors, setErrors] = useState(getEmptyUpdateUserErrors());

  const dispatch = useAppDispatch();
  const saveChanges = () => {
    const validateErrors = validate(updateUser, updateUserValidators);
    const isError = Object.values(validateErrors).join('').length > 0;
    if (isError){
      setErrors(fillUpdateUserErrors(validateErrors));
      return;
    }
    if (Object.values(errors).join('').length === 0) {
      const payload = makeUpdateUserPayload(updateUser, user);
      if (!payload) {
        return;
      }
      dispatch(updateUserAction({id: user.id, payload}));
    }
  };

  useEffect(() => {
    setUpdateUser(fillUpdateUser(user));
  }, [user]);

  const changeMode = () => {
    if (mode === UserInfoMode.edit) {
      saveChanges();
      setMode(UserInfoMode.read);
      return;
    }
    setMode(UserInfoMode.edit);
  };

  const onSelectFile = (selectedFile: File) => {
    updateUser.avatar = selectedFile;
  };

  const onInputName = (text: string) => {
    updateUser.name = text;
    errors.name = '';
  };

  const onInputDescription = (text: string) => {
    updateUser.description = text;
    errors.name = '';
  };

  const onSelect = (key: string) =>
    (value: never) => {
      updateUser[key as keyof UpdateUserInterface] = value;
      errors[key as keyof UpdateUserErrorsInterface] = '';
    };

  const onCheck = (value: boolean) => {
    updateUser.isReady = value;
  };

  const onChangeType = () => {
    errors.trainingType = '';
  };

  const props: UserInfoFormProps = {
    changeMode, onInputName, onInputDescription, onSelect, onCheck, onChangeType, user: updateUser, mode, errors
  };

  return (
    <section className={`user-info${mode}`}>
      <InfoAvatar mode={mode} url={updateUser.avatarPath} callback={onSelectFile}/>
      {mode === UserInfoMode.edit && <EditControls/>}
      <UserInfoForm {...props}/>
    </section>
  );
}
