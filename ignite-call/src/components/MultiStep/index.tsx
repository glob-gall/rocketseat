import Step from "./Step"

export type MultiStepProps = {
  size: number
  currentStep?: number
  className?:string
}

export default function MultiStep({ size, currentStep = 1, className }: MultiStepProps) {
  return (
    <div className={className}> 
      <span>
        Passo {currentStep} de {size}
      </span>

      <div className="flex gap-1 mb-1">
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return <Step key={step} active={currentStep >= step}  />
        })}
      </div>
    </div>
  )
}