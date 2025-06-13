import "./App.css"
import { ClientLayout } from "@/app/layouts/client-layout.tsx"

interface AppProps {
  children?: React.ReactNode
}

const App = ({ children }: AppProps) => {
  return <ClientLayout>{children}</ClientLayout>
}

export default App
