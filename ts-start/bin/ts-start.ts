#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsStartStack } from '../lib/ts-start-stack';
import { TsHandlerStack } from '../lib/ts-handler-stack';

const app = new cdk.App();
const tsStarterStack = new TsStartStack(app, 'TsStartStack');
new TsHandlerStack(app, 'TsHandlerStack', {
  coolBucket: tsStarterStack.coolBucket
})