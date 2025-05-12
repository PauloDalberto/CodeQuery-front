import { ThemeProvider } from "@/components/theme/themeProvides";
import { AuthProvider } from "./AuthContext";
import { ConversationProvider } from "./ConversationContext";
import { RepoProvider } from "./RepoContext";

interface RootContextProps {
  children: React.ReactNode
}

export default function RootContextProvider({ children }: RootContextProps){
  return(
    <AuthProvider>
      <ConversationProvider>
        <RepoProvider>
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </RepoProvider>
      </ConversationProvider>
    </AuthProvider>
  )

}