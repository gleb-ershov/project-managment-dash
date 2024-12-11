'use client';

import { Delete, PlusSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface IMultipleInputsFieldProps {
    values: string[];
    handler: (val: string[]) => void;
}

export const MultipleInputsField = (props: IMultipleInputsFieldProps) => {
    const { values, handler } = props;

    const handleInputChange = (term: string, index: number) => {
        const newState = [...values];
        newState[index] = term;
        handler(newState);
    };

    const createNewInput = () => {
        const newState = [...values];
        newState[newState.length] = '';
        handler(newState);
    };

    const deleteInputHandler = (index: number) => {
        const newState = [...values];
        newState.splice(index, 1);
        handler(newState);
    };

    return (
        <>
            {values.map((item, index) => (
                <div
                    key={`${index}`}
                    className="items-flex flex justify-between gap-2"
                >
                    <Input
                        placeholder="Enter your link here..."
                        value={values[index]}
                        type="url"
                        onChange={(e) =>
                            handleInputChange(e.currentTarget.value, index)
                        }
                    />
                    {values.length > 0 ? (
                        <button
                            type="button"
                            className="ml-auto"
                            onClick={() => deleteInputHandler(index)}
                        >
                            <Delete size={20} />
                        </button>
                    ) : null}
                </div>
            ))}
            <Button onClick={() => createNewInput()} className="mt-2">
                Add new link <PlusSquare />
            </Button>
        </>
    );
};
