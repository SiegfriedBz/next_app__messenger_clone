import NavLinks from "./NavLinks"

const MobileFooter = () => {
  return (
    <footer className='fixed bottom-0 w-full sm:w-3/4 flex left-1/2 -translate-x-1/2 lg:hidden ring-1 ring-gray-300 rounded-lg py-4 mt-auto hover:shadow-xl transition duration-300 ease-in-out'>
      <nav className='w-full'>
        <ul className='flex justify-center items-center gap-x-16 w-full'>
          <NavLinks isMobile={true} />
        </ul>
      </nav>
    </footer>
  )
}

export default MobileFooter
