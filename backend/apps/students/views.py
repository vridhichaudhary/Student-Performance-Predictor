import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .models import Student, ExamScore

@api_view(['POST'])
def upload_csv(request):
    if 'file' not in request.FILES:
        return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
    
    file_obj = request.FILES['file']
    
    try:
        df = pd.read_csv(file_obj)
        
        # Validate columns
        required_columns = ['Student Name', 'Subject', 'Exam Date', 'Marks', 'Max Marks', 'Exam Type']
        if not all(col in df.columns for col in required_columns):
            return Response({'error': 'Missing required columns in CSV'}, status=status.HTTP_400_BAD_REQUEST)
        
        student_name = df['Student Name'].iloc[0]
        
        with transaction.atomic():
            # Get or create student
            student, _ = Student.objects.get_or_create(name=student_name)
            
            # Clear previous scores if any to avoid duplication for MVP
            ExamScore.objects.filter(student=student).delete()
            
            scores_to_create = []
            for _, row in df.iterrows():
                scores_to_create.append(ExamScore(
                    student=student,
                    subject=row['Subject'],
                    exam_date=row['Exam Date'],
                    marks=row['Marks'],
                    max_marks=row['Max Marks'],
                    exam_type=row['Exam Type']
                ))
            
            ExamScore.objects.bulk_create(scores_to_create)
            
        return Response({'message': 'Data processed successfully', 'student_id': student.id}, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
