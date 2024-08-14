import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const Home = () => {
  const pageSize = 5
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <>{params.value}</>
    },
    {
      field: 'category',
      headerName: 'Categories',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <>{params.value}</>
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <>{params.value}</>
    }
  ]
  return (
    <div>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: { pageSize, page: 0 },
          },
          columns
        }}
        rows={People}
        columns={columns}
        disableColumnSelector
        disableSelectionOnClick
        autoHeight
        pageSizeOptions={[pageSize]}
        getRowId={(row) => row.id}
      />
    </div>
  )
}

export default Home
