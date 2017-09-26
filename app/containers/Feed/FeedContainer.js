import React from 'react'
import PropTypes from 'prop-types'
import { Feed } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'
import { List } from 'immutable'

class FeedContainer extends React.Component {

  componentDidMount() {
    this.props.setAndHandleFeedListener()
  }

  render () {
    return (
      <Feed
        duckIds={this.props.duckIds}
        isFetching={this.props.isFetching}
        error={this.props.error}
        newDucksAvailable={this.props.newDucksAvailable}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
      />
    )
  }
}

FeedContainer.propTypes = {
  duckIds: PropTypes.instanceOf(List),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

function mapStateToProps({feed}) {
  return {
    newDucksAvailable: feed.get('newDucksAvailable'),
    isFetching: feed.get('isFetching'),
    error: feed.get('error'),
    duckIds: feed.get('duckIds'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer)
