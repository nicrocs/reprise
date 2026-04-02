'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
import { deleteGoal } from '@/app/actions/goals'

export function DeleteGoalButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    await deleteGoal(id)
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
        title="Delete Goal"
        description="Are you sure you want to delete this goal? This action cannot be undone."
        onConfirm={handleDelete}
      />
    </>
  )
}