import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
  type={type}
  className={cn(
    "flex h-6 w-full sm:min-w-[250px] md:min-w-[400px] xl:min-w-[600px] rounded-full bg-transparent py-6  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md dark:file:text-zinc-50 dark:placeholder:text-zinc-400 ",
    className
  )}
  ref={ref}
  {...props}
/>

    )
  }
)
Input.displayName = "Input"

export { Input }
