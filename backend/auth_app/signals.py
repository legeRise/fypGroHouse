# from django.db.models.signals  import post_save
# from django.dispatch import receiver
# from django.contrib.auth.models import Group
# from auth_app.models import User

# # for signals  create signal here and then   mention      def ready(self):  from . import signals  in apps.py
# @receiver(post_save,sender=User)
# def assign_user_to_groups(sender,created,instance,**kwargs):
#     if created:
#         if instance.user_type == 'admin':
#             admin_group =Group.objects.get(name='AdminGroup')
#             instance.groups.add(admin_group),
        
#         elif instance.user_type == 'customer':
#             customer_group =Group.objects.get(name='CustomerGroup')
#             instance.groups.add(customer_group),