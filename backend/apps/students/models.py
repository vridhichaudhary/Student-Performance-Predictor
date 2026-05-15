from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ExamScore(models.Model):
    student = models.ForeignKey(Student, related_name='scores', on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    exam_date = models.DateField()
    marks = models.FloatField()
    max_marks = models.FloatField()
    exam_type = models.CharField(max_length=100)
    
    class Meta:
        ordering = ['exam_date']

    def __str__(self):
        return f"{self.student.name} - {self.subject} ({self.marks}/{self.max_marks})"
