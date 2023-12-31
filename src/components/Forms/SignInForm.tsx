'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputField } from '@/components/InputField/InputField';
import PasswordField from '@/components/InputField/PasswordField';
import ButtonComponent from '@/components/Button/ButtonComponent';
import { useAuth } from '@/context/AuthContext';
import { useRef, useState } from 'react';
import ToastComponent, {
  ToastComponentProps,
} from '@/components/Toast/ToastComponent';

const schema = yup
  .object({
    displayName: yup.string().required('Email is required field'),
    password: yup.string().required('Please enter a password'),
  })
  .required();

const defaultValues = {
  displayName: '',
  password: '',
};

export interface SignInFormData {
  displayName: string;
  password: string;
}

export default function SignInForm() {
  const { logIn } = useAuth();
  const toastRef = useRef<ToastComponentProps>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { errorMessage } = await logIn(data.displayName, data.password);
    setLoading(false);
    if (errorMessage) {
      toastRef.current?.showError(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col'>
      <ToastComponent ref={toastRef} />
      <InputField
        placeholder='Username'
        name='displayName'
        errors={errors}
        control={control}
        customStyle='mb-[30px]'
      />
      <PasswordField
        placeholder='Password'
        name='password'
        errors={errors}
        control={control}
        customStyle='mb-[50px]'
      />
      <ButtonComponent type='submit' label='Login' isLoading={loading} />
    </form>
  );
}
