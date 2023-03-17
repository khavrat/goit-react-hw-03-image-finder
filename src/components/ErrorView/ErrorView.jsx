import messageImg from 'Images/messageImg.png';

export default function SearchErrorView({ message }) {
    return (
      <div className="ErrorMessage" role="alert">
        <img src={messageImg} width="400" alt="error message" />
        {message}
      </div>
    );
}