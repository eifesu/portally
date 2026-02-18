import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      body: "text-base tracking-tighter",
      body1: "text-sm",
      h1: "text-4xl font-bold tracking-tighter",
      h2: "text-3xl font-bold tracking-tight",
      h3: "text-2xl font-bold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
    },
    muted: {
      true: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const variantElementMap = {
  body: "p",
  body1: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
} as const;

type TypographyProps = React.ComponentProps<"p"> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType;
  };

function Typography({
  children,
  className,
  variant = "body",
  muted,
  as,
  ...props
}: TypographyProps) {
  const Component = as ?? variantElementMap[variant ?? "body"];

  return (
    <Component
      className={cn(typographyVariants({ variant, muted }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Typography as default, typographyVariants };
