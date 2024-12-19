import { google, Logo } from "@/assets";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div
      className="h-full max-w-[500px] flex flex-col gap-5
     dark:text-white  "
    >
      <div className="flex flex-col gap-10">
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
        <Link to={"#"} className="rounded-full">
          <div className="max-w-[450px] bg-[#bce9ff] hover:bg-[#CEEAF7] flex gap-3 justify-center items-center py-3 rounded-full">
            {" "}
            <img src={google} alt="google-icon" />{" "}
            <p className="text-sm text-black">Sign up with Google</p>
          </div>
        </Link>
      </div>

      {/* line */}
      <div className="w-full flex justify-center items-center gap-2 px-5 text-[#B9B0B0]">
        <div className="border-b-[0.5px] w-full" />
        <p className="text-center">or </p>
        <div className="border-b-[0.5px] w-full" />
      </div>

      {/* form  */}
      <form action="" className=" flex flex-col gap-4">
        <div className="flex flex-col gap-5 dark:text-white">
          <input
            type="text"
            required
            className="w-full outline-none border border-[#B9B0B0] py-3 px-4 rounded-lg text-sm bg-transparent "
            placeholder="Email or Mobile no."
          />
          <input
            type="text"
            required
            className="w-full outline-none border border-[#B9B0B0] py-3 px-4 rounded-lg text-sm bg-transparent "
            placeholder="Full name"
          />
          <input
            type="text"
            required
            className="w-full outline-none border border-[#B9B0B0] py-3 px-4 rounded-lg text-sm bg-transparent "
            placeholder="Username"
          />
          <input
            type="password"
            required
            className="w-full outline-none border border-[#B9B0B0] py-3 px-4 rounded-lg text-sm font-extrabold placeholder:font-normal bg-transparent"
            placeholder="Password"
          />
          <div className="max-w-[300px] flex gap-1 mx-3 text-[12px] text-[#777777]  ">
            <p className="">By Signing up, you agree to our
            <span className="font-semibold hover:text-[#535252] ml-1">
              <Link to={"#"} className="">
                Term,
              </Link>
            </span>
            <span className="font-semibold hover:text-[#535252] mx-1">
              <Link to={"#"} className="">
                Privacy Policy
              </Link>
            </span>
            and
            <span className="font-semibold hover:text-[#535252] ml-1">
              <Link to={"#"} className="">
                Cooking Policy.
              </Link>
            </span></p>
          </div>

          <div className="mx-5">
            <hr />
          </div>
          <div className="flex text-sm text-[#777777] gap-1 justify-center">
            <p>Already have an account? </p>
            <span className="text-[#7D9CAB] hover:text-[#628191] font-bold">
              {" "}
              <Link to={"/login"}> Sign in</Link>
            </span>
          </div>
        </div>
        <button type="submit" className="w-full bg-[#7D9CAB] hover:bg-[#637d8a] flex gap-3 justify-center items-center py-2 rounded-full">
          <Link to={"#"} className="rounded-full"><p className=" w-full text-lg font-semibold text-white">Sign in</p> </Link>
        </button>
      </form>
    </div>
  );
};

export default Signup;
