"use client"

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

import { DottedSeparator } from "@/components/dotted-separator";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl ,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import{ useForm } from "react-hook-form";
import { registerSchema } from "../schema";
import { useRegister } from "../api/use-register";

export const SignUpCard = () => { 
  const { mutate } = useRegister(); 

  const form = useForm<z.infer<typeof registerSchema>>({
          resolver: zodResolver(registerSchema),
          defaultValues: {
              name: "",
              email: "",
              password: "",
          }
      })
  
    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        mutate({json: values});
    }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex item-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>By Signing up, you agree yo our {" "}
          <Link href="/privacy">
            <span className="text-blue-700">Privacy Policy</span>
          </Link>{" "}
          and{""}
          <Link href="/terms">
            <span className="text-blue-700">Terms of service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField 
              name="name"
              control={form.control}
              render={({ field }) => (
                  <FormItem>
                      <FormControl>
                          <Input 
                              {...field}
                              type="text"
                              placeholder="Enter your name"
                          />
                      </FormControl>
                      <FormMessage />
                  </FormItem>)}
              />
              <FormField 
              name="email"
              control={form.control}
              render={({ field }) => (
                  <FormItem>
                      <FormControl>
                          <Input 
                              {...field}
                              type="email"
                              placeholder="Enter email"
                          />
                      </FormControl>
                      <FormMessage />
                  </FormItem>)}
              />
              <FormField 
              name="password"
              control={form.control}
              render={({ field }) => (
                  <FormItem>
                      <FormControl>
                          <Input 
                              {...field}
                              type="password"
                              placeholder="Enter password"
                          />
                      </FormControl>
                      <FormMessage />
                  </FormItem>)}
              />
              <Button disabled={false} size="lg" className="w-full">Sign Up</Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
        disabled={false} 
        variant= "secondary"
        size= "lg"
        className="w-full">
            <FcGoogle className="size-5 mr-2"/>
            Login with Google
        </Button>
                <Button
        disabled={false} 
        variant= "secondary"
        size= "lg"
        className="w-full">
            <FaGithub className="size-5 mr-2"/>
            Login with GitHub
        </Button>
        </CardContent>
        <div className="px-7"><DottedSeparator/></div>
        <CardContent className="p-7 flex items-center justify-center">
            <p>Already have an account?<Link href="/sign-in"><span className="text-blue-700">&nbsp;Sign In</span></Link></p>
        </CardContent>
    </Card>
  );
};
