const express =require("express")
const router = express.Router();
const teacherController=require("../controllers/teacher")
// const studentController=require("../controllers/student")



router.post('/register',teacherController.createUser)
router.post('/login',teacherController.loginUser)
// router.post("/create",studentController.createstudent)
// router.get("/get",studentController.getStudent)
// router.put("/update",studentController.updateapi)




router.all("/*", async function(req,res){
    return res.status(400).send({status:false,message:"Plz check Api url"})
})


module.exports=router;