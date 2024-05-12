from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Customer,Confirmation_Code
from miniapp.useful_func import generate_confirmation_code,send_email



@receiver(post_save,sender=Customer)
def send_confirmation_email(sender,instance,created,**kwargs):
    if created:
        confirmation_code = generate_confirmation_code()
        confirmation_instance = Confirmation_Code(customer=instance,code=confirmation_code)
        confirmation_instance.save()
        print('the confirmation code coming from signals.py is' , confirmation_code)
        message = f"Your confirmation code is {confirmation_code}. Please enter it on the confirmation page to confirm your email address."
        send_email("Confirm Email",message,instance.email)





