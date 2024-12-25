import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useId } from "react";
  
  const FormSelect = ({
    form,
    name,
    className,
    labelClassName,
    placeHolder,
    label,
    data,
    disabled,
    onChange,
  }: {
    form: any;
    name: string;
    className?: string;
    labelClassName?: string;
    placeHolder?: string;
    label: string;
    data: any[];
    disabled?: boolean;
    onChange?: (value: string) => void; // Define onChange callback type
  }) => {
    const id = useId();
  
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel htmlFor={id} className={labelClassName || "font-semibold"}>
              {label}
            </FormLabel>
            <Select
              disabled={disabled}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                if (onChange) {
                  onChange(value);
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeHolder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.map((item, index) => {
                  return item.disabled ? (
                    <SelectItem key={index} value={item.value} disabled>
                      {item.label}
                    </SelectItem>
                  ) : (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
  
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  export default FormSelect;
  