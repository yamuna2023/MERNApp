import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import {
    randomArrayItem,
    randomId
} from '@mui/x-data-grid-generator';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LogoutModal from './logoutmodel';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100%)`,
      marginLeft: `${0}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows = [
    {
        id: randomId(),
        name: 'Resturant',
        'expense': 'Food',

        role: 500,
    },
    {
        id: randomId(),
        name: 'Kerala Tour',
        'expense': 'Travel',
        role: 800,
    },
    {
        id: randomId(),
        name: 'Diwali',
        'expense': 'Shopping',
        role: 700,
    },
    {
        id: randomId(),
        name: 'Monthly',
        'expense': 'Groceries',
        role: 100,
    },
    {
        id: randomId(),
        name: 'Hotel',
        'expense': 'Rent',
        role: 100,
    },
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Create Employee
            </Button>
        </GridToolbarContainer>
    );
}

export default function DataTable() {
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [getUserName,setGetUserName]=React.useState('');
    const [logoutshowmodal, setlogoutShowModal] = useState(false)
    // const [employees, setEmployees] = useState([]);

    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/employees');
          console.log(response.data)
          setRows(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };
      fetchEmployees();
    }, []);

    useEffect(()=>{
        setGetUserName(localStorage.getItem('UserName'))
    },[])
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) =>async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) =>  async() => {
        // setRows(rows.filter((row) => row.id !== id));'
        console.log('data');

        try {
            const response = await axios.delete('http://localhost:5000/api/employees',"66a5e2d49a3b9908c314b57c" );
            console.log(response.data);
           
            alert('User successfully deleted')
      
          } catch (error) {
            console.error('Error:', error);
          }
        // alert(id)
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: '_id', headerName: 'Id', width: 180, editable: false, },
        {
            field: 'image',
            headerName: 'Image',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            type: 'image',
            editable: false,
            renderCell: (params) => {
                return (
                  <>
                    <Avatar 
                    src={params.row.image}
                    />
                  </>
                );
              }
        },
        { field: 'name', headerName: 'Name', width: 180, editable: true, },
        
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            type: 'string',
            editable: true,
        },

        {
            field: 'designation',
            headerName: 'Designation',
            width: 220,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            type: 'number',
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 220,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            type: 'string',
        },
        {
            field: 'course',
            headerName: 'Course',
            width: 220,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            type: 'string',
        },
        {
            field: 'createdate',
            headerName: 'Create Date',
            width: 220,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            type: 'string',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={(e)=>handleEditClick(e)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={(e)=>handleDeleteClick(e)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box >
            <AppBar position="fixed" >
        <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </div>
          <Typography onClick={() => setlogoutShowModal(!logoutshowmodal)} style={{ cursor: 'pointer' }}>Logout</Typography>
          
        </Toolbar>
      </AppBar>
      {logoutshowmodal &&
                <LogoutModal open={logoutshowmodal} close={()=>setlogoutShowModal(false)} />
            }
      <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',paddingY:10}}>
      <Typography variant="h5"sx={{color:'green',padding:2}} noWrap component="div">
              Welcome to Dashboard {getUserName}
            </Typography>
        <Box
            sx={{
            //    marginTop:15,
                height: 500,
                width: '80%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
        </Box>
        </Box>

    );
}