import Image from "next/image";
import Link from "next/link";
import { images } from "@/config/images";

interface LogoProps {
  variant?: "full" | "compact";
  className?: string;
}

export function Logo({ variant = "compact", className = "" }: LogoProps) {
  if (variant === "full") {
    return (
      <Link href="#home" className={`block ${className}`}>
        <Image
          src={images.brand.logo}
          alt="SAF Malabar Energy"
          width={280}
          height={120}
          className="h-auto w-full max-w-[280px] object-contain"
          priority
        />
      </Link>
    );
  }

  return (
    <Link href="#home" className={`group block ${className}`}>
      <Image
        src={images.brand.logo}
        alt="SAF Malabar Energy"
        width={160}
        height={48}
        className="h-10 w-auto object-contain transition-transform group-hover:scale-105 sm:h-12"
        priority
      />
    </Link>
  );
}
