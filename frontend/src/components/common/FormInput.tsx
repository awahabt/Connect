import { Eye, EyeOff } from "lucide-react";
import React, { useId, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
// import Tiptap from "./Tiptap";

const FormInput = ({
  form,
  name,
  className,
  labelClassName,
  placeHolder,
  label,
  type = "text",
  min,
  max,
  disabled,
  onHandle,
  onBlur,
  rules,
}: {
  form: any;
  name: string;
  className?: string;
  labelClassName?: string;
  placeHolder?: string;
  label?: string;
  type?: string;
  component?: React.ReactNode;
  min?: any;
  max?: any;
  onHandle?: Function;
  onBlur?: Function;
  disabled?: boolean;
  rules?: any;
}) => {
  const [hidePassword, setHidePassword] = useState(type === "password");
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (onHandle) {
      onHandle(value);
    }
    form.setValue(name, value);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel
              htmlFor={id}
              className={labelClassName || "font-semibold"}
            >
              {type !== "checkbox" && label}
            </FormLabel>
          )}
          <FormControl>
            {type === "textarea" ? (
              <div className="relative">
                <Textarea
                  id={id}
                  disabled={disabled}
                  className="bg-white placeholder:text-black placeholder:opacity-50"
                  onChange={field.onChange}
                  value={field.value}
                  placeholder={placeHolder}
                />
              </div>
            ) : type === "MilestoneNumber" ? (
              <Input
                id={id}
                disabled={disabled}
                className="bg-white placeholder:text-black placeholder:opacity-50"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={field.value}
                min={min}
                max={max}
                placeholder={placeHolder}
                autoComplete={type}
              />
            ) : type === "checkbox" ? (
              <div className="flex items-center">
                <input
                  id={id}
                  type="checkbox"
                  className="h-3 w-3 mr-2"
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                />
                <label
                  htmlFor={id}
                  className={labelClassName || "text-sm font-semibold"}
                >
                  {label}
                </label>
              </div>
            ) : type === "textRichEditor" ? (
              <div>
                {/* <Tiptap
                  setEditorContent={(content: string) => {
                    form.setValue(name, content);
                  }}
                  editorContent={field.value}
                  complete={false}
                /> */}
                Configure Tiptap here
              </div>
            ) : (
              <div className="relative">
                <Input
                  id={id}
                  disabled={disabled}
                  className="bg-white placeholder:text-black placeholder:opacity-50"
                  type={
                    hidePassword
                      ? "password"
                      : type !== "password"
                        ? type
                        : "text"
                  }
                  onChange={
                    type === "number"
                      ? (e) => {
                          const value = e.target.value;
                          if (value === "") {
                            field.onChange(undefined);
                          } else {
                            field.onChange(parseInt(value));
                          }
                        }
                      : field.onChange
                  }
                  onBlur={type === "number" ? handleBlur : undefined}
                  value={field.value}
                  min={min}
                  max={max}
                  placeholder={placeHolder}
                  autoComplete={type}
                />
                {type === "password" && hidePassword && (
                  <Eye
                    className="h-5 w-6 absolute right-3 top-2.5 cursor-pointer"
                    onClick={() => {
                      setHidePassword((prev) => !prev);
                    }}
                  />
                )}
                {type === "password" && !hidePassword && (
                  <EyeOff
                    className="h-5 w-6 absolute right-3 top-2.5 cursor-pointer"
                    onClick={() => {
                      setHidePassword((prev) => !prev);
                    }}
                  />
                )}
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
