import messageImg from 'Images/messageImg.png';

export default function SearchErrorView({ message }) {
    return (
      <div className={`ErrorMessage ${message ? 'hide' : ''}`}>
        <img src={messageImg} width="400" alt="error message" />
        {message}
      </div>
    );
}