import { FormEvent, useState, useContext } from "react";
import Modal from "react-modal";
import closeIcon from "../../assets/close.svg";
import incomeIcon from "../../assets/income.svg";
import outcomeIcon from "../../assets/outcome.svg";
import { TransactionsContext } from "../../TransactionsContext";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  modalIsOpen: boolean;
  onModalClose: () => void;
}

export function NewTransactionModal({
  onModalClose,
  modalIsOpen,
}: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      amount,
      category,
      title,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");

    onModalClose();
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onModalClose}
      contentLabel="Example Modal"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onModalClose}
        className="react-modal-close"
      >
        <img src={closeIcon} alt="Fechar" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={(event) => {
            setAmount(Number(event.target.value));
          }}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeIcon} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeIcon} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
