from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import add_new_data,periodic_model_trainer,reset_daily_stock_sold,reset_weekly_stock_sold,reset_monthly_stock_sold


def start():
	scheduler = BackgroundScheduler()


	# # Schedule jobs
	# scheduler.add_job(reset_weekly_stock_sold, 'cron', day_of_week='mon', hour=0)  # weekly_stock_sold resets weekly on Monday at midnight
	# scheduler.add_job(reset_daily_stock_sold, 'cron', hour=0)  # daily_stock_sold resets daily at midnight
	# scheduler.add_job(add_new_data, 'interval', hours=23)  # daily sold stock is saved to dataset every 23 hours
	# scheduler.add_job(reset_monthly_stock_sold, 'cron', day=1, hour=0)  # monthly_stock_sold resets on the 1st of every month at midnight
	# scheduler.add_job(periodic_model_trainer, 'interval', days=29)  # model is trained every 29 days
    


	# for testing 
	scheduler.add_job(reset_daily_stock_sold, 'interval', days=1)  
	scheduler.add_job(reset_weekly_stock_sold, 'interval', weeks=1)  # weekly_stock_sold resets weekly
	scheduler.add_job(reset_monthly_stock_sold, 'interval', days=10)  # monthly_stock_sold resets monthly
	scheduler.add_job(add_new_data, 'interval', seconds = 10)         
	scheduler.add_job(periodic_model_trainer, 'interval', seconds = 65)   
	scheduler.start()



	# scheduler.add_job(reset_daily_stock_sold, 'interval', minutes=5)  
	# scheduler.add_job(reset_weekly_stock_sold, 'interval', minutes=7)  # weekly_stock_sold resets weekly
	# scheduler.add_job(reset_monthly_stock_sold, 'interval', minutes=18)  # monthly_stock_sold resets monthly
	# scheduler.add_job(add_new_data, 'interval', seconds=30)         
	# scheduler.add_job(periodic_model_trainer, 'interval', seconds = 40)   
	# scheduler.start()


































































	# scheduler.add_job(reset_daily_stock_sold, 'interval', days=1)  # daily_stock_sold resets daily
	# scheduler.add_job(reset_weekly_stock_sold, 'interval', weeks=1)  # weekly_stock_sold resets weekly
	# scheduler.add_job(add_new_data, 'interval', hours=23)    # daily sold stock is saved to dataset
	# scheduler.add_job(reset_monthly_stock_sold, 'interval', days=30)  # monthly_stock_sold resets monthly
	# scheduler.add_job(periodic_model_trainer, 'interval', days = 29)   # model is trained every month