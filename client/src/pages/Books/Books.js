import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Results from "../../components/Results";
import Saved from "../../components/Saved";

class Books extends Component {
  state = {
    articles: [],
    title: "",
    startYear: "",
    endYear: "",
    saved: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ saved: res.data, title: "", startYear: "", endYear: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.startYear && this.state.endYear) {
      API.searchArticle(
        this.state.title, 
        this.state.startYear,
        this.state.endYear
      )
      .then(res => { console.log(res.data.response.docs)
        this.setState({ articles: res.data.response.docs });
        this.loadBooks();
      })
      .catch(err => console.log(err));
    }
  };

  handleSaveButton = (event,id) => {
    event.preventDefault();
    const articleData = this.state.articles.find(article => article._id === id);
   API.saveBook({ articleData })
     .then((results) => {
       const filteredResults = this.state.articles.filter(article => article._id !== id)
       this.setState({ articles: filteredResults });
       this.loadBooks();
     })
  };

  handleDeleteButton = (event,id) => {
    event.preventDefault();
    API.deleteBook(id)
    .then((results)=>{
      this.loadBooks();
    })
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>NYT Search</h1>
            </Jumbotron>
            <form>
              <h4>Topic</h4>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Topic"
              />
              <h4>Start Year</h4>
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="start year"
              />
              <h4>End Year</h4>
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="end year"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.startYear && this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6">
            <Jumbotron>
              <h1>Searched Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <Results
                      url={article.web_url}
                      title={article.headline.main}
                      date={article.pub_date}
                      key={article._id}
                      _id={article._id}
                      handleSaveButton = {this.handleSaveButton} 
                  />
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>

        </Row>
        <Row>
          <Col size="md-12">
          <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.saved.length ? (
              <List>
                {this.state.saved.map(article => (
                  <Saved
                      url={article.url}
                      title={article.title}
                      date={article.date}
                      key={article._id}
                      _id={article._id}
                      handleDeleteButton = {this.handleDeleteButton}
                  />
                ))}
              </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
