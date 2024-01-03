import { PaginationComponent } from "@/components/pagination";
import TableComponent from "@/components/ui/TableComponent";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Table({
  params,
}: {
  params: { table: string; page: string };
}) {
  const page = parseInt(params.page) || 1;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const pk = params.table === "products" ? "gtin" : "id";

  const getSchema = async (): Promise<any[]> => {
    const { data, error } = await supabase.rpc("get_types", {
      tname: params.table,
    });
    if (error) throw error;
    return data;
  };

  const getPaginatedData = async (page: number): Promise<any[]> => {
    const start = page * 10 - 10;
    const end = page * 10 - 1;
    const { data, error } = await supabase
      .from(params.table)
      .select("*")
      .range(start, end).order(pk, { ascending: true });
    if (error) throw error;
    return data;
  };

  const total_number = (await supabase.from(params.table).select("*", { head: false })).data?.length;
  const rows = await getPaginatedData(page);
  const columns =
    rows.length > 0
      ? Object.keys(rows[0]).map((column) => {
          return { column_name: column };
        })
      : await getSchema();
  return (
    <div className="">
      <Link
        href={`/dashboard/${params.table}/add`}
        className="py-2 px-3 flex items-center justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
        Add new {params.table.slice(0, -1)}
      </Link>
      <TableComponent rows={rows} columns={columns} table={params.table} />
      {total_number ? (
        <PaginationComponent
          page={page}
          total={Math.ceil(total_number / 10) + 1}
          table={params.table}
        />
      ) : null}
    </div>
  );
}
