import Link from 'next/link';
import { SignUpForm } from './_components/SignUpForm';

export default function SignUpPage() {
    return (
        <div className="flex flex-col">
            <h1 className="text-center text-3xl">Sign In</h1>
            <SignUpForm />
            <span className="mt-4 text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                    href="/sign-in"
                    className="duration-300 hover:text-gray-700"
                >
                    Sign In
                </Link>
            </span>
        </div>
    );
}
