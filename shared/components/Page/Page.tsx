import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pageVariants = cva("h-svh flex flex-col p-4");

type PageProps = React.ComponentProps<"div"> &
  VariantProps<typeof pageVariants>;

function Page({ children, className, ...props }: PageProps) {
  return (
    <div className={cn(pageVariants(), className)} {...props}>
      {children}
    </div>
  );
}

export { Page as default, pageVariants };
