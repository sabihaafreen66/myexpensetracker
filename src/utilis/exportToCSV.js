// // exportToCSV.js

// export const exportToCSV = (data, filename) => {
//     const csvContent = "data:text/csv;charset=utf-8," 
//         + data.map(row => row.join(",")).join("\n");
    
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", filename);
//     document.body.appendChild(link);
//     link.click();
// };
// exportToCSV.js

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const exportToCSV = async (filename) => {
  try {
    const expensesSnapshot = await getDocs(collection(db, 'expenses'));
    const expenses = expensesSnapshot.docs.map((doc) => doc.data());

    const csvContent = "data:text/csv;charset=utf-8," 
      + expenses.map((row) => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Error exporting to CSV:', error);
  }
};
