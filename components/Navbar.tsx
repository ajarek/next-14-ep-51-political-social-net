import Logout from './Logout'
import Links from '@/components/Links'
import { ModeToggle } from '@/components/ModeToggle'
import { auth } from '@/app/api/auth/auth'
import Link from 'next/link'

const Navbar = async () => {
  const session = await auth()
  const { user } = (session as any) || {}
  return (
    <div className="h-16 w-full  flex justify-between items-center gap-4  px-8 max-sm:px-2 border-b-2 ">
      <div className=" flex items-center gap-2 ">
        <Links />

        {user?.admin && (
          <Link
            href="/dashboard"
            className={`flex items-center gap-4 hover:text-primary focus:text-primary focus:underline  rounded-sm px-4 py-1 transition text-xl`}
          >
            Dashboard
          </Link>
        )}
      </div>
      <div className=" flex justify-between items-center italic gap-6 ">
        <Logout session={session} />
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
