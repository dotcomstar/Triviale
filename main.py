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

def lambda_handler(event, context):
  courses = []
  response =  {
    "isBase64Encoded": True,
    "statusCode": 200,
  }
  if 'queryStringParameters' in event:
    courses = event['queryStringParameters']['courses'].split(',')
  else:
    courses = event['courses']
  response['body'] = json.dumps(main(courses=courses, is_dev=False))  # This is called by an AWS Lambda function.
  return response

def main(is_dev=True):
  if is_dev:
    print('Hello World!')
  return True

if __name__ == '__main__':
  main()
