export const subjects = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Computer Science'
];

export const generateMockAnalysis = (studentName = "John Doe") => {
  // Radar Chart Data
  const radarData = subjects.map(subject => ({
    subject,
    current: Math.floor(Math.random() * (95 - 70) + 70),
    previous: Math.floor(Math.random() * (90 - 65) + 65),
    fullMark: 100,
  }));

  // Trend Line Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const trendData = months.map((month, index) => {
    const isPredicted = index > 8; // Predict last 3 months
    const actual = isPredicted ? null : Math.floor(Math.random() * (92 - 75) + 75);
    const predicted = !isPredicted ? null : Math.floor(Math.random() * (95 - 80) + 80);
    
    // Add some noise to predicted based on previous trend
    return {
      month,
      score: actual,
      predicted: predicted,
      isExam: index % 3 === 0,
    };
  });

  // Weak Area Bar Chart Data
  const weakAreaData = subjects.map(subject => {
    const score = Math.floor(Math.random() * (95 - 60) + 60);
    const classAvg = 78;
    const diff = score - classAvg;
    let status = 'doing-well';
    if (diff < -10) status = 'critical';
    else if (diff < 0) status = 'needs-attention';

    return {
      subject,
      score,
      classAvg,
      status,
      improvementNeeded: Math.max(0, 95 - score),
    };
  }).sort((a, b) => b.improvementNeeded - a.improvementNeeded);

  // Insights
  const insights = [
    `Overall performance in ${subjects[0]} has improved by 12% compared to the previous semester.`,
    `Consistency detected in ${subjects[2]}, maintaining an average of 88% across all assignments.`,
    `Critical attention required in ${weakAreaData[0].subject} to bridge the gap with the class average.`,
    `Projected final score: 89.4% based on current trajectory and study habits.`
  ];

  const recommendations = [
    { subject: 'Mathematics', tip: 'Focus on Calculus and Algebra basics to improve score by 15%.' },
    { subject: 'Science', tip: 'Practical application sessions will help in understanding complex Physics concepts.' },
    { subject: 'General', tip: 'Dedicated 2-hour daily study block for weak areas is recommended.' }
  ];

  return {
    studentName,
    gpa: (Math.random() * (4.0 - 3.2) + 3.2).toFixed(2),
    radarData,
    trendData,
    weakAreaData,
    insights,
    recommendations
  };
};
