'use client'

import Image from 'next/image'
import Link from 'next/link'

const Links = () => {
  return (
    <div className=" w-full flex items-center justify-between  ">
      <Link
        href="/"
        className="flex items-center gap-2 max-sm-gap-1"
      >
        <Image
          src="/images/debata.png"
          alt=""
          width={54}
          height={54}
          className="rounded-full"
        />
        <h1 className="font-semibold text-xl  capitalize italic max-sm:hidden">
          PoliTy...ka
        </h1>
      </Link>

      <div className="flex items-center gap-8 mr-4 "></div>
    </div>
  )
}

export default Links
