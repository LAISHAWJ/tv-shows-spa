import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface ShowCardProps {
  id: number;
  name: string;
  image: string;
  rating?: number;
}

const ShowCard: React.FC<ShowCardProps> = ({ id, name, image, rating }) => {
  return (
    <Link to={`/show/${id}`}>
      <Card
        hoverable
        cover={
          <img
            alt={name}
            src={image} // Usa image_path para HD
            className="h-64 w-full object-cover rounded-t-lg transition-all duration-300 hover:brightness-110"
            loading="lazy" // Lazy loading para calidad
          />
        }
        className="bg-black-bg border-none shadow-lg hover:shadow-emerald-green/20 transition-all duration-300 transform hover:scale-105 hover:border-emerald-green/50 border border-transparent rounded-lg fade-in"
      >
        <Card.Meta
          title={
            <span className="text-white text-lg font-bold truncate">
              {name}
            </span>
          }
          description={
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">TV</span>
              {rating && <span className="text-emerald-green font-bold text-sm">{rating}/10</span>}
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default ShowCard;