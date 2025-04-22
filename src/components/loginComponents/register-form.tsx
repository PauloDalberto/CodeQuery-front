'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GitHubSvg from "../../../public/github.svg";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from "@/schemas/RegisterSchema";
import { registerApi } from "@/services/auth/auth";

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
        <h1 className="text-2xl font-bold">Cadastre sua conta!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seus dados abaixo para entrar na sua conta
        </p>
      </div>
      <div className="grid gap-6" >
        <div className="grid gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" placeholder="example@example.com"  {...register('name')} helperText={errors.name?.message} />
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
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Ou continue com
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <GitHubSvg />
          Login com GitHub
        </Button>
      </div>
    </form>
  )
}
