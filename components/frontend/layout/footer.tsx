import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="bg-red-50 py-10 px-10 flex flex-col max-sm:px-2 mt-16">
      <div className="flex flex-wrap py-8 gap-16 items-start justify-center">
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={150} height={59} />
        </Link>
        <div className="space-y-3">
          <p className="text-heading3-bold">Contact</p>
          <p className="text-base-bold">+1+86 852 346 000</p>
          <p className="text-base-bold">hello@lexkitchen.com</p>
        </div>
        <div className="space-y-3">
          <p className="text-heading3-bold">Never Miss a Menu</p>
          <div className="flex gap-2">
            <Input className="bg-transparent border-gray-700 rounded-none" />
            <Button type="button" className="rounded-none">Subscribe</Button>
          </div>
          <p className="text-xs">Join our subscribers and get best recipe delivered each week!</p>
        </div>
      </div>
      <div className="w-full px-10 my-5 border-b border-dashed border-gray-500" />
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Lexi Kitchen. All Rights Reserved.</p>
        <div className="flex items-center gap-3">
          <Link href="https://instagram.com/" target="_blank">
            <Image src="/icons/instagram.svg" alt="instagram" className="bg-red-500 p-1.5 rounded-full" width={32} height={32} />
          </Link>
          <Link href="https://facebook.com/" target="_blank">
            <Image src="/icons/facebook.svg" alt="facebook" className="bg-blue-900 p-1.5 rounded-full" width={32} height={32} />
          </Link>
          <Link href="https://twitter.com/" target="_blank">
            <Image src="/icons/twitter.svg" alt="twitter" className="bg-blue-500 p-1.5 rounded-full" width={32} height={32} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer