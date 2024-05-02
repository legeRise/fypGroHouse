import boto3
from django.conf import settings

def save_profile_pic(image, destination):
    try:
        # Establish connection to AWS S3 bucket
        s3 = boto3.client('s3',
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                          region_name=settings.AWS_S3_REGION_NAME)

        # Upload the image file to the specified destination in the S3 bucket
        s3.upload_fileobj(image, settings.AWS_STORAGE_BUCKET_NAME, destination)

        # Generate URL for the uploaded image
        image_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{destination}'

        return image_url  # Return the image URL and no error
    except Exception as e:
        # Return error if any exception occurs
        return None, str(e)