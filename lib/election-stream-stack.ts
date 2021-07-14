import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import * as kinesis from '@aws-cdk/aws-kinesis'

export class ElectionStreamStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stream = new kinesis.Stream(this, "ResultDataStream");

    // const queue = new sqs.Queue(this, 'ElectionStreamQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // const topic = new sns.Topic(this, 'ElectionStreamTopic');

    // topic.addSubscription(new subs.SqsSubscription(queue));
  }
}
