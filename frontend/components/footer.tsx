export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t-2 border-border bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} study-track. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
