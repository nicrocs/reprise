'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
import { deleteSession } from '@/app/actions/sessions'

export function DeleteSessionButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    await deleteSession(id)
  }

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Delete
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