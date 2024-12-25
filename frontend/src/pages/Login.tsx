import { google, Logo } from "@/assets";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/FormInput";

const formSchema = z.object({
  username: z.string().min(1, "Username, Email or Phone no. is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast.success("Login Successful");
  };

  return (
    <div className="h-full max-w-[500px] flex flex-col gap-5 dark:text-white">
      <div className="flex flex-col gap-10">
        {/* title */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-8" />
          <p className="font-bold text-4xl">Connect</p>
        </div>

        {/* description */}
        <div>
          <p className="max-w-[370px] font-semibold text-2xl">
            Welcome back to the Community
          </p>
        </div>

        {/* google button */}
        <Link to={"#"} className="rounded-full">
          <div className="max-w-[450px] bg-[#bce9ff] hover:bg-[#CEEAF7] flex gap-3 justify-center items-center py-3 rounded-full">
            <img src={google} alt="google-icon" />
            <p className="text-sm text-black">Sign in with Google</p>
          </div>
        </Link>
      </div>

      {/* line */}
      <div className="w-full flex justify-center items-center gap-2 px-5 text-[#B9B0B0]">
        <div className="border-b-[0.5px] w-full" />
        <p className="text-center">or </p>
        <div className="border-b-[0.5px] w-full" />
      </div>

      {/* form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-5 dark:text-white">
            <FormInput
              form={form}
              name="username"
              type="text"
              placeHolder="Username, Email or Phone no."
              className="w-full outline-none border border-[#B9B0B0] py-3 px-4 rounded-lg text-sm bg-transparent"
            />
            <FormInput
              form={form}
              name="password"
              type="password"
              placeHolder="Password"
              className="w-full outline-none border border-[#B9B0B0] py-3 px-4 rounded-lg text-sm font-extrabold placeholder:font-normal bg-transparent"
            />
            <Link to={"#"} className="text-right text-[12px] text-[#777777]">
              Forgot password?
            </Link>
            <div className="mx-5">
              <hr />
            </div>
            <div className="flex text-sm text-[#777777] gap-1 justify-center">
              <p>Don't have an account? </p>
              <span className="text-[#7D9CAB] hover:text-[#628191] font-bold">
                <Link to={"/signup"}> Sign up</Link>
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#7D9CAB] hover:bg-[#637d8a] flex gap-3 justify-center items-center py-2 rounded-full">
            <p className="w-full text-lg font-semibold text-white">Sign in</p>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;