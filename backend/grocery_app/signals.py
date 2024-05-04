from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver
from .models import Product,Prediction_Model,Order

@receiver(post_save,sender=Product)
def attach_model(sender,instance,created,**kwargs):
    if created:
        Prediction_Model.objects.create(name=f"{instance.name}_model", product=instance)


@receiver(post_delete, sender=Product)
def product_deleted_handler(sender, instance, **kwargs):
    print("i was used 13 ")
    print(instance,'is the instance')
    # Get all orders containing the deleted product
    orders_with_deleted_product = Order.objects.filter(products=instance)
    print(orders_with_deleted_product,'orders with deleted products')
    # Delete each order containing the deleted product
    orders_with_deleted_product.delete()