'use client';
import {
  ExclamationCircleIcon,
  HomeIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IconPicnicTable, IconNote } from '@tabler/icons-react';

const links = [
  { 
    name: 'Home', 
    href: '/stock-manager', 
    icon: HomeIcon 
  },
  {
    name: 'Pedidos',
    href: '/stock-manager/orders',
    icon: IconNote,
  },
  {
    name: 'Produtos',
    href: '/stock-manager/products',
    icon: CubeIcon,
  },
  { 
    name: 'Ultimos Produtos', 
    href: '/LastProducts', 
    icon: ExclamationCircleIcon,
  },
  {
    name: 'Mesas',
    href:'/stock-manager/tables',
    icon: IconPicnicTable,
  },

];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md', 
              'bg-gray-50 p-3 text-sm font-medium hover:border-2 hover:border-black',
              ' md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'border-2 border-black text-main': pathname === link.href,
              },
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
