import { Request, Response,NextFunction} from 'express';
import express from 'express';
const router = express.Router();
const db = require("./../module/db");

type User = {
  firstName: String;
  lastName: String;
  age: Number
}

router.get("/:id", findUserById) ;

 // inner function shouldn't be exposed to the HTTP protocol
  // getUsetById(id: string) => user
async function findUserById(req: Request, res: Response) {
  const id = req.params.id;
   await db.findById(id)
    .then((user: User) => {
      if(user==null){
        res.status(404).json({ message: "Not Found user" });
      }
      res.status(200).send(`User ${user.firstName}`+ user)
    })
    .catch(() => {
      res.status(500).send({ message: `Canot find this id=${id}`});

    });
}

 
router.post("/", async (req:Request, res:Response) => {
  
  const { firstName, lastName, age} = req.body;
  let Db = new db({
    firstName: firstName,
    lastName: lastName,
    age: age,
  });
  
  let user:User = {
    firstName,
    lastName,
    age,
    }  
  
  try {
    Db = await Db.save();    
res.status(201).send(`User ${user.firstName} Created Details :`+ Db)
  } catch (err) {
    res.status(500).send("error : " + err);
  }
});


router.patch("/:id", getUsers, async (req:Request, res:any) => {
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.age != null) {
    res.user.age = req.body.age;
  }
  try {
    let updateUser = await res.user.save();
    res.send(`User ${updateUser.firstName} Update Details :` + updateUser);
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
});
router.delete("/:id", getUsers, async (req:Request, res:any) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function getUsers(req:Request, res:any, next:NextFunction) {
  let user;
  try {
    user = await db.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  res.user = user;
  next();
}

module.exports = router;