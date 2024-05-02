from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product,Prediction_Model

@receiver(post_save,sender=Product)
def attach_model(sender,instance,created,**kwargs):
    if created:
        Prediction_Model.objects.create(name=f"{instance.name}_model", product=instance)
