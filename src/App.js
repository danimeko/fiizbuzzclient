import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      outPut: {},
      Error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });

    e.preventDefault();
  }

  handleFetch() {
    const { value } = this.state;

    fetch(
      "https://cryptic-waters-47568.herokuapp.com/fiizbuzz?inputNumber=" + value
    )
      .then(response => {
        if (!response.ok) {
          this.setState({
            error: true,
            value: ""
          });
          throw Error(response.statusText);
        }
        return response.json();
      })

      .then(data =>
        this.setState({
          outPut: data,
          error: false
        })
      )
      .catch(function(error) {
        console.log(error); //this is not right way of doing but for the time bening we will console it
      });
  }
  render() {
    const { outPut, error } = this.state;
    console.log(outPut);
    return (
      <div className="App">
        <h1>Please Enter a number or numbers separated by comma</h1>
        {error && (
          <h3>Please Enter only a number or numbers separated by comma</h3>
        )}
        <input
          type="text"
          placeholder="Enter a number(s) separeted by comma"
          vlaue={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" value="Check !!" onClick={this.handleFetch} />

        {outPut && <h2>{outPut.output}</h2>}
      </div>
    );
  }
}

export default App;
