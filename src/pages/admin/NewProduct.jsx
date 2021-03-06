import ProductForm from '../../components/ProductForm';
import DashboardLayout from '../../layout/DashboardLayout';
import { addProduct } from '../../api/products';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const NewProduct = () => {
  const [api] = useAxios();

  return (
    <DashboardLayout>
      <h1 className='addProductTitle'>New Product</h1>
      <ProductForm
        buttonText='Create'
        onSubmit={(product, dispatch, clearValues) =>
          toast.promise(dispatch(addProduct(api, product, clearValues)), {
            pending: 'Trying to add a new product',
            success: 'Product added successfully',
            rejected: 'Try again, something went wrong',
          })
        }
      />
    </DashboardLayout>
  );
};

export default NewProduct;
