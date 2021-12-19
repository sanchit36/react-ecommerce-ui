import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { deleteProduct, getProducts } from "../../api/products";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";

const ProductItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductItemEditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const ProductItemDeleteButton = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

const ProductList = () => {
  const { products, totalPages, isFetching } = useSelector(
    (state) => state.product
  );
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [api] = useAxios();

  useEffect(() => {
    getProducts(api, page + 1, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dispatch]);

  const handleDelete = (id) => {
    deleteProduct(api, id, dispatch);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductItem>
            <ProductImage src={params.row.image} alt="" />
            {params.row.title}
          </ProductItem>
        );
      },
    },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "colors",
      headerName: "colors",
      width: 200,
      renderCell: (params) =>
        params.row.colors.map((color) => `${color.name}, `),
    },
    {
      field: "sizes",
      headerName: "sizes",
      width: 200,
      renderCell: (params) => params.row.sizes.map((size) => `${size.name}, `),
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/dashboard/products/" + params.row.id}>
              <ProductItemEditButton>Edit</ProductItemEditButton>
            </Link>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <ProductItemDeleteButton />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          pagination
          pageSize={8}
          rowsPerPageOptions={[8]}
          rowCount={totalPages * 8}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          loading={isFetching}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProductList;
