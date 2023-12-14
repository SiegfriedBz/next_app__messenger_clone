import Logo from "@/components/Logo"
import AuthForm from "@/components/AuthForm"
import AuthSocial from "@/components/AuthSocial"

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center mx-auto h-full w-96'>
      <div className='flex  w-full flex-col justify-center items-center mt-4 gap-y-2 px-12 py-8 bg-white/70 rounded-lg ring-1 ring-gray-300 shadow-md hover:shadow-lg transition duration-200 ease-in-out'>
        <Logo />

        <AuthForm />

        <div className='relative w-full mx-auto'>
          <div className='absolute w-full inset-0 flex items-center'>
            <span className='w-full border-t border-gray-400' />
          </div>

          <div className='flex relative justify-center'>
            <span className='bg-white/70 text-gray-400 px-2'>
              Or continue with
            </span>
          </div>
        </div>

        <AuthSocial />
      </div>
    </div>
  )
}
