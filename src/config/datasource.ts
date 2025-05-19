import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as process from 'node:process';

config();

export const configOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USERNAME,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: ['error', 'migration', 'warn'],
  entitySkipConstructor: true,
  migrations: ['dist/migrations/*.js'],
  logger: 'formatted-console',
  maxQueryExecutionTime: 60_000_000,
};

const dataSource = new DataSource(configOptions);

export default dataSource;
