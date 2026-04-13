import Summary from "./components/summary";
import IssuesTable from "./components/issues-table";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Summary />
      <IssuesTable />
    </main>
  );
}
