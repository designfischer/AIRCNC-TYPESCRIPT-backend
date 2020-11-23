require('dotenv').config()
import app from './app'

app.listen(process.env.PORT || process.env.LOCAL_PORT, () => console.log('Server running'))