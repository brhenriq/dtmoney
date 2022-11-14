import { Container } from "./styles";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../../TransactionsContext";

export function Summary() {
  const [incomeValue, setIncomeValue] = useState(0);
  const [outcomeValue, setOutcomeValue] = useState(0);
  const [totalValue, setTotalValues] = useState(0);

  const { transactions } = useContext(TransactionsContext);

  useEffect(() => {
    setIncomeValue(0);
    setOutcomeValue(0);
    setTotalValues(0);

    let income = 0;
    let outcome = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "withdraw") outcome += transaction.amount;
      if (transaction.type === "deposit") income += income + transaction.amount;
    });

    const total = income - outcome;

    setIncomeValue(income);
    setOutcomeValue(outcome);
    setTotalValues(total);
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(incomeValue)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(outcomeValue)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalValue)}
        </strong>
      </div>
    </Container>
  );
}
