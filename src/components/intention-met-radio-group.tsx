'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

type Props = {
  value?: boolean | null
  onChange: (intentionMet: boolean | null) => void
}

export function IntentionMetRadioGroup({ value, onChange }: Props) {
  const toStringValue = (v: boolean | null | undefined) =>
    v === true ? 'true' : v === false ? 'false' : ''

  const stringValue = toStringValue(value)

  // const [value, setValue] = useState(toStringValue(defaultValue))
  const handleChange = (v: string) => {
    const intentionMet = v === 'true' ? true : v === 'false' ? false : null 
    onChange(intentionMet)
  }

  return (
    <>
      <RadioGroup value={stringValue} onValueChange={handleChange} className="flex gap-6">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="true" id="met-yes" />
          <Label htmlFor="met-yes">Yes</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="false" id="met-no" />
          <Label htmlFor="met-no">No</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="" id="met-unsure" />
          <Label htmlFor="met-unsure">Not sure</Label>
        </div>
      </RadioGroup>
    </>
  )
}