const app = require('./app');
require('./models'); // init DB

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 QuadXtreme backend is running on port ${PORT}`);
});
