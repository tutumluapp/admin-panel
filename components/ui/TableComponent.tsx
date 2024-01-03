"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TableComponent({
  rows,
  columns,
  table,
}: {
  rows: any[];
  columns: any[];
  table: string;
}) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {columns.map((column, idx) =>
            TableHeaderComponent(column, idx, columns.length)
          )}
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => TableRowComponent(Object.values(row), table))}
      </TableBody>
    </Table>
  );
}

const TableRowComponent = (values: any[], table: string) => {
  return (
    <TableRow key={`${table}-${values[0]}`}>
      {values.map((value, idx) => {
        if (idx === 0)
          return <TableCell className="font-medium">{value}</TableCell>;
        if (idx === values.length - 1)
          return <TableCell className="text-right">{value}</TableCell>;
        return <TableCell key={value}>{value}</TableCell>;
      })}
      <TableCell className="text-center space-x-2">
        <Link title="Edit" href={`/dashboard/${table}/edit/${values[0]}`}>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </Link>
        <Button size="sm" variant="secondary">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

const TableHeaderComponent = (
  column: { column_name: string },
  idx: number,
  length: number
) => {
  if (idx === 0)
    return (
      <TableHead key={column.column_name} className="w-[100px]">
        {column.column_name}
      </TableHead>
    );
  if (idx === length - 1)
    return (
      <TableHead key={column.column_name} className="text-right">
        {column.column_name}
      </TableHead>
    );
  return <TableHead key={column.column_name}>{column.column_name}</TableHead>;
};
