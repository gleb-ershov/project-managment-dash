'use client';

import { ControllerRenderProps, useForm } from 'react-hook-form';
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
import { useCurrentUser } from '@/components/providers/AuthProvider';
import { AddMembersInput } from '@/components/common/AddMemberInput';
import { AddDeadlineInput } from '@/components/common/AddDeadlineInput';
import { createNewTaskAction } from '@/utils/actions/tasks/createNewTask';
import { SelectProjectInput } from '@/components/common/SelectProjectInput';
import { MultipleInputsField } from '@/components/common/MultipleInputsField';
import { TagsInput } from '@/components/ui/tags-input';
import { ICreateTaskFormValues } from '@/utils/types';

export const CreateTaskForm = () => {
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            deadline: new Date(Date.now()),
            members: [] as string[],
            project: '',
            links: [] as string[],
            tags: [] as string[],
        },
    });

    const [members, addMembers] = useState<string[]>([]);
    const [externalLinks, addLinks] = useState<string[]>(['']);
    const [tags, addTags] = useState<string[]>(['']);

    const [deadline, setDeadline] = useState(new Date(Date.now()));
    const [projectId, setProject] = useState('');

    const { currentUser } = useCurrentUser();

    const [state, action, isPending] = useActionState(
        createNewTaskAction.bind(
            null,
            projectId,
            currentUser.id,
            members,
            deadline,
            tags,
            externalLinks
        ),
        undefined
    );

    const createTagHandler = (
        field: ControllerRenderProps<ICreateTaskFormValues>,
        val: string[]
    ) => {
        field.onChange(val);
        addTags(val);
    };

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

                <FormField
                    control={form.control}
                    name="project"
                    render={() => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Project</FormLabel>
                            <SelectProjectInput
                                value={projectId}
                                handler={setProject}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <TagsInput
                                    minItems={0}
                                    value={field.value ? field.value : []}
                                    onValueChange={(val: string[]) =>
                                        createTagHandler(field, val)
                                    }
                                    placeholder="Enter your tags"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="links"
                    render={() => (
                        <FormItem className="flex flex-col">
                            <FormLabel>External Links</FormLabel>
                            <MultipleInputsField
                                values={externalLinks}
                                handler={addLinks}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isPending}
                    className="mx-auto w-1/2"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};
