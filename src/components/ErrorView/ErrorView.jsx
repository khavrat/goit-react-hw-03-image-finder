import errorImg from 'Images/errorImg.png';
import './ErrorView.css';

export default function SearchErrorView({ message }) {
    return (
      <div className="ErrorMessage" role="alert">
        <img src={errorImg} width="400" />
        {message}
      </div>
    );
}