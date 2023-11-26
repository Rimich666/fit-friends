import Input from '../../input/input';
import {Inputs} from '../../input/inputs';
import React, {useEffect, useState} from 'react';
import UserGenderRadioGroup from '../user-gender-radio-group/user-gender-radio-group';
import {Gender, Role, UserLocation} from '../../../enums';
import CustomSelect from '../../custom-select/custom-select';
import Avatar from '../avatar/avatar';
import SelectRoleGroup from '../select-role-group/select-role-group';
import {fillRegisterErrors, getEmptyRegisterErrors, getNewRegisterUser} from '../../../helpers/get-new-register-user';
import {registerValidators, validate} from '../../../utils/validate';
import Questionnaire from '../../questionnaire/questionnaire';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {setRegisterUser} from '../../../store/register-process/register-process';
import {selectRegistration} from '../../../store/register-process/register-selectors';

import {ComponentVariant} from "../../../component-variant";

export default function RegisterForm(): JSX.Element {
  const [user, setUser] = useState(getNewRegisterUser());
  const [errors, setErrors] = useState(getEmptyRegisterErrors());
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useAppDispatch();

  const {registerErrors, isRegisterError, registerUser} = useAppSelector(selectRegistration);

  useEffect(() => {
    if (isRegisterError) {
      setErrors({...registerErrors});
      setUser({...registerUser});
      setIsSubmit(false);
    }
  }, [isRegisterError]);

  const onInputPassword = (text: string) => {
    user.password = text;
    errors.password = '';
  };
  const onInputEmail = (text: string) => {
    user.email = text;
    errors.email = '';
  };

  const onInputName = (text: string) => {
    user.name = text;
    errors.name = '';
  };

  const onInputBirthDay = (text: string) => {
    user.birthDate = new Date(text);
    errors.birthDate = '';
  };

  const onChangeGender = (value: string) => {
    user.gender = Gender[value as keyof typeof Gender];
    errors.gender = '';
  };

  const onSelectLocation = (value: string) => {
    user.location = UserLocation[value as keyof typeof UserLocation];
    errors.location = '';
  };

  const onSelectFile = (selectedFile: File) => {
    user.avatar = selectedFile;
    errors.avatar = '';
  };

  const onSelectRole = (value: string) => {
    user.role = Role[value as keyof typeof Role];
    errors.role = '';
  };

  const submitHandle = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const validateErrors = validate(user, registerValidators);
    const isError = Object.values(validateErrors).join('').length > 0;
    if (isError){
      setErrors(fillRegisterErrors(validateErrors));
      return;
    }
    dispatch(setRegisterUser({...user}));
    setIsSubmit(true);
  };

  if (isSubmit && Object.values(errors).join('').length === 0) {
    return (<Questionnaire/>);
  }

  return (
    <form method="get" onSubmit={submitHandle}>
      <div className="sign-up">
        <Avatar callback={onSelectFile} errorMessage={errors.avatar}/>
        <div className="sign-up__data">
          <Input {...{...Inputs.name, callback: onInputName, errorMessage: errors.name, value: user.name}}/>
          <Input {...{...Inputs.registerEmail, callback: onInputEmail, errorMessage: errors.email, value: user.email}}/>
          <Input {...{...Inputs.birthday, callback: onInputBirthDay, errorMessage: errors.birthDate, value: user.birthDate.toDateString()}}/>
          <CustomSelect
            title={'Ваша локация'}
            options={UserLocation}
            callback={onSelectLocation}
            errorMessage={errors.location}
            disabled={false}
          />
          <Input {...{...Inputs.registerPassword, callback: onInputPassword, errorMessage: errors.password, value: user.password}}/>
          <UserGenderRadioGroup callback={onChangeGender} value={user.gender} variant={ComponentVariant.register}/>
        </div>
        <SelectRoleGroup callback={onSelectRole} value={user.role}/>
        <div className="sign-up__checkbox">
          <label>
            <input type="checkbox" value="user-agreement" name="user-agreement"/>
            <span className="sign-up__checkbox-icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check"></use>
              </svg>
            </span><span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
          </label>
        </div>
        <button className="btn sign-up__button" type="submit">Продолжить</button>
      </div>
    </form>
  );
}
