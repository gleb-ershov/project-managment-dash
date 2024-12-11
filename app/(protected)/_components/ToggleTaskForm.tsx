'use client';

import { toggleTaskCompleteStatus } from '@/utils/actions/tasks/toggleTaskCompleteStatus';
import { useActionState, useState } from 'react';

interface IToggleTaskForm {
    id: string;
}

export const ToggleTaskForm = (props: IToggleTaskForm) => {
    const { id } = props;
    const [isChecked, setCheckedStatus] = useState<boolean>(false);
    const [state, action, isPending] = useActionState(
        toggleTaskCompleteStatus.bind(
            null,
            id,
            isChecked ? 'ongoing' : 'completed'
        ),
        undefined
    );

    return (
        <form action={action}>
            <input
                type="checkbox"
                disabled={isPending}
                checked={isChecked}
                onChange={() => setCheckedStatus(!isChecked)}
            />
        </form>
    );
};
