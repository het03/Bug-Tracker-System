import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-2 items-center">
      <Image src="/logo.svg" alt="logo" width={164} height={48} />
    </Link>
  );
};

export default Logo;
