import {useForm} from '@mantine/form'
import { useDisclosure } from '@mantine/hooks';
import {Button, Modal, Group, TextInput, Textarea} from '@mantine/core';
import { ENDPOINT, Todo } from '../App';
import { KeyedMutator } from 'swr';

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }){
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues:{
            title: "",
            body: "",
        }
    });
    
    async function createTodo(values: {title: string, body: string}) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then(r => r.json());

        mutate(updated);
        form.reset();
        close();
    }

    return (
    <>
    <Modal opened={opened} onClose={close} title="Create ToDo" centered zIndex="10000">
        <form onSubmit={form.onSubmit(createTodo)}>
            <TextInput required mb={12} label="Todo" placeholder='What do you want to do?' {...form.getInputProps("title")}/>
            <Textarea required mb={12} label="Body" placeholder='Tell me more...' {...form.getInputProps("body")}/>
            <Button type='submit'>Create ToDo</Button>
        </form>
    </Modal>
        <Button mb={12} onClick={open}>ADD TODO</Button>
    </>)
}

export default AddTodo