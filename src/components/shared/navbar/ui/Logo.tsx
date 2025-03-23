import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={'/'} className="flex justify-center w-full">
      <Image src="/logo/logo.webp" width={75} height={75} alt="sabzlearn logo" />
    </Link>
  );
};

export default Logo;