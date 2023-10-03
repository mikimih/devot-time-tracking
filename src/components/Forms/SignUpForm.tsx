'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '@/components/InputField/InputField';
import PasswordField from '@/components/InputField/PasswordField';
import ButtonComponent from '@/components/Button/ButtonComponent';
import { useAuth } from '@/context/AuthContext';
import React, { useRef } from 'react';
import ToastComponent, {
  ToastComponentProps,
} from '@/components/Toast/ToastComponent';
const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = yup
  .object({
    email: yup.string().required().email('Please enter valid email'),
    displayName: yup.string().required('Username is required field'),
    password: yup
      .string()
      .required('Please enter a password')
      .min(6, 'Password must have at least 6 characters')
      .matches(/[0-9]/, getCharacterValidationError('digit'))
      .matches(/[a-z]/, getCharacterValidationError('lowercase')),
  })
  .required();

const defaultValues = {
  email: '',
  displayName: '',
  password: '',
};

export type SignUpFormData = {
  email: string;
  displayName: string;
  password: string;
};

export default function SignUpForm() {
  const toastRef = useRef<ToastComponentProps>(null);
  const { signUp } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: SignUpFormData) => {
    const { errorMessage } = await signUp(
      data.email,
      data.password,
      data.displayName
    );
    if (errorMessage) {
      toastRef.current?.showError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col'>
      <ToastComponent ref={toastRef} />
      <InputField
        placeholder={'Email'}
        name='email'
        errors={errors}
        control={control}
        customStyle='mb-[24px]'
      />
      <InputField
        placeholder={'Username'}
        name='displayName'
        errors={errors}
        control={control}
        customStyle='mb-[24px]'
      />
      <PasswordField
        placeholder={'Password'}
        name='password'
        errors={errors}
        control={control}
        customStyle='mb-[24px]'
      />
      <ButtonComponent type='submit' label='Register' />
    </form>
  );
}
