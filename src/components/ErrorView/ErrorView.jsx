import messageImg from 'Images/messageImg.png';
import PropTypes from 'prop-types';

function SearchErrorView({ message }) {
    return (
      <div className={`ErrorMessage ${message ? 'hide' : ''}`}>
        <img src={messageImg} width="400" alt="error message" />
        {message}
      </div>
    );
}

SearchErrorView.propTypes = {
  message: PropTypes.string,
};

export default SearchErrorView;