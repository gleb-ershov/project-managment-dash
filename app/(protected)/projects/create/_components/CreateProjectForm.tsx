'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useActionState, useState } from 'react';
import { createNewProjectAction } from '@/utils/actions/projects/createNewProject';
import { useCurrentUser } from '@/components/providers/AuthProvider';
import { AddMembersInput } from '@/components/common/AddMemberInput';
import { AddDeadlineInput } from '@/components/common/AddDeadlineInput';

export const CreateProjectForm = () => {
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            deadline: new Date(Date.now()),
            members: [] as string[],
        },
    });

    const [members, addMembers] = useState<string[]>([]);
    const [deadline, setDeadline] = useState(new Date(Date.now()));

    const { currentUser } = useCurrentUser();

    const [state, action, isPending] = useActionState(
        createNewProjectAction.bind(null, currentUser.id, members, deadline),
        undefined
    );

    return (
        <Form {...form}>
            <form
                className="mx-auto flex h-fit w-[300px] flex-col space-y-8 py-10"
                action={action}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Type here..."
                                    type=""
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Your project title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Project deadline</FormLabel>
                            <AddDeadlineInput
                                formField={field}
                                handler={setDeadline}
                                value={deadline}
                            />
                            <FormDescription>
                                Your project deadline date.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Something about your new project"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You project description.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="members"
                    render={() => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Members</FormLabel>
                            <AddMembersInput
                                value={members}
                                handler={addMembers}
                            />
                            <FormDescription>
                                Add new members to your project.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending} className='w-1/2 mx-auto'>
                    Submit
                </Button>
            </form>
        </Form>
    );
};
