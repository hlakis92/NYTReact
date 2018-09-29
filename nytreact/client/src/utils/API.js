import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  searchArticle: function(topic, startYear, endYear){
    const api= "9565309af0d846ca8ba9f6c19fdc4a71";
    const queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${api}&q=${topic}&begin_date=${startYear}0101&end_date=${endYear}0101`;
    return axios.get(queryUrl);
  },
  // Gets the book with the given id
  // getBook: function() {
  //   return axios.get("/api/books/");
  // },  
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(articleData) {
    return axios.post("/api/books", {
      title: articleData.articleData.headline.main,
      date: articleData.articleData.pub_date,
      url: articleData.articleData.web_url
    });
    
  }
};




