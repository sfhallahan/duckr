import React from 'react'
import PropTypes from 'prop-types'
import { User } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import { staleUser, staleDucks } from 'helpers/utils'


class UserContainer extends React.Component {
  componentDidMount() {
    const uid = this.props.routeParams.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid)
    }
    if (this.props.noUser === true || staleDucks(this.props.lastUpdatedDucks)) {
      this.props.fetchAndHandleUsersDucks(uid)
    }
  }

  render () {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds}
      />
    )
  }
}

UserContainer.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
  routeParams: PropTypes.shape({uid: PropTypes.string.isRequired}),
  lastUpdatedUser: PropTypes.number.isRequired,
  lastUpdatedDucks: PropTypes.number.isRequired,
  fetchAndHandleUser: PropTypes.func.isRequired,
  fetchAndHandleUsersDucks: PropTypes.func.isRequired,
}

UserContainer.contextTypes = {
  routeParams: PropTypes.shape({uid: PropTypes.string.isRequired}),
}

function mapStateToProps({users, usersDucks}, props) {
  const specificUsersDucks = usersDucks[props.routeParams.uid]
  const user = users[props.routeParams.uid]
  const noUser = typeof user === 'undefined'
  const name = noUser ? '' : user.info.name
  return {
    noUser,
    name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedDucks: specificUsersDucks ? specificUsersDucks.lastUpdated : 0,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersDucksActionCreators
  }, dispatch)
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserContainer)
