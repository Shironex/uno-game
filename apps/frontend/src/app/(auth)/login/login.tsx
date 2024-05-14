"use client";
import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "./_components/validation";

const Login = () => {
  const form = useForm<LoginInput>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: () => void = form.handleSubmit(
    async (data: LoginInput) => {
      console.log(data);

    }
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Log In</CardTitle>
        <CardDescription>
          Log in to your account to access uno game
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4" action={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="email@example.com"
                      autoComplete="email"
                      type="email"
                      data-cy="email-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage data-cy="error-message-email" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      required
                      placeholder="********"
                      autoComplete="current-password"
                      data-cy="password-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage data-cy="error-message-password" />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap justify-between">
              <Button variant={"link"} size={"sm"} className="p-0" asChild>
                <Link href='/register'>
                  Not signed up? Sign up now.
                </Link>
              </Button>
              <Button
                variant={"link"}
                size={"sm"}
                className="p-0"
                disabled
                data-cy="forgot-password-btn"
              >
                <Link href={"#"}>Forgot password?</Link>
              </Button>
            </div>

            <SubmitButton className="w-full" data-cy="login-btn">
              Log In
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
