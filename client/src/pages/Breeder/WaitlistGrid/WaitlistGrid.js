import React, { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  
];

const WaitlistGrid = ({index, waitlist, updateWaitlist}) => {
    const [rows, setRows] = useState(waitlist);
    const [rowModesModel, setRowModesModel] = useState({});
    const [rowActive, setRowActive] = useState(false)

    function EditToolbar(props) {
      const { setRows, setRowModesModel } = props;
    
      const handleClick = () => {
        if(!rowActive) {
          setRowActive(true)
          const id = randomId();
          const rank = rows.length+1
          setRows((oldRows) => [...oldRows, { id, rank: rank, first_name: '', last_name: '', phone_number: '', email_address: '', deposit_paid: '', isNew: true }]);
          setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'first_name' },
          }));
        }
      };
    
      return (
        <GridToolbarContainer>
          <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add record
          </Button>
        </GridToolbarContainer>
      );
    }

    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      setRowActive(true)
    };
  
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      
      setRowActive(false)
      updateWaitlist(index, rows)

    };
  
    const handleDeleteClick = (id) => () => {
      const updatedRows = rows.filter((row) => row.id !== id)
      updatedRows.map((row, index) => {
        row.rank = index+1
      })

      console.log(updatedRows)
      setRows(updatedRows)
      setRowActive(false)
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

      setRowActive(false)
    };
  
    const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      const updatedRows = rows.map((row) => (row.id === newRow.id ? updatedRow : row))
      
      setRows(updatedRows);
      updateWaitlist(index, updatedRows)
      return updatedRow;
    };
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
  
    const columns = [
      { field: 'rank',
        headerName: 'Rank',
        width: 80, 
        editable: false 
      },
      {
        field: 'first_name',
        headerName: 'First Name',
        type: 'text',
        width: 180,
        align: 'left',
        headerAlign: 'left',
        editable: true,
      },
      {
        field: 'last_name',
        headerName: 'Last Name',
        type: 'text',
        width: 180,
        editable: true,
      },
      {
        field: 'phone_number',
        headerName: 'Phone Number',
        width: 220,
        editable: true,
        type: 'text',

      },
      {
        field: 'email_address',
        headerName: 'Email Address',
        width: 200,
        editable: true,
        type: 'text',

      },
      {
        field: 'deposit_paid',
        headerName: 'Deposit Paid ($)',
        width: 150,
        editable: true,
        type: 'text',

      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 80,
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
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
  
    return (
      <Box
        sx={{
          height: 500,
          width: '100%',
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
          columns={columns.map((column)=> ({
            ...column,
            sortable: false,
            disableColumnMenu: true,
          }))}
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
    );
}


export default WaitlistGrid
