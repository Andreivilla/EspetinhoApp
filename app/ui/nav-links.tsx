'use client';
import {
  HomeIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IconNote, IconCheck, IconNoteOff } from '@tabler/icons-react';


function OrderCheckIcon() {
  return (
    <div className="relative w-6 h-6">
      <IconCheck className="absolute bottom-0 right-1.5 w-6 h-6" />
      <IconNote className="absolute top-0 left-0 w-6 h-6 text-gray-700" />      
    </div>
  );
}

const links = [
  { 
    name: 'Home', 
    href: '/stock-manager', 
    icon: HomeIcon 
  },
  {
    name: 'Pedidos em Aberto',
    href: '/stock-manager/orders/open',
    icon: IconNote,
  },
  {
    name: 'Pedidos Concluidos',
    href: '/stock-manager/orders/finish',
    icon: OrderCheckIcon,
  },
  {
    name:'Pedidos Cancelados',
    href: '/stock-manager/orders/cancel',
    icon: IconNoteOff,
  },
  {
    name: 'Produtos',
    href: '/stock-manager/products',
    icon: CubeIcon,
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
