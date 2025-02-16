import { useState, useEffect } from 'react';
import api from '../APIClient';
import Header from '../components/Header';

function YourSavings() {
  const [report, setReport] = useState('');
  const [totalSavings, setTotalSavings] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSavingsReport();
  }, []);

  const fetchSavingsReport = async () => {
    setLoading(true);
    try {
      const purchasedItems = await api.getPurchasedItems("2");
      const user = await api.getUserById("2");
      const response = await api.generateSavingsReport({
        userName: `${user.first_name} ${user.last_name}`,
        items: purchasedItems,
      });
      setReport(response.savingsReport);
      setTotalSavings(response.totalSavings);
    } catch (err) {
      console.error('Failed to get savings report:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header heading="Your Savings" />
      <main className="flex flex-col items-center p-6">
        {/* <h1 className="text-2xl font-bold mb-4">Savings Summary</h1> */}
        {loading ? (
          <p>Loading your savings report...</p>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
            {/* <h2 className="text-lg font-semibold">Total Savings: ${totalSavings}</h2> */}
            <div dangerouslySetInnerHTML={{ __html: report }} />
          </div>
        )}
      </main>
    </div>
  );
}

export default YourSavings;
