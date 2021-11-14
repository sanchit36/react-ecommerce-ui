import { useState } from "react";
import styled from "styled-components";
import DashboardLayout from "../../layout/DashboardLayout";
import { useDispatch } from "react-redux";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../api/apiCall";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const FormItem = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const FormItemLable = styled.label`
  color: gray;
  font-weight: 600;
  margin-bottom: 10px;
`;

const FormItemInput = styled.input`
  padding: 10px;
`;

const FormItemSelect = styled.select`
  padding: 10px;
`;

const AddButton = styled.button`
  width: 50%;
  margin-top: 10px;
  padding: 10px 30px;
  border: none;
  border-radius: 10px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleMultiple = (e, setter) => {
    setter([...e.target.value.split(",")].map((item) => ({ name: item })));
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!file) return;
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            image: downloadURL,
            categories: cat,
            colors: color,
            sizes: size,
          };
          console.log(product);
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <DashboardLayout>
      <h1 className="addProductTitle">New Product</h1>
      <Form>
        <FormItem>
          <FormItemLable>Image</FormItemLable>
          <FormItemInput
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </FormItem>
        <FormItem>
          <FormItemLable>Name</FormItemLable>
          <FormItemInput
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </FormItem>
        <FormItem>
          <FormItemLable>Description</FormItemLable>
          <textarea
            rows="20"
            placeholder="Enter your description"
            name="description"
            type="text"
            onChange={handleChange}
          />
        </FormItem>
        <FormItem>
          <FormItemLable>Price</FormItemLable>
          <FormItemInput
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </FormItem>
        <FormItem>
          <FormItemLable>Categories</FormItemLable>
          <FormItemInput
            type="text"
            placeholder="jeans,skirts"
            onChange={(e) => handleMultiple(e, setCat)}
          />
        </FormItem>
        <FormItem>
          <FormItemLable>Colors</FormItemLable>
          <FormItemInput
            type="text"
            placeholder="black,red"
            onChange={(e) => handleMultiple(e, setColor)}
          />
        </FormItem>
        <FormItem>
          <FormItemLable>Sizes</FormItemLable>
          <FormItemInput
            type="text"
            placeholder="s,m,l,xl"
            onChange={(e) => handleMultiple(e, setSize)}
          />
        </FormItem>
        <FormItem>
          <FormItemLable>Stock</FormItemLable>
          <FormItemSelect name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </FormItemSelect>
        </FormItem>
        <AddButton onClick={handleClick} className="addProductButton">
          Create
        </AddButton>
      </Form>
    </DashboardLayout>
  );
};

export default NewProduct;
