module.exports = {
    apps: [{
      name: "around-backend",
      script: "./backend/App.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production"
      }
    }]
  }