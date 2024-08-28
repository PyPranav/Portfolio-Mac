import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { PhotoDetails } from "@/utils/photos";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });
// const inter = Poppins({ subsets: ["latin"] , weight:['300','400','500','600']});

export const metadata: Metadata = {
  title: "Portfolio | PyPranav",
  description: "Portfolio of Pranav Sunil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
          {PhotoDetails.certificates.map((url,id)=>(
            <link key={id} rel='preload' href={url?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')} as="image"/>
          ))}
          {PhotoDetails.personal.map((url,id)=>(
            <link key={id} rel='preload' href={url?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')} as="image"/>
          ))}
          {PhotoDetails.projects.map((url,id)=>(
            <link key={id} rel='preload' href={url?.replace('.jpg','.webp')?.replace('.png','.webp')?.replace('.jpeg','.webp')} as="image"/>
          ))}
      </head> */}
      <body 
      className={inter.className}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
