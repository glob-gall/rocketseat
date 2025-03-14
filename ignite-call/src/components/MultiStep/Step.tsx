import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "flex-1 h-1 rounded-md",
  {
    variants: {
      active: {
        true:
          "bg-green-500",
        false:
          "bg-secondary",
        
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

interface StepProps extends VariantProps<typeof buttonVariants> {}

export default function Step({active}:StepProps) {
  return (
    <div 
      className={buttonVariants({ active})}

    />
  )
}