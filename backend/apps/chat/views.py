import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from apps.students.models import Student
from .models import ChatMessage

# Try to import langchain, fallback if not configured
try:
    from langchain.chat_models import ChatOpenAI
    from langchain.schema import HumanMessage, SystemMessage
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False

@api_view(['POST'])
def send_message(request):
    student_id = request.data.get('student_id')
    content = request.data.get('message')
    
    if not student_id or not content:
        return Response({'error': 'student_id and message are required'}, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        student = Student.objects.get(id=student_id)
        
        # Save user message
        ChatMessage.objects.create(student=student, role='user', content=content)
        
        # Generate AI response
        ai_response = "I am your AI Performance Assistant. I notice you have some weak areas in Geography. Focus there!"
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if LANGCHAIN_AVAILABLE and api_key and api_key != 'your-openai-api-key':
            try:
                chat = ChatOpenAI(temperature=0.7, openai_api_key=api_key)
                messages = [
                    SystemMessage(content=f"You are an AI tutor helping {student.name} understand their academic performance. Keep answers under 3 sentences."),
                    HumanMessage(content=content)
                ]
                response = chat.invoke(messages)
                ai_response = response.content
            except Exception as e:
                print(f"LangChain Error: {e}")
                # Fallback to predefined logic
                if 'math' in content.lower():
                    ai_response = "Your math scores showed a slight dip. I recommend focusing on integral basics this week."
                elif 'predict' in content.lower():
                    ai_response = "If you maintain your current study frequency, I predict a 92% score on your final exam next month."
        else:
            # Simple fallback
            if 'math' in content.lower():
                ai_response = "Your math scores showed a slight dip. I recommend focusing on integral basics this week."
            elif 'predict' in content.lower():
                ai_response = "If you maintain your current study frequency, I predict a 92% score on your final exam next month."
                
        # Save AI message
        ChatMessage.objects.create(student=student, role='assistant', content=ai_response)
        
        return Response({'message': ai_response})
        
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
