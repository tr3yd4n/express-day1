import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {

  state = {
    category: "",
    title: "",
    text: "",
  }

  handleChange(e) {
    const id = e.target.id
    this.setState({
      [id]: e.target.value
    });
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log("hello")
    //   const APIURLSearch = `http://localhost:3001/blogs/blogs.json`
    //   console.log("apples")
    //   const response = await fetch(APIURLSearch)
    //   const blogs = await response.json()
    //   blogs.push(this.state)
  }

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5">
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control size="lg" placeholder="Title" id="title" value={this.state.title} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3" id="category" value={this.state.category} onChange={this.handleChange}>
            <Form.Label>Category</Form.Label>
            <Form.Control size="lg" as="select" >
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} id="text" value={this.state.text} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end" >
            <Button type="reset" size="lg" variant="outline-dark" onClick={this.handleSubmit}>
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
