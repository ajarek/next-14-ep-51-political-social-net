import Image from 'next/image'
import Link from 'next/link'
import { Rocket } from 'lucide-react'
const Hero = () => {
  return (
    <div className='w-3/4 max-lg:w-full grid grid-cols-[1fr,_3fr] gap-8 items-center justify-center border-2 p-4 rounded-lg'>
        
    <Image
      src={'/images/debata.png'}
      alt="logo"
      width={100}
      height={100}
      className='rounded-full'
    />
    <div className="flex flex-col  gap-4">
    <h1 className='text-4xl font-bold'>Witamy na stronie PoliTY...ka</h1>
    <p>Dołącz do społeczności, twórz i dziel się swoimi przemyśleniami.</p>
     <Link href={'/register'} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-sm w-fit self-end"><Rocket />Wystartuj</Link>
    </div>
  </div>
  )
}

export default Hero