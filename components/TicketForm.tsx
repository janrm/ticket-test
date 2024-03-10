"use client"
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { ticketSchema } from '@/ValidationSchemas/tickets';
import {Controller, useForm} from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Ticket } from '@prisma/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from './ui/button';


type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
    ticket? : Ticket
}


const TicketForm = ({ticket} : Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const form = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema)
    })
    
    async function onSubmit(values: z.infer<typeof ticketSchema>) {
        try {
            console.log(JSON.stringify(values))
            setIsSubmitting(true);
            setError("");

            if (ticket) {
                await axios.patch("/api/tickets/"+ticket.id, values);
            } else {
                await axios.post("/api/tickets", values).then(data => console.log(JSON.stringify(data)));
            }
            setIsSubmitting(false);
            router.push("/tickets");
            router.refresh();

        }
        catch (error) {
            console.log(error);
            setError("Unknown Error occured");
            setIsSubmitting(false);
        } 
        console.log(values)
    }

    return (
    <div className="rounded-md border w-full p-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
            <FormField 
                control={form.control} 
                defaultValue={ticket?.title}
                name="title" 
                render={({field}) => (
                <FormItem>
                    <FormLabel>Ticket Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Ticket title..." {...field} />
                    </FormControl>
                </FormItem>
            )}/>
            <Controller 
                name="description" 
                defaultValue={ticket?.description}
                control={form.control} 
                render={({field}) => (
                    <SimpleMDE placeholder='Description' {...field} />
                )} />

            <div className='flex w-full space-x-4'>
            <FormField control={form.control} name="status" defaultValue={ticket?.status} render={({field}) => (
                <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Status..." defaultValue={ticket?.status}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                            <SelectItem value="OPEN">Open</SelectItem>
                            <SelectItem value="STARTED">Started</SelectItem>
                            <SelectItem value="CLOSED">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}/>

            <FormField control={form.control} name="priority" defaultValue={ticket?.priority} render={({field}) => (
                <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Priority..." defaultValue={ticket?.priority}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                            <SelectItem value="LOW">Low</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}/>

            </div>
            <Button type="submit" disabled={isSubmitting}>
                {ticket ? "Update ticket": "Create Ticket"}
            </Button>
        </form>
      </Form>
    </div>
  )
}

export default TicketForm
