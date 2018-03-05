'use strict'

const React = require('react')
const PropTypes = require('prop-types')

const callAll = (...fns) => arg => fns.forEach(fn => fn && fn(arg))

module.exports = exports.default = class AnimationPrimitive extends React.Component {
  static propTypes = {
    phases: PropTypes.arrayOf(PropTypes.string),
    phase: PropTypes.string,
    listenerProp: PropTypes.oneOf(['onAnimationEnd', 'onTransitionEnd']),
    onChange: PropTypes.func
  }

  static defaultProps = {
    phases: ['leave', 'enter'],
    listenerProp: 'onTransitionEnd',
    onChange: () => {}
  }

  state = {
    phase: '',
    phaseActive: false,
    phaseComplete: false
  }

  handleListener = event => {
    // Ignore bubbled events
    if (event.currentTarget !== event.target) return

    // Ignore transition events during phase changes
    if (this.state.phase !== this.currentPhase) return

    if (this.state.phase && this.state.phaseActive) {
      this.setState({ phaseComplete: true })
    }
  }

  componentDidMount () {
    this.onUpdate(this.props, {})
  }
  componentWillReceiveProps (nextProps) {
    this.onUpdate(nextProps, this.props)
  }

  onUpdate (props, prevProps) {
    if (!props.phase || props.phase === prevProps.phase) return

    this.currentPhase = props.phase

    if (props.phase && !prevProps.phase) {
      // If there was no previous phase, go ahead and mark transition as complete
      this.setState({
        phase: props.phase,
        phaseActive: true,
        phaseComplete: true
      })
    } else {
      this.setState(
        () => ({
          phase: props.phase,
          phaseActive: false,
          phaseComplete: false
        }),
        () => {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              this.setState({ phaseActive: true })
            })
          })
        }
      )
    }
  }

  getContainerProps = props => {
    return {
      ...props,
      [this.props.listenerProp]: callAll(
        props[this.props.listenerProp],
        this.handleListener
      )
    }
  }

  getStateAndHelpers () {
    return {
      ...this.state,
      getContainerProps: this.getContainerProps
    }
  }

  componentDidUpdate () {
    this.props.onChange(this.getStateAndHelpers())
  }

  render () {
    return this.props.render(this.getStateAndHelpers())
  }
}
