import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";

interface AccountData {
  balances: { balance: string }[];
}

interface LedgerData {
  [key: string]: any;
}

interface TransactionData {
  id: string;
}

const Desafio01: React.FC = () => {
  const [accountId, setAccountId] = useState("");
  const [sequence, setSequence] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [ledgerData, setLedgerData] = useState<LedgerData | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [loadingLedger, setLoadingLedger] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  const fetchAccountData = async () => {
    if (!accountId) return;
    setLoadingAccount(true);
    try {
      const response = await fetch(`https://ci.multdesk.com.br/accounts/${accountId}`);
      const result = await response.json();
      if (response.status !== 200) {
        toast.error("Erro ao buscar dados da conta!");
        return;
      }
      setAccountData(result);
    } catch (error) {
      toast.error("Erro ao buscar dados da conta.");
      console.error("Erro ao buscar dados da conta", error);
    } finally {
      setLoadingAccount(false);
    }
  };

  const fetchLedgerData = async () => {
    if (!sequence) return;
    setLoadingLedger(true);
    try {
      const response = await fetch(`https://ci.multdesk.com.br/ledgers/${sequence}`);
      const result = await response.json();
      if (response.status !== 200) {
        toast.error("Erro ao buscar dados do bloco!");
        return;
      }
      setLedgerData(result);
    } catch (error) {
      toast.error("Erro ao buscar dados do bloco.");
      console.error("Erro ao buscar dados do bloco", error);
    } finally {
      setLoadingLedger(false);
    }
  };

  const fetchTransactionData = async () => {
    if (!transactionHash) return;
    setLoadingTransaction(true);
    try {
      const response = await fetch(`https://ci.multdesk.com.br/transactions/${transactionHash}`);
      const result = await response.json();
      if (response.status !== 200) {
        toast.error("Erro ao buscar dados da transação!");
        return;
      }
      setTransactionData(result);
    } catch (error) {
      toast.error("Erro ao buscar dados da transação.");
      console.error("Erro ao buscar dados da transação", error);
    } finally {
      setLoadingTransaction(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.container}>
        <h1 className={styles.title}>Consultar Dados</h1>
        <div className={styles.inputContent}>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="Digite o ID da Conta"
            className={styles.input}
          />
          <button onClick={fetchAccountData} className={styles.button} disabled={loadingAccount}>
            {loadingAccount ? "Carregando..." : "Buscar Saldo"}
          </button>
        </div>

        <div className={styles.inputContent}>
          <input
            type="text"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="Digite o Sequence do Bloco"
            className={styles.input}
          />
          <button onClick={fetchLedgerData} className={styles.button} disabled={loadingLedger}>
            {loadingLedger ? "Carregando..." : "Buscar Bloco"}
          </button>
        </div>

        <div className={styles.inputContent}>
          <input
            type="text"
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
            placeholder="Digite o Hash da Transação"
            className={styles.input}
          />
          <button onClick={fetchTransactionData} className={styles.button} disabled={loadingTransaction}>
            {loadingTransaction ? "Carregando..." : "Buscar Transação"}
          </button>
        </div>
      </div>

      <div className={styles.resultContainer}>
        {accountData && (
          <div className={styles.resultBox}>
            <h2>Dados da Conta</h2>
            <pre>{JSON.stringify(accountData, null, 2)}</pre>
          </div>
        )}

        {ledgerData && (
          <div className={styles.resultBox}>
            <h2>Dados do Bloco</h2>
            <pre>{JSON.stringify(ledgerData, null, 2)}</pre>
          </div>
        )}

        {transactionData && (
          <div className={styles.resultBox}>
            <h2>Dados da Transação</h2>
            <pre>{JSON.stringify(transactionData, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default Desafio01;
