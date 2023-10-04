import NextImage from '@/components/NextImage';
import Link from 'next/link';
import userLogo from '../../../../public/svg/user.svg';
import SignUpForm from '@/components/Forms/SignUpForm';

export default function Page() {
  return (
    <>
      <div className='bg-lilac border-whisper mb-[30px] flex flex-col items-center rounded-lg border-[0.1em] border-solid p-[28px_35px_32px_44px]'>
        <h1 className='text-secondaryDark mb-[50px] text-2xl font-bold leading-[0.7em]'>
          Register
        </h1>
        <SignUpForm />
      </div>
      <div className='bg-lilac border-whisper flex items-center rounded-lg border-[0.1em] border-solid p-[14px_24px_0_24px]'>
        <NextImage
          alt='user logo'
          src={userLogo}
          width={95}
          height={78}
          priority={true}
        />
        <div className=' ml-[34px] flex flex-col'>
          <p className='text-gray mb-1.5 text-lg font-semibold leading-[0.94em]'>
            Already have account?
          </p>
          <Link
            href={'/login'}
            className='text-primary-100 text-sm font-bold leading-[1.21em] underline'
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
}
