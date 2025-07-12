import User from "../models/user.model.js";

export const createUser= async(req , res )=>{
    try{

        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser)
    }catch(error){
        res.status(400).json({error: error.message});
    }
};
export const deleteUser= async(req , res )=>{
    try{
        const deletedUser= await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message: "User not found"})
        res.json({message: "User Deleted"})    
    } catch(error){
        res.status(500).json({error: error.message})
    }

};
export const updateUser= async(req , res )=>{
 try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!updatedUser) return res.status(404).json({message: "User not Found"})
    res.json(updatedUser)    
 }catch(error){
    res.status(400).json({ error: error.message });
 }
}
export const getUserById= async(req , res )=>{
  
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: "User not Found"})
        res.json(user)

    }catch(error){
            res.status(500).json({error: error.message})
    }

}
export const getUser= async(req , res )=>{

    try{
            const users = await User.find();
            res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }

}