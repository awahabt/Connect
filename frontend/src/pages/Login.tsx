import { google, Logo } from "@/assets";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-full flex flex-col gap-5 dark:text-white ">
      {/* title */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="w-8" />
        <p className="font-bold text-4xl">Connect</p>
      </div>

      {/* description */}
      <div>
        <p className="max-w-[370px] font-semibold text-2xl ">
          Join & Connect the Fastest Growing Online Community
        </p>
      </div>

      {/* google button */}
      <Link to={"#"}>
        <div className="max-w-[450px] bg-[#CEEAF7] flex gap-3 justify-center items-center py-3 rounded-full">
          {" "}
          <img src={google} alt="google-icon" />{" "}
          <p className="text-sm text-black">Sign in with Google</p>
        </div>
      </Link>

      {/* line */}
      <div className="w-full">
        <hr />
        <p className="text-center">or </p>
        <hr />
      </div>


      {/* form  */}
      <form action="">

      </form>
    </div>
  );
};

export default Login;
