import { ChangePlanCard } from './_components/OptionCard';

export default function ChangePlanPage() {
    return (
        <main className="h-screen w-full">
            <h1 className="ml-8 mt-8 text-3xl">Plans</h1>
            <div className="flex w-full items-center justify-center gap-8">
                <ChangePlanCard plan="free">
                    <h3 className="text-center text-2xl font-semibold">Free</h3>
                    <p className="text-[18px] font-normal text-gray-800">
                        For anyone to learn the basics of application.
                    </p>
                </ChangePlanCard>
                <ChangePlanCard plan="pro">
                    <h3 className="text-center text-2xl font-semibold">Pro</h3>
                    <p>For teams and organizations up to 50 people.</p>
                </ChangePlanCard>
            </div>
        </main>
    );
}
