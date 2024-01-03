import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TableComponent({
  rows,
  columns,
  table,
}: {
  rows: Record<string, any>[];
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
        {rows.map((row) => TableRowComponent(row, table))}
      </TableBody>
    </Table>
  );
}

const TableRowComponent = (row: Record<string, any>, table: string) => {
  const values = Object.values(row);
  return (
    <TableRow key={`${table}-${table === "products" ? row["gtin"] : row["id"]}`}>
      {values.map((value, idx) => {
        if (idx === 0)
          return <TableCell key={value} className="font-medium">{value}</TableCell>;
        if (idx === values.length - 1)
          return <TableCell key={value} className="text-right">{value}</TableCell>;
        return <TableCell key={value}>{value}</TableCell>;
      })}
      <TableCell className="text-center space-x-2">
        <Link title="Edit" href={`/dashboard/${table}/edit/${table === "products" ? row["gtin"] : row["id"]}`}>
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
