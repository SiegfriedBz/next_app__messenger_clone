"use client"

import { twMerge } from "tailwind-merge"
import { signIn } from "next-auth/react"
import { BsGithub, BsGoogle } from "react-icons/bs"
import { IconType } from "react-icons"
import { toast } from "react-toastify"

const AuthSocial = () => {
  const signInAction = async (provider: string) => {
    signIn(provider, { callbackUrl: "/conversations" })
      .then(() => {
        // notify user
        toast.success("You logged in successfully!")
      })
      .catch((error) => {
        console.error("error", error)
        // notify user
        toast.warning("Something went wrong, please try again")
      })
  }

  return (
    <div className='flex gap-x-4 w-full mx-auto mt-4'>
      <AuthSocialButton
        icon={BsGoogle}
        onClick={() => signInAction("google")}
      />

      <AuthSocialButton
        icon={BsGithub}
        onClick={() => signInAction("github")}
      />
    </div>
  )
}

export default AuthSocial

type TAuthSocialButtonProps = {
  onClick: () => void
  icon: IconType
}

const AuthSocialButton = ({ onClick, icon: Icon }: TAuthSocialButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "btn btn-gray",
        "w-1/2 text-xl flex justify-center items-center"
      )}
    >
      <Icon />
    </button>
  )
}
