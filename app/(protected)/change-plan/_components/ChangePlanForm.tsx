'use client';

import { useCurrentUser } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { changeUserPlanAction } from '@/utils/actions/users/changePlanAction';
import { useActionState, useEffect } from 'react';

interface IChangePlanFormProps {
    plan: string;
}

export const ChangePlanForm = (props: IChangePlanFormProps) => {
    const { plan } = props;
    const {
        currentUser: { id, plan: userPlan },
    } = useCurrentUser();

    const [state, action, isPending] = useActionState(
        changeUserPlanAction.bind(null, plan, id),
        undefined
    );

    useEffect(() => console.log(state), [state]);
    return (
        <form action={action} className="mx-auto mt-auto">
            <Button disabled={isPending || userPlan === plan}>
                {userPlan === plan ? 'Your current plan' : 'Change plan'}
            </Button>
            {state && !state.ok ? (
                <p className="mt-4 text-center text-sm text-gray-800">
                    An error occured while updating your subscription plan.
                    Please try again later.
                </p>
            ) : null}
        </form>
    );
};
