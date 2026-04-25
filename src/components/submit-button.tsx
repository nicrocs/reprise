import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

type SubmitButtonProps = {
  label?: string
  variant?: 'default' | 'warm' | 'destructive' | 'outline' | 'ghost'
}

export function SubmitButton({ label = 'Save', variant = 'warm' }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant}
      size="sm"
      className="w-fit"
    >
      {pending ? 'Saving...' : label}
    </Button>
  )
}