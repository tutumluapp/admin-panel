'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation";

export default async function DeletePage({
  params,
}: {
  params: { table: string; id: string };
}) {
  const supabase = createClient()
  const router = useRouter()
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from(params.table)
      .delete()
      .eq(params.table === "products" ? "gtin" : "id", params.id);
    if (error) throw error;
    alert(`Deleted ${params.id} from ${params.table}`);
    router.push(`/dashboard/${params.table}/1`);
  }
  return (
    <div>
      <Card className="max-w-3xl mx-auto p-8 bg-background shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Deleting!</CardTitle>
          <CardDescription>
            Are you sure you want to delete {params.id} from {params.table}?
          </CardDescription>
        </CardHeader>
        <CardContent>
          
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="border"
            onClick={() => router.push(`/dashboard/${params.table}/1`)}
          >
            No
          </Button>
          <Button
            className="border"
            type="submit"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}