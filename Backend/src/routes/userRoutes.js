import express from "express";
import {
createUser,
deleteUser,
updateUser,
getUser,
getUserById

} from "../controllers/user.controller.js"

const router = express.Router();

router.post('/', createUser);
router.get('/', getUser)
router.put('/:id', updateUser)
router.get('/:id', getUserById)
router.delete('/:id' , deleteUser)

export default router;