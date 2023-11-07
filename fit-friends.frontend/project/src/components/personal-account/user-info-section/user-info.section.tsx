import EditControls from './edit-controls';
import {useEffect, useState} from 'react';
import UserInfoForm, {UserInfoFormProps} from './user-info.form';
import {UserInfoMode} from '../constants';
import InfoAvatar from './info-avatar';
import {fillUpdateUser, getEmptyUpdateUser, getEmptyUpdateUserErrors} from '../../../helpers/get-new-update-user';
import {UpdateUserInterface} from '../../../types/update-user.interface';
import {UpdateUserErrorsInterface} from '../../../types/update-user-errors.interface';
import {useAppSelector} from '../../../hooks';
import {selectUser} from '../../../store/user-process/user.selectors';


export default function UserInfoSection(): JSX.Element {
  const [mode, setMode] = useState(UserInfoMode.read);
  const [updateUser, setUpdateUser] = useState(getEmptyUpdateUser());
  const [errors, setErrors] = useState(getEmptyUpdateUserErrors());

  const user = useAppSelector(selectUser);

  const saveChanges = () => {
    console.log('saveChanges');
  };

  useEffect(() => {
    setUpdateUser(fillUpdateUser(user));
  }, [user]);

  const changeMode = () => {
    if (mode === UserInfoMode.edit) {
      saveChanges();
      setMode(UserInfoMode.read);
    }
  };

  const onInputName = (text: string) => {
    user.name = text;
    errors.name = '';
  };

  const onInputDescription = (text: string) => {
    user.name = text;
    errors.name = '';
  };

  const onSelect = (key: string) =>
    (value: never) => {
      user[key as keyof UpdateUserInterface] = value;
      errors[key as keyof UpdateUserErrorsInterface] = '';
    };

  const onCheck = (value: boolean) => {
    user.isReady = value;
  };

  const onChangeType = () => {
    errors.trainingType = '';
  };

  const props: UserInfoFormProps = {
    changeMode, onInputName, onInputDescription, onSelect, onCheck, onChangeType, user: updateUser, mode, errors
  };

  return (
    <section className={`user-info${mode}`}>
      <InfoAvatar mode={mode} src={updateUser.avatarPath}/>
      {mode === UserInfoMode.edit && <EditControls/>}
      <UserInfoForm {...props}/>
    </section>
  );
}
