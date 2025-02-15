module.exports = {
  apps: [{
    name: "around-api",
    script: "./App.js",
    env_production: {
      NODE_ENV: "production",
      PORT: 3001,
      MONGODB_URI: "mongodb://localhost:27017/arounddb",
      JWT_SECRET: "8ef6686170003ec1d5b551909223c2491afecefa6f0cb53b4ed80c6c5df0d3d6aafae06da633dde13a2897bcb92ed1e6fb5d05c4e2db56705b377fc10c79189e"
    }
  }]
}