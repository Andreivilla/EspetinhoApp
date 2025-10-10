import SideNav from '@/app/ui/sidenav';
import Link from 'next/link';
import Image from 'next/image';
export const experimental_ppr = true;
export default function Layout({ children }: { children: React.ReactNode }) {
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
      </div>      

      <div className="flex-grow p-1 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
