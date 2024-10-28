const User = require("../Model/user.js");
const hashPassword = require("../helper/register.js");
const compare = require("../helper/login.js");
const jwt = require("jsonwebtoken");

// register
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "password is required",
      });
    }

    const user = await User.findOne({email});
    if (user){
      return res.json({
        success : false ,
        message : "User is already registered"
      })
    }

    const hashedPassword = await hashPassword(password, 10);
    await new User({
      email: email,
      password: hashedPassword,
    }).save();

    return res.json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in registration",
    });
  }
};

// login user
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "password is required",
      });
    }

    const user = await User.findOne({email : email});
    if (!user){
        return res.json({
            success : false ,
            message : "User does not exist"
        })
    }


    const isPasswordCorrect = await compare(password , user.password);

    if (!isPasswordCorrect){
        return res.json({
            success : false ,
            message : "Wrong password"
        })
    }

    const token = await jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : "7d"});
    
    return res.json({
        success : true , 
        message : "User is Logged in successfuly" , 
        token
    })

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in login",
    });
  }
};


module.exports.checkSession = (req , res)=> {
  console.log(req.session);
 return res.json({
  success : true
 }) 
}

// Open Authorization -> login with google
module.exports.loginWithGoogle = async (req, res) => {
  try {
    const email = req.user.emails[0].value;
    const user = await User.findOne({ email });

    let token;
    if (user) {
      // User already exists, generate a token
      token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    } else {
      // If user doesn't exist, create a new user
      const newUser = new User({ email });
      await newUser.save();
      token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    }

    console.log("token aa gya:",token)

    // Redirect to the frontend with the token
    const redirectURL = `https://celadon-bunny-9e4b78.netlify.app/main?token=${token}`;
    return res.redirect(redirectURL);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports.secret = (req , res)=> {
  res.json({
    success : true
  });
}


