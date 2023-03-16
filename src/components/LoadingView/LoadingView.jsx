import { ThreeDots } from 'react-loader-spinner';
// import './LoadingView.css';

export default function LoadingView() {
  return (
    <div className="Loading">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#5c919c"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
        wrapperClassName="Loading"
        visible={true}
      />
    </div>
  );
}
