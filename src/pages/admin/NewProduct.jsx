import ProductForm from "../../components/ProductForm";
import DashboardLayout from "../../layout/DashboardLayout";
import { addProduct } from "../../api/apiCall";

const NewProduct = () => {
  return (
    <DashboardLayout>
      <h1 className="addProductTitle">New Product</h1>
      <ProductForm
        buttonText="Create"
        onSubmit={(product, dispatch) => addProduct(product, dispatch)}
      />
    </DashboardLayout>
  );
};

export default NewProduct;
