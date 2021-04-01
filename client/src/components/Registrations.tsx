import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'
import * as uuid from 'uuid'
import { register, deleteRegistration, getRegistrations } from '../api/registrations-api'
import Auth from '../auth/Auth'
import { Registration } from '../types/Registration'

interface RegistrationsProps {
  auth: Auth
  history: History
}

interface RegistrationsState {
  registrations: Registration[]
  newRegistrationName: string
  loadingRegistration: boolean
}

export class Registrations extends React.PureComponent<RegistrationsProps, RegistrationsState> {
  state: RegistrationsState = {
    registrations: [],
    newRegistrationName: '',
    loadingRegistration: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newRegistrationName: event.target.value })
  }

  onRegister = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const newRegistration = await register(this.props.auth.getIdToken(), {
        name: this.state.newRegistrationName,
        eventId: uuid.v4()
      })
      this.setState({
        registrations: [...this.state.registrations, newRegistration],
        newRegistrationName: ''
      })
    } catch {
      alert('Registration failed')
    }
  }

  onRegistrationDelete = async (eventId: string) => {
    try {
      await deleteRegistration(this.props.auth.getIdToken(), eventId)
      this.setState({
        registrations: this.state.registrations.filter(registration => registration.eventId != eventId)
      })
    } catch {
      alert('Registration deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const registrations = await getRegistrations(this.props.auth.getIdToken())
      this.setState({
        registrations,
        loadingRegistration: false
      })
    } catch (e) {
      alert(`Failed to fetch registrations: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Registrations</Header>

        {this.renderCreateRegistrationInput()}

        {this.renderRegistrations()}
      </div>
    )
  }

  renderCreateRegistrationInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'Register an event',
              onClick: this.onRegister
            }}
            fluid
            actionPosition="left"
            placeholder="Enter your event"
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }


  renderRegistrations() {
    if (this.state.loadingRegistration) {
      return this.renderLoading()
    }

    return this.renderRegistrationsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Registrations
        </Loader>
      </Grid.Row>
    )
  }

  renderRegistrationsList() {
    return (
      <Grid padded>
        {this.state.registrations.map((registration, pos) => {
          return (
            <Grid.Row key={registration.eventId}>
              <Grid.Column width={10} verticalAlign="middle">
                {registration.name}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onRegistrationDelete(registration.eventId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}
