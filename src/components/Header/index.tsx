import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';
import * as Dialog from '@radix-ui/react-dialog';
// Contexto do modal

import logoImg from '../../assets/logo.svg';
import { NewTransactionModal } from '../NewTransactionModal';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt=''></img>

        <Dialog.Root>
          <Dialog.Trigger
            asChild /*Propriedade para aprovetitar o botão child, em vez de criar o seu próprio botão trigger */
          >
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
