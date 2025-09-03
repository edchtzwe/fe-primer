import styles from "./page.module.css";
import TxnsTable from "@/components/TxnsTable";

const txns = [
    // Same date group: 2022-11-05
    { date: '2022-11-05', description: 'Groceries - Market A', amount: 120.5 },
    { date: '2022-11-05', description: 'Fuel - Station B', amount: 75.0 },
    { date: '2022-11-05', description: 'Utilities - Electricity', amount: 300.0 },

    // Same amount group: 99.99
    { date: '2019-06-14', description: 'Online Purchase - Gadget', amount: 99.99 },
    { date: '2020-09-01', description: 'Gift - Store C', amount: 99.99 },
    { date: '2023-01-20', description: 'Subscription - Annual', amount: 99.99 },
    { date: '2024-12-31', description: 'Party Supplies', amount: 99.99 },

    // Diverse rows across months/years
    { date: '2019-01-02', description: 'Coffee - Cafe X', amount: 15.25 },
    { date: '2019-12-15', description: 'Electronics - Headphones', amount: 450.0 },
    { date: '2020-02-29', description: 'Leap Day Special', amount: 85.75 },
    { date: '2020-07-04', description: 'Outdoor Gear', amount: 220.1 },
    { date: '2021-01-01', description: 'New Year Membership', amount: 1000.0 },
    { date: '2021-05-17', description: 'Books - Local Store', amount: 64.35 },
    { date: '2021-12-31', description: 'Year-End Donation', amount: 510.0 },
    { date: '2022-03-08', description: 'Snacks', amount: 5.99 },
    { date: '2022-08-23', description: 'Home Supplies', amount: 42.42 },
    { date: '2023-04-15', description: 'Appliances - Mixer', amount: 275.5 },
    { date: '2023-09-09', description: 'Streaming Service', amount: 33.33 },
    { date: '2024-01-26', description: 'Australia Day BBQ', amount: 799.0 },
    { date: '2024-05-05', description: 'Garden Tools', amount: 123.45 },
    { date: '2024-07-30', description: 'Workshop Fee', amount: 67.89 },
    { date: '2025-02-14', description: 'Valentine Gift', amount: 200.0 },
    { date: '2025-06-01', description: 'Winter Clothing', amount: 999.99 },
    { date: '2025-08-15', description: 'School Supplies', amount: 58.0 },
    { date: '2025-12-25', description: 'Christmas Dinner', amount: 150.0 },
  ];

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Transactions</h1>
      <main className={styles.main}>
        <TxnsTable txns={txns} />
      </main>
    </div>
  );
}
