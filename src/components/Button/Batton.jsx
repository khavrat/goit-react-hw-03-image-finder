import { Component } from 'react';
import { perPage } from '../../servises/getImages';

class Button extends Component {
  state = {
    // currentPage: 1,
    isVisibleBtn: false,
  };


  componentDidUpdate(prevProps, prevState) {
    console.log('компонент обновился в кнопке load more');
    console.log('prevProps.searchField :>> ', prevProps.searchField);
    console.log('this.props.searchField :>> ', this.props.searchField);

    if (prevProps.response !== this.props.response) {
      console.log('this.props.response :>> ', this.props.response);
      this.isVisibleBtn();
    }
  }

  // onClick = () => {
  //   console.log('прибавление страницы по клику на кнопку Load More');
  //   const { onClick } = this.props;
  //   this.setState(
  //     prevState => ({
  //       currentPage: prevState.currentPage + 1,
  //     }),
  //     () =>
  //       console.log(
  //         'собираем номер страницы для апп',
  //         onClick(this.state.currentPage)
  //       )
  //   );
  // };




  onClick = () => {
    console.log('прибавление страницы по клику на кнопку Load More');
    // const { onClick } = this.props;
    // this.setState(
    //   prevState => ({
    //     currentPage: prevState.currentPage + 1,
    //   }),
    //   () =>
    //     console.log(
    //       'собираем номер страницы для апп',
    this.props.onClick();
    //     )
    // );
  };



  isVisibleBtn = () => {
    console.log('кнопка загрузить еще видна/невидна в кнопке load more');

    const { response, currentPage } = this.props;
    console.log('response :>> ', response);
    console.log('currentPage :>> ', currentPage);
    if (
      response.hits.length === 0 ||
      currentPage * perPage >= response.totalHits
    ) {
      this.setState({ isVisibleBtn: false });
    } else if (response.hits.length !== 0) {
      this.setState({ isVisibleBtn: true });
    }
  };

  render() {
    console.log('рендер в кнопке Load More');
    const { isVisibleBtn } = this.state;
    return (
      <>
        {isVisibleBtn && (
          <button className="Button" type="button" onClick={this.onClick}>
            {this.props.children}
          </button>
        )}
      </>
    );
  }
}

export default Button;
