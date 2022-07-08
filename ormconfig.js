module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['./src/shared/typeorm/migrations/*.{js,ts}'],
  entities: ['src/modules/**/typeorm/entities/*.{js,ts}'],
  seeds: ['./src/shared/typeorm/seeds/**/*{.ts,.js}'],
  factories: ['./src/shared/typeorm/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations/',
  },
};
