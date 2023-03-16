import errorImg from 'Images/errorImg.png';

export default function SearchErrorView({ message }) {
    return (
      <div className="ErrorMessage" role="alert">
        <img src={errorImg} width="400" alt="message about error" />
        {message}
      </div>
    );
}