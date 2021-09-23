import React, { useState } from "react";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import Editor from "../components/sunEditor";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

function Posts({ posts }) {
  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [show2, setShow2] = useState(false);

  const handleClose = () => {
    setSelectedPost(null);
    setShow(false);
  };
  const handleClose2 = () => {
    setShow2(false);
  };

  const handleShow = (post) => {
    setSelectedPost(post);
    setShow(true);
  };

  const handleSubmitComment = (list) => {
    const post = posts.find((x) => x.id === list.id);
    setCommentList(post.comments);
    console.log(post.comments, "poıdklfj", list.id);
    setSelectedPost(post);
    setShow2(true);
  };

  const handleSubmit = () => {
    const newCommentOBJ = {
      userId: Math.floor(Math.random() * 100),
      comment,
      createdAt: new Date().toISOString(),
    };

    const post = posts.find((x) => x.id === selectedPost.id);

    console.log(post, "POST");

    post.comments.push(newCommentOBJ);

    localStorage.setItem("posts", JSON.stringify(posts));
    handleClose();
  };

  return (
    <>
      <div className="container">
        {posts?.map((list, index) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "space-evenly" }}
              key={index}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Img src={list.file} height="100px" width="10px" />
                <Card.Body>
                  <Card.Title>{list.title}</Card.Title>
                  <Card.Text>{list.content}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>{moment(list.date).fromNow()}</ListGroupItem>
                </ListGroup>

                <Card.Body>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Button variant="success" onClick={() => handleShow(list)}>
                      Comment
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleSubmitComment(list)}
                    >
                      CommentList
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Editor setComment={setComment} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleSubmit()}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={show2} onClick={handleClose2}>
                <Modal.Body>
                  {commentList?.map((list, index) => {
                    console.log(list, "listedki elemanlar");
                    return <div>{list.comment}</div>;
                  })}
                </Modal.Body>

                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Posts;
