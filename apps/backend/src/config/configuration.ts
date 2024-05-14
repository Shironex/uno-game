import 'dotenv/config';

export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
});
