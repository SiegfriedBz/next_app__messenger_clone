import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

type TProps = {
  children: React.ReactNode
}

const MainLayout = async ({ children }: TProps) => {
  return (
    <div className='h-full w-full flex flex-col'>
      <div className='flex h-full w-full'>
        <DesktopSidebar />
        {children}
      </div>
      <MobileFooter />
    </div>
  )
}

export default MainLayout
