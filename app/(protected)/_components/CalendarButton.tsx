'use client';

import { useUrlParams } from '@/hooks/useUrlParams';
import { cn } from '@/utils/helpers/cn';
import { getDate, format } from 'date-fns';

interface ICalendarButtonProps {
    date: Date;
}
export const CalendarButton = (props: ICalendarButtonProps) => {
    const { date } = props;

    const { searchParams, pathname, replace } = useUrlParams();
    const searchQuery = searchParams.get('date');
    const isActive = searchQuery
        ? Number(searchParams.get('date')) === date.getDate()
        : new Date(Date.now()).getDate() === date.getDate();

    const handleCalendarButton = (newDate: string) => {
        const newURLparams = new URLSearchParams(searchParams);
        newURLparams.set('date', newDate);
        replace(`${pathname}?${newURLparams.toString()}`);
    };

    return (
        <button
            onClick={() => handleCalendarButton(String(date.getDate()))}
            className={cn(
                'flex w-[40px] flex-col items-center gap-1 rounded-xl bg-[#FAFAFA] px-2 py-1 text-sm text-white duration-300',
                {
                    'bg-[#DD4B79]': isActive,
                }
            )}
        >
            <span
                className={cn('font-semibold text-black', {
                    'text-white': isActive,
                })}
            >{`${format(date, 'EEEEEE')}`}</span>
            <span
                className={cn('h-[1px] w-1/2 bg-gray-200', {
                    'bg-[#DF618A]': isActive,
                })}
            />
            <span
                className={cn('text-gray-500', {
                    'text-white': isActive,
                })}
            >{`${getDate(date)}`}</span>
        </button>
    );
};
