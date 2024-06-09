import app from './app';
import mongoose, { ConnectOptions } from 'mongoose';

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/content-system', { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
