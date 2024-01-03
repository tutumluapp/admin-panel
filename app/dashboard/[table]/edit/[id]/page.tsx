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
import { redirect } from "next/navigation";

export default async function EditPage({
  params,
}: {
  params: { table: string; id: string };
}) {
  const supabase = createClient();
  const pk = params.table === "products" ? "gtin" : "id";
  const { data, error } = await supabase
    .from(params.table)
    .select("*")
    .eq(pk, params.id)
    .limit(1)
    .single();
  if (error) throw error;
  if (data?.length === 0) return <h2>Row Not found</h2>;
  return (
    <div>
      <Card className="max-w-3xl mx-auto p-8 bg-background shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Edit SQL Record</CardTitle>
          <CardDescription>
            Update the existing record in the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              {Object.keys(data).map((key) => {
                if (key === pk)
                  return (
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={key}>{key}</Label>
                      <Input
                        id={key}
                        placeholder={`Enter ${key}`}
                        type="text"
                        defaultValue={data[key]}
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
                      defaultValue={data[key]}
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
            onClick={async () => {
              for (const key of Object.keys(data)) {
                data[key] = (
                  document.getElementById(key) as HTMLInputElement
                ).value;
              }
              const { error } = await supabase
                .from(params.table)
                .update(data)
                .eq(pk, params.id);
              if (error) throw error;
              alert("Record updated successfully!");
            }}
          >
            Save changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
