import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { PhotoDetails } from "@/utils/photos";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Loader from "@/components/custom/loader";
import { Toaster } from "@/components/ui/toaster";

import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });
// const inter = Poppins({ subsets: ["latin"] , weight:['300','400','500','600']});

export const metadata: Metadata = {
  title: "Portfolio | PyPranav",
  description: "Portfolio of Pranav Sunil",
};

function isMobileDevice(userAgent: string) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = isMobileDevice(userAgent);
  return (
    <html lang="en">
      <head>
          {/* {PhotoDetails.certificates.map((url,id)=>(
            <link key={id} rel='preload' href={url?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')} as="image"/>
          ))}
          {PhotoDetails.personal.map((url,id)=>(
            <link key={id} rel='preload' href={url?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')} as="image"/>
          ))}
          {PhotoDetails.projects.map((url,id)=>(
            <link key={id} rel='preload' href={url?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')} as="image"/>
          ))} */}
          <base target="_blank"></base>
      </head>
      <body 
      className={inter.className}
      >
        <Loader isMobile={isMobile} />
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
