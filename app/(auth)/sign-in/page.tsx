import Link from 'next/link';
import { SignInForm } from './_components/SignInForm';

export default function SignInPage() {
    return (
        <div className="flex flex-col">
            <h1 className="text-center text-3xl">Sign In</h1>
            <SignInForm />
            <span className="mt-4 text-sm text-gray-500">
                Don&apos;t have an account yet?{' '}
                <Link
                    href="/sign-up"
                    className="duration-300 hover:text-gray-700"
                >
                    Sign Up
                </Link>
            </span>
        </div>
    );
}
