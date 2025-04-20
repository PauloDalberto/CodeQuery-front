"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Repo = {
  id: number
  name: string
  description: string
  html_url: string
}

export function GitHubRepoSearch() {
  const [username, setUsername] = useState("")
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!username) return
    setLoading(true)

    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`)
      const data = await res.json()

      if (Array.isArray(data)) {
        setRepos(data)
      } else {
        setRepos([])
      }
    } catch (err) {
      console.error("Erro ao buscar repositórios:", err)
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 px-6">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Digite o nome de usuário do GitHub..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <Card key={repo.id} className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4">
              <p className="font-semibold">{repo.name}</p>
              <p className="text-sm text-muted-foreground">
                {repo.description || "Sem descrição"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
