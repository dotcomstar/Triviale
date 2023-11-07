#!/usr/bin/env python3
"""Triviale backend Lambda function. This serves the questions every day.
"""
__author__     = "Jet Lee"
__copyright__  = "Copyright 2023"
__credits__    = []
__license__    = "MIT"
__version__    = "0.1.0"
__maintainer__ = "Jet Lee"
__email__      = "jetrlee@gmail.com"
__status__     = "Development"

import json
import boto3

client = boto3.client('dynamodb')

def lambda_handler(event, context):
  response =  {
    "isBase64Encoded": True,
    "statusCode": 200,
  }
  date = None
  if 'queryStringParameters' in event:
    date = event['queryStringParameters']['date']
  else:
    date = event['date']
  
  # [VULN] SQL Injection  
  data = client.get_item(
    TableName='trivialle-questions',
    Key={
        'date': {
          'S': date
        }
    }
  )
  response = {
      'statusCode': 200,
      'body': json.dumps(data),
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  }

  return response

def main(is_dev=True):
  if is_dev:
    print('Hello World!')
  return True

if __name__ == '__main__':
  main()
