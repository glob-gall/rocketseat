
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { ToggleTheme } from '@/components/ToggleTheme';
import RegisterForm from './RegisterForm'
import MultiStep from '@/components/MultiStep';

export default function RegisterLayout() {
  return (
    <div className="flex items-center justify-center h-screen relative p-4">
      
      <div className='absolute top-2 right-2'>
        <ToggleTheme/>
      </div>

      <div className="md:max-w-2xl">
        <Heading className='text-2xl'>Bem-vindo ao Ignite Call!</Heading>
        <Text className='mb-8'>
        Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} className='mb-3'/>
        <RegisterForm/>
      </div>

    </div>
    
  );
}
