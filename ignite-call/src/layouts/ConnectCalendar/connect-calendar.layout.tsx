import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { ToggleTheme } from '@/components/ToggleTheme';
import MultiStep from '@/components/MultiStep';
import ConnectGoogleCalendar from './ConnectGoogleCalendar';
import { getSession } from './get-session';



export default async function RegisterLayout() {
  const session = await getSession()  
  
  return (
    <div className="flex items-center justify-center h-screen relative p-4">
      
      <div className='absolute top-2 right-2'>
        <ToggleTheme/>
      </div>

      <div className="md:max-w-2xl">
        <Heading className='text-2xl'>Conecte sua agenda!</Heading>
        <Text className='mb-8'>
        Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} className='mb-3'/>
        <ConnectGoogleCalendar hasUser={!!session?.user}/>
      </div>

    </div>
    
  );
}
