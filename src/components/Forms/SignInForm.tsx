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

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is required field')
      .email('Please enter valid email'),
    password: yup.string().required('Please enter a password'),
  })
  .required();

const defaultValues = {
  email: '',
  password: '',
};

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<SignInFormData>({
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
      <PasswordField
        placeholder={'Password'}
        name='password'
        errors={errors}
        control={control}
        customStyle='mb-[50px]'
      />
      <ButtonComponent type='submit' label='Login' />
    </form>
  );
}
