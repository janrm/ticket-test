"use client"
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import axios from 'axios'


const DeleteButton = ({ ticketId }: { ticketId: number }) => {
    
    const router = useRouter();
    const [error, setError] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    
    const deleteTicket = async () => {
        try { 
            setIsDeleting(true);
            setError("")

            await axios.delete(`/api/tickets/${ticketId}`);

            router.push("/tickets");
            router.refresh();

        }
        catch (error) { 
            setIsDeleting(false);
            setError("Unknown Error occured");
            
        }

    }

    return (
        <>
      <AlertDialog>
                <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })} disabled={isDeleting}>Delete Ticket</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your ticket
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({ variant: "destructive" })} disabled={isDeleting} onClick={deleteTicket}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
<p className='text-destructive'>{error}</p>
        </>
//      <Link href={`/tickets/edit/${ticketId}`} className={`${buttonVariants({ variant: "default" })}`} >Delete Ticket</Link>
  )
}

export default DeleteButton
