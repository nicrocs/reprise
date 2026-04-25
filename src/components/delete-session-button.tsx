'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
import { deleteSession } from '@/app/actions/sessions'
import { Trash2 } from 'lucide-react'

export function DeleteSessionButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    await deleteSession(id)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-muted-foreground hover:text-destructive hover:bg-transparent shrink-0"
      >
        <Trash2 size={16} />
      </Button>
      <ConfirmDeleteDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Session"
        description="Are you sure you want to delete this session? This action cannot be undone."
        onConfirm={handleDelete}
      />
    </>
  )
}