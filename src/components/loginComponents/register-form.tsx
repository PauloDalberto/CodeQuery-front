'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GitHubSvg from "../../../public/github.svg";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();   
    router.push(`/`)
  }

  return (
    <form onSubmit={handleRegister} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Cadastre sua conta!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seus dados abaixo para entrar na sua conta
        </p>
      </div>
      <div className="grid gap-6" >
        <div className="grid gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="email" placeholder="example@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="example@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="senha123" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirme a senha</Label>
          <Input id="confirmPassword" type="password" placeholder="senha123" required />
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
