import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { changeUserDataService } from '../../service/UserService';
import LocalStorageService from '../../service/StorageService';
import userActions from '../../reducers/userReducer/userActions';
import AuthRegForm from '../../components/auth-reg-form';
import FormField from '../../components/form-field';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const statusEdit = useSelector((state) => state.user.statusEdit);
  const userInfo = LocalStorageService.getUserInfo();
  const [doubleControl, setDControl] = useState(true);

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (doubleControl) {
      const token = LocalStorageService.getToken();

      setDControl(false);
      changeUserDataService(data, token)
        .then((res) => {
          if (res.errors) {
            dispatch(userActions.changeEditStatus(res.errors));
            setDControl(true);
          } else {
            dispatch(userActions.changeEditStatus('success'));
            dispatch(userActions.successEditing(res.user));
            localStorage.setItem('user', JSON.stringify(res.user));
            setDControl(true);

            setTimeout(() => {
              dispatch(userActions.changeEditStatus('redirect'));
              dispatch(userActions.changeEditStatus(false));
            }, 2500);
          }
        })
        .catch((error) => {
          dispatch(userActions.changeEditStatus(error.message));
          setDControl(true);
        });
    }
  };

  if (statusEdit === 'redirect') {
    return <Redirect to="/" />;
  }

  if (userInfo === '') {
    return <Redirect to="/sign-in" />;
  }

  const { username, email, image } = userInfo;

  return (
    <AuthRegForm title="Edit Profile" onSubmit={handleSubmit(onSubmit)} btnLabel="Save" status={statusEdit}>
      <FormField
        label="Username"
        name="username"
        type="input"
        placeholder="Username"
        thisRef={register({ required: true, minLength: 3, maxLength: 20 })}
        errors={errors}
        errorOptions={[
          { target: 'required', message: 'This is a required field' },
          { target: 'maxLength', message: 'Your password needs to be no more 20 characters.' },
          { target: 'minLength', message: 'Your username needs to be at least 3 characters.' },
        ]}
        value={username}
      />
      <FormField
        label="Email address"
        name="email"
        type="input"
        placeholder="Email address"
        thisRef={register({
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
          required: true,
        })}
        errors={errors}
        errorOptions={[
          { target: 'required', message: 'This is a required field' },
          { target: 'pattern', message: 'You need specify a valid email address' },
        ]}
        value={email}
      />
      <FormField
        label="New password"
        name="password"
        type="password"
        placeholder="New password"
        thisRef={register({ required: true, minLength: 8, maxLength: 40 })}
        errors={errors}
        errorOptions={[
          { target: 'required', message: 'This is a required field' },
          { target: 'maxLength', message: 'Your password needs to be no more 40 characters.' },
          { target: 'minLength', message: 'Your username needs to be at least 8 characters.' },
        ]}
      />
      <FormField
        label="Avatar image (url)"
        name="image"
        type="input"
        placeholder="Avatar image"
        thisRef={register({
          pattern: /^(https?:\/\/)?([da-z.-]+)\.([a-z.]{2,6})([/\w.-?=\-%_&]*)*\/?$/,
        })}
        errors={errors}
        errorOptions={[{ target: 'pattern', message: 'You need specify a valid URL for image' }]}
        value={image}
      />
    </AuthRegForm>
  );
};

export default UserProfilePage;
