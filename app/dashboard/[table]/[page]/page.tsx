import { PaginationComponent } from "@/components/pagination";
import TableComponent from "@/components/ui/TableComponent";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Table({
  params,
}: {
  params: { table: string; page: string };
}) {
  const page = parseInt(params.page) || 1;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
      .range(start, end);
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
