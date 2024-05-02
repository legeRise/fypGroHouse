# from rest_framework.response import Response


# def already_logged_in(func):
#     def wrapper(request,*args,**kwargs):
#         if request.user.is_authenticated:
#             return Response({"is_authenticated":True,"msg":"Already Logged In"})
#         else:
#             return func(request,*args,**kwargs)
#     return wrapper


