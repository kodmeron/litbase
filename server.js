const express = require('express');
const app = express();
const port = 8080;
const userList = getUserList();

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//GET

app.get('/users', (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "users",
    users: userList,
  });
});

//POST 

app.post("/addUser", (req, res) => {

  if (!req.body.name) {
    return res.status(400).send({
      success: "false",
      message: "name is required",
    });
  } else if (!req.body.companies) {
    return res.status(400).send({
      success: "false",
      message: "companies is required",
    });
  }
  const user = {
    id: userList.length + 1,
    isPublic: req.body.isPublic,
    name: req.body.name,
    companies: req.body.companies,
    books: req.body.books
  };
  userList.push(user);
  return res.status(201).send({
    success: "true",
    message: "user added successfully",
    user,
  });
});

//PUT

app.put("/updateUser/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userFound = findUserById(id)

  if (!userFound) {
    return res.status(404).send({
      success: 'false',
      message: 'user not found',
    });
  }

  const updatedUser = {
    id: id,
    isPublic: req.body.isPublic || userFound.body.isPublic,
    name: req.body.name || userFound.body.name,
    companies: req.body.companies || userFound.body.companies,
    books: req.body.books || userFound.body.books

  };

  if (!updatedUser.name) {
    return res.status(400).send({
      success: "false",
      message: "name is required",
    });
  } else if (!updatedUser.companies) {
    return res.status(400).send({
      success: "false",
      message: "companies is required",
    });
  }

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      userList[i] = updatedUser;
      return res.status(201).send({
        success: 'true',
        message: 'user updated successfully',
        updatedUser

      });
    }
  }
  return res.status(404).send({
    success: 'true',
    message: 'error in update'

  });
})

//DELETE

app.delete("/deleteUser/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      userList.splice(i, 1);
      return res.status(201).send({
        success: 'true',
        message: 'user deleted successfully'
      });
    }
  }
  return res.status(404).send({
    success: 'true',
    message: 'error in delete'
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});