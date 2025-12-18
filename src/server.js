const app = require('./app');
require('./models'); // init DB

const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 QuadXtreme backend is running on http://${HOST}:${PORT}`);
});

