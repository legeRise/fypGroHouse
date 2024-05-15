from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import add_new_data,periodic_model_trainer


def start():
	scheduler = BackgroundScheduler()
	scheduler.add_job(add_new_data, 'interval', seconds=10)
	scheduler.add_job(periodic_model_trainer, 'interval', seconds = 60)
	scheduler.start()