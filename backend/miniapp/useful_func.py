import random
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.exceptions import ValidationError


def generate_confirmation_code():
    return '{:06d}'.format(random.randint(0, 999999))

def send_email(subject, message, to_email):
    if subject and message and to_email:
        try:
            a =send_mail(
                subject=subject,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[to_email],
                fail_silently=False,
            )

            print(a,'the sending email after 21')
            return True
        except Exception as e:
            print(e,'is the exception ')
    else:
        return False
