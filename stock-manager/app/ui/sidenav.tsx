import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// import { signOut } from '@/auth'; // desativado por enquanto

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

        {/* Botão de logout desativado temporariamente */}
        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 
                    rounded-md bg-gray-50 p-3 text-sm font-medium 
                    hover:bg-sky-100 hover:text-main md:flex-none 
                    md:justify-start md:p-2 md:px-3"
          disabled
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
