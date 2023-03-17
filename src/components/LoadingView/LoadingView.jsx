import { ThreeDots } from 'react-loader-spinner';

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
        }}
        wrapperClassName="Loading"
        visible={true}
      />
    </div>
  );
}
