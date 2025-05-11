import { ThemeProvider } from "@/components/theme/themeProvides";
import { AuthProvider } from "./AuthContext";
import { ConversationProvider } from "./ConversationContext";

interface RootContextProps {
  children: React.ReactNode
}

export default function RootContextProvider({ children }: RootContextProps){
  return(
    <AuthProvider>
      <ConversationProvider>
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </ConversationProvider>
    </AuthProvider>
  )

}