import './App.css'
import TxnsTable from '@/components/TxnsTable';

function App() {
  const txns = [
    { id: '1', date: '2024-01-15', description: 'Coffee at Starbucks', amount: 4.50 },
    { id: '2', date: '2024-01-15', description: 'Lunch at subway', amount: 12.99 },
    { id: '3', date: '2024-01-15', description: 'Gas station fill-up', amount: 45.00 },
    { id: '4', date: '2024-01-16', description: 'Grocery shopping', amount: 89.50 },
    { id: '5', date: '2024-01-17', description: 'Movie tickets', amount: 25.00 },
    { id: '6', date: '2024-01-18', description: 'Online subscription', amount: 25.00 },
    { id: '7', date: '2024-01-19', description: 'Restaurant dinner', amount: 25.00 },
    { id: '8', date: '2024-01-20', description: 'Book purchase', amount: 15.99 },
    { id: '9', date: '2024-01-21', description: 'Pharmacy items', amount: 32.75 },
    { id: '10', date: '2024-01-22', description: 'Parking fee', amount: 8.00 },
    { id: '11', date: '2024-01-23', description: 'Taxi ride', amount: 18.50 },
    { id: '12', date: '2024-01-24', description: 'Hardware store', amount: 67.25 },
    { id: '13', date: '2024-01-25', description: 'Clothing purchase', amount: 125.00 },
    { id: '14', date: '2024-01-26', description: 'Gym membership', amount: 40.00 },
    { id: '15', date: '2024-01-27', description: 'Phone bill', amount: 55.99 }
  ];

  return (
    <>
      <TxnsTable txns={txns} />
    </>
  )
}

export default App
