// import { Heading, Text } from "@ignite-ui/react";

import Heading from '@/components/Heading';
import Text from '@/components/Text';
// import PreviweImage from './home-img.jpg'
import Image from "next/image";
import ClaimUsernameForm from './ClaimUsernameForm';
import { ToggleTheme } from '@/components/ToggleTheme';

export default function HomeLayout() {
  return (
    <div className="flex items-center gap-5 justify-center h-screen  flex-wrap pl-8 relative">
      
      <div className='absolute top-2 right-2'>
        <ToggleTheme/>
      </div>

      <div className="md:max-w-2xl not-md:pr-8">
        <Heading>Agendamento Descomplicado</Heading>
        <Text className='mb-8'>
          Conecte seu calendário e permita que as pessoas marquem agendamentos 
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm/>
      </div>

      <div className="flex-1">
        <Image 
          className='ml-auto min-w-60'
          src='/home-img.png' 
          height={400} 
          width={600} 
          quality={100}
          priority
          alt="Calendário" 
        />
      </div>

    </div>
    
  );
}
