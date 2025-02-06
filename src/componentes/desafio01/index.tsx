import React, { useState } from "react";
import styles from "./styles.module.css";

interface AccountData {
  balances: { balance: string }[];
}

interface LedgerData {
  sequence: number;
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
  const [loading, setLoading] = useState(false);

  const fetchAccountData = async () => {
    if (!accountId) return;
    setLoading(true);
    try {
      const response = await fetch(`https://ci.multdesk.com.br/accounts/${accountId}`);
      const result = await response.json();
      setAccountData(result);
    } catch (error) {
      console.error("Erro ao buscar dados da conta", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLedgerData = async () => {
    if (!sequence) return;
    setLoading(true);
    try {
      const response = await fetch(`https://ci.multdesk.com.br/ledgers/${sequence}`);
      const result = await response.json();
      setLedgerData(result);
    } catch (error) {
      console.error("Erro ao buscar dados do bloco", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionData = async () => {
    if (!transactionHash) return;
    setLoading(true);
    try {
      const response = await fetch(`https://ci.multdesk.com.br/transactions/${transactionHash}`);
      const result = await response.json();
      setTransactionData(result);
    } catch (error) {
      console.error("Erro ao buscar dados da transação", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Consultar Dados</h1>

      <input
        type="text"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        placeholder="Digite o ID da Conta"
        className={styles.input}
      />
      <button
        onClick={fetchAccountData}
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Carregando..." : "Buscar Saldo"}
      </button>
      {accountData && (
        <div className={styles.result}>
          <p><strong>Balance:</strong> {accountData.balances[0]?.balance || "N/A"}</p>
        </div>
      )}

      <input
        type="text"
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        placeholder="Digite o Sequence do Bloco"
        className={styles.input}
      />
      <button
        onClick={fetchLedgerData}
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Carregando..." : "Buscar Bloco"}
      </button>
      {ledgerData && (
        <div className={styles.result}>
          <p><strong>Ledger:</strong> {ledgerData.sequence}</p>
        </div>
      )}

      <input
        type="text"
        value={transactionHash}
        onChange={(e) => setTransactionHash(e.target.value)}
        placeholder="Digite o Hash da Transação"
        className={styles.input}
      />
      <button
        onClick={fetchTransactionData}
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Carregando..." : "Buscar Transação"}
      </button>
      {transactionData && (
        <div className={styles.result}>
          <p><strong>Transaction Hash:</strong> {transactionData.id}</p>
        </div>
      )}
    </div>
  );
};

export default Desafio01;
