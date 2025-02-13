import { signIn } from '@/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import CredentialsSignInForm from './credentials-sigin-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    return redirect('/');
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="mb-5">
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="space-y-4 flex-center">
          <Image
            src="/images/google_logo.png"
            width={100}
            height={100}
            alt={`${APP_NAME} logo`}
            priority={true}
          />
        </CardHeader>
        <CardContent className="space-y-4 flex-center">
          {
            <form
              action={async () => {
                'use server';
                await signIn('google');
              }}
            >
              <button
                className="flex items-center justify-center w-full px-6 py-3 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                type="submit"
              >
                <FcGoogle className="mr-3 text-2xl" />
                <span className="font-medium">Sign in with Google</span>
              </button>
            </form>
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
