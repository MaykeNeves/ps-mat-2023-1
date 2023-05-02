import React from 'react'
import myfetch from '../../utils/myfetch'
import Typography from '@mui/material/Typography'
import PageTitle from '../../components/ui/PageTitle'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import  IconButton  from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function PaymentMethodList(){

    const [paymentMethods, setPaymentMethods] = React.useState([])
    const [showWaiting, setShowWaiting] = React.useState(false)

    async function fetchData(){
        setShowWaiting(true)
        try{
            const result = await myfetch.get('/payment_methods')
            setPaymentMethods(result)
        }
        catch(error){
            console.log(error)
        }
        finally {
            setShowWaiting(false)
        }

    }

    React.useEffect( () => {
        fetchData()

    },[] )

    const columns = [
        { field: 'id', headerName: 'Cód', width: 90 },
        {
          field: 'description',
          headerName: 'Descrição',
          width: 150
        },
        {
          field: 'operator_fee',
          headerName: 'Taxa de operação',
          width: 150
          
        },
        {
            field: 'edit',
            headerName: 'Editar',
            headerAlign: 'center',
            align: 'center',
            width: 90,
            renderCell: params => (
                <IconButton aria-label="Editar">
                    <EditIcon />
                </IconButton>
            )
        },
        {
            field: 'delete',
            headerName: 'Excluir',
            headerAlign: 'center',
            align: 'center',
            width: 90,
            renderCell: params => (
                <IconButton aria-label="excluir">
                    <DeleteForeverIcon color="error" />
                </IconButton>
            )
        }
      ];
      
      

    return (
        <>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showWaiting}>
            <CircularProgress color="inherit" />
            </Backdrop>

        <Typography variant='h3' component="h1" sx={{textAlign: 'center'}}>
        Listagem de métodos de pagamento
        </Typography>

        <PageTitle title="Listagem de métodos de pagamento" />

        <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={paymentMethods}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        
        disableRowSelectionOnClick
      />
    </Paper>

        </>
    )
}