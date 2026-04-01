'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { updateGoal } from '@/app/actions/goals'
import { BackButton } from '@/components/back-button'
import { Input } from './ui/input'

export type GoalInfo = {
  id: string
  name: string
}

type Props = {
  goal: GoalInfo
}

export function GoalDetails({ goal }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(goal.name)

  async function handleSave() {
    setIsEditing(false)
    try {
        await updateGoal(goal.id, name)
    } catch (error) {
        // Revert on error
        setName(goal.name)
        // Optionally show error message
        console.error('Failed to update goal:', error)
    }
}



  return (
        <div className="flex justify-between items-start">
          {isEditing ? <Input value={name} onChange={(e) => setName(e.target.value)} /> : <h1 className="text-2xl font-bold">{name}</h1>}
          <BackButton />
          {isEditing ? <Button size="sm" variant="default" onClick={handleSave}>Save</Button> :
          <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>}
        </div>
  )
}