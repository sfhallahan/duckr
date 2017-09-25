import React from 'react'
import PropTypes from 'prop-types'
import { Replies } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as repliesActionCreators from 'redux/modules/replies'
import {staleReplies} from 'helpers/utils'

class RepliesContainer extends React.Component {
  componentDidMount() {
    if(staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId)
    }
  }

  render () {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.error}
        replies={this.props.replies} />
    )
  }
}

RepliesContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  replies: PropTypes.object,
  duckId: PropTypes.string.isRequired,
  fetchAndHandleReplies: PropTypes.func.isRequired,
}

RepliesContainer.defaultProps = {
  lastUpdated: 0,
  replies: {},
}

function mapStateToProps(state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {}
  const {lastUpdated, replies } = duckRepliesInfo
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepliesContainer)
