'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { loginApi } from "@/services/auth/auth";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from "@/schemas/LoginSchema";
import { AuthContext } from "@/contexts/AuthContext";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [loginError, setLoginError] = useState(false);

  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const result = await loginApi(data.email, data.password);

      signIn(result.user.name, data.email);
    } catch (err) {
      console.error("Entrou no catch:", err);
      setLoginError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entre na sua conta!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seus dados abaixo para entrar na sua conta
        </p>
      </div>
      <div className="grid gap-6" >
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="example@example.com" {...register('email')} helperText={errors.email?.message} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input id="password" type="password" placeholder="senha123"  {...register('password')} helperText={errors.password?.message}/>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
        </div>

        {loginError && (
          <div className="text-red-600">
            Ocorreu erro ao realizar o login!
          </div>
        )}

        <Button type="submit" className="w-full">
          Login
        </Button>

      </div>
      <div className="text-center text-sm">
        Não tem conta?{" "}
        <a href="/register" className="underline underline-offset-4">
          Registre-se
        </a>
      </div>
    </form>
  )
}

