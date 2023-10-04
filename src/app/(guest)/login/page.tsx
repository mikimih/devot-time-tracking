import SignInForm from '@/components/Forms/SignInForm';
import NextImage from '@/components/NextImage';
import Link from 'next/link';
import userLogo from '../../../../public/svg/user.svg';

export default function Page() {
  return (
    <>
      <div className='bg-lilac border-whisper mb-[30px] flex flex-col items-center rounded-lg border-[0.1em] border-solid p-[44px_35px_60px_44px]'>
        <h1 className='text-secondaryDark mb-[50px] text-2xl font-bold leading-[0.7em]'>
          Login
        </h1>
        <SignInForm />
      </div>
      <div className='bg-lilac border-whisper flex items-center rounded-lg border-[0.1em] border-solid p-[14px_28px_0_28px]'>
        <NextImage
          alt='user logo'
          src={userLogo}
          width={95}
          height={78}
          priority={true}
        />
        <div className=' ml-[34px] flex flex-col'>
          <p className='text-gray mb-1.5 text-lg font-semibold leading-[0.94em]'>
            Need an account?
          </p>
          <Link
            href='signup'
            className='text-primary-100 text-sm font-bold leading-[1.21em] underline'
          >
            Register here
          </Link>
        </div>
      </div>
    </>
  );
}
