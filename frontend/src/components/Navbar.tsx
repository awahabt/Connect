import { Logo } from "@/assets";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "./ui/input";


const Navbar = () => {



  return (
    <div className="w-full fixed py-3 flex justify-between items-center px-10 border-b-[1px] border-[#00000033] dark:border-[#FFFFFF33]">
      <Link
        to={"/"}
        className="flex items-center gap-4 text-2xl font-bold dark:text-white"
      >
        <img src={Logo} alt="Logo" className="w-8" />
        <p>Connect.</p>
      </Link>

      <div className="bg-[#DBE4E9] dark:bg-[#333D42] dark:text-white pl-6 rounded-full flex items-center gap-2">
        <Search className="text-[#2A2F32] dark:text-[#EEF1F3]" />
        <Input placeholder="Search post" />
      </div>
      <div className="flex gap-4">
        <Link to={"login"}><Button>Log in</Button></Link>
        <Link to={"signup"}><Button>Sign up</Button></Link>
      </div>

    </div>
  );
};

export default Navbar;
