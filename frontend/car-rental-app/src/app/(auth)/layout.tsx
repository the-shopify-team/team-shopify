import Image from 'next/image'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen w-full'>
        <main className='flex-1 overflow-y-auto flex justify-center items-center'>
            <div className='w-full max-w-md py-4 px-8'>{children}</div>
        </main>
        <div className='flex-1 relative overflow-hidden hidden lg:block'>
            <Image
               src="/images/auth-image.png"
               alt="Picture of a car"
               fill
               className="object-cover"
               priority
            />
        </div>
    </div>
  );
}
