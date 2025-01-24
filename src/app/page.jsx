"use client"

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current"
import { useLogout } from "@/features/auth/api/use-logout";
import { UserButton } from "@/features/auth/components/user-button";
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const route = useRouter();
  const {data, isLoading} = useCurrent();
  const {mutate} = useLogout();

  useEffect(() => {
    if(!data && !isLoading) {
      route.push("/sign-in");
    }
  },[data]);

  return(
    <div>
      <UserButton />
      Only visible to authorzied users.
      <Button onClick={() => mutate}>Logout</Button>
    </div>
  )
}