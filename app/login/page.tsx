import { Terminal } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Terminal className="size-4" />
          </div>
          sepsu<span className="text-primary">.dev</span>
          <span className="text-xs font-mono text-muted-foreground">/admin</span>
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
