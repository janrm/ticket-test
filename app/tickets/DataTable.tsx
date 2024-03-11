import React from 'react'
import {Ticket} from '@prisma/client';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import {ArrowDown, ArrowUp} from 'lucide-react'
import {SearchParams} from "@/app/tickets/page";

interface Props {
    tickets: Ticket[]
    searchParams: SearchParams;
}

const DataTable = ({tickets, searchParams}: Props) => {

    return (
        <div className='w-full mt-5'>
            <div className='rounded-md sm:border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Link href={{query: {...searchParams, orderBy: "title", sortOrder : "title" === searchParams.orderBy && "asc" === searchParams.sortOrder ? "desc" : "asc" }}}>Title
                                {"title" === searchParams.orderBy && ("asc" === searchParams.sortOrder ? <ArrowUp className="inline p-1"/> : <ArrowDown className="inline p-1"/>) }</Link>
                            </TableHead>
                            <TableHead>
                                <div className='flex justify-center'>
                                    <Link href={{query: {...searchParams, orderBy: "status", sortOrder : "status" === searchParams.orderBy && "asc" === searchParams.sortOrder ? "desc" : "asc"}}}>Status
                                    {"status" === searchParams.orderBy && ("asc" === searchParams.sortOrder ? <ArrowUp className="inline p-1"/> : <ArrowDown className="inline p-1"/>) }</Link>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className='flex justify-center'>
                                    <Link href={{query: {...searchParams, orderBy: "priority", sortOrder : "priority" === searchParams.orderBy && "asc" === searchParams.sortOrder ? "desc" : "asc"}}}>Priority
                                    {"priority" === searchParams.orderBy && ("asc" === searchParams.sortOrder ? <ArrowUp className="inline p-1"/> : <ArrowDown className="inline p-1"/>) }</Link>
                                </div>
                            </TableHead>
                            <TableHead>
                                <Link href={{query: {...searchParams, orderBy: "createdAt", sortOrder : "createdAt" === searchParams.orderBy && "asc" === searchParams.sortOrder ? "desc" : "asc"}}}>Created At
                                {"createdAt" === searchParams.orderBy && ("asc" === searchParams.sortOrder ? <ArrowUp className="inline p-1"/> : <ArrowDown className="inline p-1"/>) }</Link>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets ? tickets.map((ticket) => (
                            <TableRow key={ticket.id} data-href="/">
                                <TableCell><Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link> </TableCell>
                                <TableCell>
                                    <div className='flex justify-center'><TicketStatusBadge status={ticket.status}/>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex justify-center'><TicketPriority priority={ticket.priority}/>
                                    </div>
                                </TableCell>
                                <TableCell>{ticket.createdAt.toLocaleDateString("nl-NL", {
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: false
                                })}</TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default DataTable
