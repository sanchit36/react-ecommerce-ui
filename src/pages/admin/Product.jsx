import DashboardLayout from "../../layout/DashboardLayout";
import { Link } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../services/product";
import styled from "styled-components";
import ProductForm from "../../components/ProductForm";
import { updateProduct } from "../../api/apiCall";

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
  const { data, error, isLoading } = useGetProductByIdQuery(id);

  const handleValues = (value) => {
    return [...value.map((category) => category.name)].join(",");
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Some error occurred</h1>;

  return (
    <DashboardLayout>
      <Container>
        <TitleContainer>
          <h1>Product</h1>
          <Link to="/dashboard/newproduct">
            <Button>Create</Button>
          </Link>
        </TitleContainer>
        <Wrapper>
          <RightContainer>
            <div>
              <Chart
                data={productData}
                dataKey="Sales"
                title="Sales Performance"
              />
            </div>
            <Card>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <h3>{data.title}</h3>
                  <Image src={data.image} alt={data.title} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "20px" }}>
                    <strong>ID:</strong> <p>{data.id}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong>Description:</strong> <p>{data.description}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong>Colors:</strong>
                    <div>
                      {data?.colors?.map((color) => (
                        <Color color={color.name} key={color._id} />
                      ))}
                    </div>
                  </div>
                  {data?.sizes?.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <strong>Sizes:</strong>
                      <div>
                        {data.sizes?.map((size) => (
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
                title: data.title,
                description: data.description,
                price: data.price,
                categories: handleValues(data.categories),
                colors: handleValues(data.colors),
                sizes: handleValues(data.sizes),
              }}
              fileUrl={data.image}
              onSubmit={(product, dispatch) =>
                updateProduct(id, product, dispatch)
              }
            />
          </LeftContainer>
        </Wrapper>
      </Container>
    </DashboardLayout>
  );
};

export default Product;
