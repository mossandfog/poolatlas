import Link from "next/link"
import { EDITOR } from "@/lib/editor"

/** Small "Edited by Ben VanderVeen" credit that links to the editor's note. */
export function EditedBy({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      Edited by{" "}
      <Link href={EDITOR.page} className="underline decoration-current/30 underline-offset-2 hover:text-primary hover:decoration-primary">
        {EDITOR.name}
      </Link>
    </span>
  )
}
