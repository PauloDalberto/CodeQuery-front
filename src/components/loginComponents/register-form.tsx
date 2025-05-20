'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from "@/schemas/RegisterSchema";
import { registerApi } from "@/services/auth/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema)
    });

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await registerApi(data.name, data.email, data.password);
      
      router.push(`/login`)  
    } catch (error) {
      console.log("Erro:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center justify-start w-full gap-2">
          <Link href={'/login'}>
            <ArrowLeft className="text-white cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-bold">Cadastre sua conta!</h1>
        </div>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seus dados abaixo para entrar na sua conta
        </p>
      </div>
      <div className="grid gap-6" >
        <div className="grid gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" placeholder="Ex: João"  {...register('name')} helperText={errors.name?.message} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="example@example.com" {...register('email')} helperText={errors.email?.message} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="senha123"  {...register('password')} helperText={errors.password?.message} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirme a senha</Label>
          <Input id="confirmPassword" type="password" placeholder="senha123"  {...register('confirmPassword')} helperText={errors.confirmPassword?.message} />
        </div>
        <Button type="submit" className="w-full">
          Registre-se
        </Button>
      </div>
    </form>
  )
}
