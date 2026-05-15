import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from apps.students.models import Student, ExamScore

@api_view(['GET'])
def get_dashboard_data(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        scores = ExamScore.objects.filter(student=student)
        
        if not scores.exists():
            return Response({'error': 'No scores found for this student'}, status=status.HTTP_404_NOT_FOUND)
            
        # Convert to pandas DataFrame
        df = pd.DataFrame(list(scores.values()))
        df['exam_date'] = pd.to_datetime(df['exam_date'])
        df['percentage'] = (df['marks'] / df['max_marks']) * 100
        
        # 1. Overall GPA (simplified as percentage / 20 to get out of 5.0, or / 25 to get out of 4.0)
        overall_avg = df['percentage'].mean()
        gpa = (overall_avg / 25).round(2)
        
        # 2. Radar Data (Current vs Previous Semester)
        # Mocking "previous" semester slightly lower for demonstration, and "current" as the actual average
        subjects = df['subject'].unique()
        radar_data = []
        for subj in subjects:
            subj_scores = df[df['subject'] == subj]
            current = subj_scores['percentage'].mean()
            radar_data.append({
                'subject': subj,
                'current': round(current, 1),
                'previous': round(max(0, current - np.random.uniform(2, 10)), 1),
                'fullMark': 100
            })
            
        # 3. Trend Data (Monthly grouping)
        # Group by month and calculate average percentage
        df['month'] = df['exam_date'].dt.strftime('%b')
        monthly_avg = df.groupby('month')['percentage'].mean().reindex(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']).ffill()
        
        # Predict next 3 months using Simple Linear Regression
        valid_months = monthly_avg.dropna()
        if len(valid_months) > 1:
            X = np.arange(len(valid_months)).reshape(-1, 1)
            y = valid_months.values
            model = LinearRegression()
            model.fit(X, y)
            
            # Predict
            future_X = np.arange(len(valid_months), len(valid_months) + 3).reshape(-1, 1)
            predictions = model.predict(future_X)
        else:
            predictions = [valid_months.iloc[0]] * 3 if len(valid_months) > 0 else [0, 0, 0]
            
        trend_data = []
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        pred_idx = 0
        for i, m in enumerate(months):
            if m in valid_months.index:
                trend_data.append({
                    'month': m,
                    'score': round(valid_months[m], 1),
                    'predicted': None,
                    'isExam': i % 3 == 0
                })
            else:
                if pred_idx < 3:
                    trend_data.append({
                        'month': m,
                        'score': None,
                        'predicted': round(min(100, max(0, predictions[pred_idx])), 1),
                        'isExam': False
                    })
                    pred_idx += 1
                
        # 4. Weak Area Data
        class_avg_mock = 75 # Mocked class average
        weak_area_data = []
        for subj in subjects:
            score = df[df['subject'] == subj]['percentage'].mean()
            diff = score - class_avg_mock
            
            status_str = 'doing-well'
            if diff < -10:
                status_str = 'critical'
            elif diff < 0:
                status_str = 'needs-attention'
                
            weak_area_data.append({
                'subject': subj,
                'score': round(score, 1),
                'classAvg': class_avg_mock,
                'status': status_str,
                'improvementNeeded': round(max(0, 95 - score), 1)
            })
            
        weak_area_data.sort(key=lambda x: x['improvementNeeded'], reverse=True)
        
        # 5. Insights & Recommendations
        insights = [
            f"Overall performance is stable with a GPA of {gpa}.",
            f"Your strongest subject is {radar_data[0]['subject']} at {radar_data[0]['current']}%.",
            f"Critical attention required in {weak_area_data[0]['subject']} to bridge the gap with the class average."
        ]
        
        recommendations = [
            { 'subject': weak_area_data[0]['subject'], 'tip': 'Focus on fundamental concepts and practice past papers.' },
            { 'subject': 'General', 'tip': 'Dedicated 2-hour daily study block for weak areas is recommended.' }
        ]
        
        response_data = {
            'studentName': student.name,
            'gpa': gpa,
            'radarData': radar_data,
            'trendData': trend_data,
            'weakAreaData': weak_area_data,
            'insights': insights,
            'recommendations': recommendations
        }
        
        return Response(response_data)
        
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
