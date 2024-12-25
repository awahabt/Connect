"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const FormSwitch = ({
  form,
  name,
  labelClassName,
  label,
  disabled,
}: {
  form: any;
  name: string;
  labelClassName?: string;
  label: string;
  disabled?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <div className="flex gap-2 items-center">
            <FormDescription className={labelClassName}>
              {label}
            </FormDescription>
            <FormControl className="p-0 m-0">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};
export default FormSwitch;
