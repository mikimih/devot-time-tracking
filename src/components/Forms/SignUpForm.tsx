'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import signIn from '@/firebase/auth/signin';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField/InputField';
import PasswordField from '@/components/InputField/PasswordField';
import ButtonComponent from '@/components/Button/ButtonComponent';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = yup
  .object({
    email: yup.string().required().email('Please enter valid email'),
    userName: yup.string().required('Username is required field'),
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
  userName: '',
  password: '',
};

interface SignUpFormData {
  email: string;
  userName: string;
  password: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    console.log(data.email, data.password);
    // const { result, error } = await signIn(data.email, data.password);
    //
    // if (error) {
    //   return console.error(error);
    // }
    // console.log(result);
    // return router.push('/(user)');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col'>
      <InputField
        placeholder={'Email'}
        name='email'
        errors={errors}
        control={control}
        customStyle='mb-[30px]'
      />
      <InputField
        placeholder={'Username'}
        name='username'
        errors={errors}
        control={control}
        customStyle='mb-[30px]'
      />
      <PasswordField
        placeholder={'Password'}
        name='password'
        errors={errors}
        control={control}
        customStyle='mb-[50px]'
      />
      <ButtonComponent type='submit' label='Register' />
    </form>
  );
}
