import { addDays, endOfWeek, format, subDays } from 'date-fns';
import { CalendarButton } from './CalendarButton';

export const Calendar = () => {
    const currentDate = new Date(Date.now());
    const endOfTheWeek = endOfWeek(currentDate);
    const startOfTheWeek = subDays(endOfTheWeek, 6);

    const currentWeek = Array.from({ length: 7 }, () => startOfTheWeek).map(
        (day, index) => addDays(day, index)
    );

    return (
        <>
            <h4 className="mx-auto w-[90%] text-2xl font-semibold">
                {format(currentDate, 'MMMMMM, yyyy')}
            </h4>
            <div className="mx-auto mt-4 flex w-[90%] items-center gap-2">
                {currentWeek.map((item, index) => (
                    <CalendarButton date={item} key={index} />
                ))}
            </div>
        </>
    );
};
