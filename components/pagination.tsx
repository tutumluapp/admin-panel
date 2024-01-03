'use client'
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function PaginationComponent({
  page,
  total,
  table,
}: {
  page: number;
  total: number;
  table: string;
}) {
  const router = useRouter();

  const maxPagesToShow = 11;
  let startPage = Math.max(page - Math.floor(maxPagesToShow / 2), 1);
  let endPage = Math.min(startPage + maxPagesToShow, total);

  if (endPage - startPage < maxPagesToShow) {
    startPage = Math.max(endPage - maxPagesToShow, 0);
  }

  const goToPage = (pageIndex: number) => {
    router.push(`/dashboard/${table}/${pageIndex}`);
  }
  if (!total) return null;
  return (
    <div className="w-full py-6 flex items-center justify-center">
      <Button className="mr-4" disabled={page === 0} variant="outline" onClick={() => goToPage(page - 1)}>
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="sr-only">Previous Page</span>
      </Button>
      <div className="flex gap-2">
        {[...Array(endPage - startPage)].map((_, index) => (
          <Button
            key={index}
            className={`w-8 h-8`}
            variant={page === Math.ceil(startPage + index) ? "default" : "outline"} // ts-ignore
            onClick={() => goToPage(startPage + index)}
          >
            {Math.ceil(startPage + index)}
          </Button>
        ))}
      </div>
      <Button className="ml-4" variant="outline" disabled={page === total - 1} onClick={() => goToPage(page + 1)}>
        <ArrowRightIcon className="w-4 h-4" />
        <span className="sr-only">Next Page</span>
      </Button>
    </div>
  );
}
