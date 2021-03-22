import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthService } from '../../service/UserService';
import { changeAuthStatus, successAuth, changeLoginStatus } from '../../reducers/userReducer/userActions';
import AuthRegForm from '../../components/auth-reg-form';
import FormField from '../../components/form-field';

const SignInPage = () => {
  const dispatch = useDispatch();
  const statusAuth = useSelector((state) => state.user.statusAuth);

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) =>
    getAuthService(data)
      .then((res) => {
        if (res.errors) {
          dispatch(changeAuthStatus(res));
        } else {
          dispatch(changeAuthStatus(false));
          dispatch(successAuth(res.user));
          localStorage.setItem('user', JSON.stringify(res.user));
          dispatch(changeLoginStatus(true));
        }
      })
      .catch((error) => {
        dispatch(changeAuthStatus(error.message));
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
