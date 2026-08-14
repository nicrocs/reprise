'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
import { deleteSessionTemplate } from '@/app/actions/session-templates'

export function DeleteTemplateButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    await deleteSessionTemplate(id)
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
        title="Delete Template"
        description="Are you sure you want to delete this template? Past sessions that used it will keep their data, but will no longer show the template name."
        onConfirm={handleDelete}
      />
    </>
  )
}
