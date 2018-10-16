import React, { Component } from 'react'
import axios from 'axios'
import Idea from './Idea'
import IdeaForm from './IdeaForm'
import update from 'immutability-helper'

class IdeasContainer extends Component {
  render() {

    return (

      <div>
        <button className="newIdeaButton"
          onClick={this.addNewIdea}>
          New Idea
        </button>

       {this.state.ideas.map((idea) => {
        if(this.state.editingIdeaId === idea.id) {
          return(<IdeaForm idea={idea} key={idea.id} />)
        } else {
          return (<Idea idea={idea} key={idea.id} />)
        }
      })}


      </div>    
    );
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/ideas.json')
    .then(response => {
      console.log(response)
      this.setState({ideas: response.data})
    })
    .catch(error => console.log(error))
  }

  constructor(props) {
    super(props)
    this.state = {
      ideas: []
    }
  }

  addNewIdea = () => {
    axios.post(
      'http://localhost:3001/api/v1/ideas',
      { idea:
        {
          title: '',
          body: ''
        }
      }
    )
    .then(response => {
      console.log(response)
      const ideas = update(this.state.ideas, {
        $splice: [[0, 0, response.data]]
      })
      this.state = {
        ideas: [],
        editingIdeaId: null
      }
      
      this.setState({
        ideas: ideas,
        editingIdeaId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }



}

export default IdeasContainer
