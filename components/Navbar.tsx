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
      <div className=" w-full flex items-center gap-2 justify-between ">
        <Links />

        {user && (
          <Link
            href="/dashboard"
            className={`min-w-fit flex items-center justify-end  hover:bg-primary hover:text-primary-foreground  rounded-sm px-4 py-2 transition `}
          >
            Moje artykuły
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
