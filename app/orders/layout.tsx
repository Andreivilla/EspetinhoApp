'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export const experimental_ppr = true;
export default function Layout({ 
  children 
}: Readonly<{
  children: React.ReactNode 
}>) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden p-2 ">
      <div className="w-full flex-none md:w-64">
        <div
          className="mb-2 flex h-20 items-end justify-center rounded-md bg-black p-4 md:h-40"
        >
          <div className="relative w-32 md:w-40 h-full overflow-hidden">
            <Image 
              src="/logo.png"
              alt="Logo"
              fill
              className="md:object-contain object-cover"
            />
          </div>
        </div> 
        <div className="flex grow flex-row justify-between space-x-2 
                              md:flex-col md:space-x-0 md:space-y-2"
        >
          <Link
            key={'Sair'}
            href="/"
            className={clsx(
              'flex h-[48px] w-full items-center gap-2 rounded-md', 
              'bg-gray-50 p-3 text-sm font-medium hover:border-2 hover:border-black',
              ' md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'border-2 border-black text-main': pathname === '/',
              },
            )}>
              <ArrowLeftCircleIcon className="w-6" />
              <p>Sair</p>
          </Link>              
          {/*
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 
                          md:block">
          </div>*/}
        </div>
      </div>      

      <div className="flex-grow p-1 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
