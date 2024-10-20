import { Logger } from '@nestjs/common';

const config = () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPort: parseInt(process.env.API_PORT, 10) || 3000,
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  databaseUrl: process.env.DATABASE_URL,
});

export default () => {
  const configData = config();
  let isMissing = false;
  Object.keys(configData).forEach((key) => {
    if (!configData[key]) {
      isMissing = true;
      Logger.error(
        `Environment variable "${key}" is required but not set. Check the src/infra/config/configuration.ts file.`,
      );
    }
  });
  if (isMissing) {
    process.exit(1);
  }
  return configData;
};
