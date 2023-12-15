import MainLayout from "@/components/layout/MainLayout"

type TProps = {
  children: React.ReactNode
}

const UsersLayout = async ({ children }: TProps) => {
  return <MainLayout>{children}</MainLayout>
}

export default UsersLayout
