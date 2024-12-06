import { Grid2, Input, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

const UserForm = props => {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get('http://localhost:3001/api/users')
      .then(response => {
        setUsers(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const addUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    }
    Axios.post('http://localhost:3001/api/createuser', payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        isEdit(false);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const updateUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    }

    Axios.post('http://localhost:3001/api/updateuser', payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        isEdit(false);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const deleteUser = (id) => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return; // If the user cancels, do nothing

    Axios.post('http://localhost:3001/api/deleteuser', { id } )
      .then(() => {
        getUsers();
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

const handlesubmit = props => {
    if (id && name){

      //calling add user function 
      // addUser({id, name});

      // setId(0);
      // setName('');

      if (isEdit) {
        // Update user
        updateUser({ id, name });
      } else {
        // Add user
        addUser({ id, name });
      }
  
      // Reset form
      setId(0);
      setName('');
      setIsEdit(false);
    }

    
};

const handleEdit = (user) => {
  setId(user.id); // Set the selected user's ID in the form
  setName(user.name); // Set the selected user's Name in the form
  setIsEdit(true); // Indicate that the form is in edit mode
};

const handleDelete = (user) => {
  if (!user?.id) {
    console.error("User ID is undefined or null");
    return;
  }

  // Call deleteUser with the selected user's ID
  deleteUser(user.id);
};

    return(
      <Grid2
        container
        spacing={2}
        sx={{
            backgroundColor: '#282c34',
            marginBottom: '30px',
            display: 'block',
        }}
      >
            <Grid2 item xs={12}>
                <Typography component={'h1'} sx={{
                    color: '#ffffff',
                    fontSize: '36px'}}>
                        User Form
                </Typography>
            </Grid2>

            <Grid2 item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography
                component={'label'}
                htmlFor="id"
                sx={{
                    color: '#ffffff',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                }}
                >
                    ID
                </Typography>
                <Input
                    type="number"
                    id="id"
                    name="id"
                    sx={{ width: '400px' }}
                    value={id}
                    onChange={e => {setId(e.target.value)}}              
                />
            </Grid2>

            <Grid2 item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography
                component={'label'}
                htmlFor="name"
                sx={{
                    color: '#ffffff',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                }}
                >
                    Name
                </Typography>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    sx={{ width: '400px' }}
                    value={name}
                    onChange={e => setName(e.target.value)}              
                />
            </Grid2>
            <Button onClick={handlesubmit} /*Change this handlesubmit in backend*/
                sx={{
                    margin: 'auto',
                    marginBottom: '20px',
                    backgroundColor: '#00c6e6',
                    color: '#000000',
                    marginLeft: '15px',
                    marginTop: '20px',
                    '&:hover': {
                        opacity: '0.7',
                        backgroundColor: '#00c6e6',
                    }
                }}
            >
                Submit
            </Button>
     
        {/* Table Section */}
      {users.length > 0 && (
        <Grid2 item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th ' : { border: 0 } }}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Button 
                        sx={{ margin: '0px 10px' }}
                        onClick={() => handleEdit(user)}
                      >
                        Update
                      </Button>

                      <Button 
                        sx={{ margin: '0px 10px' }}
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid2>
      )}
      </Grid2>


    );


}

export default UserForm;