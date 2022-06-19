
/** @desc register a user
 *  @route /api/auth/register
 *  @access public
 * */
export const registerUser = async (req, res) => {
    res.status(200).json({message: "User created"});
};

/** @desc login a user
 *  @route /api/auth/login
 *  @access public
 * */
export const loginUser = async (req, res) => {
    console.log("user logged in");
};