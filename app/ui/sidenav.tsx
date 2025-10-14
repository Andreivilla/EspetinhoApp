import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import Image from 'next/image';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-center rounded-md bg-black p-4 md:h-40"
        href="/"
      >
        <div className="relative w-32 md:w-40 h-full overflow-hidden">
          <Image 
            src="/logo.png"
            alt="Logo"
            fill
            className="md:object-contain object-cover"
          />
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 
                        md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 
                        md:block">
        </div>
      </div>
    </div>
  );
}
