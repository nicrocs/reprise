'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createGoals } from '@/app/actions/goals'


export default function NewGoalsPage() {
  const [saving, setSaving] = useState<boolean>(false)
  const [rows, setRows] = useState<{ id: string, name: string }[]>([{id: "1", name: ""}])
  const [nextId, setNextId] = useState<string>("2")

  const handleAddRow = () => {
    setRows((rows) => [...rows, {id: nextId, name: ''}])
    setNextId(nextId + 1)
  }

  const handleRemoveRow = (id: string) => {
    const newRows = rows.filter(row => row.id !== id)
    setRows(newRows)
  }

  const handleNameChange = (id: string, name: string) => {
    const newRows = rows.map((row) => {
        if (id === row.id) {
            row.name = name;
        }
        return row
    })
    setRows(newRows)
  }
  

  async function handleSave() {
    setSaving(true)
    const names = rows
        .map(row => row.name.trim())
        .filter(name => name !== '')
    
    await createGoals(names)
    // redirect happens in the action
    }

  return (
    <main className="max-w-xl mx-auto p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">New Goals</h1> 
      </div>


      {/* Song */}
      <div className="space-y-2">
        {rows.map((row, index) => {
            return (<div key={row.id}>
                <Label className="text-base font-semibold">Name</Label>
                <Input value={row.name} name="name" onChange={(e) => handleNameChange(row.id, e.target.value)}/>
                {index > 0 && <Button onClick={() => handleRemoveRow(row.id)}>Remove Row</Button>}
            </div>)
        })}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleAddRow}
      >
        Add Another Goal
      </Button>
      </div>


      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => handleSave()}
          disabled={rows.filter((row) => row.name.length).length === 0 || saving}
          size="lg"
          className="w-full"
        >
            Save Goals
        </Button>
      </div>
    </main>
  )
}
