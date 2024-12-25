import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { cn } from "@/lib/utils";
  
  import { format } from "date-fns";
  import { CalendarIcon } from "lucide-react";
  
  import { Calendar } from "@/components/ui/calendar";
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form";
  import { Button } from "../ui/button";
  const FormDatePicker = ({
    label,
    placeHolder = "Select a date (mm/dd/yyyy)",
    form,
    name,
    className,
    displayDateFormat = "MM/dd/yyyy",
    disabaled = false,
    disabaledDates,
    onChange,
    labelClassName,
    selected,
    disabledAfter = false,
  }: {
    label: string;
    placeHolder: string;
    form: any;
    name: string;
    className?: string;
    displayDateFormat?: string;
    disabaled?: boolean;
    disabaledDates?: any;
    disabledAfter?: boolean;
    onChange?: any;
    labelClassName?: string;
    selected?: string;
  }) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={`flex flex-col w-full ${className}`}>
            <FormLabel className={labelClassName || "font-semibold"}>
              {label}
            </FormLabel>{" "}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal bg-white",
                      !field.value && "text-muted-foreground",
                    )}
                    disabled={disabaled}
                  >
                    {field.value ? (
                      format(field.value, displayDateFormat)
                    ) : (
                      <span>{placeHolder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value || selected}
                  captionLayout="dropdown-buttons"
                  fromYear={1950}
                  toYear={2040}
                  onSelect={
                    onChange
                      ? (date) => {
                          onChange(date);
                          field.onChange(date);
                        }
                      : field.onChange
                  }
                  // disabled={disabaledDates}
                  disabled={
                    //disable all dates before disabaledDates
                    (date) => {
                      return disabledAfter
                        ? date >= disabaledDates
                        : date <= disabaledDates;
                    }
                  }
                  // initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  export default FormDatePicker;
  