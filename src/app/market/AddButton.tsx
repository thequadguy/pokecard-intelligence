'use client'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function AddButton({
  action,
  label,
  className
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => Promise<any>
  label: string
  className: string
}) {
  const router = useRouter()

  return (
    <button
      className={className}
      onClick={async () => {
        const res = await action()
        if (res?.error) {
          toast.error(res.error)
          if (res.error.includes('logged in')) {
            router.push('/login')
          }
        } else {
          toast.success('Successfully added!')
        }
      }}
    >
      {label}
    </button>
  )
}
