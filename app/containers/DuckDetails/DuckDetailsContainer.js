import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DuckDetails } from 'components'
import * as ducksActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'

class DuckDetailsContainer extends React.Component {
  componentDidMount() {
    this.props.initLikeFetch(this.props.duckId)
    if(this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  }

  render () {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error}
        addAndHandleReply={this.props.addAndHandleReply}
      />
    )
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckAlreadyFetched: PropTypes.bool.isRequired,
  removeFetching: PropTypes.func.isRequired,
  fetchAndHandleDuck: PropTypes.func.isRequired,
  initLikeFetch: PropTypes.func.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

DuckDetailsContainer.contextTypes = {
  routeParams: PropTypes.shape({duckId: PropTypes.string.isRequired}),
}

function mapStateToProps({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.get('isFetching') || likeCount.get('isFetching'),
    error: ducks.get('error'),
    authedUser: users.get(users.get('authedId')).get('info'),
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks.get(props.routeParams.duckId)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...ducksActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators,
  }, dispatch)
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DuckDetailsContainer)
