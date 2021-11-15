import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const FormItem = styled.div`
  width: 100%;
  max-width: 500px;
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

const ProductForm = ({ initialState, fileUrl, buttonText, onSubmit }) => {
  const [inputs, setInputs] = useState(initialState);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleMultiple = (value) => {
    return [...value.split(",")].map((item) => ({ name: item }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(fileUrl);

    if (!file && !fileUrl) return;

    if (!file) {
      const product = {
        ...inputs,
        image: fileUrl,
        categories: handleMultiple(inputs.categories),
        colors: handleMultiple(inputs.colors),
        sizes: handleMultiple(inputs.sizes),
      };
      console.log(product);
      onSubmit(product, dispatch);
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console("hello");

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
            categories: handleMultiple(inputs.categories),
            colors: handleMultiple(inputs.colors),
            sizes: handleMultiple(inputs.sizes),
          };
          onSubmit(product, dispatch);
        });
      }
    );
  };

  return (
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
          value={inputs.title}
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
          value={inputs.description}
          onChange={handleChange}
        />
      </FormItem>
      <FormItem>
        <FormItemLable>Price</FormItemLable>
        <FormItemInput
          name="price"
          type="number"
          placeholder="100"
          value={inputs.price}
          onChange={handleChange}
        />
      </FormItem>
      <FormItem>
        <FormItemLable>Categories</FormItemLable>
        <FormItemInput
          name="categories"
          type="text"
          placeholder="jeans,skirts"
          value={inputs.categories}
          onChange={handleChange}
        />
      </FormItem>
      <FormItem>
        <FormItemLable>Colors</FormItemLable>
        <FormItemInput
          name="colors"
          type="text"
          placeholder="black,red"
          value={inputs.colors}
          onChange={handleChange}
        />
      </FormItem>
      <FormItem>
        <FormItemLable>Sizes</FormItemLable>
        <FormItemInput
          name="sizes"
          type="text"
          placeholder="s,m,l,xl"
          value={inputs.sizes}
          onChange={handleChange}
        />
      </FormItem>
      <AddButton onClick={handleClick} className="addProductButton">
        {buttonText}
      </AddButton>
    </Form>
  );
};

ProductForm.defaultProps = {
  initialState: {
    title: "",
    description: "",
    price: "",
    categories: "",
    colors: "",
    sizes: "",
  },
  fileUrl: null,
};

export default ProductForm;
