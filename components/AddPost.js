import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Posts from "./posts";
import {
  Card,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const App = () => {
  const [baseImage, setBaseImage] = useState("");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetcher();
  }, []);

  const fetcher = async () => {
    let posts = localStorage.getItem("posts");
    posts = JSON.parse(posts);

    setLists(posts);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  return (
    <>
      <Formik
        initialValues={{
          content: "",
          title: "",
          file: "",
          date: "", // olmasa da olur.
          id: "",
          comments: [],
        }}
        onSubmit={(values, { resetForm }) => {
          const now = new Date().toISOString();

          let postArr = localStorage.getItem("posts");
          postArr = JSON.parse(postArr);

          if (postArr) {
            let arr = [...postArr];
            values.file = baseImage;
            values.date = now;
            values.id = Math.floor(Math.random() * 100);

            arr.push(values);
            arr = JSON.stringify(arr);
            localStorage.setItem("posts", arr);
          } else {
            let arr = [];
            values.file = baseImage;
            values.date = now;
            values.id = Math.floor(Math.random() * 100);
            arr.push(values);
            arr = JSON.stringify(arr);
            localStorage.setItem("posts", arr);
          }
          resetForm();
          setBaseImage("");
          fetcher();
        }}
      >
        {({
          values,
          touched,
          handleSubmit,
          setFieldValue,
          handleChange,
          handleBlur,
          resetForm,
          errors,
        }) => (
          <Form>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Form.Group className="mb-3">
                <Form.Label>Başlık </Form.Label>

                <Form.Control
                  onChange={handleChange}
                  type="text"
                  placeholder="Başlık giriniz"
                  value={values.title}
                  as="textarea"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Yorum </Form.Label>
                <Form.Control
                  value={values.content}
                  placeholder="içerik giriniz"
                  onChange={handleChange}
                  as="textarea"
                />
              </Form.Group>
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Dosya </Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    value={values.file}
                  />
                </Form.Group>
                <Button
                  style={{ display: "flex", justifyContent: "center" }}
                  variant="success"
                  onClick={handleSubmit}
                  disabled={!(values.title && values.content)}
                  type="button"
                >
                  Ekle
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Posts posts={lists} />
    </>
  );
};

export default App;

// <textarea
// name="title"
// placeholder="Başlık giriniz"
// value={values.title}
// onChange={handleChange}
// />
// <br />
// <textarea
// type="content"
// name="content"
// value={values.content}
// placeholder="içerik giriniz"
// onChange={handleChange}
// />
// <br />
// <input
// type="file"
// onChange={(e) => {
//   uploadImage(e);
// }}
// value={values.file}
// />
// <br></br>
// <img src={baseImage} height="100px" />
