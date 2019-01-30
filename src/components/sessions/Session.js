import React from 'react';
import axios from 'axios';
import GenGroup from '../genGroup/genGroup';
import { Link } from "react-router-dom";

class Session extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			encounter_name: '',
			monsters: [],
			encounters: []
		};
	}

	componentDidMount(){
		let url = window.location.href
	  let id = url.substring(url.lastIndexOf('/') + 1);
		axios.get(`https://dnd-backend.herokuapp.com/sessions/${id}`,
			{headers: {
				"Authorization": localStorage.getItem('token')
				}
			}
		)
		.then(response => {
			//console.log(response)
			this.setState({
				encounters: response.data
			})
		})
		.catch(error => {
			//console.log(error)
		})
	}
	// extra in case you need to reference

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

 	readyMonsters = (monsters) => {
 		this.setState({
 			monsters: monsters
 		})
 	}

 	update = () => {
 		let id = localStorage.getItem('user_id')
		axios.get(`https://dnd-backend.herokuapp.com/sessions/${id}`,
			{headers: {
				"Authorization": localStorage.getItem('token')
				}
			}
		)
		.then(response => {
			// console.log(response)
			this.setState({
				encounters: response.data
			})
		})
		.catch(error => {
			console.log(error)
		})
 	}

 	deleteEncounter = event => {
 		event.preventDefault()
 		axios.delete(`https://dnd-backend.herokuapp.com/encounters/${event.target.id}`)
 		.then(response => {
 			// console.log(response)
 			this.update()
 		})
 		.catch(error => {
 			console.log(error)
 		})
 	}

 	postEncounter = event => {
 		event.preventDefault()

 		// console.log(this.state.monsters)
 		// return

 		let ar = this.state.monsters

		let ki = []
		let vi = []

		for (let i = 0; i < ar.length; i++){
		  ki.push(Object.keys(ar[i]));
		  vi.push(Object.values(ar[i]));
		}

		let v_ar = vi.flat()
		let k_ar = ki.flat()

		for (let i = 0; i < v_ar.length; i++){
		  if (typeof v_ar[i] == 'object'){
		    v_ar[i] = Array.from(v_ar[i]).join(' ')
		  }
		}

		for (let j = 0; j < v_ar.length; j++){
		  if (typeof v_ar[j] == 'number'){
		    v_ar[j] = v_ar[j] + ''
		  }
		}

 		let url = window.location.href
	  let id = url.substring(url.lastIndexOf('/') + 1);
	  let encounter = {"encounter_name": this.state.encounter_name, "k": k_ar, "v": v_ar }
	  axios.post(`https://dnd-backend.herokuapp.com/encounters/${id}`, encounter)
	  .then(response => {
	  	this.setState({
 				encounter_name: ''
 			})
	  	this.update()
	  })
	  .catch(error => {
	  	console.log(error)
	  })

 	}

	render() {
		console.log(this.state)
		return (
			<div>
				<div>
					{this.state.encounters.map(e => {
						return <div key={e.id}><Link to={`/view/encounters/${e.id}`}><p>{e.encounter_name}</p></Link><p id={e.id} onClick={this.deleteEncounter}>X</p></div>
					})}
				</div>
				<GenGroup readyMonsters={this.readyMonsters}/>
				<form>
					<input
						type="text"
						placeholder='encounter name'
						onChange={this.handleChange}
						name="encounter_name"
						value={this.state.encounter_name}
					/><br/>
					<button onClick={this.postEncounter}>Post Encounter to session</button>
				</form>
			</div>
		)
	}
}

export default Session;
