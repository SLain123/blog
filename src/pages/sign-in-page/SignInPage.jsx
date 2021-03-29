import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { once } from 'lodash';
import { getAuthService } from '../../service/UsersService';
import userActions from '../../reducers/userReducer/userActions';
import AuthRegForm from '../../components/auth-reg-form';
import FormField from '../../components/form-field';

const SignInPage = () => {
  const dispatch = useDispatch();
  const statusAuth = useSelector((state) => state.user.statusAuth);
  const [doubleControl, setDControl] = useState(true);

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = once((data) => {
    if (doubleControl) {
      setDControl(false);
      getAuthService(data)
        .then((res) => {
          if (res.errors) {
            dispatch(userActions.changeAuthStatus(res));
            setDControl(true);
          } else {
            dispatch(userActions.changeAuthStatus(false));
            dispatch(userActions.successAuth(res.user));
            localStorage.setItem('user', JSON.stringify(res.user));
            dispatch(userActions.changeLoginStatus(true));
            setDControl(true);
          }
        })
        .catch((error) => {
          dispatch(userActions.changeAuthStatus(error.message));
          setDControl(true);
        });
    }
  });

  return (
    <AuthRegForm
      title="Sign In"
      onSubmit={handleSubmit(onSubmit)}
      btnLabel="Login"
      status={statusAuth}
      footer={{ text: 'Don’t have an account?', link: '/sign-up', linkText: 'Sign Up.' }}
    >
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
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        thisRef={register({
          required: true,
        })}
        errors={errors}
        errorOptions={[{ target: 'required', message: 'This is a required field' }]}
      />
    </AuthRegForm>
  );
};

export default SignInPage;
