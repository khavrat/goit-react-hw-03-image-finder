export default function ImageGalleryItem({image}) {
    return (
      <li className="ImageGalleryItem">
        <img src={image.webformatURL} alt={image.tags} />
      </li>
    );
}
