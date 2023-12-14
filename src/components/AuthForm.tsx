"use client"

import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"
import { authFormSchema } from "@/lib/zodSchemas"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import type { TAuthForm } from "@/lib/zodSchemas"

type TFormVariant = "SIGN_UP" | "SIGN_IN"

const inputClasses =
  "px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 placeholder-inherit text-inherit"

const AuthForm = () => {
  const [formVariant, setFormVariant] = useState<TFormVariant>("SIGN_IN")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TAuthForm>({
    resolver: zodResolver(authFormSchema),
  })

  const router = useRouter()

  const onSubmit = async (data: FieldValues) => {
    /** SIGN_UP */
    if (formVariant === "SIGN_UP") {
      const API_URL = `/api/register`

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })

        const responseData = await response.json()
        console.log("responseData", responseData)

        if (responseData.errors) {
          Object.entries(responseData.errors).forEach(([key, value]) => {
            setError(key as keyof TAuthForm, {
              type: "server",
              message: value as string,
            })
            // notify user
            toast.warning(value as string)
          })
        } else {
          const { user, message } = responseData
          // TODO: store user in local storage ?
          console.log("user", user)
          // notify user
          toast.success(message)
          // reset form
          reset()
          // redirect to conversations page
          router.push("/conversations")
        }
      } catch (error) {
        console.error("error", error)
        // notify user
        toast.warning("Something went wrong, please try again")
      }
    } else if (formVariant === "SIGN_IN") {
      /** SIGN_IN */
      // signIn("credentials", { ...data, callbackUrl: "/conversations" })
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            // notify user
            toast.error("Invalid credentials, please try again")
          } else if (callback?.ok) {
            // reset form
            reset()
            // notify user
            toast.success("You logged in successfully!")
            // redirect to conversations page
            router.push("/conversations")
          }
        })
        .catch((error) => {
          console.error("error", error)
          // notify user
          toast.warning("Something went wrong, please try again")
        })
    }
  }

  return (
    <div className='text-gray-500 w-full flex flex-col items-center'>
      <h1 className='my-2 text-xl font-semibold tracking-tight'>
        {formVariant === "SIGN_UP" ? "Sign up" : "Sign in to your account"}
      </h1>

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-full mx-auto gap-y-4 '
      >
        <input
          {...register("email")}
          type='email'
          autoFocus
          placeholder='Email'
          className={inputClasses}
        />
        {errors.email && (
          <p className='text-red-500'>{`${errors.email.message}`}</p>
        )}

        {formVariant === "SIGN_UP" ? (
          <>
            <input
              {...register("name")}
              type='text'
              placeholder='Name'
              className={inputClasses}
            />
          </>
        ) : null}

        <input
          {...register("password")}
          type='password'
          placeholder='Password'
          className={inputClasses}
        />
        {errors.password && (
          <p className='text-red-500'>{`${errors.password.message}`}</p>
        )}
        <input
          {...register("confirmedPassword")}
          type='password'
          placeholder='Confirm password'
          className={inputClasses}
        />
        {errors.confirmedPassword && (
          <p className='text-red-500'>{`${errors.confirmedPassword.message}`}</p>
        )}
        <button
          type='submit'
          disabled={isSubmitting}
          className={twMerge("btn", isSubmitting ? "bg-gray-400" : "btn-blue")}
        >
          {formVariant === "SIGN_UP" ? "Sign up" : "Sign in"}
        </button>
      </form>

      {/* toggle signin/signup */}
      <div className='my-4 flex gap-x-2 text-gray-500  text-sm'>
        <h2 className='font-semibold'>
          {formVariant === "SIGN_UP"
            ? "Already have an account ?"
            : "New to Messenger ?"}
        </h2>
        <button
          onClick={() =>
            setFormVariant((prev) => {
              return prev === "SIGN_UP" ? "SIGN_IN" : "SIGN_UP"
            })
          }
        >
          <span className='underline underline-offset-2 hover:decoration-blue-600 transition duration-300 ease-in-out'>
            {formVariant === "SIGN_UP" ? "Sign in" : "Create an account"}
          </span>
        </button>
      </div>
    </div>
  )
}

export default AuthForm
