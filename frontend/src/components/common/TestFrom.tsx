import FormDropZone from "@/components/common/FormDropZone";
import FormInput from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { APIHeaders, backendURL } from "@/constants/backendURL";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import FormSelect from "@/components/common/FormSelect";
import FormDatePicker from "@/components/common/FormDatePicker";

const formSchema = z
  .object({
    type: z.enum(["Salary", "Misc"], {
      errorMap: () => ({ message: "Type is required" }),
    }),
    amount: z.number().positive("Amount must be greater than 0"),
    desc: z
      .string()
      .min(10, "Description must be between 10 and 100 characters long")
      .max(3000, "Description must be between 10 and 100 characters long"),
    file: z
      .array(z.string().or(z.unknown()))
      .min(1, "At least one attachment is required"),
    expense_category: z.enum(["Accountant", "Moderator", "Hosting"], {
      errorMap: () => ({ message: "Expense category is required" }),
    }),
    add_time: z.union([z.date(), z.string()]).refine(
      (date: any) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      },
      {
        message: "Expense time is required and must be a valid date",
      }
    ),
  })
  .refine(() => {
    const errors: z.ZodIssue[] = [];

    if (errors.length > 0) {
      throw new z.ZodError(errors);
    }

    return true;
  });

const AddExpense = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Salary",
      amount: 0,
      desc: "",
      file: [],
      expense_category: "Accountant",
      add_time: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    return true;
  };

  const { mutateAsync: addExpenseMutation, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      toast.success("Form Working", {
        description: "Form Working successfully!",
      });
    },
    onError: (error: {
      response: { data: { error: { message: string } } };
    }) => {
      toast.error("Something Went Wrong", {
        description: error.response?.data?.error?.message,
      });
    },
  });

  const fetchExpenseToEdit = () =>
    axios
      .get(`${backendURL}/accountants/expense/`, {
        headers: APIHeaders(),
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
      })
      .catch(() => toast.error("Error fetching expense data"));

  const { isFetching } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenseToEdit,
    refetchOnWindowFocus: false,
  });

  return isFetching ? (
    <div>Loading</div>
  ) : (
    <div className="rounded-xl p-8 bg-white container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => addExpenseMutation(data))}>
          <div className="flex-col justify-center items-center flex w-full">
            <div className="flex items-center w-full gap-4">
              <FormSelect
                form={form}
                label="Expense Category"
                name="expense_category"
                placeHolder="Select Category"
                data={[
                  { label: "Accountant", value: "Accountant" },
                  { label: "Moderator", value: "Moderator" },
                  { label: "Hosting", value: "Hosting" },
                ]}
                className="flex-1"
              />
              <FormSelect
                form={form}
                label="Type"
                name="type"
                placeHolder="Select Type"
                data={[
                  { label: "Salary", value: "Salary" },
                  { label: "Misc", value: "Misc" },
                ]}
                className="flex-1"
              />
            </div>

            <div className="flex items-center w-full gap-4">
              <FormInput
                form={form}
                name="amount"
                label="Amount"
                type="number"
                min={1}
                placeHolder="Enter Amount"
                className="w-full mb-4"
              />
              <FormDatePicker
                form={form}
                label="Expense Time"
                name="add_time"
                placeHolder="mm/dd/yyyy"
              />
            </div>

            <FormDropZone
              form={form}
              label="Attachment"
              uploadType="file"
              mimeTypes=".pdf, .doc, .docx, .txt"
            />
            <FormInput
              form={form}
              name="desc"
              type="textarea"
              label="Description"
              className="w-full mb-4"
              placeHolder="Enter Description"
            />

            <div className="flex justify-end gap-2 w-full">
              <Button
                type="submit"
                className="bg-primary text-white"
                disabled={isPending}
                loader={isPending}
              >
                form Data
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddExpense;
