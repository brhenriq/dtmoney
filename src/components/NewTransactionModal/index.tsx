import Modal from "react-modal";
import { Container } from "./styles";

interface NewTransactionModalProps{
  modalIsOpen: boolean;
  onModalClose: () => void;
}

export function NewTransactionModal({onModalClose,modalIsOpen}: NewTransactionModalProps) {
  return (
    <Modal
      isOpen={modalIsOpen}  
      onRequestClose={onModalClose}
      contentLabel="Example Modal"
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >

      <Container>
        <h2>Cadastrar transação</h2>
        
        <input placeholder="Título" />
        <input placeholder="Valor" type='number' />
        <input placeholder="Categoria" type='number' />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}