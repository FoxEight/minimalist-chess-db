import React, { Component } from 'react';

class QueryContainer extends Component {
  constructor(props) {
    super();
    this.handleQueryClick = this.handleQueryClick.bind(this);
  }

   handleQueryClick() {
    // try {
    fetch('http://localhost:3000/query', {
      method: 'GET',
      // header: {
      //   'Access-Control-Allow-Origin': 'http://localhost:3000' 
      // }
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
    })
    .then(res => {
      console.log('back at front end', Date.now());
      console.log(res);
      res.json();
    })
    .then(data => {
      console.log('after parse')
      console.log(data);
    })
    .catch(err => console.log('ERROR FRONT END', err))

// console.log(res)

//     const data = await res.json();
    
//     console.log(data)
    
//     // .then(res => {
//     //   console.log('back at front end', Date.now());
//     //   console.log(res)
 
//     //   return res.json();
//     //   }).then(data => {
        
//     //     console.log(data);
//     //   } 

//       } catch (err) {
//       console.log('ERROR FRONT END')
//       console.log(err)
//         }
      }
      
  

  render() {
    return <button onClick={this.handleQueryClick}>Query DB</button>;
  }
}

export default QueryContainer;
