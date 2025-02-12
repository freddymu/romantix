"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

type Consultation = {
  id: number
  datetime: string
  partnerName: string
  subject: string
  sentiment: "Positive" | "Neutral" | "Negative"
  status: "Waiting" | "In Progress" | "Completed"
}

const data: Consultation[] = [
  {
    id: 1,
    datetime: "2023-07-15 14:30",
    partnerName: "Sarah",
    subject: "Communication Issues",
    sentiment: "Neutral",
    status: "Completed",
  },
  {
    id: 2,
    datetime: "2023-07-20 10:00",
    partnerName: "John",
    subject: "Trust Building",
    sentiment: "Positive",
    status: "In Progress",
  },
  {
    id: 3,
    datetime: "2023-07-25 16:45",
    partnerName: "Emily",
    subject: "Conflict Resolution",
    sentiment: "Negative",
    status: "Waiting",
  },
  {
    id: 4,
    datetime: "2023-08-01 11:15",
    partnerName: "Michael",
    subject: "Future Planning",
    sentiment: "Positive",
    status: "Completed",
  },
  {
    id: 5,
    datetime: "2023-08-05 13:30",
    partnerName: "Jessica",
    subject: "Intimacy Concerns",
    sentiment: "Neutral",
    status: "In Progress",
  },
]

const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "datetime",
    header: "Date & Time",
  },
  {
    accessorKey: "partnerName",
    header: "Partner Name",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: ({ row }) => {
      const sentiment = row.getValue("sentiment") as string
      return (
        <div
          className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${
            sentiment === "Positive"
              ? "bg-green-100 text-green-800"
              : sentiment === "Negative"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }
        `}
        >
          {sentiment}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div
          className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${
            status === "Completed"
              ? "bg-green-100 text-green-800"
              : status === "In Progress"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
          }
        `}
        >
          {status}
        </div>
      )
    },
  },
]

export default function ConsultationsPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredData = useMemo(() => {
    return data.filter(
      (consultation) =>
        consultation.partnerName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        consultation.subject.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        consultation.status.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    )
  }, [debouncedSearchTerm])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  const handleRowClick = useCallback(
    (id: number) => {
      router.push(`/dashboard/consultations/${id}`)
    },
    [router],
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-elegant-primary">Consultations</h1>
        <Link href="/dashboard/consultations/new" passHref>
          <Button size="lg" className="bg-elegant-secondary hover:bg-elegant-secondary/90">
            <PlusCircle className="h-5 w-5 mr-2" /> New Consultation
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Search consultations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(row.original.id)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

