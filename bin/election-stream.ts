#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { ElectionStreamStack } from '../lib/election-stream-stack';

const app = new cdk.App();
new ElectionStreamStack(app, 'ElectionStreamStack');
