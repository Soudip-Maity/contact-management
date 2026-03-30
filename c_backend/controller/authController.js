const { User } = require("../models/usermodel");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = User.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedpassword,
    });

    res.json({ msg: "User registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error: " });
  }
};
///////////////////////////////////////////

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const passmatch = await bcrypt.compare(password, user.password);
    if (!passmatch) return res.status(400).json({ msg: "Wrong password" });

     const token = jwt.sign(
        { id: user.id },
          process.env.JWT_SECRET, {
          expiresIn: "1d",
    });
     res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: "Server error: " });
  }
};

//////////////////////////

module.exports = { register, login };
