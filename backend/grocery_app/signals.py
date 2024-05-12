from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver
from .models import Product,Prediction_Model,Order,OrderProduct

@receiver(post_save,sender=Product)
def attach_model(sender,instance,created,**kwargs):
    if created:
        Prediction_Model.objects.create(name=f"{instance.name}_model", product=instance)


# @receiver(post_save,sender=Order)
# def ordered_products(sender,instance,created,**kwargs):
#     if created:
        
#     # Iterate over each item in the order data

#         OrderProduct.objects.create(name=f"{instance.name}_model", product=instance)




# @receiver(post_save,sender=Order)
# def user_item_interactions(sender,instance,created,**kwargs):
#     if created:
#         print(instance)
#         print(instance.payment_method)
#         customer_order = instance.orderproduct_set.all()  
#         print(customer_order,'is customer ordder')