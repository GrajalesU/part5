import propTypes from 'prop-types'

const Notification = ({ setNotification, body, isError }) => {
  if (body === null) return null
  return (
    <div className="floating">
      <div className={`notification ${isError && 'error'}`}>
        <p>{body}</p>
        <button
          onClick={() => {
            setNotification({ body: null })
          }}
        >
          X
        </button>
      </div>
    </div>
  )
}

Notification.propTypes = {
  body: propTypes.string,
  isError: propTypes.bool,
  setNotification: propTypes.func
}

export default Notification