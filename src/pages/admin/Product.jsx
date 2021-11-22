import DashboardLayout from "../../layout/DashboardLayout";
import Chart from "../../components/chart/Chart";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ProductForm from "../../components/ProductForm";
import { updateProduct } from "../../api/apiCall";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const RightContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const LeftContainer = styled.div`
  flex: 1.2;
`;

const Card = styled.div`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Image = styled.img`
  width: 50%;
  object-fit: cover;
  margin-top: 20px;
`;

const Color = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid teal;
`;

const Button = styled.button`
  color: white;
  background-color: teal;
  padding: 10px 35px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const Product = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.product.products.find((product) => product.id === id)
  );
  const [api] = useAxios();
  const [pStats, setPStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await api.get("orders/income?pid=" + product.id);
        const list = res.data.sort((a, b) => {
          return a.id - b.id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item.id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [product.id, MONTHS]);

  if (!product) return <h4>Something is wrong</h4>;

  const handleValues = (value) => {
    return [...value.map((category) => category.name)].join(",");
  };

  return (
    <DashboardLayout>
      <Container>
        <TitleContainer>
          <h1>Product</h1>
          <Link to="/dashboard/new-product">
            <Button>Create</Button>
          </Link>
        </TitleContainer>
        <Wrapper>
          <RightContainer>
            <div>
              <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
            </div>
            <Card>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <h3>{product.title}</h3>
                  <Image src={product.image} alt={product.title} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "20px" }}>
                    <strong>ID:</strong> <p>{product.id}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong>Price:</strong> <p>{product.price}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong>Description:</strong> <p>{product.description}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong>Categories:</strong>
                    <div>
                      {product.categories?.map((cat) => (
                        <span key={cat._id}>{cat.name} </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong>Colors:</strong>
                    <div>
                      {product.colors?.map((color) => (
                        <Color color={color.name} key={color._id} />
                      ))}
                    </div>
                  </div>
                  {product.sizes?.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <strong>Sizes:</strong>
                      <div>
                        {product.sizes?.map((size) => (
                          <span key={size._id}>{size.name} </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </RightContainer>
          <LeftContainer>
            <ProductForm
              buttonText="Update"
              initialState={{
                title: product.title,
                description: product.description,
                price: product.price,
                categories: handleValues(product.categories),
                colors: handleValues(product.colors),
                sizes: handleValues(product.sizes),
              }}
              fileUrl={product.image}
              onSubmit={(product, dispatch) => {
                toast.promise(updateProduct(id, product, dispatch), {
                  pending: "Trying to Update Product",
                  success: "Product updated successfully",
                  rejected: "Try again, something went wrong",
                });
              }}
            />
          </LeftContainer>
        </Wrapper>
      </Container>
    </DashboardLayout>
  );
};

export default Product;
