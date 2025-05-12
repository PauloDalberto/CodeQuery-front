"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { userGitHubApi } from "@/services/github/github"
import { useRepoContext } from "@/contexts/RepoContext"

type Repo = {
  id: number
  name: string
  description: string
  html_url: string
}

export function GitHubRepoSearch() {
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { setRepo, setUsername } = useRepoContext();
  
  const roomName = params?.conversation as string;

  const router = useRouter();

  const handleSearch = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const response = await userGitHubApi(user);

      if (Array.isArray(response)) {
        setRepos(response);
      } else {
        setRepos([]);
      }
    } catch (err) {
      console.error("Erro ao buscar repositórios:", err);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectRepo = async (repoName: string) => {
    setRepo(repoName);
    setUsername(user)
    router.push(`/repo/room/${roomName}/mode`);
  }

  return (
    <div className="flex flex-col gap-6 px-6">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Digite o nome de usuário do GitHub..."
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(); 
            }
          }}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <Card
            key={repo.id}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleSelectRepo(repo.name)}
          >
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
