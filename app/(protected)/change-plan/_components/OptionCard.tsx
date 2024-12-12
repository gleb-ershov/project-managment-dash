import { ReactNode } from 'react';
import { ChangePlanForm } from './ChangePlanForm';

interface IChangePlanCardProps {
    children: ReactNode;
    plan: string;
}

export const ChangePlanCard = (props: IChangePlanCardProps) => {
    const { children, plan } = props;
    return (
        <div className="flex min-h-[300px] max-w-[240px] flex-col gap-4 rounded-xl border-[1px] p-4">
            {children}
            <ChangePlanForm plan={plan} />
        </div>
    );
};
