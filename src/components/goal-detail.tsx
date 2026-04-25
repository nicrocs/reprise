'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { updateGoal } from '@/app/actions/goals'
import { BackButton } from '@/components/back-button'
import { Input } from './ui/input'
import { DeleteGoalButton } from './delete-goal-button'

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
  <div>
    <BackButton />
    <div className="flex items-center justify-between mt-1">
      {isEditing 
        ? <Input value={name} onChange={(e) => setName(e.target.value)} className="text-xl font-semibold" />
        : <h1 className="text-xl font-semibold">{name}</h1>
      }
      <div className="flex items-center gap-2">
        {isEditing 
          ? <Button size="sm" variant="warm" onClick={handleSave}>Save</Button>
          : <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>Edit</Button>
        }
        <DeleteGoalButton id={goal.id} />
      </div>
    </div>
  </div>
)
}
