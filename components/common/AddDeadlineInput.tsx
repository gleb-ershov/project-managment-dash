'use client';

import { format } from 'date-fns';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/utils/helpers/cn';
import { ControllerRenderProps } from 'react-hook-form';
import { FormControl } from '../ui/form';
import { Button } from '../ui/button';
import { ICreateTaskFormValues } from '@/utils/types';

interface IAddDeadlineInputProps {
    formField: ControllerRenderProps<ICreateTaskFormValues, 'deadline'>;
    value: Date;
    handler: (payload: Date) => void;
}

export const AddDeadlineInput = (props: IAddDeadlineInputProps) => {
    const { formField: field, handler } = props;

    const setDeadlineValueHandler = (
        field: ControllerRenderProps<ICreateTaskFormValues>,
        val: Date
    ) => {
        field.onChange(val);
        handler(val);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                        )}
                    >
                        {field.value ? (
                            format(field.value, 'PPP')
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(undefined, val: Date) =>
                        setDeadlineValueHandler(field, val)
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
