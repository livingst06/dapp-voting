import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

class VoteFor extends Component {

	state = { proposals: [], index: -1 }

	componentDidMount = async () => {
		try {

		// récupérer la liste des propositions
		const proposals = await this.props.contract.methods.getProposals().call()
		// Mettre à jour le state
		this.setState({ proposals })

			 
		} catch (error) {
			
			// Catch any errors for any of the above operations.
			alert(
				`Non-Ethereum browser detected. Can you please try to install MetaMask before starting.`
			)
			console.error(error)


		}
	}	

	 
	handleChange = (e) => {
		
		this.setState({index: e.target.value})
	}

	handleClick = async (event) => {

		event.preventDefault()

		if ( this.state.index === -1) return

		// Interaction avec le smart contract pour ajouter un compte
		await this.props.contract.methods.vote(this.state.index).send({ from: this.props.account })
		
	}
 
	render () {

		const { proposals, index } = this.state
		return (
			<div style={{ disabled: 'true', display: 'flex', justifyContent: 'center' }}>
				<Card style={{ width: '50rem' }}>
					<Card.Header>
						<strong>Faire un Vote</strong>
					</Card.Header>
					<Card.Body>
						<Form.Control as="select" value={index?index:-1} onChange={this.handleChange}>
						<option disabled value={-1} key={-1}>select</option>
						{proposals.map((p, i) => (
									<option  value={i} key={i}>{i} {p.description}</option>
						))}
						</Form.Control>
						<Button onClick={this.handleClick} variant="primary">
							{' '}
							Voter{' '}
						</Button>
					</Card.Body>
				</Card>
			</div>
			
		)
	

	}
}

export default VoteFor
