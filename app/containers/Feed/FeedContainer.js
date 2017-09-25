import React from 'react'
import PropTypes from 'prop-types'
import { Feed } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'

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
  duckIds: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

function mapStateToProps({feed}) {
  const { isFetching, error, newDucksAvailable, duckIds} = feed
  return {
    isFetching,
    error,
    newDucksAvailable,
    duckIds,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer)
