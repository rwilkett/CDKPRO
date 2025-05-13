import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3, Fn } from 'aws-cdk-lib';
import { BucketDeployment } from 'aws-cdk-lib/aws-s3-deployment';
import { CfnOutput } from 'aws-cdk-lib';

export class TsStartStack extends cdk.Stack {

  public coolBucket: aws_s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = this.initializeSuffix();

    this.coolBucket = new aws_s3.Bucket(this, 'TSBucket', {
        bucketName: `cool-bucket-${suffix}`,
        lifecycleRules : [
          {
            expiration: cdk.Duration.days(4)
          }
        ]
      });

     new CfnOutput(this,
      'TsBucketName', {
        value: this.coolBucket.bucketName
      }
     );
      
  }

  private initializeSuffix(){
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
    const suffix = Fn.select(4, Fn.split('-', shortStackId))
    return suffix;
  }
}
