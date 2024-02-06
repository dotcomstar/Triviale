#!/usr/bin/env python3
"""Triviale backend Lambda function. This serves the questions every day.
"""
__author__     = "Jet Lee"
__copyright__  = "Copyright 2023"
__credits__    = []
__license__    = "MIT"
__version__    = "0.1.0"
__maintainer__ = "Jet Lee"
__email__      = "help.triviale@gmail.com"
__status__     = "Development"

import os
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://gamestar109:<password>@triviallequestions.1cbs3sq.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# client = MongoClient(host=os.environ["MONGODB_URI"])

def lambda_handler(event, context):
    # Send a ping to confirm a successful connection
    # try:
    #     client.admin.command('ping')
    #     print("Pinged your deployment. You successfully connected to MongoDB!")
    # except Exception as e:
    #     print(e)
    return client.db.command("ping")

# def lambda_handler(event, context):
#   response =  {
#     "isBase64Encoded": True,
#     "statusCode": 200,
#   }
#   date = None
#   if 'queryStringParameters' in event:
#     date = event['queryStringParameters']['date']
#   else:
#     date = event['date']
  
#   # [VULN] SQL Injection  
#   data = client.get_item(
#     TableName='trivialle-questions',
#     Key={
#         'date': {
#           'S': date
#         }
#     }
#   )
#   response = {
#       'statusCode': 200,
#       'body': json.dumps(data),
#       'headers': {
#         'Content-Type': 'application/json',
#         'Access-Control-Allow-Origin': '*'
#       },
#   }

#   return response

def main(is_dev=True):
  if is_dev:
    print('Hello World!')
  return True

if __name__ == '__main__':
  main()
