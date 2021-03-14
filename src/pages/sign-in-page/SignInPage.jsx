import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAuth } from '../../service/UserService';
import { changeAuthStatus, successAuth } from '../../reducers/userReducer/userActions';
import Form from '../../components/form';
import FormField from '../../components/form-field';

const SignInPage = () => {
  const dispatch = useDispatch();
  const statusAuth = useSelector((state) => state.user.statusAuth);
  const userInfo = useSelector((state) => state.user.userInfo);

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) =>
    getAuth(data)
      .then((res) => {
        if (res.errors) {
          dispatch(changeAuthStatus(res));
        } else {
          dispatch(changeAuthStatus(false));
          dispatch(successAuth(res.user));
          localStorage.setItem('user', JSON.stringify(res.user));
          <Redirect to="/articles" />;
        }
      })
      .catch((error) => {
        dispatch(changeAuthStatus(error.message));
      });

  if (userInfo) {
    return <Redirect to="/articles" />;
  }

  return (
    <Form
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
    </Form>
  );
};

export default SignInPage;
