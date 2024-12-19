import { pattern } from "@/assets"
import { Outlet } from "react-router-dom"

const Index = () => {
  return (
    <div className="h-screen w-full dark:bg-[#0E1113] flex flex-wrap items-center justify-evenly gap-10 montserrat bor">
      <div className="bor"><Outlet/></div>
      <div className=""><img src={pattern} alt="pattern-image"/></div>
      
    </div>
  )
}

export default Index
