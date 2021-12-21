import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'minisuper',
  connector: 'mongodb',
  url: 'mongodb+srv://dev:Control1%2a@cluster0.afhsu.mongodb.net/minisuper',
  host: 'cluster0.afhsu.mongodb.net',
  port: 27017,
  user: 'dev',
  password: 'Control1*',
  database: 'minisuper',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MinisuperDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'minisuper';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.minisuper', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
