import propTypes from 'prop-types'

const Notification = ({ body, isError }) => {
  if (body === null) return null
  return (
    <div className="floating">
      <div className={`notification ${isError && 'error'}`}>
        <p>{body}</p>
      </div>
    </div>
  )
}

Notification.propTypes = {
  body: propTypes.string,
  isError: propTypes.bool
}

export default Notification