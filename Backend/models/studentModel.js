const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    institute_id: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    branch: { type: String, required: true },
    backlogs: { type: Number, required: true },
    cg: {
        type: Number,
        required: true,
        get: (value) => value.toFixed(2),
    },
    refreshToken:{type: String}
    // skills
    // ats score
    // resume link
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Hash password when updating
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
