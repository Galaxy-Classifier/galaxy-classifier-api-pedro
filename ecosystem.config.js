module.exports = {
  apps : [{
    name: 'pedro',
    script: 'index.js',
    autorestart: true,
    watch_delay: 1000,
    env: {
      'NODE_ENV': 'development',
      'SERVER_PORT': '5001',
      'VALENTINA_PORT': '4001',
      'VALENTINA_HOST': 'valentina',
      'MAX_CONCURRENT_JOBS': 10,
    },
    env_production: {
      'NODE_ENV': 'production',
    },
    watch: true,
    ignore_watch: ['node_modules', 'galaxy-classifier-api-pedro.logs', '.git'],
  }],
};