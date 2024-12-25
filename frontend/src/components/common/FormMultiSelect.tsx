"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDown, X } from "lucide-react";
import { useId, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const FormMultiSelect = ({
  form,
  name,
  className,
  labelClassName,
  placeHolder,
  label,
  data,
  disabled,
}: {
  form: any;
  name: string;
  className?: string;
  labelClassName?: string;
  placeHolder?: string;
  label: string;
  data: any[];
  disabled?: boolean;
}) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel htmlFor={id} className={labelClassName || "font-semibold"}>
            {label}
          </FormLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <FormControl>
              <PopoverTrigger asChild>
                <div
                  className={`bg-white rounded-md outline-1 outline outline-gray-200 ${
                    field.value.length !== 0 && "p-1"
                  } ${disabled && "opacity-50 cursor-not-allowed"}`}
                >
                  <div className="flex justify-between items-center">
                    {field.value.length === 0 ? (
                      <Input
                        placeholder={placeHolder}
                        className="w-full p-2 bg-white border-none placeholder:opacity-50 placeholder:text-black"
                        readOnly
                        onClick={() => !disabled && setOpen(true)}
                        disabled={disabled}
                      />
                    ) : (
                      <div
                        role="combobox"
                        aria-expanded={open}
                        className={`items-center inline-flex flex-wrap gap-1 p-1 w-full overflow-hidden bg-white border-none rounded-md ${
                          disabled && "cursor-not-allowed"
                        }`}
                        onClick={() => !disabled && setOpen(true)}
                      >
                        {field.value.map((v: string) => {
                          const value = data?.find((f) => f.value === v);
                          return (
                            <div
                              key={v}
                              className="flex items-center justify-between gap-2 px-2 rounded-md text-sm "
                              style={{
                                backgroundColor: "#036A7B30",
                                color: "#004551",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <span className="text-[12px]">
                                {value?.label}
                              </span>
                              {!disabled && (
                                <X
                                  className="h-4 w-4 cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    form.setValue(
                                      name,
                                      field.value.filter(
                                        (val: string) => val !== v,
                                      ),
                                    );
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50 m-2" />
                  </div>
                </div>
              </PopoverTrigger>
            </FormControl>
            {!disabled && (
              <PopoverContent className="p-0 max-h-96" sideOffset={10}>
                <Command>
                  <CommandInput placeholder="Search value..." className="" />
                  <CommandEmpty>No value found.</CommandEmpty>
                  <CommandGroup>
                    {data.map((value) => (
                      <CommandItem
                        key={value.value}
                        value={value.value}
                        onSelect={(currentValue) => {
                          if (field.value?.includes(currentValue)) {
                            form.setValue(
                              name,
                              field.value?.filter(
                                (v: string) => v !== currentValue,
                              ),
                            );
                          } else {
                            form.setValue(name, [...field.value, currentValue]);
                          }

                          setOpen(false);
                        }}
                      >
                        {value.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value.includes(value.value)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            )}
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormMultiSelect;
