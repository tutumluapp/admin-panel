"use client";
import { createClient } from "@/utils/supabase/client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({
  params,
}: {
  params: { table: string; id: string };
}) {
  const supabase = createClient();
  const router = useRouter();
  const pk = params.table === "products" ? "gtin" : "id";
  const [rowData, setRowData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRowData({ ...rowData, [id]: value });
  };

  const getRowdata = useCallback(async () => {
    try {
      const { data, error } = await supabase
      .from(params.table)
      .select("*")
      .eq(pk, params.id)
      .limit(1)
      .single();
      if (error) throw error;
      setRowData(data);
      if (data?.length === 0) return <h2>Entry Not found</h2>;
      setLoading(false);
    } catch (error) {
      console.error(error);
      return <h2>Entry Not found</h2>;
    }
  }, [params.table, params.id, supabase]);

  // Handle form submission
  const handleSubmit = async () => {
    const dataToSubmit = { ...rowData };
    delete dataToSubmit[pk];

    const { error } = await supabase
      .from(params.table)
      .update([dataToSubmit]).eq(pk, rowData[pk]);
    if (error) throw error;
    alert("Updated successfully!");
    router.push(`/dashboard/${params.table}`);
  };

  useEffect(() => {
    getRowdata();
  }, [getRowdata]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <Card className="max-w-3xl mx-auto p-8 bg-background shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Edit {params.table.slice(0, -1)}</CardTitle>
          <CardDescription>
            Update the existing {params.table.slice(0, -1)} in the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              {Object.keys(rowData).map((key) => {
                if (key === pk)
                  return (
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={key}>{key}</Label>
                      <Input
                        id={key}
                        placeholder={`Enter ${key}`}
                        type="text"
                        defaultValue={rowData[key]}
                        disabled
                      />
                    </div>
                  );
                return (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={key}>{key}</Label>
                    <Input
                      id={key}
                      placeholder={`Enter ${key}`}
                      type="text"
                      onChange={handleInputChange}
                      value={rowData[key] || ""}
                    />
                  </div>
                );
              })}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="border"
            type="submit"
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
