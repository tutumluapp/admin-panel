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
import { mapSchemaTypeToHTMLInput } from "@/utils/supabase/helpers";

export default function EditPage({
  params,
}: {
  params: { table: string };
}) {
  const supabase = createClient();
  const router = useRouter();
  const pk = params.table === "products" ? "gtin" : "id";
  const [schema, setSchema] = useState<Record<string, string>[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const dataToSubmit = { ...formData };
    delete dataToSubmit[pk];

    console.log(dataToSubmit);
    const { data, error } = await supabase
      .from(params.table)
      .insert([dataToSubmit]).select();
    if (error) throw error;
    alert("Record updated successfully!");
    router.push(`/dashboard/${params.table}/edit/${data[0][pk]}`);
  };

  const getSchema = useCallback(async () => {
    try {
      const { data, error } = await supabase.rpc("get_types", {
        tname: params.table,
      });
      if (error) throw error;
      if (data?.length === 0) return <h2>Table not found</h2>;
      setSchema(data);
      setLoading(false);
    } catch (error) {
      return <h2>Table not found</h2>;
    }
  }, [params.table, supabase]);

  useEffect(() => {
    getSchema();
  }, [getSchema]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <Card className="max-w-3xl mx-auto p-8 bg-background shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Add {params.table.slice(0, -1)}</CardTitle>
          <CardDescription>
            Add new {params.table.slice(0, -1)} to the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              {schema.map((column) => {
                const key = column.column_name;
                if (key === pk)
                  return (
                    null
                  );
                return (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={key}>{key}</Label>
                    <Input
                      id={key}
                      placeholder={`Enter ${key}`}
                      type={mapSchemaTypeToHTMLInput(column.data_type)}
                      onChange={handleInputChange}
                      value={formData[key] || ""}
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
            Create {params.table.slice(0, -1)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
