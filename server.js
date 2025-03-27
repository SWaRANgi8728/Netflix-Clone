const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors=require('cors');
// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB:', err));

// Define a user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create a user model
const User = mongoose.model('User', userSchema);

// POST: /login - Endpoint to handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email in MongoDB
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            // Compare passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: 'Error during password comparison.' });
                }
                if (!isMatch) {
                    return res.status(401).json({ message: 'Invalid email or password.' });
                }
                res.json({ message: 'Login successful!', user });
            });
        })
        .catch(err => {
            return res.status(500).json({ message: 'Database error.' });
        });
});

// POST: /register - Endpoint to handle user registration
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Create a new user and save to MongoDB
    const newUser = new User({ email, password });
    newUser.save()
        .then(() => {
            res.status(201).json({ message: 'User registered successfully!' });
        })
        .catch(err => {
            return res.status(500).json({ message: 'Database error.' });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

