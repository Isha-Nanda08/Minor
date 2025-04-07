const User = require("../models/User");

app.post("/login", async (req, res) => {
    const { institute_id, password } = req.body;

    try {
        const user = await User.findOne({ institute_id });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
