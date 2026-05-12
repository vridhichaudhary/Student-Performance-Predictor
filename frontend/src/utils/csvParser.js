import Papa from 'papaparse';

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const generateTemplateCSV = () => {
  const data = [
    { "Student Name": "John Doe", "Subject": "Mathematics", "Exam Date": "2024-01-15", "Marks": 85, "Max Marks": 100, "Exam Type": "Midterm" },
    { "Student Name": "John Doe", "Subject": "Science", "Exam Date": "2024-01-16", "Marks": 78, "Max Marks": 100, "Exam Type": "Midterm" },
    { "Student Name": "John Doe", "Subject": "English", "Exam Date": "2024-01-17", "Marks": 92, "Max Marks": 100, "Exam Type": "Midterm" },
    { "Student Name": "John Doe", "Subject": "History", "Exam Date": "2024-01-18", "Marks": 88, "Max Marks": 100, "Exam Type": "Midterm" },
    { "Student Name": "John Doe", "Subject": "Geography", "Exam Date": "2024-01-19", "Marks": 74, "Max Marks": 100, "Exam Type": "Midterm" },
    { "Student Name": "John Doe", "Subject": "Computer Science", "Exam Date": "2024-01-20", "Marks": 95, "Max Marks": 100, "Exam Type": "Midterm" }
  ];
  
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "student_template.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
